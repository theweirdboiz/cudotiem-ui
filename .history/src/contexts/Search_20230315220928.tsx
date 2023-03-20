import { createContext, useContext, useState } from "react";

const defaultState = {
  isOpen: false,
};

const SearchContext = createContext(defaultState);
