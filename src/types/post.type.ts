export enum PostStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}
export type CreatePostRequest = {
  title: string
  categoryCode?: string
  price: number
  status: PostStatus
  thumbnail: string
  imageUrls: string[]
  content: string
}

export interface Post {
  id: number
  title: string
  price: number
  thumbnail: string
  postedDate: number
  createdDate?: number
  updatedDate?: number
  username: string
  status?: string
  category?: string
  slug?: string
}

export interface PostDetail {
  id: number
  title: string
  price: number
  slug: string
  thumbnail: string
  postedDate: string
}
export interface PostPagination {
  paginationPosts: Post[]
  totalPage: number
}

export interface PostPrivatePaginated {
  paginationPosts: Post[]
  totalPage: number
}
