import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

import { CategoryType } from '~/types/CategoryType'

interface CategoryContextProps {
  categories: CategoryType[]
  setCategories: Dispatch<SetStateAction<CategoryType[]>>
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const data = {
    categories,
    setCategories
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
