import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'fifthexit'

interface QuickQuestionProps {
  name?: string
  email?: string
  message?: string
  locale?: string
}

const QuickQuestionEmail = ({ name, email, message, locale }: QuickQuestionProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Quick question from {name || 'visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New quick question</Heading>
        <Text style={lead}>A visitor sent a message through the contact form.</Text>

        <Section style={card}>
          <div style={rowStyle}>
            <Text style={label}>Name</Text>
            <Text style={body}>{name || '—'}</Text>
          </div>
          <div style={rowStyle}>
            <Text style={label}>Email</Text>
            <Text style={body}>{email || '—'}</Text>
          </div>
          {locale ? (
            <div style={rowStyle}>
              <Text style={label}>Locale</Text>
              <Text style={body}>{locale}</Text>
            </div>
          ) : null}
          <div style={rowStyle}>
            <Text style={label}>Message</Text>
            <Text style={body}>{message || '—'}</Text>
          </div>
        </Section>

        <Text style={footer}>Sent automatically by {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: QuickQuestionEmail,
  subject: (data: Record<string, any>) =>
    `Quick question from ${data?.name || 'visitor'}`,
  displayName: 'Quick question (internal)',
  to: 'info@fifthexit.com',
  previewData: {
    name: 'Alex Doe',
    email: 'alex@brand.com',
    message: 'Hey, do you build Shopify sites?',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0d0b1a', margin: '0 0 12px' }
const lead = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 20px' }
const card = {
  background: '#f7f7fb',
  borderRadius: '12px',
  padding: '16px 18px',
  margin: '0 0 16px',
}
const rowStyle = { marginBottom: '10px' }
const label = {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#7b78f5',
  margin: '0 0 2px',
  fontWeight: 700,
}
const body = { fontSize: '14px', color: '#0d0b1a', margin: 0, lineHeight: '1.5', whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0' }
