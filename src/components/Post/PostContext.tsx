import { createContext, useContext } from "react";

export type PostType = {
  id: string;
  image: string;
  content: string;
  likes: number;
  comments: number;
  user: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
};

// Context para compartilhar dados do post
export const PostContext = createContext<PostType | null>(null);

// Hook para usar o contexto do post
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("Post components must be used within Post.Root");
  }
  return context;
};
