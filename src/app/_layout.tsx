import "@/global.css";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import { View, Platform, StatusBar } from "react-native";
import ToastProvider from "toastify-react-native";
import ToastManager from "toastify-react-native";
import { getSystemTheme } from "@/utils/theme";
import { Screens } from "../enums";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  const { isAuthenticated } = useAuth();

  return (
    <SafeAreaProvider>
      <View className="flex-1">
        <ToastProvider />
        <ToastManager
          theme={getSystemTheme()}
          position="top"
          topOffset={60}
          duration={4000}
          style={{
            paddingVertical: 12,
          }}
          config={{
            iconFamily: "MaterialIcons",
            autoClose: 10000,
          }}
        />
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Protected guard={true}>
            <Stack.Screen name="index" />
            <Stack.Screen name="drawer" />
          </Stack.Protected> */}

          <Stack.Screen name={Screens.WELCOME} />
          <Stack.Screen name={Screens.SIGN_IN} />
          <Stack.Screen name={Screens.OTP_CODE} />
          <Stack.Screen name={Screens.REGISTER} />
          <Stack.Screen name={Screens.SERVICE_DETAILS} />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}
