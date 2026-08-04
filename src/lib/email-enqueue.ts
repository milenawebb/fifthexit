// Server-side helper to enqueue a transactional email through the existing
// pgmq queue + email send log infrastructure. Intentionally tiny; do not
// import from client code.
import * as React from 'react'
import { render as renderAsync } from '@react-email/components'
import type { SupabaseClient } from '@supabase/supabase-js'
import { TEMPLATES } from './email-templates/registry'

const SITE_NAME = 'fifthexit'
const FROM_DOMAIN = 'notify.hype-street.com'
const SENDER_DOMAIN = 'notify.hype-street.com'

function genTokenHex(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function getOrCreateUnsubToken(
  supabase: SupabaseClient,
  email: string,
): Promise<string | undefined> {
  const normalized = email.toLowerCase()
  const { data: existing } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalized)
    .maybeSingle()
  if (existing?.token && !existing.used_at) return existing.token
  if (existing) return existing.token
  const newToken = genTokenHex()
  await supabase
    .from('email_unsubscribe_tokens')
    .upsert(
      { token: newToken, email: normalized },
      { onConflict: 'email', ignoreDuplicates: true },
    )
  const { data: stored } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token')
    .eq('email', normalized)
    .maybeSingle()
  return stored?.token ?? newToken
}

export interface EnqueueArgs {
  templateName: string
  /** Optional override; otherwise template.to (if set) or `to` is used. */
  to?: string
  props: Record<string, any>
  replyTo?: string
}

export async function enqueueTransactional(
  supabase: SupabaseClient,
  { templateName, to, props, replyTo }: EnqueueArgs,
): Promise<{ ok: boolean; error?: string }> {
  const template = TEMPLATES[templateName]
  if (!template) return { ok: false, error: `Unknown template: ${templateName}` }
  const recipient = template.to ?? to
  if (!recipient) return { ok: false, error: 'No recipient' }

  const element = React.createElement(template.component, props)
  const html = await renderAsync(element)
  const text = await renderAsync(element, { plainText: true })
  const subject =
    typeof template.subject === 'function' ? template.subject(props) : template.subject
  const messageId = crypto.randomUUID()
  const unsubscribeToken = await getOrCreateUnsubToken(supabase, recipient)

  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: recipient,
    status: 'pending',
  })

  const { error } = await supabase.rpc('enqueue_email', {
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
      label: templateName,
      idempotency_key: messageId,
      unsubscribe_token: unsubscribeToken,
      reply_to: replyTo,
      queued_at: new Date().toISOString(),
    },
  })

  if (error) {
    console.error(`Failed to enqueue ${templateName}`, error)
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    return { ok: false, error: error.message }
  }

  return { ok: true }
}
