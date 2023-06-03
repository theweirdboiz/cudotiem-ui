import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { IconVietNamFlag, IconEnglishFlag } from '~/components'
import HOME_EN from '~/locales/en/home.json'
import HOME_VI from '~/locales/vi/home.json'
import TOPBAR_EN from '~/locales/en/top-bar.json'
import TOPBAR_VI from '~/locales/vi/top-bar.json'
export const locales = {
  en: {
    name: 'English',
    icon: <IconEnglishFlag />
  },
  vi: { name: 'Việt Nam', icon: <IconVietNamFlag /> }
}

export const languages = [
  {
    key: 'vi'
  },
  {
    key: 'en'
  }
]
export const resources = {
  en: {
    home: HOME_EN,
    'top-bar': TOPBAR_EN
  },
  vi: {
    home: HOME_VI,
    'top-bar': TOPBAR_VI
  }
}
export const defaultNS = 'home'
use(initReactI18next).init({
  resources,
  // lng: 'en',
  ns: ['home', 'top-bar'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})
