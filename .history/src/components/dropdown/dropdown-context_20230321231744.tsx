import React, { useContext, useState } from "react";

interface DropdownContextType {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}

const DropdownContext = React.createContext<DropdownContextType | null>(null);

export const DropdownProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const values = { show, setShow, toggle };

  return (
    <DropdownContext.Provider value={values}>
      {children}
    </DropdownContext.Provider>
  );
};

function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}

export { useDropdown };
