// Helpers for generating "Add to Calendar" links (Google web URL + .ics file).
import { localToUtc, addMinutesToTime } from './timezone'

const WHEREBY_URL =
  'https://hypestreet.whereby.com/hype-street0c1316cb-680e-4731-b13f-3ec46f6e34f0'

export const EVENT_TITLE = 'Discovery Call with fifthexit'
export const EVENT_LOCATION = WHEREBY_URL
export const EVENT_DESCRIPTION = `Your free discovery call with fifthexit. Join here: ${WHEREBY_URL}`
export const EVENT_DURATION_MIN = 30

function toUtcStamp(d: Date): string {
  // YYYYMMDDTHHMMSSZ
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  )
}

function eventBounds(date: string, time: string) {
  const start = localToUtc(date, time)
  const end = localToUtc(date, addMinutesToTime(time, EVENT_DURATION_MIN))
  return { start, end }
}

export function googleCalendarUrl(date: string, time: string): string {
  const { start, end } = eventBounds(date, time)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT_TITLE,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: EVENT_DESCRIPTION,
    location: EVENT_LOCATION,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function icsEscape(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

export function buildIcs(date: string, time: string, uid: string): string {
  const { start, end } = eventBounds(date, time)
  const stamp = toUtcStamp(new Date())
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//fifthexit//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}@hype-street.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${icsEscape(EVENT_TITLE)}`,
    `DESCRIPTION:${icsEscape(EVENT_DESCRIPTION)}`,
    `LOCATION:${icsEscape(EVENT_LOCATION)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}
