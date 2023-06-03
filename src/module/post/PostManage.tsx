import DashboardHeading from '~/layouts/dashboard/components/DashboardHeading'
import { useMemo, useState } from 'react'
import { Post, PostStatus } from '~/types/post.type'
import { Button, LabelStatus, Table } from '~/components'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getPostsPrivatePaginated, handlePostByStatus } from '~/services'
import { useAth } from '~/contexts'
import { Role } from '~/types/role.type'
import { twMerge } from 'tailwind-merge'
import { LabelPostAction } from '~/components/label'
import { useTranslation } from 'react-i18next'
import useFormatDate from '~/hooks/useFormatDate'
import { Link, useNavigate } from 'react-router-dom'

const PostManage = () => {
  const [pagination, setPagination] = useState({
    offset: 1,
    size: 5
  })
  const { formatDate, formatMilisecondToDate } = useFormatDate()
  // const { posts } = usePost()
  // const queryClient = new QueryClient()
  const { auth } = useAth()
  const { i18n } = useTranslation()
  const role = auth?.roles.includes(Role.ADMIN)
    ? Role.ADMIN
    : auth?.roles.includes(Role.MODERATOR)
    ? Role.MODERATOR
    : Role.USER
  const { data: postsPrivatePaginated, refetch } = useQuery({
    queryKey: ['posts-private', pagination, i18n.language],
    queryFn: async () => await getPostsPrivatePaginated(pagination.offset, pagination.size, auth?.roles)
  })
  const tableTabs = [
    {
      id: 1,
      title: 'Id',
      field: ''
    },
    {
      id: 2,
      title: 'Danh mục',
      field: ''
    },
    {
      id: 3,
      title: 'Tin đăng',
      field: ''
    },
    {
      id: 4,
      title: 'Người tạo',
      field: ''
    },
    {
      id: 5,
      title: 'Ngày tạo',
      field: ''
    },
    {
      id: 6,
      title: 'Ngày cập nhật',
      field: ''
    },
    {
      id: 7,
      title: 'Ngày đăng',
      field: ''
    },
    {
      id: 8,
      title: 'Trạng thái',
      field: ''
    },
    {
      id: 9,
      title: 'Options',
      field: ''
    }
  ]
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
  //       status: PostStatus.HIDDEN,
  //       categoryName: 'quần áo'
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
  //       status: PostStatus.CREATE_REJECTED,
  //       categoryName: 'quần áo'
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
  //       status: PostStatus.CREATE_PENDING,
  //       categoryName: 'giày dép'
  //     }
  //   ],
  //   totalPage: 3
  // }
  const statusColor = useMemo(() => {
    const getStatusColor = (status: PostStatus | undefined) => {
      let styleClassnames = ''
      switch (status) {
        case PostStatus.APPROVED:
          styleClassnames = 'text-red-500'
          break
        case PostStatus.UPDATE_PENDING:
          styleClassnames = 'text-yellow-500'
          break
        case PostStatus.CREATE_PENDING:
          styleClassnames = 'text-yellow-500'
          break
        case PostStatus.UPDATE_REJECTED:
          styleClassnames = 'text-green-500'
          break
        case PostStatus.CREATE_REJECTED:
          styleClassnames = 'text-red-500'
          break
        default:
          return 'text-gray-500'
      }
    }
    return getStatusColor
  }, [])

  const handlePostMutation = useMutation({
    mutationFn: (data: any) => handlePostByStatus(data.id, data.status, role),
    onSuccess: () => refetch()
  })
  // const userHandlePostMutation = useMutation({
  //   mutationFn: (data: any) => handlePostByStatus(data.id, data.status),
  //   onSuccess: () => refetch()
  // })
  const handleClickOnPage = (page: number) => {
    setPagination((prev) => ({ ...prev, offset: page }))
  }
  // admin
  const handleAction = (id: number, status?: PostStatus) => {
    let statusReq
    switch (status) {
      case PostStatus.APPROVED:
        statusReq = PostStatus.HIDDEN
        break
      case PostStatus.CREATE_PENDING:
        statusReq = PostStatus.CREATE_REJECTED
        break
      case PostStatus.UPDATE_PENDING:
        statusReq = PostStatus.UPDATE_REJECTED
        break
      case PostStatus.CREATE_REJECTED:
        statusReq = PostStatus.CREATE_PENDING
        break
      case PostStatus.UPDATE_REJECTED:
        statusReq = PostStatus.UPDATE_PENDING
        break
      default:
        break
    }
    handlePostMutation.mutate({ id, status: statusReq })
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
          <input type='text' placeholder='Bạn tìm gì hôm nay' className='px-2 outline-none border-none flex-1' />
          <button
            className='flex-center justify-center w-24 h-9 bg-transparent text-blue-600 p-1  relative after:content-[]  after:absolute after:border-l after:border-l-gray-200 after:left-0 after:top-2 after:h-5 hover:bg-blue-100 rounded-r-lg
    '
          >
            Tìm kiếm
          </button>
        </div>
        <div className='flex-center justify-end my-5'>
          <Button to='/manage/add-post' classnames='text-blue-500 hover:bg-blue-100'>
            Tạo tin mới
          </Button>
        </div>
      </div>
      <>
        <Table>
          <thead className='text-sm'>
            {tableTabs.map((tableTab) => (
              <th key={tableTab.id}>{tableTab.title}</th>
            ))}
          </thead>
          <tbody>
            {postsPrivatePaginated ? (
              postsPrivatePaginated?.paginationPosts.map((post: Post) => (
                <tr key={post.id} className='text-sm shadow-md'>
                  <td className='p-1'>
                    <Link to={`/${post.slug}/${post.id}`}>#{post.id}</Link>
                  </td>
                  <td className='p-1 capitalize'>{post?.categoryName}</td>
                  <td>
                    <Link to={`/manage/update-post/${post.id}`} className='flex items-center gap-x-2'>
                      <img src={post.thumbnail} className='w-10 h-10 rounded-md' alt='' />
                      <div className=''>
                        <h3 className='font-semibold line-clamp-1'>{post.title}</h3>
                        <time className='text-xs text-gray-400'>{formatMilisecondToDate(post.dateCreated)}</time>
                      </div>
                    </Link>
                  </td>
                  <td className=''>{post.username}</td>
                  <td>{formatMilisecondToDate(post.dateCreated)}</td>
                  <td>{formatMilisecondToDate(post.dateUpdated)}</td>
                  <td>{formatMilisecondToDate(post.datePosted)}</td>
                  <td>
                    <LabelStatus status={post.status} />
                  </td>
                  {auth?.roles.includes(Role.ADMIN) && (
                    <td>
                      <Button
                        disabled={post.status === PostStatus.HIDDEN}
                        className={`w-30 py-2 mx-auto ${statusColor(post.status)}`}
                        onClick={() => handleAction(post.id, post.status)}
                      >
                        <LabelPostAction status={post.status} />
                      </Button>
                    </td>
                  )}
                  {auth?.roles.includes(Role.USER) && (
                    <td>
                      <Button
                        disabled={PostStatus.HIDDEN || PostStatus.APPROVED}
                        className={`w-30 mx-auto py-2 ${statusColor(post.status)}`}
                        onClick={() => handleAction(post.id, post.status)}
                      >
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
