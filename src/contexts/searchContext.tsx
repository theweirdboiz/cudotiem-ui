import { createContext, useContext, useState } from "react";

interface ISearchContext {
  isOpen: boolean;
  setIsOpen: (value: Boolean) => void;
}

const defaultState = {
  isOpen: false,
  setIsOpen: () => {},
};

const SearchContext = createContext<ISearchContext>(defaultState);

const SearchProvider = (props: any) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

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
