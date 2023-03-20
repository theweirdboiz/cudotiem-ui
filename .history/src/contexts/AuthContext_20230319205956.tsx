import React, { createContext, useContext, useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

interface AuthContextType {
  currentUser: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

declare const window: any;

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  const signInWithPhoneNumber = (phoneNumber: string) => {
    const appVerifier = recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier as any)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = () => {};
  const logout = () => {};
  useEffect(() => {}, []);
  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    signInWithPhoneNumber,
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
