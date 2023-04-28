import React, { useState } from 'react'
import { useGallary } from '~/contexts'
import MainItem from './MainItem'
import SubItem from './SubItem'

type Props = {
  images: string[] | undefined
}

const Gallary = (props: Props) => {
  const { images } = props
  const { mainImage, handleImageClick } = useGallary()

  return (
    <div className='gallary max-w-[460px] w-full mb-3'>
      <MainItem src={mainImage}></MainItem>
      <div className='img-container grid grid-cols-5 gap-x-3 px-3'>
        {images?.map((image) => (
          <SubItem src={image} onClick={handleImageClick} key={image} />
        ))}
      </div>
    </div>
  )
}

export default Gallary
