import { Image } from "react-native";

export function Avatar({
  avatar,
  size = 40,
}: {
  avatar: string;
  size?: number;
}) {
  return (
    <Image
      source={{ uri: avatar }}
      className={`w-[${size}px] h-[${size}px] rounded-full`}
    />
  );
}
