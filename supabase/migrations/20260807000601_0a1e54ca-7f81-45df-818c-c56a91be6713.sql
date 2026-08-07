DELETE FROM public.bookings WHERE email = 'qa-routing-test@fifthexit.com';
DELETE FROM public.email_send_log WHERE recipient_email = 'qa-routing-test@fifthexit.com';