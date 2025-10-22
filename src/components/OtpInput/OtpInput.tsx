import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

interface OtpInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onFill?: () => void;
  length?: number;
  autoFocus?: boolean;
}

export default function OtpInput({
  value,
  onChangeText,
  onFill,
  length = 6,
  autoFocus = true,
}: OtpInputProps) {
  const handleChangeText = (text: string) => {
    // Remove caracteres não numéricos e limita ao tamanho especificado
    const numericText = text.replace(/[^0-9]/g, "").slice(0, length);
    onChangeText(numericText);

    if (numericText.length === length) {
      onFill?.();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        caretHidden={true}
        keyboardType="number-pad"
        onChangeText={handleChangeText}
        returnKeyType="done"
        style={styles.input}
        value={value}
      />
      <View style={styles.overlay}>
        {Array.from({ length }).map((_, index) => {
          const char = value[index];
          return (
            <Text key={index} style={styles.char}>
              {char || <Text style={styles.charEmpty}>-</Text>}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  input: {
    height: 60,
    color: "transparent",
    paddingHorizontal: 16,
    zIndex: 2,
  },
  overlay: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  char: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    lineHeight: 60,
    fontSize: 34,
    textAlign: "center",
    fontWeight: "600",
  },
  charEmpty: {
    color: "#BBB9BC",
    fontWeight: "400",
  },
});
