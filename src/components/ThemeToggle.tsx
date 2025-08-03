import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Switch, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { colorScheme, toggleTheme } = useTheme();

  return (
    <View className="flex-row items-center gap-4">
      <Text className="text-foreground font-medium">
        <MaterialCommunityIcons
          name={colorScheme === "dark" ? "weather-night" : "weather-sunny"}
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </Text>
      <Switch
        value={colorScheme === "dark"}
        onValueChange={toggleTheme}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={"#f4f3f4"}
      />
    </View>
  );
}
