import { useState } from 'react'
import { toast } from 'react-toastify'
import { storage } from '~/firebase-app/firebase-config'
import { ref, uploadBytesResumable, deleteObject, getDownloadURL } from 'firebase/storage'

interface FirebaseImageProps {
  path: string
  process: number
  fileName: string
  errorMsg: string
}
interface ImageProps {
  e: File
  name?: string
  tempPath?: string
  storePath: string
}
const useFirebaseImage = () => {
  const [image, setImage] = useState<FirebaseImageProps>({
    errorMsg: '',
    fileName: '',
    path: '',
    process: 0
  })
  // const handleUploadImage = async (folder: string, e: File | undefined) => {
  //   if (!e) return
  //   const file: File = e
  //   const imageRef = ref(storage, `images/${folder}/${Date.now()}${file.name}`)
  //   const newImage: FirebaseImageProps = {
  //     errorMsg: '',
  //     fileName: '',
  //     path: '',
  //     process: 0
  //   }

  //   newImage.fileName = file.name
  //   const uploadTask = uploadBytesResumable(imageRef, file)
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       newImage.process = progressPercent
  //       // console.log('upload is ' + progressPercent + '% done')
  //       // switch (snapshot.state) {
  //       //   case 'paused':
  //       //     console.log('upload is paused')
  //       //     break
  //       //   case 'running':
  //       //     console.log('upload is running')
  //       //     break
  //       //   default:
  //       //     console.log('nothing at all')
  //       //     break
  //       // }
  //     },
  //     (err) => {
  //       console.log(err)
  //       newImage.errorMsg = 'Tải ảnh lên không thành công'
  //     },
  //     async () => {
  //       await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
  //         setImage((prev) => ({ ...prev, ...newImage, path: downloadUrl }))
  //       })
  //     }
  //   )
  // }
  // const handleUploadImage = async (image: ImageProps) => {
  //   if (image) {
  //     const file = image.e
  //     const imageRef = ref(storage, image.storePath)
  //     setImage((prev) => ({ ...prev, fileName: file.name }))
  //     const uploadTask = uploadBytesResumable(imageRef, file)
  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         setImage((prev) => ({ ...prev, process: progressPercent }))
  //       },
  //       (err) => {
  //         setImage((prev) => ({ ...prev, process: 0, errorMsg: 'Tải ảnh lên không thành công' }))
  //       },
  //       async () => {
  //         const result = await getDownloadURL(uploadTask.snapshot.ref)
  //         return result
  //       }
  //     )
  //   }
  // }
  // const handleUploadImage = async (images: ImageProps[]) => {
  //   let result = []
  //   for (const image of images) {
  //     if (image) {
  //       const file = image.e
  //       const imageRef = ref(storage, image.storePath)
  //       // setImage((prev) => ({ ...prev, fileName: file.name }))
  //       result.push(uploadBytesResumable(imageRef, file))
  //       // const result = await new Promise<string>((resolve, reject) => {
  //       //   uploadTask.on(
  //       //     'state_changed',
  //       //     (snapshot) => {
  //       //       const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       //       setImage((prev) => ({ ...prev, process: progressPercent }))
  //       //     },
  //       //     (err) => {
  //       //       setImage((prev) => ({ ...prev, process: 0, errorMsg: 'Tải ảnh lên không thành công' }))
  //       //       reject(err)
  //       //     },
  //       //     async () => {
  //       //       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
  //       //       resolve(downloadURL)
  //       //     }
  //       //   )
  //       // })

  //       // Access the resolved value outside the uploadTask.on() method
  //       // Further code execution with the obtained result
  //     }
  //   }
  //   await Promise.all(result)
  // }

  const handleUploadImage = async (images: ImageProps[]): Promise<string[]> => {
    let result: Promise<string>[] = []
    for (const image of images) {
      if (image) {
        const file = image.e
        const imageRef = ref(storage, image.storePath)
        // setImage((prev) => ({ ...prev, fileName: file.name }))
        const uploadTask = uploadBytesResumable(imageRef, file)
        const downloadURLPromise = uploadTask.then((snapshot) => getDownloadURL(snapshot.ref) as Promise<string>)
        result.push(downloadURLPromise as any)
      }
    }
    return Promise.all(result)
  }
  // const handleDeleteImage = async (img: ImageProps) => {
  //   const imageRef = ref(storage, img.storePath)
  //   if (img) await deleteObject(imageRef)
  // }
  const handleDeleteImage = async (imgs: ImageProps[]) => {
    let result = []
    for (const img of imgs) {
      const imageRef = ref(storage, img.storePath)
      result.push(deleteObject(imageRef))
    }
    await Promise.all(result)
  }

  const handleResetUpload = () => {
    // setPaths([])
    // setProcess(0)
    setImage((prev) => ({ ...prev, path: '', process: 0 }))
  }
  // const handlePreviewImage = () => {
  // }
  return {
    handleUploadImage,
    handleDeleteImage,
    handleResetUpload,
    process: image.process,
    fileName: image.fileName,
    errorMsg: image.errorMsg,
    path: image.path,
    image,
    setImage
  }
}
export default useFirebaseImage
