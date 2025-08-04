import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, SafeAreaView, Text } from "react-native";

export default function SignIn() {
  const { login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await login("test-user");
    setIsLoading(false);
  };

  const goToHome = () => {
    router.replace("/drawer/home");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <Text className="text-foreground text-xl mb-8">
        Tela de Login - Autenticado: {isAuthenticated ? "true" : "false"}
      </Text>
      <Button
        title={isLoading ? "Fazendo Login..." : "Fazer Login"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      <Button title="Go to Home" onPress={goToHome} />
      {isLoading && (
        <ActivityIndicator
          size="small"
          color="#007AFF"
          style={{ marginTop: 10 }}
        />
      )}
    </SafeAreaView>
  );
}
