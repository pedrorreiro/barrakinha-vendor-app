import { usePostActions } from "@/hooks/usePostActions";
import React from "react";
import { View } from "react-native";
import { CommentButton } from "../PostAction/CommentButton";
import { CommentSheet } from "../CommentSheet";
import { LikeButton } from "../PostAction/LikeButton";
import { usePostContext } from "./PostContext";

export const PostActions = () => {
  const post = usePostContext();
  const {
    isLiked,
    likeCount,
    isCommented,
    commentCount,
    bottomSheetModalRef,
    handleLike,
    handleComment,
    handleAddComment,
    comments,
  } = usePostActions(post);

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
          commentCount={commentCount}
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
