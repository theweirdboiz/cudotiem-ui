import { useAth } from '~/contexts'
import { PostStatus } from '~/types/post.type'
import { Role } from '~/types/role.type'

type Props = {
  status?: PostStatus
}
const LabelPostStatus = (props: Props) => {
  const { status } = props
  const { auth } = useAth()
  let styleClassnames, text
  if (auth?.role === Role.USER) {
    switch (status) {
      case PostStatus.APPROVED:
        styleClassnames = 'text-gray-500'
        text = 'Ẩn tin'
        break
      case PostStatus.UPDATE_PENDING:
        styleClassnames = 'text-yellow-500'
        text = 'Gửi yêu cầu cập nhật'
        break
      case PostStatus.CREATE_PENDING:
        styleClassnames = 'text-green-500'
        text = 'Gửi yêu cầu đăng tin'
        break
      case PostStatus.UPDATE_REJECTED:
        text = 'Hủy yêu cầu cập nhật'
        styleClassnames = 'text-red-500'
        break
      case PostStatus.CREATE_REJECTED:
        text = 'Hủy yêu cầu tạo'
        styleClassnames = 'text-red-500'
        break
      default:
        styleClassnames = 'text-gray-500'
        text = 'Ẩn tin'
        break
    }
  }
  if (auth?.role === Role.ADMIN)
    switch (status) {
      case PostStatus.APPROVED:
        styleClassnames = 'text-green-500'
        text = 'Duyệt'
        break
      case PostStatus.UPDATE_PENDING:
      case PostStatus.CREATE_PENDING:
      case PostStatus.UPDATE_REJECTED:
      case PostStatus.CREATE_REJECTED:
        text = 'Từ chối'
        styleClassnames = 'text-red-500'
        break
      default:
        break
    }
  return <span className={styleClassnames}>{text}</span>
}

export default LabelPostStatus
