import { Image } from "react-native";

export function Avatar({ avatar }: { avatar: string }) {
  return <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full" />;
}
