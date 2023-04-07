import Swal from "sweetalert2";

const useDeleteData = () => {
  const openModalDeleteData = async (callback: any) => {
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
      callback();
      Swal.fire("Deleted!", "Your data has been deleted.", "success");
    }
  };
  return { openModalDeleteData };
};

export default useDeleteData;
