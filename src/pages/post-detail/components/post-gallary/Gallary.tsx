import { useGallary } from '~/contexts'
import MainItem from './MainItem'
import SubItem from './SubItem'
import uploadImage from '~/assets/img-upload.png'
type Props = {
  images: string[] | undefined
}

const Gallary = ({ images }: Props) => {
  const { mainImage, handleImageClick } = useGallary()

  return (
    <div className='gallary max-w-[460px] w-full mb-3'>
      <MainItem src={images?.[0] || uploadImage}></MainItem>
      <div className='img-container grid grid-cols-5 gap-x-3 px-3'>
        {images?.map((image) => image !== images[0] && <SubItem src={image} onClick={handleImageClick} key={image} />)}
      </div>
    </div>
  )
}

export default Gallary
