import { createContext, useContext, useEffect, useState } from "react";
import {
  DecodedToken,
  getCurrentUser,
  login,
  logout,
  register,
} from "~/services";

interface AuthContextProps {
  currentUser: DecodedToken | null;
  handleRegister: (
    name: string,
    email: string,
    password: string
  ) => Promise<any>;
  handleLogin: (email: string, password: string) => Promise<any>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  handleRegister: async () => {},
  handleLogin: async (email: string, password: string) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    const response = await register(username, email, password);
    return response;
  };
  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    setCurrentUser(response);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, handleRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
