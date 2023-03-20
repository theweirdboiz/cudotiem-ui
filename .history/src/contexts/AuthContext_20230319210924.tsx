import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "firebase-app/firebase-config";

interface AuthContextType {
  currentUser: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const login = () => {};
  const logout = () => {};
  useEffect(() => {}, []);
  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
