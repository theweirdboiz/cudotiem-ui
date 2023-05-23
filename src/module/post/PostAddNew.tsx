import ImageUpload from '~/components/image/ImageUpload'
import Image from '~/components/image/Image'
import DashboardHeading from '~/layouts/dashboard/components/DashboardHeading'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useFirebaseImage } from '~/hooks'
import { useEffect, useState } from 'react'
import { useAth, useCategory } from '~/contexts'
import { toast } from 'react-toastify'
import { FormStatePostType, PostStatus } from '~/types/post.type'
import { HttpRequest } from '~/ultis'
import { FormGroup, Input, Label, Dropdown, Button, Radio, Spinner } from '~/components'
import { ENV, POST_DEFAULT_VALUE } from '~/config/constant'
import { Editor } from '@tinymce/tinymce-react'
import { createPost } from '~/services'
import { Category } from '~/types/category.type'
import { Role } from '~/types/role.type'

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
  /* form init */

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isValid, errors }
  } = useForm<FormStatePostType>({
    // defaultValues: POST_DEFAULT_VALUE,
    mode: 'all',
    resolver: yupResolver(schema)
  })
  const { auth } = useAth()
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: (body: FormStatePostType) => createPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      })
      reset(POST_DEFAULT_VALUE)
      setCategorySelected('')
      setContent('')
      // handleResetUpload()
      toast.success('Thêm Post mới thành công!')
    },
    onError: (err) => {
      toast.error('Thêm tin đăng không thành công, hãy thử lại')
    }
  })

  const watchStatus = watch('status')

  const { categories } = useCategory()
  const [content, setContent] = useState('')
  const [categorySelected, setCategorySelected] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')

  useEffect(() => {
    document.title = 'Cụ Đồ Tiễm - Thêm tin đăng'
  }, [])

  const handleEditorChange = (content: string) => {
    setContent(content)
  }
  const handleChangeThumbnail = (thumbnail: string) => {
    setThumbnail(thumbnail)
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
  const onSubmit = async (body: FormStatePostType) => {
    body.imageUrls = [thumbnail]
    body.content = content
    createPostMutation.mutate(body)
  }
  const handleClickOption = (item: any) => {
    setValue('idCategory', item.id)
    setCategorySelected(item.name)
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
              <Dropdown.Select placeholder={categorySelected ? categorySelected : 'Chọn danh mục'} />
              <Dropdown.List>
                {categories?.map((item: Category) => (
                  <Dropdown.Option key={item.id} onClick={() => handleClickOption(item)}>
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
            <Image to='post/thumbnail' onChange={handleChangeThumbnail} />
          </FormGroup>
          <FormGroup>
            <Label>Các ảnh khác</Label>
            {/* <ImageUpload multiple onChange={handleUploadImage} /> */}
          </FormGroup>
        </div>
        {/* <FormGroup>
          <div className='grid grid-cols-5 gap-3'>
            {paths?.map((path) => (
              <Image
                name='image'
                onChange={handleUploadImage}
                process={process}
                path={path}
                handleDeleteImage={handleDeleteImage}
                key={path}
              ></Image>
            ))}
            <ImageUpload multiple onChange={handleUploadImage}></ImageUpload>
          </div>
        </FormGroup> */}
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
          style={{
            width: '100%',
            maxWidth: '50%',
            margin: '0 auto'
          }}
          height='h-10'
          type='submit'
          isloading={createPostMutation.isLoading}
          disabled={!isValid}
        >
          Add Post
        </Button>
      </form>
    </>
  )
}

export default PostAdd
