import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { getPosts } from '~/services'
import { PostPagination } from '~/types/post.type'

interface PostContextProps {
  posts: PostPagination | undefined
  handleLoadMore: () => void
  pagination: {
    offset: number
    size: number
  }
  setPagination: Dispatch<SetStateAction<any>>
}

interface PaginationProps {
  offset: number
  size: number
}

const PostContext = createContext<PostContextProps | undefined>(undefined)

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [pagination, setPagination] = useState<PaginationProps>({
    offset: 1,
    size: 1
  })
  const { data: posts } = useQuery({
    queryKey: ['posts', pagination],
    queryFn: async () => await getPosts(pagination.offset, pagination.size)
  })

  const handleLoadMore = () => {
    const newSize = pagination.size + 1
    setPagination({ ...pagination, size: newSize })
  }

  const value = {
    posts,
    pagination,
    setPagination,
    handleLoadMore
  }
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
export const usePost = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePost must be used within a PostProvider')
  }
  return context
}
