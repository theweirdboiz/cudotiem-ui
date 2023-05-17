import { CategoryType } from '~/types/CategoryType'
import { HttpRequest } from '~/ultis'

export const getAllCategories = async () => {
  const response = await HttpRequest.get<CategoryType>('/post/category')
  if (response.status === 200) return response.data
}
export const getCategory = (id: number | string) => HttpRequest.get<CategoryType>('/categories/' + id)

export const createCategory = (post: Omit<CategoryType, 'id'>) => HttpRequest.post<CategoryType[]>('/categories', post)

export const updateCategory = (id: number | string, data: any) =>
  HttpRequest.put<CategoryType[]>(`/categories/${id}`, data)

export const deleteCategory = (id: number | string) => HttpRequest.delete(`/categories/${id}`)
