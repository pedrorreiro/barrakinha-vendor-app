import { useMemo } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "@/hooks/useAuth";
import { useOtpVerification } from "@/hooks/useOtpVerification";
import Header from "@/components/Header";
import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import { useLocalSearchParams } from "expo-router";
import { maskPhoneNumberForPublicDisplay } from "@/utils/phone";
import { OtpType } from "@/services/barrakinha/barrakinha.service";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

type OtpCodeParams = {
  phone: string;
  otpType: string;
};

export default function OtpCode() {
  const { phone, otpType } = useLocalSearchParams<OtpCodeParams>();

  const { login, refreshToken, checkAuth } = useAuth();

  const {
    isLoading,
    code,
    failedCode,
    nextScreen,
    setCode,
    handleVerifyCode,
    handleResendCode,
  } = useOtpVerification({
    phone,
    otpType: otpType as OtpType,
    login,
    refreshToken,
    checkAuth,
  });

  const maskedPhone = useMemo(
    () => maskPhoneNumberForPublicDisplay(phone),
    [phone]
  );

  const onResendCode = async () => {
    const success = await handleResendCode();
    if (success) {
      Toast.success("Código reenviado!");
    }
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
              onPress={onResendCode}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
