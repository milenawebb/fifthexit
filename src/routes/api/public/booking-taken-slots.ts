// Returns the list of already-confirmed (date_str, time_str) pairs for the
// upcoming booking window so the client can grey out taken slots.

import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/booking-taken-slots')({
  server: {
    handlers: {
      GET: async () => {
        const url = import.meta.env.VITE_SUPABASE_URL
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!url || !key) {
          return Response.json({ taken: [] })
        }
        const supabase = createClient(url, key)
        const today = new Date().toISOString().slice(0, 10)
        const { data, error } = await supabase
          .from('bookings')
          .select('date_str,time_str')
          .eq('status', 'confirmed')
          .gte('date_str', today)
        if (error) {
          return Response.json({ taken: [] })
        }
        return Response.json({
          taken: (data ?? []).map((b: any) => `${b.date_str}|${b.time_str}`),
        })
      },
    },
  },
})
