import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '~/services'
import { createContext, ReactNode, useContext, useState } from 'react'
import { Category } from '~/types/category.type'

interface CategoryContextProps {
  categories: Category[] | undefined
  isLoading: boolean
  isError: boolean
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: categories,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getAllCategories()
  })

  const data = {
    categories,
    isError,
    isLoading
  }

  return <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>
}

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider')
  }
  return context
}
