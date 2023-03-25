import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  LabelStatus,
  Table,
} from "~/components";
import { userRole, userStatus } from "~/config";
import { useUser } from "~/contexts/userContext";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import UserType from "~/types/UserType";
import httpRequest from "~/ultis/httpRequest";

type Props = {};

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
  const handleDeleteUser = (userId: number | null) => {};
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
                        user.avatar
                          ? user.avatar
                          : "https://source.unsplash.com/random"
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
