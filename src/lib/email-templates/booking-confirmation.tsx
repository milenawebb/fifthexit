import { Heading, Link, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { EmailShell, SITE_NAME, isBgLocale, styles } from './branding'
import { WHEREBY_URL as VIDEO_CALL_URL } from '@/lib/site-url'

interface BookingConfirmationProps {
  name?: string
  date?: string
  time?: string
  formattedDateTime?: string
  locale?: string
  rescheduleUrl?: string
  cancelUrl?: string
  googleCalendarUrl?: string
  icsUrl?: string
  siteUrl?: string
}

const BookingConfirmationEmail = ({
  name,
  date,
  time,
  formattedDateTime,
  locale,
  rescheduleUrl,
  cancelUrl,
  googleCalendarUrl,
  icsUrl,
  siteUrl,
}: BookingConfirmationProps) => {
  const bg = isBgLocale(locale) || (siteUrl ?? '').includes('fifthexit.eu')
  const addToCalendarLabel = bg ? 'Добави в календара' : 'Add to Calendar'
  const icsLabel = bg ? 'Изтегли .ics (Apple/Outlook)' : 'Download .ics (Apple / Outlook)'
  const whenLine = formattedDateTime || [date, time].filter(Boolean).join(bg ? ' в ' : ' at ')
  return (
    <EmailShell
      preview={
        bg
          ? `Вашата консултация с ${SITE_NAME} е потвърдена`
          : `Your consult with ${SITE_NAME} is booked`
      }
      locale={locale}
      siteUrl={siteUrl}
      signOff={bg ? `Поздрави, екипът на ${SITE_NAME}` : `The ${SITE_NAME} team`}
    >
      <Heading style={styles.h1}>
        {bg
          ? `Здравейте${name ? `, ${name}` : ''},`
          : name
            ? `Thanks, ${name}!`
            : 'Thanks for booking!'}
      </Heading>
      <Text style={styles.lead}>
        {bg
          ? `Вашият безплатен разговор с ${SITE_NAME} е потвърден${whenLine ? ` — ${whenLine}` : ''}.`
          : `Your consult with ${SITE_NAME} is confirmed.`}
      </Text>
      <Section style={styles.card}>
        {!bg && whenLine ? (
          <Text style={styles.body}>
            <strong>When:</strong> {whenLine}
          </Text>
        ) : null}
        <Text style={styles.body}>
          <strong>{bg ? 'Присъединете се към разговора тук:' : 'Join the call here:'}</strong>{' '}
          <Link href={VIDEO_CALL_URL} style={styles.link}>
            {VIDEO_CALL_URL}
          </Link>
        </Text>
        {googleCalendarUrl ? (
          <Section style={{ textAlign: 'center', margin: '16px 0 4px' }}>
            <Link href={googleCalendarUrl} style={styles.ctaButton}>
              {addToCalendarLabel}
            </Link>
          </Section>
        ) : null}
        {icsUrl ? (
          <Text style={styles.small}>
            <Link href={icsUrl} style={styles.link}>
              {icsLabel}
            </Link>
          </Text>
        ) : null}
      </Section>
      {rescheduleUrl || cancelUrl ? (
        <Text style={styles.actions}>
          {rescheduleUrl ? (
            <Link href={rescheduleUrl} style={styles.link}>
              {bg ? 'Промяна на часа' : 'Reschedule'}
            </Link>
          ) : null}
          {rescheduleUrl && cancelUrl ? <span style={styles.sep}> · </span> : null}
          {cancelUrl ? (
            <Link href={cancelUrl} style={styles.link}>
              {bg ? 'Отказ на резервацията' : 'Cancel this booking'}
            </Link>
          ) : null}
        </Text>
      ) : null}
    </EmailShell>
  )
}

export const template = {
  component: BookingConfirmationEmail,
  subject: (data: Record<string, any>) =>
    isBgLocale(data?.locale)
      ? `Вашата консултация с ${SITE_NAME} е потвърдена`
      : `Your consult with ${SITE_NAME} is booked`,
  displayName: 'Booking confirmation (client)',
  previewData: {
    name: 'Alex',
    date: 'Mon, Jan 15',
    time: '14:00',
    locale: 'en',
    rescheduleUrl: 'https://fifthexit.com/reschedule/abc123',
    cancelUrl: 'https://fifthexit.com/cancel/abc123',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE',
    icsUrl: 'https://fifthexit.com/api/public/booking-ics/abc123',
    siteUrl: 'https://fifthexit.com',
  },
} satisfies TemplateEntry
