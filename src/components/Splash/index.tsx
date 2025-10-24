import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface SplashProps {
  onAnimationComplete?: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onAnimationComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const startAnimations = () => {
      // Animação de fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      // Animação de scale
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();

      // Animação de rotação para o ícone
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();

      // Animação de slide up para o texto
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }).start();

      // Callback após animações
      setTimeout(() => {
        onAnimationComplete?.();
      }, 3000);
    };

    startAnimations();
  }, [fadeAnim, scaleAnim, rotateAnim, slideAnim, onAnimationComplete]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      className="flex-1 justify-center items-center bg-background relative"
      style={{ width, height }}
    >
      {/* Elementos decorativos de fundo */}
      <View className="absolute top-24 left-12 w-15 h-15 rounded-full bg-card opacity-30 justify-center items-center">
        <Text className="text-xl">💰</Text>
      </View>
      <View className="absolute top-48 right-20 w-10 h-10 rounded-full bg-primary opacity-20 justify-center items-center">
        <Text className="text-base">📱</Text>
      </View>
      <View className="absolute bottom-36 left-8 w-20 h-20 rounded-full bg-card opacity-20 justify-center items-center">
        <Text className="text-2xl">🏪</Text>
      </View>
      <View className="absolute bottom-48 right-10 w-12 h-12 rounded-full bg-primary opacity-15 justify-center items-center">
        <Text className="text-lg">💳</Text>
      </View>
      <Animated.View
        className="items-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {/* Ícone/Logo */}
        <Animated.View
          className="mb-8"
          style={{
            transform: [{ rotate }],
          }}
        >
          <View
            className="w-20 h-20 rounded-full bg-primary justify-center items-center shadow-lg"
            style={{ shadowColor: "#F82E08", elevation: 8 }}
          >
            <Text className="text-3xl text-white">🛍️</Text>
          </View>
        </Animated.View>

        {/* Nome do App */}
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          }}
        >
          <Text
            className="text-4xl font-bold text-primary text-center tracking-wider"
            style={{
              textShadowColor: "rgba(248, 46, 8, 0.3)",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }}
          >
            Barrakinha
          </Text>

          <Text className="text-sm text-accent text-center mt-2 font-normal italic">
            "Venda mais, venda melhor"
          </Text>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View
          className="mt-10"
          style={{
            opacity: fadeAnim,
          }}
        >
          <View className="w-10 h-1 bg-primary rounded-sm overflow-hidden">
            <Animated.View
              className="w-full h-full bg-card"
              style={{
                transform: [
                  {
                    translateX: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-40, 0],
                    }),
                  },
                ],
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};
