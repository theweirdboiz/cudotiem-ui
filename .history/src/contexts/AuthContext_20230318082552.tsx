import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  currentUser: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
};

const useSearch = () => {
  const context = useContext(AuthContext);

  if (typeof context === "undefined") {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export { useSearch, SearchProvider };
