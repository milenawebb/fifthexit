import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'fifthexit'

interface Props {
  name?: string
  email?: string
  date?: string
  time?: string
  formattedDateTime?: string
}

const Email = ({ name, email, date, time, formattedDateTime }: Props) => {
  const when = formattedDateTime || [date, time].filter(Boolean).join(' at ')
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{name || 'A client'} cancelled their call</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking cancelled</Heading>
          <Text style={lead}>
            {name || 'A client'} cancelled their call scheduled for {when || 'a previously booked slot'}.
          </Text>
          {email ? <Text style={lead}>Email: {email}</Text> : null}
          <Text style={footer}>The slot is free again.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Booking cancelled: ${data?.name || 'client'}${data?.date ? ` (${data.date})` : ''}`,
  displayName: 'Booking cancellation (internal)',
  to: 'info@fifthexit.com',
  previewData: { name: 'Alex', email: 'alex@brand.com', date: 'Mon, Jan 15', time: '14:00' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0d0b1a', margin: '0 0 12px' }
const lead = { fontSize: '14px', color: '#0d0b1a', lineHeight: '1.6', margin: '0 0 12px' }
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0' }
