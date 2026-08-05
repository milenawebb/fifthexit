// Internal notification recipient, resolved per market.
// BG market (fifthexit.eu) → info@fifthexit.eu; US market (fifthexit.com) → info@fifthexit.com
export const INFO_EMAIL_US = 'info@fifthexit.com'
export const INFO_EMAIL_BG = 'info@fifthexit.eu'

export function devEmailForLocale(locale?: string | null): string {
  return locale?.toLowerCase().startsWith('bg') ? INFO_EMAIL_BG : INFO_EMAIL_US
}
