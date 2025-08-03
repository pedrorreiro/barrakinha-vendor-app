import { useState } from "react";

export const usePostActions = (
  initialLikes: number,
  initialComments: number
) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isCommented, setIsCommented] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    setIsCommented(!isCommented);
  };

  return {
    isLiked,
    likeCount,
    isCommented,
    handleLike,
    handleComment,
  };
};
