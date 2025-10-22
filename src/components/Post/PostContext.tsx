import { Post } from "@/hooks/usePostActions";
import { createContext, useContext } from "react";

export const PostContext = createContext<Post | null>(null);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("Post components must be used within Post.Root");
  }
  return context;
};
