import Post from "@/components/Post/Post";
import { PostType } from "@/components/Post/PostContext";
import { ThemeInfo } from "@/components/ThemeInfo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { generatePosts } from "@/utils/postGenerator";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const { colorScheme } = useTheme();

  const refreshControlColor = colorScheme === "dark" ? "white" : "black";

  const [posts, setPosts] = useState<PostType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  function setFetching(value: boolean, firstFetch: boolean = false) {
    if (firstFetch) {
      setRefreshing(value);
    } else {
      setLoadingMore(value);
    }
  }

  async function fetchPosts(firstFetch: boolean = false) {
    if (refreshing) return;
    setFetching(true, firstFetch);
    console.log("fetching posts");
    const newPosts = await generatePosts(5);
    setPosts([...posts, ...newPosts]);
    setFetching(false, firstFetch);
  }

  useEffect(() => {
    fetchPosts(true);
  }, []);

  return (
    <SafeAreaView className="flex flex-1 bg-background">
      <View className="px-4 ml-auto">
        <ThemeToggle />
      </View>
      <ThemeInfo />
      <FlashList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchPosts}
            colors={[refreshControlColor]}
            tintColor={refreshControlColor}
          />
        }
        data={posts}
        renderItem={({ item }) => (
          <View className="mb-8">
            <Post post={item} />
          </View>
        )}
        onEndReached={async () => {
          await fetchPosts(false);
        }}
        keyExtractor={(item) => item.id}
        className="mt-4"
        ListFooterComponent={
          loadingMore && (
            <View className="py-4">
              <ActivityIndicator color={refreshControlColor} size="small" />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
