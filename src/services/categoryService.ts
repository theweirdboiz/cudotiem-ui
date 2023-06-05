import { Category } from '~/types/category.type'
import { HttpRequest } from '~/ultis'

export const getAllCategories = async <T>() => {
  const response = await HttpRequest.get<T>('/post/category')
  if (response.status === 200) return response.data
}
export const getCategory = (id: number | string) => HttpRequest.get<Category>('/categories/' + id)

export const createCategory = (post: Omit<Category, 'id'>) => HttpRequest.post<Category[]>('/categories', post)

export const updateCategory = (id: number | string, data: any) => HttpRequest.put<Category[]>(`/categories/${id}`, data)

export const deleteCategory = (id: number | string) => HttpRequest.delete(`/categories/${id}`)
