import { PostType } from "~/types/PostType";
import { HttpRequest } from "~/ultis";

export const getPosts = () => HttpRequest.get<PostType[]>("/posts");
export const getPost = (id: number) =>
  HttpRequest.get<PostType>("/posts/" + id);

export const createPost = async (post: Omit<PostType, "id">): Promise<void> => {
  await HttpRequest.post<PostType[]>("/posts", post);
};

export const updatePost = async (
  data: any,
  option?: any
): Promise<PostType[]> => {
  const res = await HttpRequest.put<PostType[]>(`/posts/${option}`, data);
  return res;
};

export const deletePost = (id: number | string) =>
  HttpRequest.delete<{}>(`/posts/${id}`);
