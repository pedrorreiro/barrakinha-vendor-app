import { usePostActions } from "@/hooks/usePostActions";
import React from "react";
import { View } from "react-native";
import { CommentButton } from "../CommentButton";
import { LikeButton } from "../LikeButton";
import { usePostContext } from "./PostContext";

export const PostActions = () => {
  const post = usePostContext();
  const { isLiked, likeCount, isCommented, handleLike, handleComment } =
    usePostActions(post.likes, post.comments);

  return (
    <View className="flex-row p-4 gap-4 items-center">
      <LikeButton
        isLiked={isLiked}
        likeCount={likeCount}
        onPress={handleLike}
      />
      <CommentButton
        isCommented={isCommented}
        commentCount={post.comments}
        onPress={handleComment}
      />
    </View>
  );
};
