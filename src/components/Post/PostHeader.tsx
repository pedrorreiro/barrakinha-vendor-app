import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { cssInterop } from "nativewind";
import { Text, View } from "react-native";
import { Avatar } from "../Avatar";
import { usePostContext } from "./PostContext";

export const PostHeader = () => {
  const post = usePostContext();

  cssInterop(MaterialCommunityIcons, {
    color: {
      target: "color",
      nativeStyleToProp: {
        color: "color",
      },
    },
  });

  return (
    <View className="flex-row items-center px-4 gap-2 pb-4">
      <View className="flex-row items-center gap-4">
        <Avatar avatar={post.user.avatarUrl} />
        <Text className="username">{post.user.username}</Text>
      </View>

      <MaterialCommunityIcons
        name="dots-horizontal"
        size={24}
        color="text-foreground"
        className="ml-auto"
      />
    </View>
  );
};
