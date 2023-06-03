/* eslint-disable jsx-a11y/label-has-associated-control */
import uploadImage from '~/assets/img-upload.png'
import PreviewImageModal from '../modal/PreviewImageModal'
import { ChangeEvent, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconEyeToggle, IconGarbage } from '../icon'
interface ImageProps {
  [key: string]: any
  onInvoke?: (tempPath: string) => void
}
const Image = ({ onChange, image, onInvoke, multiple = false, children }: ImageProps) => {
  const [preview, setPreview] = useState<boolean>(false)
  const [htmlFor, setHtmlFor] = useState<boolean>(true)

  const id = multiple ? 'post_imgs' : 'post_thumbnail'

  const handlePreviewImage = () => {
    setPreview(!preview)
    setHtmlFor(false)
  }
  const handleClose = () => {
    setPreview(false)
    setHtmlFor(true)
  }
  const handleInvokeImage = () => {
    onInvoke && onInvoke(image?.tempPath)
    // setHtmlFor(true)
  }
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInvokeImage()
    onChange(e)
    multiple ? setHtmlFor(true) : setHtmlFor(false)
  }
  useEffect(() => {
    setHtmlFor(true)
  }, [])
  return (
    <>
      <PreviewImageModal visible={preview} handleClose={handleClose} path={image?.tempPath} fileName={image?.name} />
      <label
        htmlFor={htmlFor ? id : ''}
        className={twMerge(
          'relative pb-[50%] pl-[50%] w-1 overflow-hidden border border-dashed border-blue-300 cursor-pointer rounded-lg transition-all duration-300 group',
          'hover:bg-gray-200'
        )}
      >
        {/* success*/}
        <img
          src={image?.tempPath || uploadImage}
          alt='upload-img'
          className={twMerge(
            'absolute rounded-md object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full visible opacity-100 transition-all duration-300'
          )}
        />
        <div
          className={twMerge(
            'absolute inset-0 transition-all duration-300 bg-gray-300 opacity-0 invisible box-center gap-x-3',
            `${image?.tempPath && 'group-hover:visible group-hover:opacity-80 z-50'}`
          )}
        >
          <IconEyeToggle toggle onClick={handlePreviewImage} />
          <IconGarbage strokeWidth={1.5} onClick={handleInvokeImage} />
        </div>
      </label>
      <span className='font-medium text-xs text-primary'>{children}</span>
      <input id={id} type='file' multiple={!!multiple} className='hidden' onChange={handleOnChange} />
      {multiple}
    </>
  )
}
export default Image
