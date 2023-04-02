import { SetStateAction } from "react";
import Swal from "sweetalert2";
import useFirebaseImage from "./useFirebaseImage";

type DataProps<T> = {
  data: T[];
  setData?: any;
  [key: string]: any;
};

const useDeleteData = <T extends { id?: number }>(props: DataProps<T>) => {
  const { data, setData, deleteFn } = props;
  const { handleDeleteImage } = useFirebaseImage("posts");

  const handleDeleteData = async (id: number | string) => {
    const result = await Swal.fire({
      title: "Khoan đã",
      text: "Bạn thật sự muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3086d6d4",
      cancelButtonColor: "#f44343d7",
      confirmButtonText: "Có, hãy xóa!",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  };
  return { handleDeleteData };
};

export default useDeleteData;
