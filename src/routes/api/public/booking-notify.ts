import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { enqueueTransactional } from '@/lib/email-enqueue'
import { generateToken, localToUtc } from '@/lib/timezone'
import { googleCalendarUrl } from '@/lib/calendar-links'

const SITE_URL = 'https://hype-street.com'

const BookingSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().trim().regex(/^\d{1,2}:\d{2}$/),
  message: z.string().trim().min(1).max(2000),
  locale: z.string().trim().min(1).max(10).optional(),
  estimator: z
    .object({
      projectType: z.string().trim().max(100),
      design: z.string().trim().max(100),
      features: z.array(z.string().trim().max(100)).max(20),
      timeline: z.string().trim().max(100),
      estimatedPrice: z.string().trim().max(40),
    })
    .optional(),
})

export const Route = createFileRoute('/api/public/booking-notify')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let payload: z.infer<typeof BookingSchema>
        try {
          payload = BookingSchema.parse(await request.json())
        } catch (err) {
          return Response.json(
            { error: 'Invalid request', details: err instanceof Error ? err.message : 'parse error' },
            { status: 400 },
          )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Reject double-booked slots (status='confirmed' for same date+time)
        const { data: clash } = await supabase
          .from('bookings')
          .select('id')
          .eq('date_str', payload.date)
          .eq('time_str', payload.time)
          .eq('status', 'confirmed')
          .maybeSingle()
        if (clash) {
          return Response.json({ error: 'Slot no longer available' }, { status: 409 })
        }

        const cancelToken = generateToken()
        const rescheduleToken = generateToken()
        const startsAt = localToUtc(payload.date, payload.time)

        const { data: booking, error: insertErr } = await supabase
          .from('bookings')
          .insert({
            name: payload.name,
            email: payload.email,
            message: payload.message,
            date_str: payload.date,
            time_str: payload.time,
            starts_at: startsAt.toISOString(),
            locale: payload.locale,
            estimator: payload.estimator ?? null,
            cancel_token: cancelToken,
            reschedule_token: rescheduleToken,
          })
          .select('id')
          .single()

        if (insertErr || !booking) {
          console.error('Failed to insert booking', insertErr)
          return Response.json({ error: 'Failed to record booking' }, { status: 500 })
        }

        // Shared calendar links
        const gcalUrl = googleCalendarUrl(payload.date, payload.time)
        const rescheduleUrl = `${SITE_URL}/reschedule/${rescheduleToken}`
        const cancelUrl = `${SITE_URL}/cancel/${cancelToken}`
        const icsUrl = `${SITE_URL}/api/public/booking-ics/${cancelToken}`

        // Internal notification email
        await enqueueTransactional(supabase, {
          templateName: 'booking-notification',
          props: {
            ...payload,
            googleCalendarUrl: gcalUrl,
            icsUrl,
          },
          replyTo: payload.email,
        })
        await enqueueTransactional(supabase, {
          templateName: 'booking-confirmation',
          to: payload.email,
          props: {
            name: payload.name,
            date: payload.date,
            time: payload.time,
            locale: payload.locale,
            rescheduleUrl,
            cancelUrl,
            googleCalendarUrl: googleCalendarUrl(payload.date, payload.time),
            icsUrl,
          },
        })

        return Response.json({ success: true })
      },
    },
  },
})
