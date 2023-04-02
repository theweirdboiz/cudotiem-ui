import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { CategoryType } from "~/types/CategoryType";
import { HttpRequest } from "~/ultis";

interface CategoryContextProps {
  categories: CategoryType[];
  setCategories: Dispatch<SetStateAction<CategoryType[]>>;
}

const CategoryContext = createContext<CategoryContextProps | null>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await HttpRequest.get<CategoryType[]>("/categories");
      setCategories(res);
    };
    fetchCategories();
  }, []);

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
