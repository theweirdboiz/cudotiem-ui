import DashboardHeading from '~/layouts/dashboard/components/DashboardHeading'
import { useState } from 'react'
import { Post, PostStatus } from '~/types/post.type'
import { Button, LabelStatus, Table } from '~/components'
import { useQuery } from '@tanstack/react-query'
import { getPostsPrivatePaginated } from '~/services'
import { useAth } from '~/contexts'
import { Role } from '~/types/role.type'
import { twMerge } from 'tailwind-merge'
import { LabelPostAction } from '~/components/label'
import useFormatDate from '~/hooks/useFormatDate'

const PostManage = () => {
  const [pagination, setPagination] = useState({
    offset: 1,
    size: 5
  })
  const { formatDate, formatMilisecondToDate } = useFormatDate()
  // const { posts } = usePost()
  const { auth } = useAth()
  const { data: postsPrivatePaginated } = useQuery({
    queryKey: ['posts-private', auth?.roles[0], pagination],
    queryFn: async () => await getPostsPrivatePaginated(pagination.offset, pagination.size, auth?.roles[0] || Role.USER)
  })
  // const postsPrivatePaginated = {
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

  const handleClickOnPage = (page: number) => {
    setPagination((prev) => ({ ...prev, offset: page }))
  }

  return (
    <>
      <DashboardHeading>Quản lý tin đăng</DashboardHeading>
      <div className='flex items-center justify-between'>
        <div className='flex-center border border-gray-200 w-full max-w-xl rounded-lg relative'>
          <img
            src='https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png'
            alt='icon-search'
            className='w-5 h-5 ml-4'
          />
          <input
            type='text'
            placeholder='Bạn tìm gì hôm nay'
            className='px-2 outline-none border-none flex-1'
            // onChange={handleSearch}
          />
          <button
            className='flex-center justify-center w-24 h-9 bg-transparent text-blue-600 p-1  relative after:content-[]  after:absolute after:border-l after:border-l-gray-200 after:left-0 after:top-2 after:h-5 hover:bg-blue-100 rounded-r-lg
    '
          >
            Tìm kiếm
          </button>
        </div>
        <div className='flex-center justify-end my-5'>
          <Button to='/manage/add-post' classnames='text-blue-500 hover:bg-blue-100' height='h-10'>
            Tạo tin mới
          </Button>
        </div>
      </div>
      <>
        <Table>
          <thead className='text-sm'>
            <tr>
              <th>Id</th>
              <th>Danh mục</th>
              <th>Tin đăng</th>
              {auth?.roles[0] !== Role.USER && <th>Người đăng</th>}
              <th>Ngày cập nhật</th>
              <th>Ngày đăng tin</th>
              <th>Trạng thái</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {postsPrivatePaginated ? (
              postsPrivatePaginated?.paginationPosts.map((post: Post) => (
                <tr key={post.id} className='text-sm shadow-md'>
                  <td>{post.id}</td>
                  <td>{post.categoryCode}</td>
                  <td>
                    <div className='flex items-center gap-x-2'>
                      <img src={post.thumbnail} className='w-10 h-10 rounded-md' alt='' />
                      <div className=''>
                        <h3 className='font-semibold'>{post.title}</h3>
                        <time className='text-xs text-gray-400'>{formatMilisecondToDate(post.dateCreated)}</time>
                      </div>
                    </div>
                  </td>
                  {auth?.roles[0] !== Role.USER && <td>{post.username}</td>}
                  <td>{formatMilisecondToDate(post.dateUpdated)}</td>
                  <td>{formatMilisecondToDate(post.datePosted)}</td>
                  <td>
                    <LabelStatus status={post.status} />
                  </td>
                  {auth?.roles[0] !== Role.USER && (
                    <td>
                      <Button className='w-20 py-2'>
                        <LabelPostAction status={post.status} />
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <p className='w-full text-center'>Trống</p>
            )}
          </tbody>
        </Table>
        <div className='flex gap-x-2 justify-center'>
          {postsPrivatePaginated?.totalPage &&
            Array(postsPrivatePaginated?.totalPage)
              .fill(0)
              .map((_, index) => {
                const pageNumber = index + 1
                const isActive = pagination.offset === pageNumber
                return (
                  <button
                    key={pageNumber}
                    className={twMerge(
                      `text-primary border-current border w-8 h-8 rounded-full 
                      transition-all duration-300  shadow-md hover:bg-gray-100`,
                      `${isActive && 'bg-blue-100 '}`
                    )}
                    onClick={() => handleClickOnPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              })}
        </div>
      </>
    </>
  )
}
export default PostManage
