import Image from '~/components/image/Image'
import DashboardHeading from '~/layouts/dashboard/components/DashboardHeading'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAth, useCategory } from '~/contexts'
import { toast } from 'react-toastify'
import { Post, PostDetail, PostStatus } from '~/types/post.type'
import { HttpRequest } from '~/ultis'
import { FormGroup, Input, Label, Dropdown, Button, Radio, Spinner } from '~/components'
import { ENV } from '~/config/constant'
import { Editor } from '@tinymce/tinymce-react'
import { getPostById, updatePostById } from '~/services'
import { Category } from '~/types/category.type'
import { Role } from '~/types/role.type'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdatePostMessage } from '~/ultis/message/post.message'
import ImageUpload from '~/components/image/ImageUpload'
import { ImageProps } from '~/types/img.type'
import { useFirebaseImage } from '~/hooks'

/* Schema for validate */
const schema = yup.object().shape({
  title: yup.string().required('Không bỏ trống trường này'),
  price: yup
    .number()
    .typeError('Giá tiền phải là một số')
    .positive('Giá tiền không được âm')
    .required('Không bỏ trống trường này')
})

const PostUpdate = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { auth } = useAth()
  const { id } = useParams()
  const { categories } = useCategory()
  const [thumbnail, setThumbnail] = useState<ImageProps>()
  const [imageUrls, setImageUrls] = useState<ImageProps[]>([])
  const [content, setContent] = useState('')
  const [categorySelected, setCategorySelected] = useState<Category | undefined>(undefined)
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, errors }
  } = useForm<Post>({
    mode: 'all',
    resolver: yupResolver(schema)
  })
  const { handleUploadImage, process, errorMsg } = useFirebaseImage()
  const watchStatus = watch('status')

  // fetch post by slug/id
  const {
    data: post,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => await getPostById<PostDetail>(id as string),
    onSuccess: (data) => {
      document.title = 'Cụ Đồ Tiễm - Cập nhật tin đăng'
      const category = categories?.find((category) => category.name === post?.postDetailResponse.categoryName)
      setCategorySelected(category)
      setThumbnail((prev) => ({ ...prev, storePath: post?.postDetailResponse?.imageUrls?.[0] } as ImageProps))
      setImageUrls((prev) => prev.filter((img) => img.storePath !== thumbnail?.storePath))
      setContent(post?.postDetailResponse.content || '')
      reset(post?.postDetailResponse)
    }
  })

  const handleEditorChange = (content: string) => {
    setContent(content)
  }

  // const handleImageUpload = async (blobInfo: any) => {
  //   const formData = new FormData()
  //   formData.append('image', blobInfo.blob())
  //   const response = await HttpRequest.post<any>(
  //     `${import.meta.env.VITE_IMGBB_URL}?key=${import.meta.env.VITE_IMGBB_KEY}`,
  //     formData,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }
  //   )
  //   return response.data.data.url
  // }
  const updatePostMutation = useMutation({
    mutationFn: (post: Post) => updatePostById<Post>(id as string, post, Role.USER),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      })
      queryClient.invalidateQueries({
        queryKey: ['post', id],
        exact: true
      })
      handleUploadImage(thumbnail as ImageProps)
      for (const img of imageUrls) {
        handleUploadImage(img)
      }
      toast.success(UpdatePostMessage.SUCCESS)
      navigate('/manage/post')
    },
    onError: (err) => {
      toast.error(UpdatePostMessage.FAILED)
    }
  })
  // handle event
  const onSubmit = async (body: Post) => {
    body.imageUrls = [thumbnail?.storePath as string, ...imageUrls.map((img) => img.storePath)]
    body.content = content
    body.categoryCode = categorySelected?.code
    updatePostMutation.mutate(body)
  }
  const handleClickOption = (item: Category) => {
    setCategorySelected(item)
  }

  const handleSelectThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    setThumbnail(createImageFactory(e.target.files?.[0]))
  }
  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    let newImageUrls: ImageProps[] = []
    if (files) {
      for (const file of files) {
        newImageUrls.push(createImageFactory(file))
      }
      setImageUrls((prev) => [...prev, ...newImageUrls])
    }
  }
  const handleInvokeThumbnail = (tempPath: string) => {
    URL.revokeObjectURL(tempPath)
    setThumbnail((prev) => ({ ...prev, tempPath: '' } as ImageProps))
  }
  const handleInvokeImage = (tempPath: string) => {
    setImageUrls((prev) => prev.filter((img) => img.tempPath !== tempPath))
  }
  const createImageFactory = (file: File | undefined) => {
    // const file = e.target.files?.[0]
    const name = file && file.name
    const storePath = `images/posts/${Date.now()}${name}` as string
    const tempPath = URL.createObjectURL(file as any)
    return { name, storePath, e: file, tempPath } as ImageProps
  }
  if (isLoading) return <Spinner />
  // console.log(thumbnail)

  return (
    <>
      {isSuccess && (
        <>
          <DashboardHeading>Cập nhật tin đăng</DashboardHeading>
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
              {/* {auth?.roles.includes(Role.ADMIN || Role.MODERATOR) && (
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
              )} */}
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
            <div className='grid grid-cols-2 gap-3'>
              <FormGroup>
                <Label>Thumbnail</Label>
                <Image image={thumbnail} onChange={handleSelectThumbnail} onInvoke={handleInvokeThumbnail}>
                  Chọn một ảnh
                </Image>
              </FormGroup>
              <FormGroup>
                <Label>Các ảnh khác</Label>
                <Image multiple={true} onChange={handleSelectImage}>
                  Chọn một hoặc nhiều ảnh
                </Image>
              </FormGroup>
            </div>
            <div className='grid grid-cols-5 gap-3 mb-5'>
              {imageUrls.map((img) => (
                <React.Fragment key={img.tempPath}>
                  <Image multiple image={img} onChange={handleSelectImage} onInvoke={handleInvokeImage} />
                </React.Fragment>
              ))}
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
                      'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
                    // images_upload_handler: handleImageUpload
                  }}
                  onEditorChange={handleEditorChange}
                />
              </div>
            </FormGroup>
            <Button
              className='w-full max-w-[50%] mx-auto h-10'
              type='submit'
              loading={updatePostMutation.isLoading}
              disabled={!isValid}
            >
              Cập nhật tin đăng
            </Button>
          </form>
        </>
      )}
    </>
  )
}

export default PostUpdate
