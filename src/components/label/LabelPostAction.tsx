import { PostStatus } from '~/types/post.type'
import { Role } from '~/types/role.type'

type Props = {
  status?: PostStatus
  role?: Role
}
const LabelPostStatus = (props: Props) => {
  const { status, role } = props
  let styleClassnames, text
  if (role === Role.USER) {
    switch (status) {
      case PostStatus.APPROVED:
        styleClassnames = 'text-gray-200'
        text = 'Ẩn tin'
      //   break
      case PostStatus.UPDATE_PENDING:
        styleClassnames = 'text-red-500'
        text = 'Hủy yêu cầu cập nhật'
        break
      case PostStatus.CREATE_PENDING:
        styleClassnames = 'text-red-500'
        text = 'Hủy yêu cầu tạo'
        break
      case PostStatus.UPDATE_REJECTED:
        text = 'Gửi lại yêu cầu cập nhật'
        styleClassnames = 'text-yellow-500'
        break
      case PostStatus.CREATE_REJECTED:
        text = 'Gửi lại yêu cầu tạo'
        styleClassnames = 'text-yellow-500'
        break
      default:
        // styleClassnames = 'text-gray-500'
        // text = 'Tin bị ẩn'
        break
    }
  }
  if (role === Role.ADMIN)
    switch (status) {
      case PostStatus.APPROVED:
        styleClassnames = 'text-red-500'
        text = 'Ẩn tin'
        break
      case PostStatus.UPDATE_PENDING:
        styleClassnames = 'text-red-500'
        text = 'Từ chối yêu cầu cập nhật'
        break
      case PostStatus.CREATE_PENDING:
        styleClassnames = 'text-red-500'
        text = 'Từ chối yêu cầu tạo'
        break
      case PostStatus.UPDATE_REJECTED:
        // text = ''
        // styleClassnames = 'text-green-500'
        break
      case PostStatus.CREATE_REJECTED:
        // text = ''
        // styleClassnames = 'text-red-500'
        break
      default:
        break
    }
  return <span className={styleClassnames}>{text}</span>
}

export default LabelPostStatus
