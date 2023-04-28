import { FormGroup, Input, Label, Dropdown, Radio, Button } from '~/components'
import useFirebaseImage from '~/hooks/useFirebaseImage'
import DashboardHeading from '~/layouts/dashboard/components/DashboardHeading'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ImageUpload from '~/components/image/ImageUpload'
import Image from '~/components/image/Image'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FormStatePostType, PostStatus } from '~/types/post.type'
import { HttpRequest } from '~/ultis'
import { getPost, updatePost } from '~/services'
import { ENV } from '~/config/constant'
import { Editor } from '@tinymce/tinymce-react'
import { useCategory } from '~/contexts'
import { Category } from '~/types/category.type'

/* Schema for validation */
const schema = yup.object().shape({
  title: yup.string().required('This field is required')
})

const PostUpdate = () => {
  /*Get `id` from path param */
  const { id } = useParams()

  /* Using instance of react-query */
  const queryClient = useQueryClient()
  /* Get post by id */
  const { data: post } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id as string),
    enabled: id !== undefined
  })
  useEffect(() => {
    if (post) {
      setContent(post?.content as string)
      setPaths(post?.imageLinks as string[])
      setCategorySelected(post?.category?.name as string)
      reset(post)
    }
  }, [post])
  /* Form init */
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid }
  } = useForm<FormStatePostType>({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  /* Manage `status` */
  const watchStatus = watch('status')
  const watchCategory = watch('id_category')

  /* local state*/
  const categories = useCategory()
  const [categorySelected, setCategorySelected] = useState<string>('')
  const [content, setContent] = useState<string | undefined>()

  const { paths, setPaths, process, handleDeleteImage, handleUploadImage } = useFirebaseImage('posts')

  /* Submit form*/
  const onSubmit = async (body: FormStatePostType) => {
    body.content = content as string
    body.imageLinks = paths
    body.id_category = Number(watchCategory)

    updatePostMutation.mutate(body, {
      onSuccess: () => {
        toast.success('Cập nhật tin thành công')
      },
      onError: () => {
        toast.error('Cập nhật tin đăng không thành công, hãy thử lại')
      }
    })
  }
  /*Handle events*/
  //update post
  const updatePostMutation = useMutation({
    mutationFn: (body: FormStatePostType) => updatePost(id as string, body),
    onSuccess: (data) => {
      queryClient.setQueryData(['post', id], data)
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true
      })
    }
  })
  //select category
  const handleClickOption = (item: any) => {
    setValue('id_category', item.id)
    setCategorySelected(item.name)
  }
  //change content
  const handleEditorChange = (content: string) => {
    setContent(content)
  }
  //upload image on cloud server (content)
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
  return (
    <>
      <DashboardHeading>Cập nhật tin đăng</DashboardHeading>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-3'>
          <FormGroup>
            <Label>Tiêu đề</Label>
            <Input control={control} placeholder='Enter your title' name='title' required />
          </FormGroup>
          <FormGroup>
            <Label>Danh mục</Label>
            <Dropdown>
              <Dropdown.Select placeholder={categorySelected || 'Select the category'} />
              <Dropdown.List>
                {categories.map((item: Category) => (
                  <Dropdown.Option key={item.id} onClick={() => handleClickOption(item)}>
                    {item.name}
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
              <span></span>
            </Dropdown>
          </FormGroup>

          <FormGroup>
            <Label>Giá bán</Label>
            <Input control={control} placeholder='Giá của bạn' name='price' type='number'></Input>
          </FormGroup>
          <FormGroup>
            <Label>Trạng thái</Label>
            <div className='flex gap-x-16'>
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
                Bị từ chối
              </Radio>
            </div>
          </FormGroup>
        </div>
        <FormGroup>
          <Label>Hình ảnh</Label>
          <div className='grid grid-cols-5 gap-3'>
            {paths.map((path) => (
              <Image
                name='image'
                onChange={handleUploadImage}
                process={process}
                path={path}
                handleDeleteImage={handleDeleteImage}
                key={path}
              ></Image>
            ))}
            <ImageUpload onChange={handleUploadImage}></ImageUpload>
          </div>
        </FormGroup>
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
          isloading={isSubmitting}
          disabled={!isValid}
          classnames={isSubmitting ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-100'}
        >
          Cập nhật tin đăng
        </Button>
      </form>
    </>
  )
}

export default PostUpdate
