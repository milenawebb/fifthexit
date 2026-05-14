import { Body, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'hype/street'
const VIDEO_CALL_URL =
  'https://hypestreet.whereby.com/hype-street0c1316cb-680e-4731-b13f-3ec46f6e34f0'

interface Props {
  name?: string
  date?: string
  time?: string
}

const Email = ({ name, date, time }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reminder: Your {SITE_NAME} call is tomorrow</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Hi{name ? ` ${name}` : ''},</Heading>
        <Text style={lead}>
          Just a reminder that your free discovery call with {SITE_NAME} is tomorrow,
          {date ? ` ${date}` : ''}{time ? ` at ${time}` : ''}.
        </Text>
        <Text style={lead}>
          Join here: <Link href={VIDEO_CALL_URL} style={link}>{VIDEO_CALL_URL}</Link>
        </Text>
        <Text style={footer}>See you then!<br />— The {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: `Reminder: Your ${SITE_NAME} call is tomorrow`,
  displayName: 'Booking reminder — 24 hours',
  previewData: { name: 'Alex', date: 'Mon, Jan 15', time: '14:00' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '20px', fontWeight: 'bold', color: '#0d0b1a', margin: '0 0 12px' }
const lead = { fontSize: '14px', color: '#0d0b1a', lineHeight: '1.6', margin: '0 0 16px' }
const link = { color: '#7b78f5', textDecoration: 'underline', wordBreak: 'break-all' as const }
const footer = { fontSize: '13px', color: '#55575d', margin: '24px 0 0', lineHeight: '1.6' }
