// Public token-gated endpoint for cancel/reschedule actions.
// GET → return booking details (using either cancel_token or reschedule_token)
// POST → { action: 'cancel' } or { action: 'reschedule', date, time }

import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { enqueueTransactional } from '@/lib/email-enqueue'
import { googleCalendarUrl } from '@/lib/calendar-links'
import { localToUtc } from '@/lib/timezone'

const SITE_URL = 'https://hype-street.com'
const DEV_EMAIL = 'dev@hype-street.com'

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
          if (booking.google_event_id) {
            await deleteCalendarEvent(booking.google_event_id)
          }
          await supabase
            .from('bookings')
            .update({
              status: 'cancelled',
              cancelled_at: new Date().toISOString(),
              google_event_id: null,
            })
            .eq('id', booking.id)

          await enqueueTransactional(supabase, {
            templateName: 'booking-cancellation',
            props: {
              name: booking.name,
              email: booking.email,
              date: booking.date_str,
              time: booking.time_str,
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

        const oldDate = booking.date_str
        const oldTime = booking.time_str
        const newStarts = localToUtc(parsed.date, parsed.time)

        const eventInput = {
          name: booking.name,
          email: booking.email,
          message: booking.message,
          date: parsed.date,
          time: parsed.time,
          durationMinutes: 30,
        }
        let eventId = booking.google_event_id as string | null
        if (eventId) {
          const ok = await updateCalendarEvent(eventId, eventInput)
          if (!ok) eventId = await createCalendarEvent(eventInput)
        } else {
          eventId = await createCalendarEvent(eventInput)
        }

        await supabase
          .from('bookings')
          .update({
            date_str: parsed.date,
            time_str: parsed.time,
            starts_at: newStarts.toISOString(),
            rescheduled_at: new Date().toISOString(),
            reminder_24h_sent_at: null,
            reminder_1h_sent_at: null,
            google_event_id: eventId,
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
            locale: booking.locale,
            rescheduleUrl: `${SITE_URL}/reschedule/${booking.reschedule_token}`,
            cancelUrl: `${SITE_URL}/cancel/${booking.cancel_token}`,
          },
        })

        // Internal notification
        await enqueueTransactional(supabase, {
          templateName: 'booking-reschedule-notify',
          props: {
            name: booking.name,
            email: booking.email,
            oldDate,
            oldTime,
            newDate: parsed.date,
            newTime: parsed.time,
          },
        })

        // Avoid unused-var lint for DEV_EMAIL (kept for future use)
        void DEV_EMAIL

        return Response.json({ success: true })
      },
    },
  },
})
