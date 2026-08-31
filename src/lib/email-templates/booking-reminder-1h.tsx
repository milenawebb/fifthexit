import { Heading, Link, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { EmailShell, SITE_NAME, isBgLocale, styles } from './branding'
import { WHEREBY_URL as VIDEO_CALL_URL } from '@/lib/site-url'

interface Props {
  name?: string
  time?: string
  formattedDateTime?: string
  forDev?: boolean
  locale?: string
  siteUrl?: string
}

const Email = ({ name, time, formattedDateTime, forDev, locale, siteUrl }: Props) => {
  const bg = !forDev && (isBgLocale(locale) || (siteUrl ?? '').includes('fifthexit.eu'))
  const when = formattedDateTime || time || ''
  if (forDev) {
    return (
      <EmailShell preview={`Call in 1 hour — ${name || 'client'}`} locale="en" siteUrl={siteUrl}>
        <Heading style={styles.h1}>Heads up — call in 1 hour</Heading>
        <Text style={styles.lead}>
          Your call with {name || 'a client'} starts in 1 hour{when ? ` — ${when}` : ''}.
        </Text>
        <Section style={styles.card}>
          <Text style={styles.body}>
            <strong>Join here:</strong>{' '}
            <Link href={VIDEO_CALL_URL} style={styles.link}>
              {VIDEO_CALL_URL}
            </Link>
          </Text>
        </Section>
      </EmailShell>
    )
  }
  return (
    <EmailShell
      preview={
        bg
          ? `Разговорът ви с ${SITE_NAME} започва след 1 час`
          : `Your ${SITE_NAME} call starts in 1 hour`
      }
      locale={locale}
      siteUrl={siteUrl}
      signOff={bg ? `До скоро! Екипът на ${SITE_NAME}` : `See you soon! The ${SITE_NAME} team`}
    >
      <Heading style={styles.h1}>
        {bg ? `Здравейте${name ? `, ${name}` : ''},` : `Hi${name ? ` ${name}` : ''},`}
      </Heading>
      <Text style={styles.lead}>
        {bg
          ? `Разговорът ви с ${SITE_NAME} започва след 1 час${when ? ` — ${when}` : ''}.`
          : `Your call with ${SITE_NAME} starts in 1 hour${when ? ` — ${when}` : ''}.`}
      </Text>
      <Section style={styles.card}>
        <Text style={styles.body}>
          <strong>{bg ? 'Натиснете тук, за да се присъедините:' : 'Click here to join:'}</strong>{' '}
          <Link href={VIDEO_CALL_URL} style={styles.link}>
            {VIDEO_CALL_URL}
          </Link>
        </Text>
      </Section>
    </EmailShell>
  )
}

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    !data?.forDev && isBgLocale(data?.locale)
      ? `Разговорът ви с ${SITE_NAME} започва след 1 час`
      : `Your ${SITE_NAME} call starts in 1 hour`,
  displayName: 'Booking reminder — 1 hour',
  previewData: {
    name: 'Alex',
    locale: 'en',
    siteUrl: 'https://fifthexit.com',
    formattedDateTime: 'Friday, May 15, 2026 at 5:30 PM EEST (your local time)',
    forDev: false,
  },
} satisfies TemplateEntry
