// Cron-driven dispatcher for 24h and 1h reminder emails.
// Called every 5 min by pg_cron via /api/public/booking-reminders.

import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { enqueueTransactional } from '@/lib/email-enqueue'
import { formatForClient, formatForDev } from '@/lib/format-datetime'
import { devEmailForLocale } from '@/lib/notify-recipient'


export const Route = createFileRoute('/api/public/booking-reminders')({
  server: {
    handlers: {
      POST: async () => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const now = new Date()
        const in23h30 = new Date(now.getTime() + 23.5 * 3600 * 1000).toISOString()
        const in24h30 = new Date(now.getTime() + 24.5 * 3600 * 1000).toISOString()
        const in30m = new Date(now.getTime() + 30 * 60 * 1000).toISOString()
        const in90m = new Date(now.getTime() + 90 * 60 * 1000).toISOString()

        let sent24 = 0
        let sent1 = 0

        // 24h reminders (client only)
        const { data: due24 } = await supabase
          .from('bookings')
          .select('id, name, email, date_str, time_str, locale, client_timezone')
          .eq('status', 'confirmed')
          .is('reminder_24h_sent_at', null)
          .gte('starts_at', in23h30)
          .lte('starts_at', in24h30)
          .limit(50)

        for (const b of due24 ?? []) {
          const clientWhen = formatForClient(b.date_str, b.time_str, b.client_timezone, b.locale)
          const r = await enqueueTransactional(supabase, {
            templateName: 'booking-reminder-24h',
            to: b.email,
            props: { name: b.name, date: b.date_str, time: b.time_str, formattedDateTime: clientWhen },
          })
          if (r.ok) {
            await supabase
              .from('bookings')
              .update({ reminder_24h_sent_at: new Date().toISOString() })
              .eq('id', b.id)
            sent24++
          }
        }

        // 1h reminders (client + dev)
        const { data: due1 } = await supabase
          .from('bookings')
          .select('id, name, email, date_str, time_str, locale, client_timezone')
          .eq('status', 'confirmed')
          .is('reminder_1h_sent_at', null)
          .gte('starts_at', in30m)
          .lte('starts_at', in90m)
          .limit(50)

        for (const b of due1 ?? []) {
          const clientWhen = formatForClient(b.date_str, b.time_str, b.client_timezone, b.locale)
          const devWhen = formatForDev(b.date_str, b.time_str)
          const clientR = await enqueueTransactional(supabase, {
            templateName: 'booking-reminder-1h',
            to: b.email,
            props: { name: b.name, time: b.time_str, formattedDateTime: clientWhen, forDev: false },
          })
          await enqueueTransactional(supabase, {
            templateName: 'booking-reminder-1h',
            to: devEmailForLocale(b.locale),
            props: { name: b.name, time: b.time_str, formattedDateTime: devWhen, forDev: true },
          })
          if (clientR.ok) {
            await supabase
              .from('bookings')
              .update({ reminder_1h_sent_at: new Date().toISOString() })
              .eq('id', b.id)
            sent1++
          }
        }

        return Response.json({ success: true, sent24, sent1 })
      },
    },
  },
})
