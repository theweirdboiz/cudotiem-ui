import { createContext, useContext, useState, ReactNode } from "react";

interface DropdownContextProps {
  show: boolean;
  setShow: (show: boolean) => void;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextProps>({
  show: false,
  setShow: () => {},
  toggle: () => {},
});

interface DropdownProviderProps {
  children: ReactNode;
}

function DropdownProvider(props: DropdownProviderProps) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const values = { show, setShow, toggle };
  return (
    <DropdownContext.Provider value={values}>
      {props.children}
    </DropdownContext.Provider>
  );
}

function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}

export { useDropdown, DropdownProvider };
