import { Post as PostType } from "../../hooks/usePostActions";
import { View } from "react-native";
import { PostContext } from "./PostContext";

type PostRootProps = {
  post: PostType;
  children: React.ReactNode;
};

export const PostRoot = ({ post, children }: PostRootProps) => {
  return (
    <PostContext.Provider value={post}>
      <View className="bg-background">{children}</View>
    </PostContext.Provider>
  );
};