import { Heading, Link, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { EmailShell, SITE_NAME, isBgLocale, styles } from './branding'
import { WHEREBY_URL as VIDEO_CALL_URL } from '@/lib/site-url'

interface Props {
  name?: string
  date?: string
  time?: string
  formattedDateTime?: string
  locale?: string
  siteUrl?: string
}

const Email = ({ name, date, time, formattedDateTime, locale, siteUrl }: Props) => {
  const bg = isBgLocale(locale) || (siteUrl ?? '').includes('fifthexit.eu')
  const when = formattedDateTime || [date, time].filter(Boolean).join(bg ? ' в ' : ' at ')
  return (
    <EmailShell
      preview={
        bg
          ? `Напомняне: разговорът ви с ${SITE_NAME} е утре`
          : `Reminder: Your ${SITE_NAME} call is tomorrow`
      }
      locale={locale}
      siteUrl={siteUrl}
      signOff={
        bg ? `До скоро! Екипът на ${SITE_NAME}` : `See you then! — The ${SITE_NAME} team`
      }
    >
      <Heading style={styles.h1}>
        {bg ? `Здравейте${name ? `, ${name}` : ''},` : `Hi${name ? ` ${name}` : ''},`}
      </Heading>
      <Text style={styles.lead}>
        {bg
          ? `Напомняме ви, че безплатният ви разговор с ${SITE_NAME} е утре${when ? ` — ${when}` : ''}.`
          : `Just a reminder that your free discovery call with ${SITE_NAME} is tomorrow${when ? ` — ${when}` : ''}.`}
      </Text>
      <Section style={styles.card}>
        <Text style={styles.body}>
          <strong>{bg ? 'Присъединете се тук:' : 'Join here:'}</strong>{' '}
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
    isBgLocale(data?.locale)
      ? `Напомняне: разговорът ви с ${SITE_NAME} е утре`
      : `Reminder: Your ${SITE_NAME} call is tomorrow`,
  displayName: 'Booking reminder — 24 hours',
  previewData: {
    name: 'Alex',
    locale: 'en',
    siteUrl: 'https://fifthexit.com',
    formattedDateTime: 'Friday, May 15, 2026 at 5:30 PM EEST (your local time)',
  },
} satisfies TemplateEntry
