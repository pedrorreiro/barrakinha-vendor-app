import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import { Avatar } from "../Avatar";
import { usePostContext } from "./PostContext";

export const PostHeader = () => {
  const { colorScheme } = useColorScheme();
  const post = usePostContext();

  return (
    <View className="flex-row items-center px-4 gap-2 pb-4">
      <View className="flex-row items-center gap-2">
        <Avatar avatar={post.user.avatar} />
        <Text className="username">{post.user.name}</Text>
      </View>

      <MaterialCommunityIcons
        name="dots-horizontal"
        size={24}
        color={colorScheme === "dark" ? "white" : "black"}
        className="ml-auto"
      />
    </View>
  );
};
