import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'fifthexit'
const WHEREBY_URL =
  'https://hypestreet.whereby.com/hype-street0c1316cb-680e-4731-b13f-3ec46f6e34f0'

interface EstimatorSelections {
  projectType?: string
  design?: string
  features?: string[]
  timeline?: string
  estimatedPrice?: string
}

interface BookingNotificationProps {
  name?: string
  email?: string
  date?: string
  time?: string
  formattedDateTime?: string
  message?: string
  estimator?: EstimatorSelections
  googleCalendarUrl?: string
  icsUrl?: string
}

const BookingNotificationEmail = ({
  name,
  email,
  date,
  time,
  formattedDateTime,
  message,
  estimator,
  googleCalendarUrl,
  icsUrl,
}: BookingNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New consult booking from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New booking request</Heading>
        <Text style={lead}>
          Someone just booked a consult on {SITE_NAME}.
        </Text>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          <Row label="When" value={formattedDateTime || [date, time].filter(Boolean).join(' at ')} />
        </Section>

        {message ? (
          <Section style={card}>
            <Text style={label}>Project details</Text>
            <Text style={body}>{message}</Text>
          </Section>
        ) : null}

        {estimator ? (
          <Section style={card}>
            <Text style={sectionHeading}>Estimator Selections</Text>
            <Row label="Project type" value={estimator.projectType} />
            <Row label="Design" value={estimator.design} />
            <Row
              label="Features"
              value={
                estimator.features && estimator.features.length > 0
                  ? estimator.features.join(', ')
                  : 'None selected'
              }
            />
            <Row label="Timeline" value={estimator.timeline} />
            <Row label="Estimated starting price" value={estimator.estimatedPrice} />
          </Section>
        ) : null}

        <Section style={card}>
          <Text style={label}>Join call</Text>
          <Text style={body}>
            <Link href={WHEREBY_URL} style={link}>{WHEREBY_URL}</Link>
          </Text>
          {googleCalendarUrl ? (
            <Section style={{ textAlign: 'center', margin: '14px 0 4px' }}>
              <Link href={googleCalendarUrl} style={ctaButton}>Add to Calendar</Link>
            </Section>
          ) : null}
          {icsUrl ? (
            <Text style={icsLine}>
              <Link href={icsUrl} style={link}>Download .ics (Apple / Outlook)</Link>
            </Text>
          ) : null}
        </Section>

        <Text style={footer}>Sent automatically by {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label: l, value }: { label: string; value?: string }) => (
  <div style={rowStyle}>
    <Text style={label}>{l}</Text>
    <Text style={body}>{value || '—'}</Text>
  </div>
)

export const template = {
  component: BookingNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New booking: ${data?.name || 'visitor'}${data?.date ? ` — ${data.date}` : ''}`,
  displayName: 'Booking notification (internal)',
  to: 'dev@fifthexit.com',
  previewData: {
    name: 'Alex Doe',
    email: 'alex@brand.com',
    date: 'Mon, Jan 15',
    time: '14:00',
    message: 'We need a new marketing site with booking + Stripe.',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE',
    icsUrl: 'https://fifthexit.com/api/public/booking-ics/abc123',
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
const body = { fontSize: '14px', color: '#0d0b1a', margin: 0, lineHeight: '1.5' }
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0' }
const sectionHeading = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#0d0b1a',
  margin: '0 0 10px',
  letterSpacing: '0.02em',
}
const link = { color: '#7b78f5', textDecoration: 'underline', wordBreak: 'break-all' as const }
const ctaButton = {
  display: 'inline-block',
  background: '#7b78f5',
  color: '#ffffff',
  padding: '11px 22px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
}
const icsLine = { fontSize: '12px', color: '#55575d', textAlign: 'center' as const, margin: '8px 0 0' }
