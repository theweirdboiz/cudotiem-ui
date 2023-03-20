import { createContext, useContext, useState } from "react";

interface ISearchContext {
  isOpen: boolean;
  handleIsOpen?: (value: Boolean) => void;
}

const defaultState = {
  isOpen: false,
  handleIsOpen: () => {},
};

const SearchContext = createContext<ISearchContext | undefined>(defaultState);

const SearchProvider = (props: any) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const handleIsOpen = (value: Boolean) => {
    setIsOpen(value);
  };

  // const value = {
  //   isOpen,
  //   handleIsOpen,
  // };

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        handleIsOpen,
      }}
      {...props}
    ></SearchContext.Provider>
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
