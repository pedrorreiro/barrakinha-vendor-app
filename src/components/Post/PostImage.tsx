import React, { useState } from "react";
import { Image, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { usePostContext } from "./PostContext";

const PostImageSkeleton = () => {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className="w-full h-80 bg-gray-400 rounded-lg absolute top-0 left-0"
      style={animatedStyle}
    />
  );
};

export const PostImage = () => {
  const post = usePostContext();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View className="items-center relative">
      {isLoading && <PostImageSkeleton />}
      <Image
        source={{ uri: post.image }}
        className="w-full h-80"
        resizeMode="cover"
        onLoadStart={handleLoadStart}
        onLoad={handleLoadEnd}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </View>
  );
};
