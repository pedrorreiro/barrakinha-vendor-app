import { Comment as CommentType } from "@/hooks/usePostActions";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useColorScheme } from "nativewind";
import React, { useCallback, useMemo } from "react";
import { Text, TextInput, View } from "react-native";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

type CommentSheetProps = {
  bottomSheetModalRef: React.RefObject<any>;
  comments: CommentType[];
  onAddComment: (text: string) => void;
};

export const CommentSheet = ({
  bottomSheetModalRef,
  comments,
  onAddComment,
}: CommentSheetProps) => {
  const { colorScheme } = useColorScheme();
  const [commentText, setCommentText] = React.useState("");

  const snapPoints = useMemo(() => ["90%"], []);

  const handleAddComment = useCallback(() => {
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText("");
    }
  }, [commentText, onAddComment]);

  return (
    <BottomSheetModal
      style={{ flex: 1 }}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: colorScheme === "dark" ? "#1f2937" : "#ffffff",
      }}
      enableDynamicSizing={false}
    >
      <View className="flex-1 px-4 ">
        <View className="flex-row py-4 border-b border-gray-200 dark:border-gray-700">
          <Text className="text-lg font-bold text-foreground text-center w-full">
            Comentários
          </Text>
        </View>

        <View className="grow ">
          {comments.length > 0 && (
            <FlashList
              data={comments}
              renderItem={({ item }) => <Comment comment={item} />}
              keyExtractor={(item) => item.id}
              estimatedItemSize={100}
            />
          )}

          {comments.length === 0 && (
            <View className="justify-center items-center py-8 grow">
              <Text className="text-foreground text-2xl text-center mb-2 font-bold">
                Ainda não há nenhum comentário
              </Text>
              <Text className="text-gray-500 text-base dark:text-gray-400 text-center">
                Inicie a conversa.
              </Text>
            </View>
          )}

          <View className="flex-row items-center gap-3 py-4 mb-12">
            <Avatar avatar="https://randomuser.me/api/portraits/med/women/30.jpg" />
            <TextInput
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-4 text-foreground border border-gray-200 dark:border-gray-700"
              placeholder="Adicione um comentário..."
              placeholderTextColor={
                colorScheme === "dark" ? "#9ca3af" : "#6b7280"
              }
              value={commentText}
              onChangeText={setCommentText}
              onSubmitEditing={handleAddComment}
              returnKeyType="send"
            />
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
};
