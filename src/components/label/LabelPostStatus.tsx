import { PostStatus } from '~/types/post.type'
import { IconLabel } from '~/components/icon'
import { useAth } from '~/contexts'
import { Role } from '~/types/role.type'

type Props = {
  status?: PostStatus
}
const LabelPostStatus = (props: Props) => {
  const { status } = props
  const { auth } = useAth()
  let styleClassnames, text
  if (auth?.role === Role.ADMIN) {
    switch (status) {
      case PostStatus.APPROVED:
        styleClassnames = 'text-green-500'
        text = 'Tin đã đăng'
        break
      case PostStatus.UPDATE_PENDING:
        styleClassnames = 'text-yellow-500'
        text = 'Yêu cầu cập nhật'
        break
      case PostStatus.CREATE_PENDING:
        styleClassnames = 'text-yellow-500'
        text = 'Tin đang chờ duyệt'
        break
      case PostStatus.UPDATE_REJECTED:
        styleClassnames = 'text-red-500'
        text = 'Tin bị từ chối cập nhật'
        break
      case PostStatus.CREATE_REJECTED:
        text = 'Tin bị từ chối duyệt'
        styleClassnames = 'text-red-500'
        break
      default:
        styleClassnames = 'text-gray-500'
        text = 'Tin bị ẩn'
        break
    }
  }
  if (auth?.role === Role.USER) {
    switch (status) {
      case PostStatus.APPROVED:
        styleClassnames = 'text-green-500'
        text = 'Tin đã được duyệt'
        break
      case PostStatus.UPDATE_PENDING:
        styleClassnames = 'text-yellow-500'
        text = 'Tin được yêu cầu cập nhật'
        break
      case PostStatus.CREATE_PENDING:
        styleClassnames = 'text-green-500'
        text = 'Tin đang chờ duyệt'
        break
      case PostStatus.UPDATE_REJECTED:
        styleClassnames = 'text-red-500'
        text = 'Tin bị từ chối cập nhật'
        break
      case PostStatus.CREATE_REJECTED:
        text = 'Tin bị từ chối duyệt'
        styleClassnames = 'text-red-500'
        break
      default:
        styleClassnames = 'text-gray-300'
        text = 'Tin bị ẩn'
        break
    }
  }
  return (
    <div className={`inline-flex items-center gap-x-1 text-sm font-medium ${styleClassnames}`}>
      <span>{text}</span>
    </div>
  )
}

export default LabelPostStatus
