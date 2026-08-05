import React from 'react'
import { Body, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import { SITE_URL_BG, SITE_URL_US } from '@/lib/site-url'
import { INFO_EMAIL_BG, INFO_EMAIL_US } from '@/lib/notify-recipient'

export const SITE_NAME = 'fifthexit'

/** Absolute logo URL — email clients cannot resolve relative paths. */
export const LOGO_URL_US = `${SITE_URL_US}/email/fifthexit-logo.png`
export const LOGO_URL_BG = `${SITE_URL_BG}/email/fifthexit-logo.png`

export const isBgLocale = (locale?: string | null) =>
  (locale ?? '').toLowerCase().startsWith('bg')

export interface MarketInfo {
  bg: boolean
  siteUrl: string
  siteHost: string
  logoUrl: string
  contactEmail: string
}

/**
 * Market-aware branding values. Prefers an explicit siteUrl (already resolved by
 * the caller from request host / booking locale), falls back to the locale.
 */
export function market(locale?: string | null, siteUrl?: string): MarketInfo {
  const bg = siteUrl ? siteUrl.includes('fifthexit.eu') : isBgLocale(locale)
  const url = siteUrl || (bg ? SITE_URL_BG : SITE_URL_US)
  return {
    bg,
    siteUrl: url,
    siteHost: url.replace(/^https?:\/\//, ''),
    logoUrl: bg ? LOGO_URL_BG : LOGO_URL_US,
    contactEmail: bg ? INFO_EMAIL_BG : INFO_EMAIL_US,
  }
}

export const colors = {
  page: '#08060f',
  surface: '#0d0b1a',
  card: '#171232',
  border: '#2a2350',
  text: '#f4f2ff',
  muted: '#a49fc4',
  faint: '#7a749c',
  accent: '#2fd0e8',
  pink: '#f857c8',
}

export const styles = {
  main: { backgroundColor: colors.page, fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: '0' },
  wrapper: { maxWidth: '600px', padding: '24px 12px', margin: '0 auto' },
  shell: {
    backgroundColor: colors.surface,
    borderRadius: '16px',
    border: `1px solid ${colors.border}`,
    overflow: 'hidden' as const,
  },
  accentBar: {
    height: '4px',
    lineHeight: '4px',
    fontSize: '0',
    background: 'linear-gradient(90deg, #f857c8 0%, #5b9cff 50%, #2fd0e8 100%)',
    backgroundColor: colors.accent,
  },
  header: { padding: '26px 28px 6px', textAlign: 'left' as const },
  content: { padding: '10px 28px 4px' },
  h1: { fontSize: '22px', fontWeight: 'bold', color: colors.text, margin: '0 0 12px', lineHeight: '1.3' },
  lead: { fontSize: '15px', color: colors.muted, lineHeight: '1.6', margin: '0 0 18px' },
  card: {
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '18px 20px',
    margin: '0 0 18px',
  },
  body: { fontSize: '14px', color: colors.text, margin: '0 0 10px', lineHeight: '1.6' },
  link: { color: colors.accent, textDecoration: 'underline', wordBreak: 'break-word' as const },
  actions: { fontSize: '13px', color: colors.faint, margin: '0 0 8px', lineHeight: '1.6' },
  sep: { color: colors.faint },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: '#5b9cff',
    background: 'linear-gradient(90deg, #f857c8 0%, #5b9cff 55%, #2fd0e8 100%)',
    color: '#08060f',
    padding: '12px 26px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  small: { fontSize: '12px', color: colors.faint, textAlign: 'center' as const, margin: '10px 0 0' },
  hr: { borderColor: colors.border, borderStyle: 'solid', borderWidth: '1px 0 0', margin: '22px 0 16px' },
  footer: { fontSize: '12px', color: colors.faint, lineHeight: '1.7', margin: '0 0 4px', padding: '0 28px 26px' },
}

interface ShellProps {
  preview: string
  locale?: string | null
  siteUrl?: string
  signOff?: string
  children: React.ReactNode
}

/** Branded dark-theme wrapper: logo header, gradient accent, market-aware footer. */
export const EmailShell = ({ preview, locale, siteUrl, signOff, children }: ShellProps) => {
  const m = market(locale, siteUrl)
  return (
    <Html lang={m.bg ? 'bg' : 'en'} dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.main}>
        <Container style={styles.wrapper}>
          <Section style={styles.shell}>
            <Section style={styles.accentBar} />
            <Section style={styles.header}>
              <Link href={m.siteUrl}>
                <Img
                  src={m.logoUrl}
                  width="150"
                  height="32"
                  alt={SITE_NAME}
                  style={{ display: 'block', border: 0, outline: 'none' }}
                />
              </Link>
            </Section>
            <Section style={styles.content}>{children}</Section>
            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              {signOff ? (
                <>
                  {signOff}
                  <br />
                </>
              ) : null}
              {m.bg ? 'Свържете се с нас: ' : 'Get in touch: '}
              <Link href={`mailto:${m.contactEmail}`} style={styles.link}>
                {m.contactEmail}
              </Link>
              <br />
              <Link href={m.siteUrl} style={styles.link}>
                {m.siteHost}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
