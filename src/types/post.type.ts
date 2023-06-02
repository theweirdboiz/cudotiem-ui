export enum PostStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export interface Post {
  id: number
  title: string
  price: number
  thumbnail: string
  datePosted?: number
  dateCreated?: number
  dateUpdated?: number
  username?: string
  status?: PostStatus
  categoryName?: string
  categoryCode?: string
  imageUrls?: string[]
  content?: string
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
