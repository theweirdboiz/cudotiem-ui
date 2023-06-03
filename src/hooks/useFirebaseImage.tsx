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
  const handleUploadImage = async (image: ImageProps) => {
    if (image) {
      const file = image.e
      const imageRef = ref(storage, image.storePath)
      setImage((prev) => ({ ...prev, fileName: file.name }))
      const uploadTask = uploadBytesResumable(imageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImage((prev) => ({ ...prev, process: progressPercent }))
          // console.log('upload is ' + progressPercent + '% done')
          // switch (snapshot.state) {
          //   case 'paused':
          //     console.log('upload is paused')
          //     break
          //   case 'running':
          //     console.log('upload is running')
          //     break
          //   default:
          //     console.log('nothing at all')
          //     break
          // }
        },
        (err) => {
          setImage((prev) => ({ ...prev, process: 0, errorMsg: 'Tải ảnh lên không thành công' }))
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            return downloadUrl
          })
        }
      )
    }
  }

  const handleDeleteImage = (path = '') => {
    const imageRef = ref(storage, path)
    if (path)
      deleteObject(imageRef)
        .then(() => {
          toast.success('Xóa ảnh thành công')
          setImage((prev) => ({ ...prev, path: '', fileName: '' }))
          // console.log(newPaths, ' ...')
        })
        .catch((err) => {
          setImage((prev) => ({ ...prev, errorMsg: 'Xóa ảnh không thành công' }))
        })
        .finally(() => {
          setImage((prev) => ({ ...prev, process: 0 }))
        })
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
