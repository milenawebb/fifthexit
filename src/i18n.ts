import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import bg from './locales/bg.json'

const STORAGE_KEY = 'hs_lang'
const MANUAL_KEY = 'hs_lang_manual'

function initialLang() {
  if (typeof localStorage === 'undefined') return 'en'
  try {
    const manual = localStorage.getItem(MANUAL_KEY) === 'true'
    if (!manual) return 'en'
    return localStorage.getItem(STORAGE_KEY) || 'en'
  } catch {
    return 'en'
  }
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

if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    try {
      localStorage.setItem(STORAGE_KEY, lng.startsWith('bg') ? 'bg' : 'en')
    } catch {}
  })
}

export default i18n
