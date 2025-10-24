import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "@/components/PhoneInput";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import barrakinhaService, {
  OtpType,
} from "@/services/barrakinha/barrakinha.service";
import { Screens } from "@/enums";

export default function SignIn() {
  const [form, setForm] = useState({
    phone: "",
    isValidPhone: false,
  });
  const router = useRouter();

  const handleSendOtpCode = async () => {
    const result = await barrakinhaService.sendOtpCode(
      form.phone,
      OtpType.STORE_AUTHENTICATION
    );

    if (result.isWrong()) return;

    const routeParams = {
      pathname: `/otp-code/${form.phone}`,
      params: {
        otpType: OtpType.STORE_AUTHENTICATION.toString(),
      },
    };

    router.push(routeParams);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Entrar"
        subtitle="Digite seu número de telefone para receber um código de verificação."
        showBackButton={true}
      />

      <KeyboardAwareScrollView className="flex-1">
        <View className="flex-1 px-6">
          <View className="mb-4">
            <PhoneInput
              bordered={false}
              onPhoneChange={(phone, isValid) =>
                setForm({ ...form, phone, isValidPhone: isValid })
              }
            />
          </View>

          <View className="my-6">
            <Button
              title="Continuar"
              onPress={handleSendOtpCode}
              disabled={!form.isValidPhone}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View className="mt-auto pb-6 px-6">
        <TouchableOpacity
          onPress={() => router.push(Screens.REGISTER)}
          className="items-center"
        >
          <Text className="text-secondary text-base leading-5 text-center">
            Não tem uma conta?{" "}
            <Text className="text-right font-semibold underline">
              Cadastre-se
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
