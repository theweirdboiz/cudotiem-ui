import { Link } from 'react-router-dom'
import { Post } from '~/types/post.type'
import uploadImage from '~/assets/img-upload.png'

type Props = {
  data: Post
}

const PostComponent = (props: Props) => {
  const { data } = props

  return (
    <>
      <Link to={`/${data?.slug}`} className='rounded-md border border-gray-100 bg-white hover:shadow-lg'>
        <div className='w-40 h-40 mt-3 mx-auto'>
          <img src={uploadImage} alt='' className='' />
        </div>
        <div className='py-2 px-6 bg-white text-gray-800'>
          <h3 className='text-xs  mb-2'>{data.title}</h3>
          <h4 className=' font-semibold mb-1'>
            {data?.price}
            <span className='underline'>đ</span>
          </h4>
        </div>
      </Link>
    </>
  )
}

export default PostComponent
