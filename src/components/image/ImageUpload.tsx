import { ChangeEvent, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import uploadImage from '~/assets/img-upload.png'
import Image from './Image'

interface ImageProps {
  to: string
  multiple?: boolean
  imageUrls?: string[]
  handleChangeImageUrls: (imageUrls: string[]) => void
}

const ImageUpload = ({ to, imageUrls, handleChangeImageUrls, multiple }: ImageProps) => {
  const [files, setFiles] = useState<File[] | null>(null)

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!files) {
      setFiles(Array.from(e.target.files || []))
    } else {
      setFiles((prev) => prev && [...prev, ...Array.from(e.target.files || [])])
    }
  }
  const handleDeleteFile = (file: File) => {
    const newFiles = files && [...files]
    newFiles && setFiles(newFiles.filter((f) => f.name != file.name))
  }
  const handleDeleteImageUrl = (imageUrl: string) => {
    const newImageUrls = imageUrls?.filter((imgUrl) => imgUrl !== imageUrl)
    newImageUrls && handleChangeImageUrls(newImageUrls)
  }
  const handleAddImageUrl = (imageUrl: string) => {
    imageUrls && handleChangeImageUrls([...imageUrls, imageUrl])
  }

  return (
    <>
      <label
        htmlFor='post_imgs'
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
            'absolute rounded-md object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3  transition-all duration-300 visible opacity-100'
          )}
        />
      </label>
      <span className='font-medium text-xs text-primary'>Chọn 5 ảnh để mô tả rõ hơn sản phẩm</span>
      <input id='post_imgs' type='file' className='hidden' multiple={multiple} onChange={handleOnchange} />
      <div className='grid grid-cols-5'>
        {files?.map((file, index) => (
          <Image
            key={file.name}
            to={to}
            file={file}
            count={index}
            handleDeleteImageUrl={handleDeleteImageUrl}
            handleDeleteFile={handleDeleteFile}
            handleAddImageUrl={handleAddImageUrl}
          />
        ))}
      </div>
    </>
  )
}
export default ImageUpload
