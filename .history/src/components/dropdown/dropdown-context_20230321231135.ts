import { createContext, useContext, useState } from "react";

interface DropdownContextInterface {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}

const DropdownContext = createContext();

const DropdownProvider = (props: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const values = { show, setShow, toggle };

  return <DropdownContext.Provider></DropdownContext.Provider>;
};

function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}

export { useDropdown, DropdownProvider };
