import uploadImage from '~/assets/img-upload.png'
import Swal from 'sweetalert2'
import DashboardHeading from '~/layouts/dashboard/components/DashboardHeading'
import { usePaginate, useSearch } from '~/hooks'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Post } from '~/types/post.type'
import { deletePost, getPost } from '~/services'
import { ActionDelete, ActionEdit, ActionView, Button, LabelStatus, Paginate, Table } from '~/components'
import { usePost } from '~/contexts'

const PER_PAGE = 3

const PostManage = () => {
  const navigator = useNavigate()
  const queryClient = useQueryClient()

  // Get all posts
  const posts = usePost()

  // Delete post by id
  const deletePostMutation = useMutation({
    mutationFn: (id: number | string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      })
    }
  })
  // custom hook handle pagination
  const { paginatedData, pageCount, handlePageClick } = usePaginate({
    data: posts,
    perPage: PER_PAGE
  })

  // custom hook hanle search
  const { filteredData, handleSearch } = useSearch({
    data: paginatedData,
    searchKey: 'title'
  })

  // delete item
  const handleDeleteData = async (id: number) => {
    const postData = await getPost(id)
    if (postData) {
      const result = await Swal.fire({
        title: 'Khoan đã',
        text: 'Bạn thật sự muốn xóa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3086d6d4',
        cancelButtonColor: '#f44343d7',
        confirmButtonText: 'Có, hãy xóa!',
        cancelButtonText: 'Hủy'
      })

      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success')
        deletePostMutation.mutate(id)
      }
    }
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
            onChange={handleSearch}
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
      {posts && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Post</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((post: Post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <div className='flex items-center gap-x-2'>
                      <img src={uploadImage} className='w-10 h-10 rounded-md' alt='' />
                      <div className=''>
                        <h3 className='font-semibold'>{post.title}</h3>
                        <time className='text-xs text-gray-400'>{post.createdAt}</time>
                      </div>
                    </div>
                  </td>
                  <td>{post.category?.name}</td>
                  <td>{post.creator.username}</td>
                  <td>
                    <LabelStatus status={post.status} />
                  </td>
                  <td>
                    <div className='flex-center gap-x-2.5'>
                      <ActionView onClick={() => navigator(`/posts/${post.id}`)} />
                      <ActionEdit onClick={() => navigator(`/manage/update-post/${post.id}`)} />
                      <ActionDelete onClick={() => handleDeleteData(post.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
        </>
      )}
    </>
  )
}
export default PostManage
