export interface CategoryType {
  id: number;
  name: string;
  status: number;
  slug: string;
}

export interface CategoriesType {
  categories: CategoryType[];
}
