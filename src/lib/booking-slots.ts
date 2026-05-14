// Shared utilities for the booking time-slot picker (used by booking form
// and the reschedule page). The slot pool is pseudo-random per date so the
// same date always shows the same set of slots.

export const SLOT_POOL = [
  '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00',
]

function hashString(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function seededRandom(seed: number) {
  let s = seed || 1
  return () => {
    s = Math.imul(s ^ (s >>> 15), 2246822507)
    s = Math.imul(s ^ (s >>> 13), 3266489909)
    s ^= s >>> 16
    return (s >>> 0) / 4294967296
  }
}

export function slotsForDate(dateKey: string): string[] {
  const rand = seededRandom(hashString(dateKey))
  const count = 4 + Math.floor(rand() * 3)
  const pool = [...SLOT_POOL]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const picked = pool.slice(0, count)
  picked.sort((a, b) => {
    const [ah, am] = a.split(':').map(Number)
    const [bh, bm] = b.split(':').map(Number)
    return ah * 60 + am - (bh * 60 + bm)
  })
  return picked
}

export function formatSlot(slot: string, locale: string) {
  if (locale === 'bg') return slot
  const [h, m] = slot.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hr = h % 12 === 0 ? 12 : h % 12
  return `${hr}:${m.toString().padStart(2, '0')} ${period}`
}

export function getNextDays(count: number) {
  const days: Date[] = []
  const today = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

export function formatDayKey(d: Date) {
  return d.toISOString().slice(0, 10)
}

export function formatDayLabel(d: Date, locale: string) {
  const tag = locale === 'bg' ? 'bg-BG' : 'en-US'
  return d.toLocaleDateString(tag, { weekday: 'short', month: 'long', day: 'numeric' })
}
