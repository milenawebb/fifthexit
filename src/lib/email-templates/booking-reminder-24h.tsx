import { Body, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'fifthexit'
import { WHEREBY_URL as VIDEO_CALL_URL } from '@/lib/site-url'

interface Props {
  name?: string
  date?: string
  time?: string
  formattedDateTime?: string
  siteUrl?: string
}

const Email = ({ name, date, time, formattedDateTime, siteUrl = 'https://fifthexit.com' }: Props) => {
  const when = formattedDateTime || [date, time].filter(Boolean).join(' at ')
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reminder: Your {SITE_NAME} call is tomorrow</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hi{name ? ` ${name}` : ''},</Heading>
          <Text style={lead}>
            Just a reminder that your free discovery call with {SITE_NAME} is tomorrow
            {when ? ` — ${when}` : ''}.
          </Text>
          <Text style={lead}>
            Join here: <Link href={VIDEO_CALL_URL} style={link}>{VIDEO_CALL_URL}</Link>
          </Text>
          <Text style={footer}>See you then!<br />— The {SITE_NAME} team<br /><Link href={siteUrl} style={link}>{siteUrl.replace(/^https?:\/\//, '')}</Link></Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: `Reminder: Your ${SITE_NAME} call is tomorrow`,
  displayName: 'Booking reminder — 24 hours',
  previewData: { name: 'Alex', formattedDateTime: 'Friday, May 15, 2026 at 5:30 PM EEST (your local time)' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '20px', fontWeight: 'bold', color: '#0d0b1a', margin: '0 0 12px' }
const lead = { fontSize: '14px', color: '#0d0b1a', lineHeight: '1.6', margin: '0 0 16px' }
const link = { color: '#7b78f5', textDecoration: 'underline', wordBreak: 'break-all' as const }
const footer = { fontSize: '13px', color: '#55575d', margin: '24px 0 0', lineHeight: '1.6' }
