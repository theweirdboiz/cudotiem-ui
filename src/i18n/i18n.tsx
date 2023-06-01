import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { IconVietNamFlag, IconEnglishFlag } from '~/components'

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
const resources = {
  en: {
    translation: {
      home: 'Home',
      categories: 'Categories',
      search: 'Search',
      'post-news': 'Post news',
      'sign-in': 'Sign in',
      'sign-up': 'Sign up',
      'sign-out': 'Sign-out',
      price: 'Price',
      'price-range': 'Choose a price range',
      apply: 'Apply',
      language: 'Choose language'
    }
  },
  vi: {
    translation: {
      home: 'Trang chủ',
      categories: 'Danh mục',
      search: 'Tìm kiếm',
      'post-news': 'Đăng tin',
      'sign-in': 'Đăng nhập',
      'sign-up': 'Đăng ký',
      'sign-out': 'Đăng xuất',
      price: 'Giá',
      'price-range': 'Chọn khoảng giá',
      apply: 'Áp dụng',
      language: 'Chọn ngôn ngữ'
    }
  }
}
use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  }
})
