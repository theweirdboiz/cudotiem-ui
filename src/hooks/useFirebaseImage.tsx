import { useState } from 'react'
import { toast } from 'react-toastify'
import { storage } from '~/firebase-app/firebase-config'
import { ref, uploadBytesResumable, deleteObject, getDownloadURL } from 'firebase/storage'

const useFirebaseImage = (folder: string) => {
  const [paths, setPaths] = useState<string[]>([])
  const [process, setProcess] = useState<number>(0)
  const [fileName, setFileName] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    for (const file of files) {
      const imageRef = ref(storage, `images/${folder}/${Date.now()}${file.name}`)
      setFileName(file.name)
      const uploadTask = uploadBytesResumable(imageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProcess(progressPercent)
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
          console.log(err)
          setErrorMsg('Tải ảnh lên không thành công')
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setPaths((prev) => [...prev, downloadUrl])
            // console.log('File available at', downloadUrl)
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
          const newPaths = paths.filter((p) => p !== path)
          setPaths(newPaths)
          setProcess(0)
          // console.log(newPaths, ' ...')
        })
        .catch((err) => {
          setErrorMsg('Không thể xóa ảnh')
          setProcess(0)
        })
  }

  const handleResetUpload = () => {
    setPaths([])
    setProcess(0)
  }
  // const handlePreviewImage = () => {

  // }
  return {
    handleUploadImage,
    handleDeleteImage,
    process,
    fileName,
    errorMsg,
    paths,
    setPaths,
    handleResetUpload
  }
}
export default useFirebaseImage
