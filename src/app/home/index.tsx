import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/Button";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { useEffect } from "react";
import { useStore } from "@/hooks/useStore";

export default function Home() {
  const { isAuthenticated, logout, refreshToken } = useAuth();
  const { storeMe, getMe } = useStore();
  const handleLogout = async () => {
    await logout();
    router.replace(Screens.WELCOME);
  };

  const handleRefreshToken = async () => {
    const result = await refreshToken();
    if (result.isWrong()) {
      await logout();
      router.replace(Screens.WELCOME);
    }
  };

  useEffect(() => {
    handleRefreshToken();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-6 flex-grow flex-shrink flex-basis-0 gap-4">
        <View>
          <Text className="text-secondary text-lg font-medium">
            {new Date("2022-08-21").toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
              weekday: "long",
            })}
          </Text>
          {storeMe && (
            <Text className="text-foreground text-2xl font-bold">
              Olá, {storeMe.shortOwnerName}!
            </Text>
          )}
        </View>

        <Button className="mt-auto" title="Sair" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBadge: {
    fontSize: 15,
    fontWeight: "400",
    color: "#a3a3a3",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#121212",
  },
});
