import React from 'react'
import { ImageProps } from '~/types/img.type'

type Props = {}

const useCreateImageFirebase = () => {
  const createImageFactory = (file: File | undefined) => {
    const name = file && file.name
    const storePath = `images/posts/${Date.now()}` as string
    const tempPath = URL.createObjectURL(file as any)
    return { name, storePath, e: file, tempPath } as ImageProps
  }
  return { createImageFactory }
}

export default useCreateImageFirebase
