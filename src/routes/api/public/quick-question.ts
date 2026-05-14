import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { enqueueTransactional } from '@/lib/email-enqueue'

const QuickQuestionSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(1).max(2000),
  locale: z.string().trim().min(1).max(10).optional(),
})

export const Route = createFileRoute('/api/public/quick-question')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let payload: z.infer<typeof QuickQuestionSchema>
        try {
          payload = QuickQuestionSchema.parse(await request.json())
        } catch (err) {
          return Response.json(
            { error: 'Invalid request', details: err instanceof Error ? err.message : 'parse error' },
            { status: 400 },
          )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const result = await enqueueTransactional(supabase, {
          templateName: 'quick-question',
          props: {
            name: payload.name,
            email: payload.email,
            message: payload.message,
            locale: payload.locale,
          },
          replyTo: payload.email,
        })

        if (!result.ok) {
          return Response.json({ error: result.error ?? 'Failed to send' }, { status: 500 })
        }

        return Response.json({ ok: true })
      },
    },
  },
})
