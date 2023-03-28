import { deleteObject, ref } from "firebase/storage";
import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ActionDelete,
  ActionEdit,
  Button,
  LabelStatus,
  Paginate,
  Table,
} from "~/components";
import { userRole, userStatus } from "~/config";
import { useUser } from "~/contexts/userContext";
import { storage } from "~/firebase-app/firebase-config";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import UserType from "~/types/UserType";
import httpRequest from "~/ultis/httpRequest";

const PER_PAGE = 3;

const UserManage = () => {
  /* A hook that is used to get the users from the context. */
  const { users, setUsers } = useUser();

  /* A hook that is used to navigate to a new location. */
  const navigator = useNavigate();

  /* A hook that is used to perform side effects in function components. */
  useEffect(() => {
    const fetchUsers = async () => {
      const usersResponse = await httpRequest.get<UserType[]>("/users");
      setUsers(usersResponse);
    };
    fetchUsers();
  }, []);

  /**
   * It takes a string as an argument, and if the string is not null, it deletes the image from the
   * firebase storage.
   * @param {string} [imgLink] - the link of the image you want to delete
   */
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

  /*
   "I want to delete a user, but before that, I want to delete the user's avatar, and then delete the user."
   */
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
            /**
             * It takes a number and returns a React component
             * @param {number | null} status - number | null
             * @returns A React component.
             */
            Swal.fire("Deleted!", "Your user has been deleted.", "success");
          });
        });
      }
    });
  };
  /**
   * It takes a number and returns a React component
   * @param {number | null} status - number | null
   * @returns A React component.
   */
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
  /**
   * It takes a number and returns a string.
   * @param {number | null} status - number | null
   * @returns A function that takes a parameter of type number | null and returns a string.
   */
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

  // filter & pagination
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const indexOfLast = (currentPage + 1) * PER_PAGE;
  const indexOfFirst = indexOfLast - PER_PAGE;

  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchTerm(e.target.value);
    });
  };

  const filteredData = currentUsers.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onChange={handleSearch}
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
      {users.length > 0 && (
        <>
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
              {filteredData.map((user) => (
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
          {/* <ReactPaginate
            previousLabel={"<"}
            previousClassName="px-3 py-1 rounded border border-gray-200 hover:bg-blue-100 cursor-pointer"
            pageRangeDisplayed={5}
            pageLinkClassName={
              "px-3 py-1 rounded border border-gray-200  hover:bg-blue-100"
            }
            pageCount={Math.ceil(users.length / PER_PAGE)}
            onPageChange={handlePageClick}
            nextLabel={">"}
            nextClassName="px-3 py-1 rounded border border-gray-200 hover:bg-blue-100 cursor-pointer"
            marginPagesDisplayed={2}
            containerClassName={"box-center mt-3 gap-x-3"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            activeClassName={"text-blue-400 font-semibold"}
          /> */}
          <Paginate
            filteredData={filteredData}
            length={users.length}
            perPage={PER_PAGE}
            // onPageChange={handlePageClick}
          />
        </>
      )}
      {!filteredData ||
        (filteredData.length === 0 && <>Not have any category</>)}
    </>
  );
};

export default UserManage;