export interface PostType {
  id: number;
  title: string;
  slug: string;
  status: number;
  hot: boolean;
  content?: "";
  image: string | "";
  categoryId: number;
  userId: number;
  createdAt?: number;
}
