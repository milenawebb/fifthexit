import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import bg from './locales/bg.json'

const STORAGE_KEY = 'hs_lang'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bg: { translation: bg }
  },
  lng: typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) || 'en' : 'en',
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
