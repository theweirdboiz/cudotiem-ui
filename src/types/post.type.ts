export enum PostStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}
export type FormStatePostType = {
  title: string
  idCategory: number | undefined
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
  slug: string
  thumbnail: string
  postedDate: string
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
