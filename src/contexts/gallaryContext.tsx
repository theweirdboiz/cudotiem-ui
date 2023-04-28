import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

interface GallaryProps {
  mainImage: string
  handleImageClick: (image: string) => void
}

const GallaryContext = createContext<GallaryProps | null>(null)

export const GallaryProvider = ({ children }: { children: ReactNode }) => {
  const [mainImage, setMainImage] = useState<string>('https://picsum.photos/200/300')
  const handleImageClick = (image: string) => {
    setMainImage(image)
  }
  const value = {
    mainImage,
    handleImageClick
  }
  return <GallaryContext.Provider value={value}>{children}</GallaryContext.Provider>
}

export const useGallary = () => {
  const context = useContext(GallaryContext)
  if (!context) {
    throw new Error('useGallary must be used within a GallaryContext')
  }
  return context
}
