import React, { createContext, useContext, useEffect, useState } from "react";

import firebase from "../firebase-app/firebase-config";

interface AuthContextType {
  currentUser: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendOtp = () => {
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        const code = prompt(
          "Enter the verification code sent to your mobile device"
        );
        confirmationResult
          .confirm(code as string)
          .then((result) => {})
          .catch((error) => {
            console.error(error);
          });
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
    setPhoneNumber,
    handleSendOtp,
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
