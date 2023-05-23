/* eslint-disable jsx-a11y/label-has-associated-control */
import uploadImage from '~/assets/img-upload.png'
import Spinner from '../spinner/Spinner'
import PreviewImageModal from '../modal/PreviewImageModal'
import { useEffect, useState } from 'react'
import { useFirebaseImage } from '~/hooks'
import { twMerge } from 'tailwind-merge'
import { IconEyeToggle, IconGarbage } from '../icon'
interface ImageProps {
  to: string
  onChange?: (thumbnail: string) => void
}
const Image = ({ to, onChange }: ImageProps) => {
  const { process, fileName, path, errorMsg, handleUploadImage, handleDeleteImage } = useFirebaseImage()
  const [preview, setPreview] = useState<boolean>(false)
  const handlePreviewImage = () => {
    setPreview(!preview)
  }
  const handleClose = () => {
    setPreview(false)
  }
  const handleChangeThumbnail = async (e: File | undefined) => {
    await handleUploadImage(to, e)
  }
  useEffect(() => {
    onChange && onChange(path), [path]
  })
  return (
    <>
      <PreviewImageModal visible={preview} handleClose={handleClose} path={path} fileName={fileName} />
      <label
        htmlFor={`${!path && 'post_thumbnail'}`}
        className={twMerge(
          'relative pb-[50%] pl-[50%] w-1 overflow-hidden border border-dashed border-blue-300 cursor-pointer rounded-lg transition-all duration-300 group',
          'hover:bg-gray-200'
        )}
      >
        {/* iddle */}
        <img
          src={uploadImage}
          alt='upload-img'
          className={twMerge(
            'absolute rounded-md object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3  transition-all duration-300 visible opacity-100',
            `${process !== 0 && 'invisible opacity-0'}`
          )}
        />
        {/* pending */}
        <div
          className={twMerge(
            'absolute inset-0 box-center invisible opacity-0',
            `${process > 0 && process < 100 && 'visible opacity-100'}`
          )}
        >
          <Spinner />
        </div>
        {/* success*/}
        <img
          src={path}
          alt='upload-img'
          className={twMerge(
            'absolute rounded-md object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 invisible opacity-0 transition-all duration-300',
            `${path && process === 100 && 'w-full h-full visible opacity-100'}`
          )}
        />
        <div
          className={twMerge(
            'absolute inset-0 transition-all duration-300 bg-gray-300 opacity-0 invisible box-center gap-x-3',
            `${path && 'group-hover:visible group-hover:opacity-80 z-50'}`
          )}
        >
          <IconEyeToggle toggle onClick={handlePreviewImage} />
          <IconGarbage strokeWidth={1.5} onClick={() => handleDeleteImage(path)} />
        </div>
      </label>
      <span className='font-medium text-xs text-primary'>{`${
        errorMsg
          ? errorMsg
          : process === 100
          ? 'Tải lên thành công'
          : process > 0 && process < 100
          ? 'Đang tải lên'
          : 'Chọn một ảnh'
      }`}</span>
      <input
        id='post_thumbnail'
        type='file'
        className='hidden'
        onChange={(e) => handleChangeThumbnail(e.target.files?.[0])}
      />
    </>
  )
}
export default Image
