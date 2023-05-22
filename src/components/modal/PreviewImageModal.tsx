/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { twMerge } from 'tailwind-merge'
import IconClose from '../icon/IconClose'

interface PreviewImageModalProps {
  visible?: boolean
  fileName?: string
  path?: string
  handleClose?: () => void
}

const PreviewImageModal = ({ visible, fileName, path, handleClose }: PreviewImageModalProps) => {
  return (
    <div
      className={twMerge(
        `invisible opacity-0 fixed inset-0 z-[9999] box-center`,
        `${visible && 'visible opacity-100 transition-all duration-300'}`
      )}
    >
      <div className='absolute z-20 pb-[30%] pl-[50%] w-1 bg-white rounded-md p-5 overflow-hidden'>
        <img
          src={path}
          alt=''
          className='absolute inset-0 p-5 pt-8 rounded-md overflow-hidden w-full h-full object-cover'
        />
        <span className='absolute ml-5 top-2 left-0 font-medium text-sm'>{fileName}</span>
        <span className='absolute mr-5 top-2 right-0 cursor-pointer' onClick={handleClose}>
          <IconClose />
        </span>
      </div>
      <div className='absolute z-10 inset-0 bg-gray-900 opacity-50'></div>
    </div>
  )
}

export default PreviewImageModal
