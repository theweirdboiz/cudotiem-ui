import { User } from './user.type'

export enum PostStatus {
  APPROVED = 'APPROVED',
  CREATE_PENDING = 'CREATE_PENDING',
  CREATE_REJECTED = 'CREATE_REJECTED',
  UPDATE_PENDING = 'UPDATE_PENDING',
  UPDATE_REJECTED = 'UPDATE_REJECTED',
  HIDDEN = 'HIDDEN'
}

export interface Post {
  id: number
  title: string
  content?: string
  price: number
  slug?: string
  username?: string
  imageUrls?: string[]
  thumbnail?: string
  dateCreated?: number
  categoryName?: string
  dateUpdated?: number
  datePosted?: number
  status?: PostStatus
  categoryCode?: string
}

export interface PostDetail {
  userDto: Pick<User, 'fullname' | 'phoneNumber' | 'avatar'>
  postDetailResponse: Omit<Post, 'dateUpdated' | 'datePosted' | 'status' | 'categoryCode'>
}
export interface PostPagination {
  paginationPosts: Post[]
  totalPage: number
}

export interface PostPrivatePaginated {
  paginationPosts: Post[]
  totalPage: number
}
