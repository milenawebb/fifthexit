// Server-side helpers that turn a booking's (date_str, time_str in America/New_York)
// into human-readable strings for emails.
// - Dev emails always show EST/EDT.
// - Client emails show their local timezone; falls back to "EDT / UTC" when missing.

import { BOOKING_TZ, localToUtc } from './timezone'

function partsToString(parts: Intl.DateTimeFormatPart[]): string {
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const weekday = get('weekday')
  const month = get('month')
  const day = get('day')
  const year = get('year')
  const hour = get('hour')
  const minute = get('minute')
  const dayPeriod = get('dayPeriod')
  const tzName = get('timeZoneName')
  const time = dayPeriod ? `${hour}:${minute} ${dayPeriod}` : `${hour}:${minute}`
  return `${weekday}, ${month} ${day}, ${year} at ${time}${tzName ? ' ' + tzName : ''}`
}

function formatInZone(
  utc: Date,
  tz: string,
  langTag: string,
  hour12: boolean,
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
    timeZoneName: 'short',
  })
  return partsToString(dtf.formatToParts(utc))
}

/** EST/EDT-formatted string for internal emails. Always English. */
export function formatForDev(dateStr: string, timeStr: string): string {
  const utc = localToUtc(dateStr, timeStr, BOOKING_TZ)
  return formatInZone(utc, BOOKING_TZ, 'en-US', true)
}

/**
 * Client-facing formatted string.
 * - If clientTz provided: "<...> at <time> <ABBR> (your local time)"
 * - Otherwise: "<EST/EDT string> / <UTC string>"
 */
export function formatForClient(
  dateStr: string,
  timeStr: string,
  clientTz: string | null | undefined,
  locale: string | null | undefined,
): string {
  const lang = (locale ?? '').toLowerCase().startsWith('bg') ? 'bg-BG' : 'en-US'
  const hour12 = lang === 'en-US'
  const utc = localToUtc(dateStr, timeStr, BOOKING_TZ)

  if (clientTz) {
    try {
      const local = formatInZone(utc, clientTz, lang, hour12)
      const suffix = lang === 'bg-BG' ? ' (вашето местно време)' : ' (your local time)'
      return `${local}${suffix}`
    } catch {
      // fall through to fallback
    }
  }

  const est = formatInZone(utc, BOOKING_TZ, lang, hour12)
  const utcStr = formatInZone(utc, 'UTC', lang, hour12)
  return `${est} / ${utcStr}`
}
