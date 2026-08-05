import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { marketForRequest, sendTransactional } from '@/lib/email-send'

export const Route = createFileRoute('/lovable/email/transactional/send')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('Missing required environment variables')
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        // Verify the caller has a valid Supabase auth token.
        const authHeader = request.headers.get('Authorization')
        if (!authHeader?.startsWith('Bearer ')) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.slice('Bearer '.length).trim()
        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser(token)

        if (authError || !user) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        let templateName: string
        let recipientEmail: string | undefined
        let templateData: Record<string, any> = {}
        try {
          const body = await request.json()
          templateName = body.templateName || body.template_name
          recipientEmail = body.recipientEmail || body.recipient_email
          if (body.templateData && typeof body.templateData === 'object') {
            templateData = body.templateData
          }
        } catch {
          return Response.json({ error: 'Invalid JSON in request body' }, { status: 400 })
        }

        if (!templateName) {
          return Response.json({ error: 'templateName is required' }, { status: 400 })
        }

        const market = marketForRequest(
          request.headers.get('host'),
          templateData['locale'] as string | undefined,
        )

        const result = await sendTransactional(supabase, {
          templateName,
          to: recipientEmail,
          props: templateData,
          market,
        })

        if (!result.ok) {
          const status = result.error === 'email_suppressed' ? 200 : 500
          return Response.json({ success: false, reason: result.error }, { status })
        }

        return Response.json({ success: true })
      },
    },
  },
})
