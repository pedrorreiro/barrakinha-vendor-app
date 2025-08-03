import { ACTION_COLORS } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "nativewind";
import { PostActionButton } from "./PostActionButton";

type CommentButtonProps = {
  isCommented: boolean;
  commentCount: number;
  onPress: () => void;
};

export const CommentButton = ({
  isCommented,
  commentCount,
  onPress,
}: CommentButtonProps) => {
  const { colorScheme } = useColorScheme();

  const commentIcon = (
    <Ionicons
      name={isCommented ? "chatbubble" : "chatbubble-outline"}
      size={24}
      color={
        isCommented
          ? ACTION_COLORS.comment.active
          : colorScheme === "dark"
          ? ACTION_COLORS.comment.inactive.dark
          : ACTION_COLORS.comment.inactive.light
      }
    />
  );

  return (
    <PostActionButton
      icon={commentIcon}
      count={commentCount}
      onPress={onPress}
      isActive={isCommented}
    />
  );
};
