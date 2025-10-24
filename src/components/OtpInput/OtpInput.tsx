import { View, Text, TextInput, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useOtpClipboard } from "@/hooks/useOtpClipboard";

interface OtpInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onFill: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
  failedCode?: string;
}

export default function OtpInput({
  value,
  onChangeText,
  onFill,
  length = 6,
  autoFocus = true,
  failedCode,
}: OtpInputProps) {
  const blinkAnimation = useRef(new Animated.Value(1)).current;

  // Hook para gerenciar clipboard
  const { clearCache } = useOtpClipboard({
    length,
    autoFocus,
    onCodeDetected: (code) => {
      onChangeText(code);
      if (code.length === length) {
        setTimeout(() => onFill(code), 100);
      }
    },
    failedCode,
  });

  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(blinkAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => blink());
    };
    blink();
  }, [blinkAnimation]);

  const handleChangeText = (text: string) => {
    // Remove caracteres não numéricos e limita ao tamanho especificado
    const numericText = text.replace(/[^0-9]/g, "").slice(0, length);
    onChangeText(numericText);

    // Se o campo foi limpo, reseta o cache do último código
    if (numericText === "") {
      clearCache();
    }

    if (numericText.length === length) {
      onFill(numericText);
    }
  };

  return (
    <View className="gap-3">
      <View className="relative bg-white rounded-xl">
        <TextInput
          autoComplete="one-time-code"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={autoFocus}
          caretHidden={true}
          keyboardType="number-pad"
          onChangeText={handleChangeText}
          returnKeyType="done"
          className="h-16 text-transparent px-4 z-10"
          value={value}
        />
        <View className="z-0 absolute top-0 right-0 left-0 bottom-0 w-full flex-row justify-around px-4">
          {Array.from({ length }).map((_, index) => {
            const char = value[index];
            const isCurrentPosition = index === value.length;

            return (
              <View
                key={index}
                className="flex-grow flex-shrink flex-basis-0 h-16 flex items-center justify-center"
              >
                {char ? (
                  <Text className="text-4xl text-center font-semibold">
                    {char}
                  </Text>
                ) : (
                  <Animated.Text
                    className="text-gray-400 font-normal text-4xl text-center"
                    style={[
                      isCurrentPosition && {
                        opacity: blinkAnimation,
                        color: "#666666",
                      },
                    ]}
                  >
                    -
                  </Animated.Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
