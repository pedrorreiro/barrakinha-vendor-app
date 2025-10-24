import { Redirect } from "expo-router";
import { useState } from "react";
import { Screens } from "../enums";
import { useAuth } from "@/hooks/useAuth";
import { Splash } from "@/components/Splash";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (isLoading || showSplash) {
    return <Splash onAnimationComplete={handleSplashComplete} />;
  }

  return <Redirect href={isAuthenticated ? Screens.HOME : Screens.WELCOME} />;
}
