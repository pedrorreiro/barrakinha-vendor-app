import { useState, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import * as Clipboard from "expo-clipboard";

interface UseOtpClipboardProps {
  length?: number;
  autoFocus?: boolean;
  onCodeDetected: (code: string) => void;
  failedCode?: string;
}

export function useOtpClipboard({
  length = 6,
  autoFocus = true,
  onCodeDetected,
  failedCode,
}: UseOtpClipboardProps) {
  const [lastDetectedCode, setLastDetectedCode] = useState<string>("");
  const lastDetectedCodeRef = useRef<string>("");
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  // Função para detectar e colar código da área de transferência
  const checkClipboardForOtp = async () => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();

      const otpRegex = new RegExp(`\\b\\d{${length}}\\b`);
      const match = clipboardContent.match(otpRegex);

      if (match && match[0]) {
        const otpCode = match[0];

        if (otpCode === lastDetectedCodeRef.current) {
          return;
        }

        // Atualiza tanto o estado quanto a ref imediatamente
        setLastDetectedCode(otpCode);
        lastDetectedCodeRef.current = otpCode;

        // Cola automaticamente o código detectado
        onCodeDetected(otpCode);
      }
    } catch (error) {}
  };

  // Verifica a área de transferência quando o app volta do background
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      // Só verifica se o app estava em background e agora voltou para active
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        const timer = setTimeout(() => {
          checkClipboardForOtp();
        }, 500);

        return () => clearTimeout(timer);
      }

      // Atualiza o estado atual do app
      appStateRef.current = nextAppState as AppStateStatus;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  // Monitora quando um código falha para armazená-lo como último detectado
  useEffect(() => {
    if (failedCode) {
      setLastDetectedCode(failedCode);
      lastDetectedCodeRef.current = failedCode;
    }
  }, [failedCode]);

  const clearCache = () => {
    setLastDetectedCode("");
    lastDetectedCodeRef.current = "";
  };

  return {
    checkClipboardForOtp,
    clearCache,
  };
}
