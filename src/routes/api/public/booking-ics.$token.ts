// Returns an .ics file for a booking, looked up by either cancel or reschedule token.
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { buildIcs } from '@/lib/calendar-links'

export const Route = createFileRoute('/api/public/booking-ics/$token')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const url = import.meta.env.VITE_SUPABASE_URL
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!url || !key) return new Response('Server config', { status: 500 })
        const supabase = createClient(url, key)
        const { data: booking } = await supabase
          .from('bookings')
          .select('id,date_str,time_str,status')
          .or(`cancel_token.eq.${params.token},reschedule_token.eq.${params.token}`)
          .maybeSingle()
        if (!booking || booking.status === 'cancelled') {
          return new Response('Not found', { status: 404 })
        }
        const ics = buildIcs(booking.date_str, booking.time_str, booking.id)
        return new Response(ics, {
          status: 200,
          headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-Disposition': 'attachment; filename="fifthexit-consult.ics"',
            'Cache-Control': 'no-store',
          },
        })
      },
    },
  },
})
