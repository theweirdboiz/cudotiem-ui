import { createContext, useContext, useState } from "react";
import { DropdownContextType } from "../../types/DropdownContextType";

const DropdownContext = createContext<DropdownContextType | null>(null);

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
    throw new Error("useDropdown must be used within a DropdownProvider");
  return context;
}

export { useDropdown, DropdownProvider };
