import { PostStatus } from '~/types/post.type'

export const ENV = {
  TINY_MCE_KEY: import.meta.env.VITE_TINY_MCE_KEY,
  IMGBB_KEY: import.meta.env.VITE_IMGBB_KEY,
  IMGBB_URL: import.meta.env.VITE_IMGBB_URL,
  BASE_API: import.meta.env.VITE_BASE_API
}

// export const CREATE_POST_DEFAULT_VALUE = {
//   title:
//   idCategory: number | undefined
//   price: number
//   status: PostStatus
//   thumbnail: string
//   imageUrls: string[]
//   content: string
// }

export const CATEGORY_DEFAULT_VALUE = {
  name: '',
  slug: '',
  status: 2,
  createdAt: new Date().getTime()
}
export enum CategoryStatus {
  APPROVED = 1,
  PENDING = 2,
  REJECTED = 3
}

//
export enum UserStatus {
  ACTIVED = 1,
  PENDING = 2,
  BANNED = 3
}

export enum UserRole {
  ADMIN = 1,
  MOD = 2,
  USER = 3
}

export const USER_DEFAULT_VALUE = {
  fullName: '',
  email: '',
  avatar: '',
  password: '',
  status: 2,
  role: 3,
  createdAt: new Date().getTime()
}

export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'
