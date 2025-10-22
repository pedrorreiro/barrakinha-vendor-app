import { Comment as CommentType } from "@/hooks/usePostActions";
import { formatDate } from "@/utils/date";
import { Text, View } from "react-native";
import { Avatar } from "./Avatar";

export function Comment({ comment }: { comment: CommentType }) {
  const { user } = comment;

  return (
    <View key={comment.id} className="flex-row gap-3 py-3">
      <Avatar avatar={user.avatarUrl} />
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-foreground">{user.username}</Text>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(comment.createdAt)}
          </Text>
        </View>
        <Text className="text-foreground mt-1">{comment.text}</Text>
      </View>
    </View>
  );
}
