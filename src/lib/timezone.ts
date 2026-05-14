// Helpers for converting wall-clock NY time strings to/from UTC instants.
// Date string format: 'YYYY-MM-DD'. Time string format: 'H:MM' or 'HH:MM'.

export const BOOKING_TZ = 'America/New_York'

function tzOffsetMs(date: Date, tz: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const parts = Object.fromEntries(
    dtf.formatToParts(date).filter((p) => p.type !== 'literal').map((p) => [p.type, p.value]),
  ) as Record<string, string>
  const asUTC = Date.UTC(
    +parts.year,
    +parts.month - 1,
    +parts.day,
    +parts.hour,
    +parts.minute,
    +parts.second,
  )
  return asUTC - date.getTime()
}

export function localToUtc(dateStr: string, timeStr: string, tz: string = BOOKING_TZ): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  const [hh, mm] = timeStr.split(':').map(Number)
  const utcGuess = new Date(Date.UTC(y, m - 1, d, hh, mm))
  const offset = tzOffsetMs(utcGuess, tz)
  return new Date(utcGuess.getTime() - offset)
}

// RFC3339 string with the offset for the given timezone — required by Google Calendar.
export function localToRfc3339(dateStr: string, timeStr: string, tz: string = BOOKING_TZ): string {
  const utc = localToUtc(dateStr, timeStr, tz)
  // Determine offset for that instant in tz
  const offsetMin = -tzOffsetMs(utc, tz) / 60000
  const sign = offsetMin >= 0 ? '+' : '-'
  const abs = Math.abs(offsetMin)
  const oh = String(Math.floor(abs / 60)).padStart(2, '0')
  const om = String(abs % 60).padStart(2, '0')
  const [hh, mm] = timeStr.split(':').map(Number)
  return `${dateStr}T${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00${sign}${oh}:${om}`
}

export function addMinutesToTime(timeStr: string, minutes: number): string {
  const [hh, mm] = timeStr.split(':').map(Number)
  const total = hh * 60 + mm + minutes
  const newH = Math.floor(total / 60) % 24
  const newM = total % 60
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`
}

export function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}
