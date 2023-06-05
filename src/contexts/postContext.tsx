import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { getAllPosts } from '~/services'
import { PostPagination, Post, PostPrivatePaginated } from '~/types/post.type'

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
  handleChangeCategory: (categoryCode: string) => void
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
  const [categoryCode, setCategoryCode] = useState<string | undefined>('')
  const {
    data: posts,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['posts', categoryCode, pagination],
    queryFn: async () => await getAllPosts<PostPagination>(pagination.offset, pagination.size, categoryCode)
  })

  const handleLoadMore = () => {
    const newSize = pagination.size + 5
    setPagination({ ...pagination, size: newSize })
  }
  const handleChangeCategory = (categoryCode: string) => {
    setCategoryCode(categoryCode)
  }
  // const posts: PostPagination = {
  //   paginationPosts: [
  //     {
  //       id: 1,
  //       title: '123',
  //       price: 123123,
  //       slug: '123-123',
  //       thumbnail: '',
  //       datePosted: 123123
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
    handleLoadMore,
    handleChangeCategory
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
