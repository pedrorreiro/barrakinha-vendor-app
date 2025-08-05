import { useRef, useState } from "react";

export type Post = {
  id: string;
  image: string;
  content: string;
  likes: number;
  comments: Comment[];
  user: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
};

export type Comment = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  createdAt: Date;
};

export const usePostActions = (
  initialLikes: number,
  initialComments: Comment[]
) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isCommented, setIsCommented] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const bottomSheetModalRef = useRef<any>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Usuário Atual",
        avatar: "https://randomuser.me/api/portraits/med/men/94.jpg",
      },
      text,
      createdAt: new Date(),
    };
    setComments([newComment, ...comments]);
  };

  return {
    isLiked,
    likeCount,
    isCommented,
    comments,
    bottomSheetModalRef,
    handleLike,
    handleComment,
    handleAddComment,
  };
};
