import { useState } from "react";
import { toast } from "react-toastify";
import { storage } from "~/firebase-app/firebase-config";
import {
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

const useFirebaseImage = (folder: string) => {
  const [path, setPath] = useState<string>("");
  const [process, setProcess] = useState<number>(0);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;
    const imageRef = ref(storage, `images/${folder}/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProcess(progressPercent);
        console.log("upload is " + progressPercent + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused");
            break;
          case "running":
            console.log("upload is running");
            break;
          default:
            console.log("nothing at all");
            break;
        }
      },
      (err) => {
        console.log(err);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setPath(downloadUrl);
          console.log("File available at", downloadUrl);
        });
      }
    );
  };
  const handleDeleteImage = (url = "") => {
    url = url.length > 0 ? url : path;
    const imageRef = ref(storage, url);
    if (url)
      deleteObject(imageRef)
        .then(() => {
          toast.success("Xóa ảnh thành công");
          setProcess(0);
          setPath("");
        })
        .catch((err) => {
          toast.error("Không thể xóa ảnh");
          setPath("");
          setProcess(0);
        });
  };
  const handleResetUpload = () => {
    setPath("");
    setProcess(0);
  };

  return {
    handleUploadImage,
    handleDeleteImage,
    process,
    path,
    setPath,
    handleResetUpload,
  };
};
export default useFirebaseImage;
