import { useMemo, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import { useRouter, useLocalSearchParams } from "expo-router";
import { maskPhoneNumberForPublicDisplay } from "@/utils/phone";
import barrakinhaService, {
  OtpType,
} from "@/services/barrakinha/barrakinha.service";
import { Screens } from "@/enums";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

type OtpCodeParams = {
  phone: string;
  otpType: string;
};

export default function OtpCode() {
  const { phone, otpType } = useLocalSearchParams<OtpCodeParams>();

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [failedCode, setFailedCode] = useState<string>("");

  const { login } = useAuth();
  const router = useRouter();

  const nextScreen = useMemo(() => {
    return {
      [OtpType.STORE_AUTHENTICATION]: Screens.HOME,
      [OtpType.STORE_VALIDATION]: Screens.WELCOME,
    }[otpType as OtpType];
  }, [otpType]);

  const maskedPhone = useMemo(
    () => maskPhoneNumberForPublicDisplay(phone),
    [phone]
  );

  const handleVerifyCode = async (code: string) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (otpType === OtpType.STORE_AUTHENTICATION) {
        const loginResult = await login(code, phone);
        if (loginResult.isWrong()) return;

        router.replace(nextScreen);
      }

      if (otpType === OtpType.STORE_VALIDATION) {
        const result = await barrakinhaService.validateStore(code, phone);
        if (result.isWrong()) return;

        Toast.success("Loja validada com sucesso");
        router.replace(nextScreen);
      }
    } catch (error) {
      // Em caso de erro, armazena o código que falhou
      setFailedCode(code);
    } finally {
      setIsLoading(false);
      setCode("");
    }
  };

  const handleResendCode = async () => {
    const result = await barrakinhaService.sendOtpCode(
      phone,
      otpType as OtpType
    );

    if (result.isWrong()) return;

    setCode("");
    Toast.success("Código reenviado!");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Confirmar código"
        subtitle={`Enviamos um código de verificação para o seu número de telefone ${maskedPhone}. Digite o código para continuar.`}
        showBackButton={true}
      />

      <KeyboardAwareScrollView className="flex-1">
        <View className="flex-1 px-6">
          <View className="mb-6">
            <OtpInput
              value={code}
              onChangeText={setCode}
              onFill={handleVerifyCode}
              length={6}
              autoFocus={true}
              failedCode={failedCode}
            />
          </View>

          <View className="mb-6">
            <Button
              variant="outline"
              title="Reenviar código"
              onPress={handleResendCode}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
