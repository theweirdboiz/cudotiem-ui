import { PostStatus } from '~/types/post.type'
import { IconLabel } from '~/components/icon'

type Props = {
  status?: PostStatus
}
const LabelPostStatus = (props: Props) => {
  const { status } = props
  let styleClassnames, text
  switch (status) {
    case PostStatus.APPROVED:
      styleClassnames = 'text-green-500'
      text = 'Đã duyệt'
      break
    case PostStatus.PENDING:
      styleClassnames = 'text-yellow-500'
      text = 'Đang xử lý'
      break
    case PostStatus.REJECTED:
      text = 'Từ chối'
      styleClassnames = 'text-red-500'
      break
    default:
      styleClassnames = 'text-gray-500'
      break
  }
  return (
    <div className={`inline-flex items-center gap-x-1 text-sm font-medium ${styleClassnames}`}>
      <div className='flex-shrink-0'>
        <IconLabel w={5} h={5} />
      </div>
      <span>{text}</span>
    </div>
  )
}

export default LabelPostStatus
