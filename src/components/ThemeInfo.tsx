import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export function ThemeInfo() {
  const { colorScheme, setTheme } = useTheme();

  return (
    <View className="p-4 bg-card rounded-lg m-4">
      <Text className="text-foreground text-lg font-bold mb-2">
        Informações do Tema
      </Text>
      <Text className="text-foreground mb-2">
        Tema atual: {colorScheme === "dark" ? "Escuro" : "Claro"}
      </Text>
      <View className="flex-row gap-2 mt-2">
        <Text
          className={`px-3 py-1 rounded ${
            colorScheme === "light"
              ? "bg-primary text-white"
              : "bg-gray-300 text-gray-600"
          }`}
          onPress={() => setTheme("light")}
        >
          Claro
        </Text>
        <Text
          className={`px-3 py-1 rounded ${
            colorScheme === "dark"
              ? "bg-primary text-white"
              : "bg-gray-300 text-gray-600"
          }`}
          onPress={() => setTheme("dark")}
        >
          Escuro
        </Text>
      </View>
    </View>
  );
}
