import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-6 flex-grow flex-shrink flex-basis-0">
        <Image
          alt=""
          className="w-[300px] h-[300px] my-6 self-center"
          source={{ uri: "https://assets.withfra.me/Landing.7.png" }}
        />

        <View className="mt-auto flex-grow flex-shrink flex-basis-0 justify-end items-center">
          <Text className="text-[34px] font-bold text-foreground mb-3 text-center">
            Bem-vindo!
          </Text>

          <Text className="text-[15px] leading-5 font-medium text-secondary text-center">
            Comece sua jornada conosco e descubra novas possibilidades.
          </Text>

          <View className="w-full mt-9 mb-auto gap-4">
            <Button
              title="Começar agora"
              size="large"
              onPress={() => {
                router.push("/register");
              }}
            />

            <Button
              title="Já tenho uma conta"
              size="large"
              onPress={() => {
                router.push("/sign-in");
              }}
              variant="outline"
            />

            <Button
              title="Tela de planos"
              size="large"
              onPress={() => {
                router.push("/buy-plan");
              }}
              variant="outline"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <Text className="text-[15px] leading-[22px] font-normal text-muted text-center">
              Ao continuar, você concorda com nossos
              {"\n "}
              <Text className="text-accent font-semibold underline decoration-black decoration-solid">
                Termos e Condições
              </Text>{" "}
              e{" "}
              <Text className="text-accent font-semibold underline decoration-black decoration-solid">
                Política de Privacidade
              </Text>
              .
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
