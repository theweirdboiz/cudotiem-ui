import { Post, PostPagination, PostPrivatePaginated, PostStatus } from '~/types/post.type'
import { Role } from '~/types/role.type'
import { HttpRequest } from '~/ultis'

export const getAllPosts = async (offset: number, size: number) => {
  const response = await HttpRequest.get<PostPagination>(`/post?offset=${offset}&size=${size}`)
  if (response.status === 200) return response.data
}
// admin
export const handlePostByStatus = async <T>(id: number, status: PostStatus, roles?: Role[]) => {
  const check = roles?.includes(Role.USER) ? 'user' : roles?.includes(Role.MODERATOR) ? 'mod' : 'admin'
  const response = await HttpRequest.put<T>(`/${check}/post/${id}?status=${status}`)
  if (response.status === 200) return response.data
}

export const getPostsPrivatePaginated = async (offset: number, size: number, roles?: Role[]) => {
  const check = roles?.includes(Role.ADMIN) ? 'admin' : roles?.includes(Role.MODERATOR) ? 'mod' : 'user'
  const response = await HttpRequest.get<PostPrivatePaginated>(`/${check}/post?offset=${offset}&size=${size}`)
  if (response.status === 200) return response.data
}
export const getPostsPaginatedByUsername = async (offset: number, size: number) => {
  const response = await HttpRequest.get<PostPrivatePaginated>(`/post/admin?offset=${offset}&size=${size}`)
  if (response.status === 200) return response.data
}
export const getPost = async (id: number | string) => {
  const response = await HttpRequest.get<Post>('/posts/' + id)
  if (response.status === 200) return response.data
}
export const getPostBySlug = async (slug: string) => {
  const response = await HttpRequest.get<Post>('/posts/?slug=' + slug)
  if (response.status === 200) return response.data
}
export const getPostById = async <T>(id: number | string) => {
  const response = await HttpRequest.get<T>(`/post/${id}`)
  if (response.status === 200) return response.data
}

export const getPostByCategory = async (category: string) => {
  const response = await HttpRequest.get<Post[]>('/posts?category=' + category)
  if (response.status === 200) return response.data
}

export const createPost = async <T>(post: T) => {
  const response = await HttpRequest.post<T>(`/post`, post)
  if (response.status === 200) return response.data
}

export const updatePostById = async <T>(id: number | string, data: T) => {
  const response = await HttpRequest.put<T>(`/posts/${id}`, data)
  if (response.status === 200) return response.data
}

export const deletePost = (id: number | string) => HttpRequest.delete(`/posts/${id}`)
