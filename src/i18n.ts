import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import bg from './locales/bg.json'

export function languageForHost(host?: string | null): 'en' | 'bg' {
  if (!host) return 'en'
  const h = host.toLowerCase().split(':')[0]
  if (h === 'fifthexit.eu' || h.endsWith('.fifthexit.eu')) return 'bg'
  return 'en'
}

function initialLang() {
  if (typeof window === 'undefined') return 'en'
  return languageForHost(window.location.hostname)
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bg: { translation: bg }
  },
  lng: initialLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n
