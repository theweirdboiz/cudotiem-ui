import { createContext, useContext, useState } from "react";

interface DropdownContextInterface {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextInterface | null>(null);

function DropdownProvider({ children }: { children: React.ReactNode }) {
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
}

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}

export { useDropdown, DropdownProvider };
