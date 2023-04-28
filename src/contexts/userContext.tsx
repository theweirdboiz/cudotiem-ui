import React, { ReactNode, useContext, useState } from "react";
import UserType from "~/types/user.type";

interface UserContextType {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}

const UserContext = React.createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserType[]>([]);

  const value = {
    users,
    setUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
