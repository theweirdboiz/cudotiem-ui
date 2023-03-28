import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { CategoryType } from "~/types/CategoryType";

interface CategoryContextProps {
  categories: CategoryType[];
  setCategories: Dispatch<SetStateAction<CategoryType[]>>;
}

const CategoryContext = createContext<CategoryContextProps | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const value = {
    categories,
    setCategories,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
