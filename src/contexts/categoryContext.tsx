import { useQuery } from '@tanstack/react-query'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from 'react'
import { getAllCategories } from '~/services'

import { CategoryType } from '~/types/CategoryType'

interface CategoryContextProps {
  categories: CategoryType[]
}

const CategoryContext = createContext<CategoryContextProps | any>(null)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  // const [categories, setCategories] = useState<CategoryType[]>([])
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getAllCategories()
  })

  return <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>
}

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
