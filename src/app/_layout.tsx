import "@/global.css";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";

export default function Layout() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={true}>
        <Stack.Screen name="index" />
        <Stack.Screen name="drawer" />
      </Stack.Protected>

      <Stack.Screen name="sign-in" />
    </Stack>
  );
}
