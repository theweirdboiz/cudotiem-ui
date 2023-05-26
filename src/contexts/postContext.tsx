import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { getAllPosts } from '~/services'
import { PostPagination, Post } from '~/types/post.type'
import { useAth } from './authContext'

interface PostContextProps {
  posts: PostPagination | undefined
  handleLoadMore: () => void
  pagination: {
    offset: number
    size: number
  }
  isError: boolean
  isLoading: boolean
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
    size: 10
  })
  const {
    data: posts,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['posts', pagination],
    queryFn: async () => await getAllPosts(pagination.offset, pagination.size)
  })

  const handleLoadMore = () => {
    const newSize = pagination.size + 5
    setPagination({ ...pagination, size: newSize })
  }
  // const posts: PostPagination = {
  //   paginationPosts: [
  //     {
  //       id: 1,
  //       title: '123',
  //       price: 123123,
  //       slug: '123-123',
  //       thumbnail: '123123',
  //       postedDate: '123123'
  //     }
  //   ],
  //   totalPage: 3
  // }
  const value = {
    posts,
    isError,
    isLoading,
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
