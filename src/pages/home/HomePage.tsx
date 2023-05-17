import { useEffect } from 'react'
import { PostComponent } from '~/components'
import { usePost } from '~/contexts'
import { Post } from '~/types/post.type'

const HomePage = () => {
  const { posts, handleLoadMore } = usePost()
  // const posts = [
  //   {
  //     title: 'vcl',
  //     price: '123123',
  //     slug: 'abc-123',

  //     id_category: 2,
  //     imageLinks: [
  //       'https://firebasestorage.googleapis.com/v0/b/cudotiem.appspot.com/o/images%2Fposts%2F1682684457931ch.jpg?alt=media&token=68867a54-612f-43c0-b7e8-233c9461b1ff'
  //     ],
  //     content: '<p><img src="https://i.ibb.co/m4K8DMm/ch.jpg" alt="" width="222" height="225"></p>',
  //     id: 1
  //   },
  //   {
  //     title: 'vcl',
  //     price: '123123',
  //     slug: 'abc-123',

  //     id_category: 2,
  //     imageLinks: [
  //       'https://firebasestorage.googleapis.com/v0/b/cudotiem.appspot.com/o/images%2Fposts%2F1682684457931ch.jpg?alt=media&token=68867a54-612f-43c0-b7e8-233c9461b1ff'
  //     ],
  //     content: '<p><img src="https://i.ibb.co/m4K8DMm/ch.jpg" alt="" width="222" height="225"></p>',
  //     id: 2
  //   },
  //   {
  //     title: 'vcl',
  //     price: '123123',
  //     slug: 'abc-123',

  //     id_category: 2,
  //     imageLinks: [
  //       'https://firebasestorage.googleapis.com/v0/b/cudotiem.appspot.com/o/images%2Fposts%2F1682684457931ch.jpg?alt=media&token=68867a54-612f-43c0-b7e8-233c9461b1ff'
  //     ],
  //     content: '<p><img src="https://i.ibb.co/m4K8DMm/ch.jpg" alt="" width="222" height="225"></p>',
  //     id: 3
  //   }
  // ]
  useEffect(() => {
    document.title = 'Trang chủ - Cụ Đồ Tiễm'
  }, [])
  return (
    <section className='rounded-md mb-5'>
      <div className='bg-white rounded-md'>
        <h3 className='text-base font-bold p-3'>Gợi ý hôm nay</h3>
        <div className='grid grid-cols-6 mb-2 '>
          <div className='box-center flex-col text-blue-500 border-b border-b-blue-500 hover:bg-gray-200 cursor-pointer py-2 px-1'>
            <img
              src='https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp'
              alt=''
              width={40}
              height={40}
              className='transition-all duration-300 ease-linear'
            />
            <span className='mt-1 text-xs'>Dành cho bạn</span>
          </div>
          <div className='box-center flex-col text-gray-500 border-b border-b-transparent hover:bg-gray-200 cursor-pointer py-2 px-1'>
            <img
              src='https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp'
              alt=''
              width={40}
              height={40}
              className='transition-all duration-300 ease-linear'
            />
            <span className='mt-1 text-xs'>Giá cao nhất</span>
          </div>
          <div className='box-center flex-col text-gray-500 border-b border-b-transparent hover:bg-gray-200 cursor-pointer py-2 px-1'>
            <img
              src='https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp'
              alt=''
              width={40}
              height={40}
              className='transition-all duration-300 ease-linear'
            />
            <span className='mt-1 text-xs'>Giá thấp nhất</span>
          </div>
          <div className='box-center flex-col text-blue-500 border-b border-b-blue-500 hover:bg-gray-200 cursor-pointer py-2 px-1'>
            <img
              src='https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp'
              alt=''
              width={40}
              height={40}
              className='transition-all duration-300 ease-linear'
            />
            <span className='mt-1 text-xs'>Dành cho bạn</span>
          </div>
          <div className='box-center flex-col text-gray-500 border-b border-b-transparent hover:bg-gray-200 cursor-pointer py-2 px-1'>
            <img
              src='https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp'
              alt=''
              width={40}
              height={40}
              className='transition-all duration-300 ease-linear'
            />
            <span className='mt-1 text-xs'>Áo nam</span>
          </div>
          <div className='box-center flex-col text-gray-500 border-b border-b-transparent hover:bg-gray-200 cursor-pointer py-2 px-1'>
            <img
              src='https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp'
              alt=''
              width={40}
              height={40}
              className='transition-all duration-300 ease-linear'
            />
            <span className='mt-1 text-xs'>Áo nữ</span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-5 gap-2'>
        {posts?.map((post: Post) => (
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
