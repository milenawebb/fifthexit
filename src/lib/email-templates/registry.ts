import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as bookingNotification } from './booking-notification'
import { template as bookingConfirmation } from './booking-confirmation'
import { template as bookingReminder24h } from './booking-reminder-24h'
import { template as bookingReminder1h } from './booking-reminder-1h'
import { template as bookingCancellation } from './booking-cancellation'
import { template as bookingRescheduleNotify } from './booking-reschedule-notify'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'booking-notification': bookingNotification,
  'booking-confirmation': bookingConfirmation,
  'booking-reminder-24h': bookingReminder24h,
  'booking-reminder-1h': bookingReminder1h,
  'booking-cancellation': bookingCancellation,
  'booking-reschedule-notify': bookingRescheduleNotify,
}
