import { formatDate } from "@/utils/date";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { usePostContext } from "./PostContext";

export const PostDetails = () => {
  const post = usePostContext();
  const [showMore, setShowMore] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fullText = `${post.user.username} ${post.description}`;
    const words = fullText.split(" ").length;
    // Se tem mais de 15 palavras, provavelmente vai precisar de mais de 2 linhas
    if (words > 15) {
      setShowMore(true);
    }
  }, [post.user.username, post.description]);

  return (
    <View className="px-4 gap-2">
      <Text
        className="text-foreground"
        numberOfLines={isExpanded ? undefined : 2}
        ellipsizeMode="tail"
      >
        <Text className="username">{post.user.username} </Text>
        <Text
          className="text-justify hyphens-auto"
          lineBreakStrategyIOS="push-out"
          textBreakStrategy="simple"
        >
          {post.description}
        </Text>
      </Text>

      {showMore && (
        <Text
          className="text-foreground opacity-50 text-sm font-semibold"
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ver menos" : "Ver mais"}
        </Text>
      )}

      <Text className="text-foreground text-sm">
        {formatDate(post.createdAt)}
      </Text>
    </View>
  );
};
