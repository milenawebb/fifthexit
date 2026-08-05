// Public token-gated endpoint for cancel/reschedule actions.
// GET → return booking details (using either cancel_token or reschedule_token)
// POST → { action: 'cancel' } or { action: 'reschedule', date, time }

import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { enqueueTransactional } from '@/lib/email-enqueue'
import { googleCalendarUrl } from '@/lib/calendar-links'
import { localToUtc } from '@/lib/timezone'
import { formatForClient, formatForDev } from '@/lib/format-datetime'
import { devEmailForLocale } from '@/lib/notify-recipient'
import { siteUrlForLocale } from '@/lib/site-url'

const ActionSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('cancel') }),
  z.object({
    action: z.literal('reschedule'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{1,2}:\d{2}$/),
  }),
])

function getSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

async function findBooking(supabase: any, token: string): Promise<any> {
  const { data } = await supabase
    .from('bookings')
    .select('*')
    .or(`cancel_token.eq.${token},reschedule_token.eq.${token}`)
    .maybeSingle()
  return data
}

export const Route = createFileRoute('/api/public/booking-action/$token')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const supabase = getSupabase()
        if (!supabase) return Response.json({ error: 'Server config' }, { status: 500 })
        const booking = await findBooking(supabase, params.token)
        if (!booking) return Response.json({ error: 'Not found' }, { status: 404 })
        if (new Date(booking.starts_at).getTime() < Date.now()) {
          return Response.json({ error: 'expired', booking: null }, { status: 410 })
        }
        return Response.json({
          booking: {
            id: booking.id,
            name: booking.name,
            email: booking.email,
            date: booking.date_str,
            time: booking.time_str,
            status: booking.status,
            locale: booking.locale,
          },
        })
      },
      POST: async ({ params, request }) => {
        const supabase = getSupabase()
        if (!supabase) return Response.json({ error: 'Server config' }, { status: 500 })

        let parsed: z.infer<typeof ActionSchema>
        try {
          parsed = ActionSchema.parse(await request.json())
        } catch (err) {
          return Response.json(
            { error: 'Invalid request', details: err instanceof Error ? err.message : '' },
            { status: 400 },
          )
        }

        const booking = await findBooking(supabase, params.token)
        if (!booking) return Response.json({ error: 'Not found' }, { status: 404 })
        if (booking.status === 'cancelled') {
          return Response.json({ error: 'Already cancelled' }, { status: 410 })
        }
        if (new Date(booking.starts_at).getTime() < Date.now()) {
          return Response.json({ error: 'Booking already passed' }, { status: 410 })
        }

        if (parsed.action === 'cancel') {
          if (params.token !== booking.cancel_token) {
            return Response.json({ error: 'Invalid token' }, { status: 403 })
          }
          await supabase
            .from('bookings')
            .update({
              status: 'cancelled',
              cancelled_at: new Date().toISOString(),
            })
            .eq('id', booking.id)

          await enqueueTransactional(supabase, {
            templateName: 'booking-cancellation',
            to: devEmailForLocale(booking.locale),
            props: {
              name: booking.name,
              email: booking.email,
              date: booking.date_str,
              time: booking.time_str,
              formattedDateTime: formatForDev(booking.date_str, booking.time_str),
            },
          })
          return Response.json({ success: true })
        }

        // reschedule
        if (params.token !== booking.reschedule_token) {
          return Response.json({ error: 'Invalid token' }, { status: 403 })
        }

        // Slot already taken?
        const { data: clash } = await supabase
          .from('bookings')
          .select('id')
          .eq('date_str', parsed.date)
          .eq('time_str', parsed.time)
          .eq('status', 'confirmed')
          .neq('id', booking.id)
          .maybeSingle()
        if (clash) {
          return Response.json({ error: 'Slot no longer available' }, { status: 409 })
        }

        const SITE_URL = siteUrlForLocale(booking.locale)
        const oldDate = booking.date_str
        const oldTime = booking.time_str
        const newStarts = localToUtc(parsed.date, parsed.time)

        await supabase
          .from('bookings')
          .update({
            date_str: parsed.date,
            time_str: parsed.time,
            starts_at: newStarts.toISOString(),
            rescheduled_at: new Date().toISOString(),
            reminder_24h_sent_at: null,
            reminder_1h_sent_at: null,
          })
          .eq('id', booking.id)

        // Updated client confirmation
        await enqueueTransactional(supabase, {
          templateName: 'booking-confirmation',
          to: booking.email,
          props: {
            name: booking.name,
            date: parsed.date,
            time: parsed.time,
            formattedDateTime: formatForClient(
              parsed.date,
              parsed.time,
              booking.client_timezone,
              booking.locale,
            ),
            locale: booking.locale,
            rescheduleUrl: `${SITE_URL}/reschedule/${booking.reschedule_token}`,
            cancelUrl: `${SITE_URL}/cancel/${booking.cancel_token}`,
            googleCalendarUrl: googleCalendarUrl(parsed.date, parsed.time),
            icsUrl: `${SITE_URL}/api/public/booking-ics/${booking.cancel_token}`,
            siteUrl: SITE_URL,
          },
        })

        // Internal notification
        await enqueueTransactional(supabase, {
          templateName: 'booking-reschedule-notify',
          to: devEmailForLocale(booking.locale),
          props: {
            name: booking.name,
            email: booking.email,
            oldDate,
            oldTime,
            newDate: parsed.date,
            newTime: parsed.time,
            oldFormatted: formatForDev(oldDate, oldTime),
            newFormatted: formatForDev(parsed.date, parsed.time),
          },
        })

        return Response.json({ success: true })
      },
    },
  },
})
