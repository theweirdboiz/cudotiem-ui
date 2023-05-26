import Image from '~/components/image/Image'
import DashboardHeading from '~/layouts/dashboard/components/DashboardHeading'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAth, useCategory } from '~/contexts'
import { toast } from 'react-toastify'
import { Post, PostStatus } from '~/types/post.type'
import { HttpRequest } from '~/ultis'
import { FormGroup, Input, Label, Dropdown, Button, Radio } from '~/components'
import { ENV } from '~/config/constant'
import { Editor } from '@tinymce/tinymce-react'
import { createPost } from '~/services'
import { Category } from '~/types/category.type'
import { Role } from '~/types/role.type'
import { useNavigate } from 'react-router-dom'
import { CreatePostMessage } from '~/ultis/message/post.message'
import ImageUpload from '~/components/image/ImageUpload'

/* Schema for validate */
const schema = yup.object().shape({
  title: yup.string().required('Không bỏ trống trường này'),
  price: yup
    .number()
    .typeError('Giá tiền phải là một số')
    .positive('Giá tiền không được âm')
    .required('Không bỏ trống trường này')
})

const PostAdd = () => {
  const navigate = useNavigate()
  const { categories } = useCategory()
  const { auth } = useAth()
  const [thumbnail, setThumbnail] = useState<string>('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [categorySelected, setCategorySelected] = useState<Category | undefined>(undefined)
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors }
  } = useForm<Post>({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const watchStatus = watch('status')
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: (body: Post) => createPost<Post>(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      })
      toast.success(CreatePostMessage.SUCCESS)
      navigate('/manage/post')
    },
    onError: (err) => {
      toast.error(CreatePostMessage.FAILED)
    }
  })

  useEffect(() => {
    document.title = 'Cụ Đồ Tiễm - Thêm tin đăng'
  }, [])

  const handleEditorChange = (content: string) => {
    setContent(content)
  }

  const handleChangeImageUrls = (imageUrls: string[]) => {
    setImageUrls(imageUrls)
  }

  const handleImageUpload = async (blobInfo: any) => {
    const formData = new FormData()
    formData.append('image', blobInfo.blob())
    const response = await HttpRequest.post<any>(
      `${import.meta.env.VITE_IMGBB_URL}?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data.data.url
  }

  // handle event
  const onSubmit = async (body: Post) => {
    body.imageUrls = [thumbnail, ...imageUrls]
    body.content = content
    body.categoryCode = categorySelected?.code
    createPostMutation.mutate(body)
  }
  const handleClickOption = (item: Category) => {
    setCategorySelected(item)
  }

  const handleChangeThumbnail = (thumbnail: string) => {
    setThumbnail(thumbnail)
  }

  return (
    <>
      <DashboardHeading>Tạo tin đăng</DashboardHeading>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-3'>
          <FormGroup>
            <Label className={`${errors.title && 'text-red-400'}`}>Tiêu đề</Label>
            <Input control={control} placeholder='Tiêu đề tin đăng' name='title' error={errors.title?.message} />
          </FormGroup>
          <FormGroup>
            <Label>Danh mục</Label>
            <Dropdown>
              <Dropdown.Select placeholder={categorySelected ? categorySelected.name : 'Chọn danh mục'} />
              <Dropdown.List>
                {categories?.map((item: Category) => (
                  <Dropdown.Option option={item} key={item.id} onClick={handleClickOption}>
                    {item.name}
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
              <span></span>
            </Dropdown>
          </FormGroup>
          {auth?.roles.includes(Role.ADMIN || Role.MODERATOR) && (
            <FormGroup>
              <Label>Trạng thái</Label>
              <div className='flex gap-x-6'>
                <Radio
                  id='pending'
                  control={control}
                  name='status'
                  value={PostStatus.PENDING}
                  checked={watchStatus === PostStatus.PENDING}
                >
                  Đang xử lý
                </Radio>
                <Radio
                  id='approved'
                  control={control}
                  name='status'
                  value={PostStatus.APPROVED}
                  checked={watchStatus === PostStatus.APPROVED}
                >
                  Đã duyệt
                </Radio>
                <Radio
                  id='reject'
                  control={control}
                  name='status'
                  value={PostStatus.REJECTED}
                  checked={watchStatus === PostStatus.REJECTED}
                >
                  Từ chối
                </Radio>
              </div>
            </FormGroup>
          )}
          <FormGroup>
            <Label className={`${errors.title && 'text-red-400'}`}>Giá bán</Label>
            <Input
              control={control}
              placeholder='Giá của bạn'
              name='price'
              type='number'
              error={errors.price?.message}
            ></Input>
          </FormGroup>
        </div>
        <div className='flex items-center gap-x-3'>
          <FormGroup>
            <Label>Thumbnail</Label>
            <Image to='post/thumbnail' handleChangeThumbnail={handleChangeThumbnail} />
          </FormGroup>
          <FormGroup>
            <Label>Các ảnh khác</Label>
            <div className='grid grid-cols-5'></div>
            <ImageUpload to='post/imgs' multiple handleChangeImageUrls={handleChangeImageUrls} imageUrls={imageUrls} />
          </FormGroup>
        </div>
        <FormGroup>
          <Label>Nội dung</Label>
          <div className='entry-content'>
            <Editor
              apiKey={ENV.TINY_MCE_KEY}
              value={content}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'editimage',
                  'wordcount'
                ],
                toolbar:
                  'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                images_upload_handler: handleImageUpload
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </FormGroup>
        <Button
          className='w-full max-w-[50%] mx-auto h-10'
          type='submit'
          isloading={createPostMutation.isLoading}
          disabled={!isValid}
        >
          {auth?.roles.includes(Role.ADMIN) ? 'Đăng bài' : 'Gửi yêu cầu đăng bài'}
        </Button>
      </form>
    </>
  )
}

export default PostAdd
