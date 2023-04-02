import {
  ActionDelete,
  ActionEdit,
  Button,
  LabelStatus,
  Paginate,
  Table,
} from "~/components";
import UserType from "~/types/UserType";
import { useEffect } from "react";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import * as httpRequest from "~/ultis/httpRequest";
import { useUser } from "~/contexts/userContext";
import { UserRole, UserStatus } from "~/config";
import { useNavigate } from "react-router-dom";
import { useDeleteData, usePaginate, useSearch } from "~/hooks";

const PER_PAGE = 3;

const UserManage = () => {
  const { users, setUsers } = useUser();

  const navigator = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersResponse = await httpRequest.get<UserType[]>("/users");
      setUsers(usersResponse);
    };
    fetchUsers();
  }, []);

  const renderLabelStatus = (status: number | null) => {
    console.log("rerender label status");
    switch (status) {
      case UserStatus.ACTIVED:
        return <LabelStatus type={UserStatus.ACTIVED}>Actived</LabelStatus>;
      case UserStatus.PENDING:
        return <LabelStatus type={UserStatus.PENDING}>Pending</LabelStatus>;
      case UserStatus.BANNED:
        return <LabelStatus type={UserStatus.BANNED}>Banned</LabelStatus>;
      default:
        break;
    }
  };

  const renderLabelRole = (status: number | null) => {
    switch (status) {
      case UserRole.ADMIN:
        return "ADMIN";
      case UserRole.MOD:
        return "MODERATER";
      case UserRole.USER:
        return "USER";
      default:
        return "NOT";
    }
  };

  const { handleDeleteData } = useDeleteData<UserType>({
    data: users,
    setData: setUsers,
  });
  const { paginatedData, handlePageClick, pageCount } = usePaginate({
    data: users,
    perPage: PER_PAGE,
  });
  const { filteredData, handleSearch } = useSearch({
    data: paginatedData,
    searchKey: "name",
  });
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
                      <ActionDelete onClick={() => handleDeleteData(user.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
        </>
      )}
      {!filteredData ||
        (filteredData.length === 0 && <>Not have any category</>)}
    </>
  );
};

export default UserManage;
