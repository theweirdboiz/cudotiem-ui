export interface CategoryType {
  id: number;
  name: boolean;
  status: number;
  slug: string;
}
export interface CategoriesType {
  categories: CategoriesType[];
}
