import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export type Lang = 'en' | 'bg'

export function languageForHost(host?: string | null): Lang {
  if (!host) return 'en'
  const h = host.toLowerCase().split(':')[0]
  if (h === 'fifthexit.eu' || h.endsWith('.fifthexit.eu')) return 'bg'
  return 'en'
}

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  return languageForHost(window.location.hostname)
}

// Only the current domain's locale is fetched; each JSON is its own chunk.
export async function loadMessages(lang: Lang): Promise<Record<string, unknown>> {
  const mod = lang === 'bg' ? await import('./locales/bg.json') : await import('./locales/en.json')
  return (mod as { default: Record<string, unknown> }).default
}

export function ensureMessages(lang: Lang, messages?: Record<string, unknown> | null) {
  if (messages && !i18n.hasResourceBundle(lang, 'translation')) {
    i18n.addResourceBundle(lang, 'translation', messages, true, true)
  }
}

i18n.use(initReactI18next).init({
  resources: {},
  lng: initialLang(),
  fallbackLng: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

export default i18n
