import uploadImage from '~/assets/img-upload.png'

interface ImageProps {
  multiple?: boolean
  onChange: (e: any) => Promise<void>
}

const ImageUpload = (props: ImageProps) => {
  const { onChange, multiple = false } = props
  return (
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed border-blue-300 w-full rounded-lg relative h-[200px] overflow-hidden transition-all duration-300 hover:bg-gray-200`}
    >
      <input type='file' className='hidden' multiple={multiple} onChange={(e) => onChange(e.target.files?.[0])} />

      <div className='flex flex-col items-center text-center'>
        <img src={uploadImage} alt='' className='max-w-[80px] mb-5' />
        <p className='font-semibold'>{multiple ? 'Chọn một hoặc nhiều ảnh' : 'Chọn một'}</p>
      </div>
    </label>
  )
}
export default ImageUpload
