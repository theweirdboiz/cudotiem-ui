import { useEffect } from 'react'
import { PostComponent } from '~/components'
import { usePost } from '~/contexts'
import { Post } from '~/types/post.type'
import { Category } from './components'

const HomePage = () => {
  const { posts, isError, isLoading, handleLoadMore, handleChangeCategory } = usePost()
  // const isLoading = false
  // const isError = false
  // const handleLoadMore = () => {
  //   console.log(123)
  // }
  // const posts = {
  //   paginationPosts: [
  //     {
  //       id: 8,
  //       title: 'new post',
  //       price: 100.0,
  //       thumbnail: 'https://th.bing.com/th/id/OIP.sS3-ZzRwhm34KP5m6ZKp5QAAAA?pid=ImgDet&rs=1',
  //       datePosted: 253402275599000,
  //       dateCreated: 1684910788513,
  //       dateUpdated: 1684910788513,
  //       username: 'kienthuc',
  //       status: PostStatus.APPROVED,
  //       category: 'quần áo'
  //     },
  //     {
  //       id: 10,
  //       title: 'new post',
  //       price: 100.0,
  //       thumbnail: 'https://th.bing.com/th/id/OIP.sS3-ZzRwhmsvsv34KP5m6ZKp5QAAAA?pid=ImgDet&rs=1',
  //       datePosted: 253402275599000,
  //       dateCreated: 1684910788513,
  //       dateUpdated: 1684910788513,
  //       username: 'kienthuc',
  //       status: PostStatus.REJECTED,
  //       category: 'quần áo'
  //     },
  //     {
  //       id: 11,
  //       title: 'bai viet moi',
  //       price: 234523.0,
  //       thumbnail:
  //         'https://firebasestorage.googleapis.com/v0/b/cudotiem.appspot.com/o/images%2Fpost%2Fthumbnail%2F1684925640846118183102_4355227071217499_45429216837241885_n.png?alt=media&token=6678bc7e-fdc1-415e-931b-19252b5aa92c',
  //       datePosted: 253402275599000,
  //       dateCreated: 1684910788513,
  //       dateUpdated: 1684910788513,
  //       username: 'kienthuc',
  //       status: PostStatus.PENDING,
  //       category: 'giày dép'
  //     }
  //   ],
  //   totalPage: 3
  // }
  // const handleLoadMore = () => console.log(123)
  // const posts = {
  //   paginationPosts: [
  //     {
  //       id: 1,
  //       title: 'This is title',
  //       price: 123,
  //       slug: 'this-is-slug',
  //       thumbnail: '',
  //       postedDate: '22/12/2022'
  //     },
  //     {
  //       id: 2,
  //       title: 'This is title',
  //       price: 123,
  //       slug: 'this-is-slug',
  //       thumbnail: '',
  //       postedDate: '22/12/2022'
  //     },
  //     {
  //       id: 3,
  //       title: 'This is title',
  //       price: 123,
  //       slug: 'this-is-slug',
  //       thumbnail: '',
  //       postedDate: '22/12/2022'
  //     }
  //   ]
  // }

  useEffect(() => {
    document.title = 'Trang chủ - Cụ Đồ Tiễm'
  }, [])

  if (isLoading) return <>Loading</>
  if (isError) return <>Error post</>

  return (
    <section className='rounded-md mb-5'>
      <div className='bg-white rounded-md'>
        <h3 className='text-base font-bold p-3'>Gợi ý hôm nay</h3>
        <Category handleChangeCategory={handleChangeCategory} />
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
