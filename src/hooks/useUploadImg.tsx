import React, { useState } from "react";
import {
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { storage } from "~/firebase-app/firebase-config";

interface Props {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
}

interface UploadImg {
  image: string;
  progress: number;
  onSelectImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteImg: () => void;
  handleResetUpload: () => void;
}

const useUploadImg = ({ setValue, getValues }: Props): UploadImg => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<string>("");

  const onSelectImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;
    setValue("image", file.name);
    await handleUploadImg(file);
  };

  const handleDeleteImg = () => {
    const imageRef = ref(storage, "images/" + getValues("image"));

    deleteObject(imageRef)
      .then(() => {
        console.log("remove image successfully");
        setImage("");
        setProgress(0);
      })
      .catch((err) => {
        console.log("can not delete image");
      });
  };

  const handleUploadImg = async (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
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
          setImage(downloadUrl);
          console.log("File available at", downloadUrl);
        });
      }
    );
  };
  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };
  return {
    image,
    setImage,
    progress,
    onSelectImg,
    handleDeleteImg,
    handleResetUpload,
  };
};

export default useUploadImg;
