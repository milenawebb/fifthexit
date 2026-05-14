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

const SITE_NAME = 'hype/street'

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
  message?: string
  locale?: string
  estimator?: EstimatorSelections
}

const BookingNotificationEmail = ({
  name,
  email,
  date,
  time,
  message,
  locale,
  estimator,
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
          <Row label="Date" value={date} />
          <Row label="Time" value={time} />
          {locale ? <Row label="Locale" value={locale} /> : null}
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
  to: 'dev@hype-street.com',
  previewData: {
    name: 'Alex Doe',
    email: 'alex@brand.com',
    date: 'Mon, Jan 15',
    time: '14:00',
    message: 'We need a new marketing site with booking + Stripe.',
    locale: 'en',
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
