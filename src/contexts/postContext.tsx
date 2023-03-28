import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { PostType } from "~/types/PostType";

interface PostContextProps {
  posts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
}

const PostContext = createContext<PostContextProps | null>(null);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const value = {
    posts,
    setPosts,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
