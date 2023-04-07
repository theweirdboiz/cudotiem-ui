import { PostType } from "~/types/PostType";
import { HttpRequest } from "~/ultis";

export const getPosts = () => HttpRequest.get<PostType[]>("/posts");
export const getPost = (id: number | string) =>
  HttpRequest.get<PostType>("/posts/" + id);

export const createPost = (post: Omit<PostType, "id">) =>
  HttpRequest.post<PostType[]>("/posts", post);

export const updatePost = (id: number | string, data: any) =>
  HttpRequest.put<PostType[]>(`/posts/${id}`, data);

export const deletePost = (id: number | string) =>
  HttpRequest.delete<{}>(`/posts/${id}`);
