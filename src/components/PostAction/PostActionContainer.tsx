import { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

type ActionButtonProps = {
  icon: React.ReactNode;
  count: number;
  onPress: () => void;
  isActive?: boolean;
};

export const PostActionButton = ({
  icon,
  count,
  onPress,
  isActive = false,
}: ActionButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <Pressable onPress={handlePress} className="flex-row items-center">
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {icon}
      </Animated.View>
      <Text className="font-bold text-foreground ml-2">{count}</Text>
    </Pressable>
  );
};
