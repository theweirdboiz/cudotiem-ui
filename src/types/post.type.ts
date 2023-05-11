import { Category } from './category.type'
import { User } from './user.type'

export enum PostStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}
export type FormStatePostType = {
  title: string
  id_category: number | undefined
  price: number
  status: PostStatus
  imageLinks: string[]
  content: string
}
export interface Post {
  id: number
  title: string
  content: string
  price: number
  status: PostStatus
  imageLinks: string[]
  creator: User
  category?: Category
  createdAt?: string
}
