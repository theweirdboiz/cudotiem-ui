import { SetStateAction } from "react";
import Swal from "sweetalert2";

type DataProps<T> = {
  data: T[];
  setData: React.Dispatch<SetStateAction<T[]>>;
};

const useDeleteData = <T extends { id?: number }>(props: DataProps<T>) => {
  const { data, setData } = props;

  const handleDeleteData = async (dataId: number | undefined) => {
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
      const newData = data.filter((dataItem) => dataItem.id !== dataId);
      setData(newData);
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  };
  return { handleDeleteData };
};

export default useDeleteData;
