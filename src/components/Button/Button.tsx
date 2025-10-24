import { useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { getButtonClasses, getTextClasses } from "./Button.styles";

type IProps = {
  title: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  className?: string;
  textClassName?: string;
};

export default function Button({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  size = "medium",
  className = "",
  textClassName = "",
}: IProps) {
  const [loading, setLoading] = useState(false);
  const isDisabled = disabled || loading;

  const handlePress = async () => {
    if (isDisabled) return;

    try {
      setLoading(true);
      const result = onPress();

      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      className={getButtonClasses(variant, size, isDisabled, className)}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? "#F82E08" : "white"}
        />
      ) : (
        <Text
          className={getTextClasses(variant, size, isDisabled, textClassName)}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
