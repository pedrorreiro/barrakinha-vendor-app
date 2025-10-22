import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import { useRouter } from "expo-router";

export default function OtpCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [code, setCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const { login } = useAuth();
  const router = useRouter();

  const handleVerifyCode = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (code === "123456") {
        // await login("test-user");
        router.replace("welcome");
      } else {
        Alert.alert("Erro", "Código inválido. Tente novamente.");
        setCode("");
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao verificar o código. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    try {
      // Simular reenvio do código
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Iniciar cooldown de 60 segundos
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      Alert.alert("Sucesso", "Código reenviado com sucesso!");
      setCode("");
    } catch (error) {
      Alert.alert("Erro", "Erro ao reenviar código. Tente novamente.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Código de Verificação"
        subtitle="Enviamos um código de verificação para o seu número de telefone. Digite o código para continuar."
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

          <View style={styles.formAction}>
            <Button
              title={isLoading ? "Verificando..." : "Verificar Código"}
              onPress={handleVerifyCode}
              disabled={code.length !== 6 || isLoading}
            />
          </View>

          <View style={styles.resendContainer}>
            <Button
              variant="outline"
              title={
                resendCooldown > 0
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
