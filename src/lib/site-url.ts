// Single static meeting room used for every booking.
export const WHEREBY_URL = 'https://whereby.com/fifthexit'

export const SITE_URL_US = 'https://fifthexit.com'
export const SITE_URL_BG = 'https://fifthexit.eu'

/** Market site origin, resolved from the booking locale (bg → .eu, else .com). */
export function siteUrlForLocale(locale?: string | null): string {
  return locale?.toLowerCase().startsWith('bg') ? SITE_URL_BG : SITE_URL_US
}

/** Prefer the request host when it is one of our known domains. */
export function siteUrlForRequest(host?: string | null, locale?: string | null): string {
  const h = (host ?? '').toLowerCase()
  if (h.includes('fifthexit.eu')) return SITE_URL_BG
  if (h.includes('fifthexit.com')) return SITE_URL_US
  return siteUrlForLocale(locale)
}
