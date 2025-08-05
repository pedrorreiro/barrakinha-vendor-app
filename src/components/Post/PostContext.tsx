import { Post } from "@/hooks/usePostActions";
import { createContext, useContext } from "react";

// Context para compartilhar dados do post
export const PostContext = createContext<Post | null>(null);

// Hook para usar o contexto do post
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("Post components must be used within Post.Root");
  }
  return context;
};
