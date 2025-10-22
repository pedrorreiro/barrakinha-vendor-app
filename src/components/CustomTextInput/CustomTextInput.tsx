import React, { useMemo } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FieldError } from "react-hook-form";

interface CustomTextInputProps extends TextInputProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  error?: FieldError;
  iconColor?: string;
  label?: string;
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
  maxLength?: number;
}

export default function CustomTextInput({
  iconName,
  iconSize = 20,
  iconColor = "#889797",
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  maxLength = 50,
  ...textInputProps
}: CustomTextInputProps) {
  const showError = useMemo(() => {
    return textInputProps.value.length > 0 && error;
  }, [textInputProps.value, error?.message]);

  return (
    <>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          containerStyle,
          showError && styles.errorBorder,
        ]}
      >
        {iconName && (
          <View style={styles.iconContainer}>
            <Ionicons color={iconColor} name={iconName} size={iconSize} />
          </View>
        )}

        <TextInput
          maxLength={maxLength}
          style={[styles.input, inputStyle]}
          {...textInputProps}
        />
      </View>

      {showError && <Text style={styles.errorText}>{error?.message}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
  },
  errorBorder: {
    borderColor: "rgba(248, 46, 8, 0.4)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    marginBottom: 16,
  },
  iconContainer: {
    paddingLeft: 12,
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingRight: 16,
    paddingLeft: 0,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 12,
  },
  errorText: {
    fontSize: 13,
    color: "#F82E08",
    marginTop: -8,
    marginBottom: 16,
    marginLeft: 4,
  },
});
