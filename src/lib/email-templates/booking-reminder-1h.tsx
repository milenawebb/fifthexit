import { Body, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'hype/street'
const VIDEO_CALL_URL =
  'https://hypestreet.whereby.com/hype-street0c1316cb-680e-4731-b13f-3ec46f6e34f0'

interface Props {
  name?: string
  time?: string
  forDev?: boolean
}

const Email = ({ name, time, forDev }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} call starts in 1 hour</Preview>
    <Body style={main}>
      <Container style={container}>
        {forDev ? (
          <>
            <Heading style={h1}>Heads up — call in 1 hour</Heading>
            <Text style={lead}>
              Your call with {name || 'a client'} starts in 1 hour
              {time ? ` at ${time}` : ''}.
            </Text>
            <Text style={lead}>
              Join here: <Link href={VIDEO_CALL_URL} style={link}>{VIDEO_CALL_URL}</Link>
            </Text>
          </>
        ) : (
          <>
            <Heading style={h1}>Hi{name ? ` ${name}` : ''},</Heading>
            <Text style={lead}>
              Your call with {SITE_NAME} starts in 1 hour{time ? ` at ${time}` : ''}.
            </Text>
            <Text style={lead}>
              Click here to join: <Link href={VIDEO_CALL_URL} style={link}>{VIDEO_CALL_URL}</Link>
            </Text>
            <Text style={footer}>See you soon!<br />— The {SITE_NAME} team</Text>
          </>
        )}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: `Your ${SITE_NAME} call starts in 1 hour`,
  displayName: 'Booking reminder — 1 hour',
  previewData: { name: 'Alex', time: '14:00', forDev: false },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '20px', fontWeight: 'bold', color: '#0d0b1a', margin: '0 0 12px' }
const lead = { fontSize: '14px', color: '#0d0b1a', lineHeight: '1.6', margin: '0 0 16px' }
const link = { color: '#7b78f5', textDecoration: 'underline', wordBreak: 'break-all' as const }
const footer = { fontSize: '13px', color: '#55575d', margin: '24px 0 0', lineHeight: '1.6' }
