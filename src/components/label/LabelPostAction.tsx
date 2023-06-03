import { PostStatus } from '~/types/post.type'

type Props = {
  status?: PostStatus
}
const LabelPostStatus = (props: Props) => {
  const { status } = props
  let styleClassnames, text
  switch (status) {
    case PostStatus.APPROVED:
      // text = 'Đã duyệt'
      styleClassnames = 'text-red-500'
      text = 'Từ chối duyệt'
      break
    case PostStatus.UPDATE_PENDING:
      styleClassnames = 'text-yellow-500'
      text = 'Yêu cầu cập nhật'
      break
    case PostStatus.CREATE_PENDING:
      styleClassnames = 'text-yellow-500'
      text = 'Đang chờ duyệt'
      break
    case PostStatus.UPDATE_REJECTED:
      text = 'Từ chối cập nhật'
      styleClassnames = 'text-green-500'
      break
    case PostStatus.CREATE_REJECTED:
      text = '123'
      styleClassnames = 'text-red-500'
      break
    default:
      styleClassnames = 'text-gray-500'
      text = 'Tin bị ẩn'
      break
  }
  return <span className={styleClassnames}>{text}</span>
}

export default LabelPostStatus
