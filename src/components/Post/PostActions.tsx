import { usePostActions } from "@/hooks/usePostActions";
import React from "react";
import { View } from "react-native";
import { CommentButton } from "../CommentButton";
import { CommentSheet } from "../CommentSheet";
import { LikeButton } from "../LikeButton";
import { usePostContext } from "./PostContext";

export const PostActions = () => {
  const post = usePostContext();
  const {
    isLiked,
    likeCount,
    isCommented,
    comments,
    bottomSheetModalRef,
    handleLike,
    handleComment,
    handleAddComment,
  } = usePostActions(post.likes, post.comments);

  return (
    <>
      <View className="flex-row p-4 gap-4 items-center">
        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          onPress={handleLike}
        />
        <CommentButton
          isCommented={isCommented}
          commentCount={post.comments.length}
          onPress={handleComment}
        />
      </View>

      <CommentSheet
        bottomSheetModalRef={bottomSheetModalRef}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </>
  );
};
