import { FormStatePostType, Post, PostPagination } from '~/types/post.type'
import { HttpRequest } from '~/ultis'

export const getPosts = async (offset: number, size: number) => {
  const response = await HttpRequest.get<PostPagination>(`/post/pagination?offset=${offset}&size=${size}`)
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

export const getPostByCategory = async (category: string) => {
  const response = await HttpRequest.get<Post[]>('/posts?category=' + category)
  if (response.status === 200) return response.data
}

export const createPost = async (post: FormStatePostType) => {
  const response = await HttpRequest.post<Post>(`/post`, post)
  if (response.status === 200) return response.data
}

export const updatePost = async (id: number | string, data: any) => {
  const response = await HttpRequest.put<Post>(`/posts/${id}`, data)
  if (response.status === 200) return response.data
}

export const deletePost = (id: number | string) => HttpRequest.delete(`/posts/${id}`)
