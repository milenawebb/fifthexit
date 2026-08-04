// Internal notification recipient, resolved per market.
// BG market (fifthexit.eu) → dev@fifthexit.eu; US market (fifthexit.com) → dev@fifthexit.com
export const DEV_EMAIL_US = 'dev@fifthexit.com'
export const DEV_EMAIL_BG = 'dev@fifthexit.eu'

export function devEmailForLocale(locale?: string | null): string {
  return locale?.toLowerCase().startsWith('bg') ? DEV_EMAIL_BG : DEV_EMAIL_US
}
