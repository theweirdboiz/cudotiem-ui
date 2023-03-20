import { createContext, useContext, useState } from "react";

const defaultState = {
  isOpen: false,
  setIsOpen?:()=>void
};

const SearchContext = createContext(defaultState);

const SearchProvider = (props: any) => {
  const [isOpen, setIsOpen] = useState();
  const value = {
    isOpen,
    setIsOpen,
  };
  return (
    <SearchContext.Provider value={value} {...props}></SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (typeof context === "undefined") {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export { useSearch, SearchProvider };
