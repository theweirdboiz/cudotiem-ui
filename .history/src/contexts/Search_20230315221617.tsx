import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

const SearchProvider = (props: any) => {
  const [open, setIsOpen] = useState();
  const value = {
    open,
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
