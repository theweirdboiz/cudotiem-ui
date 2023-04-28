type Props = {
  description?: string
}

const PostDescription = (props: Props) => {
  const { description } = props
  return (
    <div className='p-3'>
      <h3 className='mb-3 font-semibold text-xl'>Mô tả sản phẩm</h3>
      <div className='entry-content' dangerouslySetInnerHTML={{ __html: description || '' }}></div>
    </div>
  )
}

export default PostDescription
