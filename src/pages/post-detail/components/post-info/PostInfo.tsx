import { Post } from '~/types/post.type'

type Props = {
  info: Post
}

const PostInfo = (props: Props) => {
  const { info } = props
  return (
    <div className='flex flex-col mb-5 p-3'>
      <h3 className='font-semibold text-xl'>Thông tin chi tiết</h3>
      <div className=''>{/* <span>{info?.name}</span> */}</div>
      <span>Key: value</span>
      <span>Key: value</span>
      <span>Key: value</span>
      <span>Key: value</span>
    </div>
  )
}

export default PostInfo
