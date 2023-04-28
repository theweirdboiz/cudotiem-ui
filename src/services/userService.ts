import { CategoryType } from "~/types/CategoryType";
import { User } from "~/types/user.type";
import { HttpRequest } from "~/ultis";

export const getAllUsers = () => HttpRequest.get<User[]>("/users");
export const getUser = async (id: number | string) => {
  const response = await HttpRequest.get<User>("/users/" + id);
  return response.data;
};

export const createUser = (username: string, email: string, password: string) =>
  HttpRequest.post<User[]>("/users", { username, email, password });

export const updateUser = (id: number | string, data: any) =>
  HttpRequest.put<User[]>(`/users/${id}`, data);

export const deleteUser = (id: number | string) =>
  HttpRequest.delete<{}>(`/users/${id}`);
