import { Heading, Link, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { EmailShell, SITE_NAME, isBgLocale, styles } from './branding'

interface Props {
  name?: string
  date?: string
  time?: string
  formattedDateTime?: string
  locale?: string
  siteUrl?: string
  bookingUrl?: string
}

const Email = ({ name, date, time, formattedDateTime, locale, siteUrl, bookingUrl }: Props) => {
  const bg = isBgLocale(locale) || (siteUrl ?? '').includes('fifthexit.eu')
  const when = formattedDateTime || [date, time].filter(Boolean).join(bg ? ' в ' : ' at ')
  const rebook = bookingUrl || `${siteUrl || 'https://fifthexit.com'}/#contact`
  return (
    <EmailShell
      preview={bg ? 'Резервацията ви е отказана' : 'Your booking has been cancelled'}
      locale={locale}
      siteUrl={siteUrl}
      signOff={bg ? `Поздрави, екипът на ${SITE_NAME}` : `— The ${SITE_NAME} team`}
    >
      <Heading style={styles.h1}>
        {bg ? 'Резервацията ви е отказана' : 'Your booking is cancelled'}
      </Heading>
      <Text style={styles.lead}>
        {bg
          ? `Здравейте${name ? `, ${name}` : ''} — разговорът ви с ${SITE_NAME}${when ? ` (${when})` : ''} беше отказан.`
          : `Hi${name ? ` ${name}` : ''} — your call with ${SITE_NAME}${when ? ` (${when})` : ''} has been cancelled.`}
      </Text>
      <Section style={styles.card}>
        <Text style={styles.body}>
          {bg
            ? 'Ако това е грешка или искате нов час, можете да резервирате отново по всяко време.'
            : 'If this was a mistake or you would like another slot, you can book again any time.'}
        </Text>
        <Section style={{ textAlign: 'center', margin: '16px 0 4px' }}>
          <Link href={rebook} style={styles.ctaButton}>
            {bg ? 'Резервирай нов час' : 'Book a new time'}
          </Link>
        </Section>
      </Section>
    </EmailShell>
  )
}

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    isBgLocale(data?.locale)
      ? `Резервацията ви с ${SITE_NAME} е отказана`
      : `Your ${SITE_NAME} booking is cancelled`,
  displayName: 'Booking cancellation (client)',
  previewData: {
    name: 'Alex',
    locale: 'en',
    siteUrl: 'https://fifthexit.com',
    formattedDateTime: 'Friday, May 15, 2026 at 5:30 PM EEST',
  },
} satisfies TemplateEntry
