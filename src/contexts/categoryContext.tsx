import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '~/services'
import { createContext, ReactNode, useContext } from 'react'
import { Category } from '~/types/category.type'
import { useTranslation } from 'react-i18next'

interface CategoryContextProps {
  categories: Category[] | undefined
  isLoading: boolean
  isError: boolean
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation()
  const {
    data: categories,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['categories', i18n.language],
    queryFn: async () => await getAllCategories()
  })
  // const categories = [
  //   {
  //     id: 1,
  //     name: 'quần áo',
  //     icon: 'https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp',
  //     categoryCode: 'as'
  //   }
  // ]

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
