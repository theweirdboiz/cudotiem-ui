import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { getPosts } from "~/services";
import { Post } from "~/types/post.type";

interface PostContextProps {
  posts: Post[];
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
