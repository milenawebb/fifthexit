import * as React from 'react'
import { render as renderAsync } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'hype/street'
const SENDER_DOMAIN = 'notify.hype-street.com'
const FROM_DOMAIN = 'notify.hype-street.com'
const TEMPLATE_NAME = 'booking-notification'

const BookingSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  date: z.string().trim().min(1).max(40),
  time: z.string().trim().min(1).max(20),
  message: z.string().trim().min(1).max(2000),
  locale: z.string().trim().min(1).max(10).optional(),
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
          const body = await request.json()
          payload = BookingSchema.parse(body)
        } catch (err) {
          return Response.json(
            { error: 'Invalid request', details: err instanceof Error ? err.message : 'parse error' },
            { status: 400 },
          )
        }

        const template = TEMPLATES[TEMPLATE_NAME]
        if (!template?.to) {
          return Response.json({ error: 'Template misconfigured' }, { status: 500 })
        }

        const recipient = template.to
        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const messageId = crypto.randomUUID()

        const element = React.createElement(template.component, payload)
        const html = await renderAsync(element)
        const text = await renderAsync(element, { plainText: true })
        const subject =
          typeof template.subject === 'function' ? template.subject(payload) : template.subject

        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
          recipient_email: recipient,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: recipient,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html,
            text,
            purpose: 'transactional',
            label: TEMPLATE_NAME,
            idempotency_key: messageId,
            reply_to: payload.email,
            queued_at: new Date().toISOString(),
          },
        })

        if (enqueueError) {
          console.error('Failed to enqueue booking notification', enqueueError)
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: recipient,
            status: 'failed',
            error_message: 'Failed to enqueue email',
          })
          return Response.json({ error: 'Failed to enqueue email' }, { status: 500 })
        }

        return Response.json({ success: true })
      },
    },
  },
})
