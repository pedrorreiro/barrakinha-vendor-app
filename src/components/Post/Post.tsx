import React from "react";
import { View } from "react-native";
import { PostActions } from "./PostActions";
import { PostContext, PostType } from "./PostContext";
import { PostDetails } from "./PostDetails";
import { PostHeader } from "./PostHeader";
import { PostImage } from "./PostImage";

export const Post = {
  Root: ({ post, children }: { post: PostType; children: React.ReactNode }) => {
    return (
      <PostContext.Provider value={post}>
        <View className="bg-background">{children}</View>
      </PostContext.Provider>
    );
  },

  Header: PostHeader,
  Image: PostImage,
  Actions: PostActions,
  Details: PostDetails,
};

export default ({ post }: { post: PostType }) => {
  return (
    <Post.Root post={post}>
      <Post.Header />
      <Post.Image />
      <Post.Actions />
      <Post.Details />
    </Post.Root>
  );
};
