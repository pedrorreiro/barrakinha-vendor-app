import React, { useMemo, useState } from "react";
import { StyleSheet, SafeAreaView, View, Alert } from "react-native";
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
import { Screens } from "../_layout";

type OtpCodeParams = {
  phone: string;
  otpType: string;
};

export default function OtpCode() {
  const { phone, otpType } = useLocalSearchParams<OtpCodeParams>();

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [code, setCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const { login } = useAuth();
  const router = useRouter();

  const nextScreen = useMemo(() => {
    return {
      [OtpType.STORE_AUTHENTICATION]: Screens.BUY_PLAN,
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
        await login(code, phone);
        router.replace(nextScreen);
      }

      if (otpType === OtpType.STORE_VALIDATION) {
        await barrakinhaService.validateStore(code, phone);
        Alert.alert("Loja validada com sucesso");
        router.replace(nextScreen);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      setCode("");
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    try {
      // Simular reenvio do código
      await barrakinhaService.sendOtpCode(phone, otpType as OtpType);
      setCode("");
    } catch (error) {
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Código de Verificação"
        subtitle={`Enviamos um código de verificação para o seu número de telefone ${maskedPhone}. Digite o código para continuar.`}
        showBackButton={true}
      />

      <KeyboardAwareScrollView>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <OtpInput
              value={code}
              onChangeText={setCode}
              onFill={handleVerifyCode}
              length={6}
              autoFocus={true}
            />
          </View>

          <View style={styles.resendContainer}>
            <Button
              variant="outline"
              title={
                isLoading
                  ? "Verificando..."
                  : resendCooldown > 0
                  ? `Reenviar em ${resendCooldown}s`
                  : isResending
                  ? "Reenviando..."
                  : "Reenviar código"
              }
              onPress={handleResendCode}
              disabled={isResending || resendCooldown > 0}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Form */
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  formAction: {
    marginBottom: 16,
  },
  resendContainer: {
    marginBottom: 24,
  },
});
