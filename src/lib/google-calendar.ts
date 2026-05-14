// Google Calendar event helpers using the Lovable connector gateway.
// All events are created on the connected Google account's primary calendar.

import { BOOKING_TZ, addMinutesToTime, localToRfc3339 } from './timezone'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_calendar/calendar/v3'
const WHEREBY_URL =
  'https://hypestreet.whereby.com/hype-street0c1316cb-680e-4731-b13f-3ec46f6e34f0'
const DEV_EMAIL = 'dev@hype-street.com'

interface EventInput {
  name: string
  email: string
  message: string
  date: string
  time: string
  durationMinutes?: number
}

function authHeaders(): Record<string, string> {
  const lovableKey = process.env.LOVABLE_API_KEY
  const calKey = process.env.GOOGLE_CALENDAR_API_KEY
  if (!lovableKey) throw new Error('LOVABLE_API_KEY is not configured')
  if (!calKey) throw new Error('GOOGLE_CALENDAR_API_KEY is not configured')
  return {
    Authorization: `Bearer ${lovableKey}`,
    'X-Connection-Api-Key': calKey,
    'Content-Type': 'application/json',
  }
}

function eventBody({ name, email, message, date, time, durationMinutes = 30 }: EventInput) {
  const endTime = addMinutesToTime(time, durationMinutes)
  return {
    summary: `Discovery Call — ${name}`,
    description:
      `Client: ${name}\n` +
      `Email: ${email}\n` +
      `Project: ${message}\n\n` +
      `Join call: ${WHEREBY_URL}`,
    location: WHEREBY_URL,
    start: { dateTime: localToRfc3339(date, time, BOOKING_TZ), timeZone: BOOKING_TZ },
    end: { dateTime: localToRfc3339(date, endTime, BOOKING_TZ), timeZone: BOOKING_TZ },
    attendees: [{ email }, { email: DEV_EMAIL }],
    reminders: { useDefault: true },
  }
}

export async function createCalendarEvent(input: EventInput): Promise<string | null> {
  try {
    const res = await fetch(
      `${GATEWAY_URL}/calendars/primary/events?sendUpdates=all`,
      {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(eventBody(input)),
      },
    )
    if (!res.ok) {
      const text = await res.text()
      console.error(`Google Calendar create failed [${res.status}]: ${text}`)
      return null
    }
    const data = (await res.json()) as { id?: string }
    return data.id ?? null
  } catch (err) {
    console.error('Google Calendar create threw', err)
    return null
  }
}

export async function updateCalendarEvent(
  eventId: string,
  input: EventInput,
): Promise<boolean> {
  try {
    const res = await fetch(
      `${GATEWAY_URL}/calendars/primary/events/${encodeURIComponent(eventId)}?sendUpdates=all`,
      {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(eventBody(input)),
      },
    )
    if (!res.ok) {
      console.error(`Google Calendar update failed [${res.status}]: ${await res.text()}`)
      return false
    }
    return true
  } catch (err) {
    console.error('Google Calendar update threw', err)
    return false
  }
}

export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${GATEWAY_URL}/calendars/primary/events/${encodeURIComponent(eventId)}?sendUpdates=all`,
      { method: 'DELETE', headers: authHeaders() },
    )
    if (!res.ok && res.status !== 404 && res.status !== 410) {
      console.error(`Google Calendar delete failed [${res.status}]: ${await res.text()}`)
      return false
    }
    return true
  } catch (err) {
    console.error('Google Calendar delete threw', err)
    return false
  }
}
