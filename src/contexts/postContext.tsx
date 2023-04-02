import { useMutation, useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { createPost, getPosts } from "~/services";
import { PostType } from "~/types/PostType";

interface PostContextProps {
  posts: PostType[];
}

const PostContext = createContext<PostContextProps | any>(null);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts(),
  });

  return <PostContext.Provider value={data}>{children}</PostContext.Provider>;
};
export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
