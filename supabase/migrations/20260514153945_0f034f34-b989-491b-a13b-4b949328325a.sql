-- Bookings table for confirmed consultations
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  date_str TEXT NOT NULL,
  time_str TEXT NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  starts_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  locale TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled')),
  google_event_id TEXT,
  cancel_token TEXT NOT NULL UNIQUE,
  reschedule_token TEXT NOT NULL UNIQUE,
  estimator JSONB,
  reminder_24h_sent_at TIMESTAMPTZ,
  reminder_1h_sent_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  rescheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_starts_at ON public.bookings(starts_at);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_slot
  ON public.bookings(date_str, time_str)
  WHERE status = 'confirmed';

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Service-role only; tokens are the public access mechanism via server routes
DO $$ BEGIN
  CREATE POLICY "Service role manages bookings"
    ON public.bookings FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS bookings_updated_at ON public.bookings;
CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Schedule reminder dispatcher every 5 minutes
DO $$
DECLARE existing_jobid BIGINT;
BEGIN
  SELECT jobid INTO existing_jobid FROM cron.job WHERE jobname = 'process-booking-reminders';
  IF existing_jobid IS NOT NULL THEN
    PERFORM cron.unschedule(existing_jobid);
  END IF;

  PERFORM cron.schedule(
    'process-booking-reminders',
    '*/5 * * * *',
    $cron$
    SELECT net.http_post(
      url := 'https://project--1bc49ac9-eacd-4499-bd7a-e95875986f3f.lovable.app/api/public/booking-reminders',
      headers := '{"Content-Type": "application/json", "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhb2ptaGdydGRyendoZnBteHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDAwOTgsImV4cCI6MjA5NDIxNjA5OH0.HQ4e28a5WN9fp9C6QIPV9Zq5mYrZrGTpdKQxgmEm6Uc"}'::jsonb,
      body := '{}'::jsonb
    ) AS request_id;
    $cron$
  );
END $$;