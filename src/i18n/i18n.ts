import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

export const languages = [
  {
    key: 'en',
    name: 'English'
  },
  {
    key: 'vi',
    name: 'Tiếng Việt'
  }
]
const resources = {
  en: {
    translation: {
      categories: 'Categories'
    }
  },
  vi: {
    translation: {
      categories: 'Danh mục'
    }
  }
}
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  }
})
