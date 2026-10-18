import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Header, Footer } from '@/components/site-chrome'
import { Toaster, toast } from 'sonner'
import { Check, X } from 'lucide-react'
import {
  formatDayKey,
  formatDayLabel,
  formatSlot,
  getNextDays,
  slotsForDate,
} from '@/lib/booking-slots'

export const Route = createFileRoute('/reschedule/$token')({
  head: () => ({ meta: [{ title: 'fifthexit: Reschedule your consult' }, { name: 'description', content: 'Choose a new date and time for your fifthexit consultation.' }, { property: 'og:title', content: 'fifthexit: Reschedule your consult' }, { property: 'og:description', content: 'Choose a new date and time for your fifthexit consultation.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' }] }),
  component: ReschedulePage,
})

interface Booking {
  id: string
  name: string
  date: string
  time: string
  status: string
  locale?: string
}

function ReschedulePage() {
  const { token } = Route.useParams()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const days = getNextDays(7)

  useEffect(() => {
    fetch(`/api/public/booking-action/${token}`)
      .then(async (r) => {
        if (!r.ok) {
          const j = await r.json().catch(() => ({}))
          throw new Error(j.error || `HTTP ${r.status}`)
        }
        return r.json()
      })
      .then((j) => setBooking(j.booking))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [token])

  const onConfirm = async () => {
    if (!date || !time) {
      toast.error('Pick a new date and time')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`/api/public/booking-action/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reschedule', date, time }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || `HTTP ${res.status}`)
      }
      setDone(true)
      toast.success('Your booking has been updated.')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not reschedule')
    } finally {
      setSubmitting(false)
    }
  }

  const locale = booking?.locale || 'en'
  const pillBase =
    'px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer select-none'
  const pillIdle = 'border-border/60 text-muted-foreground hover:text-foreground hover:border-border'
  const pillSelected =
    'text-foreground border-transparent bg-gradient-hero shadow-glow [background-clip:padding-box]'

  return (
    <div className="dark min-h-screen flex flex-col" style={{ backgroundColor: '#0d0b1a' }}>
      <Toaster theme="dark" position="top-center" />
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16" style={{ backgroundColor: '#0d0b1a' }}>
        <div className="w-full max-w-2xl glass rounded-3xl p-6 md:p-10">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading…</p>
          ) : error || !booking ? (
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-destructive/20 flex items-center justify-center mb-5">
                <X className="h-7 w-7 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Booking not found</h1>
              <p className="text-muted-foreground">
                This link may have expired or already been used.
              </p>
            </div>
          ) : done ? (
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-gradient-hero flex items-center justify-center mb-5 shadow-glow">
                <Check className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Updated 🚀</h1>
              <p className="text-muted-foreground">
                Check your inbox for the updated confirmation.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                Reschedule your call
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Currently booked for{' '}
                <span className="text-foreground font-medium">{booking.date}</span> at{' '}
                <span className="text-foreground font-medium">{booking.time}</span>.
              </p>

              <div className="space-y-3 mb-6">
                <Label>Pick a new day</Label>
                <div className="flex flex-wrap gap-2">
                  {days.map((d) => {
                    const key = formatDayKey(d)
                    const selected = date === key
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => {
                          setDate(key)
                          setTime('')
                        }}
                        className={`${pillBase} ${selected ? pillSelected : pillIdle}`}
                      >
                        {formatDayLabel(d, locale)}
                      </button>
                    )
                  })}
                </div>
              </div>

              {date && (
                <div className="space-y-3 mb-6">
                  <Label>Pick a new time</Label>
                  <div className="flex flex-wrap gap-2">
                    {slotsForDate(date).map((slot) => {
                      const selected = time === slot
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={`${pillBase} ${selected ? pillSelected : pillIdle}`}
                        >
                          {formatSlot(slot, locale)}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <Button
                onClick={onConfirm}
                disabled={submitting || !date || !time}
                size="lg"
                className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow h-12"
              >
                {submitting ? '…' : 'Confirm new time'}
              </Button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
