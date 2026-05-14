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

const SITE_NAME = 'hype/street'
const SITE_URL = 'www.hype-street.com'
const VIDEO_CALL_URL =
  'https://hypestreet.whereby.com/hype-street0c1316cb-680e-4731-b13f-3ec46f6e34f0'

interface BookingConfirmationProps {
  name?: string
  date?: string
  time?: string
  locale?: string
  rescheduleUrl?: string
  cancelUrl?: string
}

const isBg = (locale?: string) => (locale ?? '').toLowerCase().startsWith('bg')

const BookingConfirmationEmail = ({
  name,
  date,
  time,
  locale,
  rescheduleUrl,
  cancelUrl,
}: BookingConfirmationProps) => {
  const bg = isBg(locale)
  return (
    <Html lang={bg ? 'bg' : 'en'} dir="ltr">
      <Head />
      <Preview>
        {bg
          ? `Вашата консултация с ${SITE_NAME} е потвърдена`
          : `Your consult with ${SITE_NAME} is booked`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {bg ? (
            <>
              <Heading style={h1}>Здравейте{name ? `, ${name}` : ''},</Heading>
              <Text style={lead}>
                Вашият безплатен разговор с {SITE_NAME} е потвърден
                {date ? ` за ${date}` : ''}
                {time ? ` в ${time}` : ''}.
              </Text>
              <Section style={card}>
                <Text style={body}>
                  <strong>Присъединете се към разговора тук:</strong>{' '}
                  <Link href={VIDEO_CALL_URL} style={link}>{VIDEO_CALL_URL}</Link>
                </Text>
              </Section>
              {(rescheduleUrl || cancelUrl) && (
                <Text style={actions}>
                  {rescheduleUrl ? (
                    <Link href={rescheduleUrl} style={link}>Промяна на часа</Link>
                  ) : null}
                  {rescheduleUrl && cancelUrl ? <span style={sep}> · </span> : null}
                  {cancelUrl ? (
                    <Link href={cancelUrl} style={link}>Отказ на резервацията</Link>
                  ) : null}
                </Text>
              )}
              <Text style={lead}>Ще се свържем с вас скоро за потвърждение.</Text>
              <Text style={footer}>
                Поздрави,<br />
                Екипът на {SITE_NAME}<br />
                <Link href={`https://${SITE_URL}`} style={link}>{SITE_URL}</Link>
              </Text>
            </>
          ) : (
            <>
              <Heading style={h1}>{name ? `Thanks, ${name}!` : 'Thanks for booking!'}</Heading>
              <Text style={lead}>
                Your consult with {SITE_NAME} is booked. We'll confirm within 2 hours.
              </Text>
              <Section style={card}>
                {date ? <Text style={body}><strong>Date:</strong> {date}</Text> : null}
                {time ? <Text style={body}><strong>Time:</strong> {time}</Text> : null}
                <Text style={body}>
                  <strong>Join the call here:</strong>{' '}
                  <Link href={VIDEO_CALL_URL} style={link}>{VIDEO_CALL_URL}</Link>
                </Text>
              </Section>
              {(rescheduleUrl || cancelUrl) && (
                <Text style={actions}>
                  {rescheduleUrl ? (
                    <Link href={rescheduleUrl} style={link}>Reschedule</Link>
                  ) : null}
                  {rescheduleUrl && cancelUrl ? <span style={sep}> · </span> : null}
                  {cancelUrl ? (
                    <Link href={cancelUrl} style={link}>Cancel this booking</Link>
                  ) : null}
                </Text>
              )}
              <Text style={footer}>— The {SITE_NAME} team</Text>
            </>
          )}
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: BookingConfirmationEmail,
  subject: (data: Record<string, any>) =>
    isBg(data?.locale)
      ? `Вашата консултация с ${SITE_NAME} е потвърдена`
      : `Your consult with ${SITE_NAME} is booked`,
  displayName: 'Booking confirmation (client)',
  previewData: {
    name: 'Alex',
    date: 'Mon, Jan 15',
    time: '14:00',
    locale: 'en',
    rescheduleUrl: 'https://hype-street.com/reschedule/abc123',
    cancelUrl: 'https://hype-street.com/cancel/abc123',
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
const body = { fontSize: '14px', color: '#0d0b1a', margin: '0 0 8px', lineHeight: '1.5' }
const link = { color: '#7b78f5', textDecoration: 'underline', wordBreak: 'break-all' as const }
const actions = { fontSize: '13px', color: '#55575d', margin: '0 0 20px', lineHeight: '1.5' }
const sep = { color: '#999' }
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0', lineHeight: '1.6' }
