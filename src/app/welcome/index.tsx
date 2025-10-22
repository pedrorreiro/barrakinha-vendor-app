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

          <View className="w-full mt-9 mb-auto">
            <TouchableOpacity
              onPress={() => {
                router.push("/register");
              }}
            >
              <View className="flex-row items-center justify-center rounded-lg py-4 px-6 border border-primary bg-primary">
                <Text className="text-[17px] leading-[22px] font-bold text-white">
                  Começar agora
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push("/sign-in");
              }}
            >
              <View className="flex-row items-center justify-center rounded-lg py-4 px-6 border-[1.5px] border-primary bg-transparent mt-3">
                <Text className="text-[17px] leading-[22px] font-bold text-primary">
                  Já tenho uma conta
                </Text>
              </View>
            </TouchableOpacity>
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
