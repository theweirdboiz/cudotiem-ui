import { UseFormSetValue, UseFormGetValues } from "react-hook-form";

export interface PostAddType {
  title: string;
  slug: string;
  status: number;
  hot: boolean;
  image_name: string;
  category: {};
  user: {};
}
export interface Props<T> {
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
}
