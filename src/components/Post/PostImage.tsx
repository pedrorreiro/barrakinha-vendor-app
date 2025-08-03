import React from "react";
import { Image, View } from "react-native";
import { usePostContext } from "./PostContext";

export const PostImage = () => {
  const post = usePostContext();

  return (
    <View className="items-center">
      <Image
        source={{ uri: post.image }}
        className="w-full h-80"
        resizeMode="cover"
      />
    </View>
  );
};
