// Server-side helpers that turn a booking's (date_str, time_str in America/New_York)
// into human-readable strings for emails.
// - Dev emails always show EST/EDT.
// - Client emails show their local timezone; falls back to "EDT / UTC" when missing.

import { BOOKING_TZ, localToUtc } from './timezone'

function partsToString(parts: Intl.DateTimeFormatPart[], sep: string): string {
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const weekday = get('weekday')
  const month = get('month')
  const day = get('day')
  const year = get('year')
  const hour = get('hour')
  const minute = get('minute')
  const dayPeriod = get('dayPeriod')
  const time = dayPeriod ? `${hour}:${minute} ${dayPeriod}` : `${hour}:${minute}`
  return `${weekday}, ${month} ${day}, ${year} ${sep} ${time}`
}

// Always return an English-style timezone abbreviation (e.g. "EDT", "EEST")
// regardless of the formatting locale. Some locales (e.g. bg-BG) render the
// short timezone as "Гринуич-4" which is not what users expect.
function tzAbbr(utc: Date, tz: string): string {
  const dtf = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
  const part = dtf.formatToParts(utc).find((p) => p.type === 'timeZoneName')
  return part?.value ?? ''
}

function formatInZone(
  utc: Date,
  tz: string,
  langTag: string,
  hour12: boolean,
  sep: string,
): string {
  const dtf = new Intl.DateTimeFormat(langTag, {
    timeZone: tz,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12,
  })
  const base = partsToString(dtf.formatToParts(utc), sep)
  const abbr = tzAbbr(utc, tz)
  return abbr ? `${base} ${abbr}` : base
}

/** EST/EDT-formatted string for internal emails. Always English. */
export function formatForDev(dateStr: string, timeStr: string): string {
  const utc = localToUtc(dateStr, timeStr, BOOKING_TZ)
  return formatInZone(utc, BOOKING_TZ, 'en-US', true, 'at')
}

/**
 * Client-facing formatted string.
 * - If clientTz provided: "<...> в/at <time> <ABBR> (your local time)"
 * - Otherwise: "<EST/EDT string> / <UTC string>"
 */
export function formatForClient(
  dateStr: string,
  timeStr: string,
  clientTz: string | null | undefined,
  locale: string | null | undefined,
): string {
  const isBg = (locale ?? '').toLowerCase().startsWith('bg')
  const lang = isBg ? 'bg-BG' : 'en-US'
  const hour12 = !isBg
  const sep = isBg ? 'в' : 'at'
  const utc = localToUtc(dateStr, timeStr, BOOKING_TZ)

  if (clientTz) {
    try {
      const local = formatInZone(utc, clientTz, lang, hour12, sep)
      const suffix = isBg ? ' (вашето местно време)' : ' (your local time)'
      return `${local}${suffix}`
    } catch {
      // fall through to fallback
    }
  }

  const est = formatInZone(utc, BOOKING_TZ, lang, hour12, sep)
  const utcStr = formatInZone(utc, 'UTC', lang, hour12, sep)
  return `${est} / ${utcStr}`
}
