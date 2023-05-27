import { PostStatus } from '~/types/post.type'

type Props = {
  status?: PostStatus
}
const LabelPostStatus = (props: Props) => {
  const { status } = props
  let styleClassnames, text
  switch (status) {
    case PostStatus.PENDING:
    case PostStatus.REJECTED:
      styleClassnames = 'text-green-500'
      text = 'Duyệt tin'
      break
    case PostStatus.APPROVED:
      text = 'Từ chối'
      styleClassnames = 'text-red-500'
      break
    default:
      styleClassnames = 'text-gray-500'
      break
  }
  return <span className={styleClassnames}>{text}</span>
}

export default LabelPostStatus
