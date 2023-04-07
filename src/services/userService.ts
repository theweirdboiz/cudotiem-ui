import { CategoryType } from "~/types/CategoryType";
import UserType from "~/types/UserType";
import { HttpRequest } from "~/ultis";

export const getAllUsers = () => HttpRequest.get<UserType[]>("/users");
export const getUser = (id: number | string) =>
  HttpRequest.get<UserType>("/users/" + id);

export const createUser = (post: Omit<UserType, "id">) =>
  HttpRequest.post<UserType[]>("/users", post);

export const updateUser = (id: number | string, data: any) =>
  HttpRequest.put<UserType[]>(`/users/${id}`, data);

export const deleteUser = (id: number | string) =>
  HttpRequest.delete<{}>(`/users/${id}`);
