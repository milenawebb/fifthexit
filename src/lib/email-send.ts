// Server-side transactional email sender.
// Sends through Resend using the API key + verified sender domain that matches
// the market the email belongs to:
//   fifthexit.com / EN → RESEND_API_KEY_COM, notify@fifthexit.com
//   fifthexit.eu  / BG → RESEND_API_KEY_EU,  notify@fifthexit.eu
// Intentionally server-only; never import from client code.
import * as React from 'react'
import { render as renderAsync } from '@react-email/components'
import type { SupabaseClient } from '@supabase/supabase-js'
import { TEMPLATES } from './email-templates/registry'

const SENDER_NAME = 'fifthexit'

export type Market = 'com' | 'eu'

/** Resolve the market from a booking locale (bg → eu, else com). */
export function marketForLocale(locale?: string | null): Market {
  return locale?.toLowerCase().startsWith('bg') ? 'eu' : 'com'
}

/** Resolve the market from a request host, falling back to the locale. */
export function marketForRequest(host?: string | null, locale?: string | null): Market {
  const h = (host ?? '').toLowerCase()
  if (h.includes('fifthexit.eu')) return 'eu'
  if (h.includes('fifthexit.com')) return 'com'
  return marketForLocale(locale)
}

function senderConfig(market: Market): { apiKey?: string; from: string } {
  if (market === 'eu') {
    return {
      apiKey: process.env['RESEND_API_KEY_EU'],
      from: `${SENDER_NAME} <notify@fifthexit.eu>`,
    }
  }
  return {
    apiKey: process.env['RESEND_API_KEY_COM'],
    from: `${SENDER_NAME} <notify@fifthexit.com>`,
  }
}

function redactEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***'
  return `${local[0]}***@${domain}`
}

export interface SendArgs {
  templateName: string
  /** Optional override; otherwise template.to is used. */
  to?: string
  props: Record<string, any>
  replyTo?: string
  /** Market selector — pass the booking locale, or a resolved market. */
  locale?: string | null
  market?: Market
}

export async function sendTransactional(
  supabase: SupabaseClient,
  { templateName, to, props, replyTo, locale, market }: SendArgs,
): Promise<{ ok: boolean; error?: string }> {
  const template = TEMPLATES[templateName]
  if (!template) return { ok: false, error: `Unknown template: ${templateName}` }
  const recipient = to ?? template.to
  if (!recipient) return { ok: false, error: 'No recipient' }

  const resolvedMarket = market ?? marketForLocale(locale ?? props['locale'])
  const { apiKey, from } = senderConfig(resolvedMarket)
  if (!apiKey) {
    console.error(`Missing Resend API key for market ${resolvedMarket}`)
    return { ok: false, error: 'Email sending is not configured' }
  }

  const messageId = crypto.randomUUID()

  // Suppression check (fail-closed on error)
  const { data: suppressed, error: suppressionError } = await supabase
    .from('suppressed_emails')
    .select('id')
    .eq('email', recipient.toLowerCase())
    .maybeSingle()
  if (suppressionError) {
    console.error('Suppression check failed — refusing to send', suppressionError)
    return { ok: false, error: 'Failed to verify suppression status' }
  }
  if (suppressed) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'suppressed',
    })
    return { ok: false, error: 'email_suppressed' }
  }

  const element = React.createElement(template.component, props)
  const html = await renderAsync(element)
  const text = await renderAsync(element, { plainText: true })
  const subject =
    typeof template.subject === 'function' ? template.subject(props) : template.subject

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject,
      html,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
      headers: { 'X-Entity-Ref-ID': messageId },
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error(`Resend send failed [${response.status}]`, {
      templateName,
      market: resolvedMarket,
      recipient: redactEmail(recipient),
      errorBody,
    })
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: recipient,
      status: 'failed',
      error_message: `Resend ${response.status}: ${errorBody.slice(0, 400)}`,
    })
    return { ok: false, error: `Provider request failed [${response.status}]: ${errorBody}` }
  }

  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: recipient,
    status: 'sent',
  })

  console.log('Transactional email sent', {
    templateName,
    market: resolvedMarket,
    from,
    recipient: redactEmail(recipient),
  })

  return { ok: true }
}
