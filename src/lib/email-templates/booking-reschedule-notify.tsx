import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'fifthexit'

interface Props {
  name?: string
  email?: string
  oldDate?: string
  oldTime?: string
  newDate?: string
  newTime?: string
  oldFormatted?: string
  newFormatted?: string
}

const Email = ({ name, email, oldDate, oldTime, newDate, newTime, oldFormatted, newFormatted }: Props) => {
  const oldWhen = oldFormatted || [oldDate, oldTime].filter(Boolean).join(' at ')
  const newWhen = newFormatted || [newDate, newTime].filter(Boolean).join(' at ')
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{name || 'A client'} rescheduled their call</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking rescheduled</Heading>
          <Text style={lead}>
            {name || 'A client'} moved their call from {oldWhen || 'their original slot'} to {newWhen || 'a new slot'}.
          </Text>
          {email ? <Text style={lead}>Email: {email}</Text> : null}
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Booking rescheduled — ${data?.name || 'client'}`,
  displayName: 'Booking reschedule (internal)',
  to: 'dev@fifthexit.com',
  previewData: {
    name: 'Alex',
    email: 'alex@brand.com',
    oldDate: 'Mon, Jan 15',
    oldTime: '14:00',
    newDate: 'Wed, Jan 17',
    newTime: '10:00',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0d0b1a', margin: '0 0 12px' }
const lead = { fontSize: '14px', color: '#0d0b1a', lineHeight: '1.6', margin: '0 0 12px' }
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0' }
