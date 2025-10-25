import { useState } from "react";
import { router } from "expo-router";
import { Screens } from "@/enums";
import { ValidateStoreResponse } from "@/services/barrakinha/barrakinha.service.type";
import { OtpType } from "@/services/barrakinha/barrakinha.service";
import barrakinhaService from "@/services/barrakinha/barrakinha.service";
import { useAuth } from "./useAuth";

/**
 * Parâmetros para o hook de verificação OTP
 */
export interface UseOtpVerificationParams {
  phone: string;
  otpType: OtpType;
  login: (code: string, phone: string) => Promise<any>;
  refreshToken: () => Promise<any>;
  checkAuth: () => Promise<void>;
}

/**
 * Hook para gerenciar verificação de código OTP
 */
export function useOtpVerification({
  phone,
  otpType,
  login,
  refreshToken,
  checkAuth,
}: UseOtpVerificationParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [failedCode, setFailedCode] = useState<string>("");

  const { setRefreshToken } = useAuth();

  /**
   * Processa autenticação de loja (login)
   */
  const handleStoreAuthentication = async (code: string) => {
    const loginResult = await login(code, phone);
    if (loginResult.isWrong()) return false;

    router.replace(Screens.HOME);
    return true;
  };

  /**
   * Processa validação de loja (ativação)
   */
  const handleStoreValidation = async (code: string) => {
    const result = await barrakinhaService.validateStore(code, phone);
    if (result.isWrong()) return false;

    const data = result.value as unknown as ValidateStoreResponse;

    await setRefreshToken(data.refreshToken);

    await refreshToken();
    await checkAuth();

    router.replace(Screens.HOME);
  };

  /**
   * Processa o código OTP baseado no tipo
   */
  const processOtpCode = async (code: string): Promise<boolean> => {
    switch (otpType) {
      case OtpType.STORE_AUTHENTICATION:
        return await handleStoreAuthentication(code);

      case OtpType.STORE_VALIDATION:
        return await handleStoreValidation(code);

      default:
        console.warn(
          `[useOtpVerification] Tipo de OTP não reconhecido: ${otpType}`
        );
        return false;
    }
  };

  /**
   * Gerencia a verificação do código OTP
   */
  const handleVerifyCode = async (code: string) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const success = await processOtpCode(code);

      if (!success) {
        setFailedCode(code);
      }
    } catch (error) {
      // Em caso de erro, armazena o código que falhou
      setFailedCode(code);
    } finally {
      setIsLoading(false);
      setCode("");
    }
  };

  /**
   * Reenvia o código OTP
   */
  const handleResendCode = async () => {
    const result = await barrakinhaService.sendOtpCode(phone, otpType);

    if (result.isWrong()) return;

    setCode("");
    return true;
  };

  /**
   * Obtém a tela de destino baseada no tipo de OTP
   */
  const getNextScreen = (): string => {
    const screenMap = {
      [OtpType.STORE_AUTHENTICATION]: Screens.HOME,
      [OtpType.STORE_VALIDATION]: Screens.WELCOME,
    };

    return screenMap[otpType] || Screens.WELCOME;
  };

  return {
    // Estados
    isLoading,
    code,
    failedCode,
    nextScreen: getNextScreen(),

    // Ações
    setCode,
    handleVerifyCode,
    handleResendCode,
  };
}
