import "@/global.css";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import Header from "@/components/Header";

export enum Screens {
  WELCOME = "welcome",
  SIGN_IN = "sign-in",
  OTP_CODE = "otp-code",
  REGISTER = "register",
  BUY_PLAN = "buy-plan",
}

export default function Layout() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Protected guard={true}>
        <Stack.Screen name="index" />
        <Stack.Screen name="drawer" />
      </Stack.Protected> */}

      <Stack.Screen name={Screens.WELCOME} />
      <Stack.Screen name={Screens.SIGN_IN} />
      <Stack.Screen name={Screens.OTP_CODE} />
      <Stack.Screen name={Screens.REGISTER} />
      <Stack.Screen name={Screens.BUY_PLAN} />
    </Stack>
  );
}
