import { View, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import { router } from "expo-router";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export default function Header({
  title,
  subtitle,
  showBackButton = true,
  onBackPress,
}: HeaderProps) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="px-6 mb-7 mt-4">
      {showBackButton && (
        <TouchableOpacity
          onPress={handleBackPress}
          className="w-10 h-10 rounded-full items-center justify-center bg-card mb-4"
        >
          <FeatherIcon color={"#F82E08"} name="arrow-left" size={24} />
        </TouchableOpacity>
      )}

      {title && (
        <Text className="text-[34px] font-bold text-foreground mb-3">
          {title}
        </Text>
      )}

      {subtitle && (
        <Text className="text-[15px] leading-5 font-medium text-secondary">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
