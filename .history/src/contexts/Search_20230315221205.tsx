import { createContext, useContext, useState } from "react";

const defaultState = {
  isOpen: false,
};

const SearchContext = createContext(defaultState);

const SearchProvider = (props: any) => {
  const value = {
    isOpen: false,
  };
  return (
    <SearchContext.Provider value={value} {...props}></SearchContext.Provider>
  );
};
