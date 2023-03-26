import { deleteObject, ref } from "firebase/storage";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Table,
} from "~/components";
import { userRole, userStatus } from "~/config";
import { useUser } from "~/contexts/userContext";
import { storage } from "~/firebase-app/firebase-config";
import { useUploadImg } from "~/hooks";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import UserType from "~/types/UserType";
import httpRequest from "~/ultis/httpRequest";

type Props = {};

const handleDeleteImg = (imgLink?: string) => {
  const imageRef = ref(storage, imgLink);
  deleteObject(imageRef)
    .then(() => {
      console.log("remove image successfully");
    })
    .catch((err) => {
      console.log("can not delete image");
    });
};

const UserManage = (props: Props) => {
  const { users, setUsers } = useUser();
  const navigator = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersResponse = await httpRequest.get<UserType[]>("/users");
      setUsers(usersResponse);
    };
    fetchUsers();
  }, []);

  // handle events
  const handleDeleteUser = async (userId: number | null) => {
    Swal.fire({
      title: "Khoan đã",
      text: "Bạn thật sự muốn xóa user này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3086d6d4",
      cancelButtonColor: "#f44343d7",
      confirmButtonText: "Có, hãy xóa!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userData = await httpRequest.get<UserType>(`/users/${userId}`);
        userData?.avatar && handleDeleteImg(userData.avatar);
        await httpRequest.delete(`/users/${userId}`).then(async () => {
          await httpRequest.get<UserType[]>("/users").then((res) => {
            setUsers(res);
            Swal.fire("Deleted!", "Your user has been deleted.", "success");
          });
        });
      }
    });
  };
  const renderLabelStatus = (status: number | null) => {
    switch (status) {
      case userStatus.ACTIVED:
        return <LabelStatus type={userStatus.ACTIVED}>Actived</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type={userStatus.PENDING}>Pending</LabelStatus>;
      case userStatus.BANED:
        return <LabelStatus type={userStatus.BANED}>Banned</LabelStatus>;
      default:
        break;
    }
  };
  const renderLabelRole = (status: number | null) => {
    switch (status) {
      case userRole.ADMIN:
        return "ADMIN";
      case userRole.MOD:
        return "MODERATER";
      case userRole.USER:
        return "USER";
      default:
        return "NOT";
    }
  };
  return (
    <>
      <DashboardHeading>Users</DashboardHeading>
      <div className="flex items-center justify-between">
        <div className="flex-center border border-gray-200 w-full max-w-xl rounded-lg relative">
          <img
            src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
            alt="icon-search"
            className="w-5 h-5 ml-4"
          />
          <input
            type="text"
            placeholder="Bạn tìm gì hôm nay"
            className="px-2 outline-none border-none flex-1"
            // onChange={handleSearch}
          />
          <button
            className="flex-center justify-center w-24 h-9 bg-transparent text-blue-600 p-1  relative after:content-['']  after:absolute after:border-l after:border-l-gray-200 after:left-0 after:top-2 after:h-5 hover:bg-blue-100 rounded-r-lg
    "
          >
            Tìm kiếm
          </button>
        </div>
        <div className="flex-center justify-end my-5">
          <Button to="/manage/add-user">Add new user</Button>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Infor</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="flex items-center gap-x-2">
                    <img
                      src={
                        user.avatar ||
                        "https://raw.githubusercontent.com/evondev/react-course-projects/master/monkey-blogging/public/img-upload.png"
                      }
                      className="w-10 h-10 rounded-md"
                      alt=""
                    />
                    <div className="">
                      <h3 className="whitespace-nowrap">{user.fullName}</h3>
                      <time className="text-xs text-gray-400">
                        {user.createdAt}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{renderLabelStatus(user.status)}</td>
                <td>{renderLabelRole(user.role)}</td>
                <td>
                  <div className="flex-center gap-x-2.5">
                    <ActionEdit
                      onClick={() =>
                        navigator(`/manage/update-user?id=${user.id}`)
                      }
                    />
                    <ActionDelete onClick={() => handleDeleteUser(user.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserManage;
