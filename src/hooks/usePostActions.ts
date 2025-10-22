import { useRef, useState } from "react";
import { ApiService } from "@/services/api";

export type Post = {
  id: string;
  photoUrl: string;
  description: string;
  likes: number;
  comments: number;
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  text: string;
  createdAt: Date;
};

export const usePostActions = (
  post: Post
) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isCommented, setIsCommented] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments);
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetModalRef = useRef<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleLike = async () => {
    
    try {
      setIsLoading(true);
      const like = await ApiService.like(post.id);
      setIsLiked(like.liked);
      setLikeCount(like.likes);
    } catch (error) {
      console.error("Erro ao dar like:", error);
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleComment = async () => {

    const apiComments = await ApiService.getComments(post.id);
    setCommentCount(apiComments.length);

    const comments: Comment[] = apiComments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      user: {
        username: comment.user.username,
        avatarUrl: comment.user.avatarUrl,
      },
      createdAt: new Date(comment.createdAt),
    }));

    setComments(comments);

    bottomSheetModalRef.current?.present();
  };

  const handleAddComment = async (text: string) => {
    try {
      setIsLoading(true);
      const newComment = await ApiService.addComment({
        text,
        postId: post.id,
        userId: post.user.id,
      });
      setComments([{
        ...newComment,
        createdAt: new Date(newComment.createdAt),
      }, ...comments]);
      setIsCommented(true);
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    } finally {
      setIsLoading(false);
    }
    
  };

  return {
    isLiked,
    likeCount,
    comments,
    isCommented,
    commentCount,
    isLoading,
    bottomSheetModalRef,
    handleLike,
    handleComment,
    handleAddComment,
  };
};
