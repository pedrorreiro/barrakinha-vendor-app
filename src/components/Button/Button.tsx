import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { getButtonClasses, getTextClasses } from "./Button.styles";

type IProps = {
  title: string;
  onPress: () => void;
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
  return (
    <TouchableOpacity
      className={getButtonClasses(variant, size, disabled, className)}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text className={getTextClasses(variant, size, disabled, textClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
