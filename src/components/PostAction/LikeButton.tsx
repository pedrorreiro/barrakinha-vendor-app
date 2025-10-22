import { ACTION_COLORS } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
import { PostActionButton } from "./PostActionContainer";

type LikeButtonProps = {
  isLiked: boolean;
  likeCount: number;
  onPress: () => void;
};

export const LikeButton = ({
  isLiked,
  likeCount,
  onPress,
}: LikeButtonProps) => {
  const { colorScheme } = useColorScheme();

  const likeIcon = (
    <AntDesign
      name={isLiked ? "heart" : "hearto"}
      size={24}
      color={
        isLiked
          ? ACTION_COLORS.like.active
          : colorScheme === "dark"
          ? ACTION_COLORS.like.inactive.dark
          : ACTION_COLORS.like.inactive.light
      }
    />
  );

  return (
    <PostActionButton
      icon={likeIcon}
      count={likeCount}
      onPress={onPress}
      isActive={isLiked}
    />
  );
};
