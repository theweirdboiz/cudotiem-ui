import React, {
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createContext } from "vm";
import { categoriesData } from "~/fake-data/categories";
import { CategoryType } from "~/types/CategoryType";

interface CategoryContextType {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

const CategoryContext = React.createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryType[]>(categoriesData);

  const value = {
    categories,
    setCategories,
  };

  console.log(categories);

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
