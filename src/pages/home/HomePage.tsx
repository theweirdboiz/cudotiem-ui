import { useEffect } from 'react'
import { PostComponent } from '~/components'
import { usePost } from '~/contexts'
import { Post } from '~/types/post.type'
import { Category } from './components'
import { useQuery } from '@tanstack/react-query'
import { getAllUsersProfile } from '~/services/userService'

const HomePage = () => {
  // const { posts, isError, isLoading, handleLoadMore } = usePost()
  const isError = false
  const isLoading = false
  const handleLoadMore = () => console.log(123)
  const posts = {
    paginationPosts: [
      {
        id: 1,
        title: 'This is title',
        price: 123,
        slug: 'this-is-slug',
        thumbnail: '',
        postedDate: '22/12/2022'
      },
      {
        id: 2,
        title: 'This is title',
        price: 123,
        slug: 'this-is-slug',
        thumbnail: '',
        postedDate: '22/12/2022'
      },
      {
        id: 3,
        title: 'This is title',
        price: 123,
        slug: 'this-is-slug',
        thumbnail: '',
        postedDate: '22/12/2022'
      }
    ]
  }
  const { data: usersProfile } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => await getAllUsersProfile()
  })

  useEffect(() => {
    document.title = 'Trang chủ - Cụ Đồ Tiễm'
  }, [])
  if (isLoading) return <>Loading</>
  if (isError) return <>Error post</>

  return (
    <section className='rounded-md mb-5'>
      <div className='bg-white rounded-md'>
        <h3 className='text-base font-bold p-3'>Gợi ý hôm nay</h3>
        <Category />
      </div>
      <div className='grid grid-cols-5 gap-2'>
        {posts?.paginationPosts?.map((post: Post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </div>
      <div className='box-center mt-5'>
        <button
          className='px-16 py-1.5 rounded-md border border-current text-blue-500 hover:bg-blue-100 font-medium'
          onClick={handleLoadMore}
        >
          Xem thêm
        </button>
      </div>
    </section>
  )
}

export default HomePage
