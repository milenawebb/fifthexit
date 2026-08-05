import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Header, Footer } from '@/components/site-chrome'
import { Toaster, toast } from 'sonner'
import { Check, X } from 'lucide-react'

export const Route = createFileRoute('/cancel/$token')({
  head: () => ({ meta: [{ name: 'robots', content: 'noindex' }] }),
  component: CancelPage,
})

interface Booking {
  id: string
  name: string
  email: string
  date: string
  time: string
  status: string
}

function CancelPage() {
  const { token } = Route.useParams()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

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
    setSubmitting(true)
    try {
      const res = await fetch(`/api/public/booking-action/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || `HTTP ${res.status}`)
      }
      setDone(true)
      toast.success('Your booking has been cancelled.')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not cancel')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="dark min-h-screen flex flex-col" style={{ backgroundColor: '#0d0b1a' }}>
      <Toaster theme="dark" position="top-center" />
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16" style={{ backgroundColor: '#0d0b1a' }}>
        <div className="w-full max-w-lg glass rounded-3xl p-8 md:p-10">
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
          ) : done || booking.status === 'cancelled' ? (
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-gradient-hero flex items-center justify-center mb-5 shadow-glow">
                <Check className="h-7 w-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Booking cancelled</h1>
              <p className="text-muted-foreground">
                Sorry to miss you. You can book a new time anytime on our site.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                Cancel your call?
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Are you sure you want to cancel your call on{' '}
                <span className="text-foreground font-medium">{booking.date}</span> at{' '}
                <span className="text-foreground font-medium">{booking.time}</span>?
              </p>
              <Button
                onClick={onConfirm}
                disabled={submitting}
                size="lg"
                className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow h-12"
              >
                {submitting ? '…' : 'Cancel booking'}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Changed your mind? Just close this page.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
