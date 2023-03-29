export interface PostType {
  id?: number;
  title: string;
  slug: string;
  status: number;
  hot: boolean;
  content?: "";
  image: string | "";
  categoryId: string;
  userId: string;
  createdAt?: number;
}
