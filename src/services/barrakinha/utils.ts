import { AxiosRequestConfig } from "axios";
import { Toast } from "toastify-react-native";
import { storage, StorageKeys } from "@/utils/storage";
import { Screens } from "@/enums";
import { router } from "expo-router";
import { RefreshTokenResponse } from "./barrakinha.service.type";

// Interface estendida para incluir propriedades customizadas
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _isRefreshRequest?: boolean;
}

/**
 * Verifica se deve tentar renovar o token
 */
export function shouldRefreshToken(
  error: any,
  originalRequest: CustomAxiosRequestConfig
): boolean {
  return (
    error.response?.status === 401 &&
    !originalRequest._retry &&
    !originalRequest._isRefreshRequest // Evita loop infinito se o refresh token falhar
  );
}

/**
 * Processa o refresh bem-sucedido
 */
export async function handleSuccessfulRefresh(
  tokens: RefreshTokenResponse,
  originalRequest: CustomAxiosRequestConfig,
  apiInstance: any
) {
  const { accessToken, refreshToken: newRefreshToken } = tokens;

  // Salvar novos tokens
  await storage.set(StorageKeys.ACCESS_TOKEN, accessToken);
  await storage.set(StorageKeys.REFRESH_TOKEN, newRefreshToken);

  // Atualizar header da requisição original
  originalRequest.headers.Authorization = `Bearer ${accessToken}`;

  console.log("[BarrakinhaService] Token renovado, refazendo requisição...");

  // Refazer a requisição original
  return apiInstance(originalRequest);
}

/**
 * Limpa tokens e redireciona para login
 */
export async function logoutAndRedirect(message: string) {
  console.log(`[BarrakinhaService] ${message}`);
  await storage.delete(StorageKeys.ACCESS_TOKEN);
  await storage.delete(StorageKeys.REFRESH_TOKEN);
  router.replace(Screens.WELCOME);
}

/**
 * Exibe erro para o usuário
 */
export function handleErrorDisplay(error: any) {
  let errorMessage = error.response?.data.message || error.message;
  if (errorMessage === "Network Error") {
    errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
  }

  if (errorMessage) {
    Toast.show({
      text1: "Oops! 😅 ",
      text2: errorMessage,
      type: "error",
    });
  } else {
    console.log(
      "[BarrakinhaService] Response error:",
      error.response?.data || error.message
    );
  }
}

/**
 * Gerencia o processo de renovação do token
 */
export async function handleTokenRefresh(
  originalRequest: CustomAxiosRequestConfig,
  refreshTokenFn: (token: string) => Promise<any>,
  apiInstance: any
) {
  originalRequest._retry = true;

  try {
    const refreshToken = await storage.get<string>(StorageKeys.REFRESH_TOKEN);

    if (!refreshToken) {
      await logoutAndRedirect(
        "Sem refresh token, redirecionando para login..."
      );
      return null;
    }

    console.log("[BarrakinhaService] Token expirado, tentando refresh...");

    const refreshResult = await refreshTokenFn(refreshToken);

    if (refreshResult.isRight()) {
      return await handleSuccessfulRefresh(
        refreshResult.value,
        originalRequest,
        apiInstance
      );
    } else {
      await logoutAndRedirect(
        "Falha ao renovar token, redirecionando para login..."
      );
      return null;
    }
  } catch (refreshError) {
    console.log("[BarrakinhaService] Erro ao renovar token:", refreshError);
    await logoutAndRedirect("Erro ao renovar token");
    return null;
  }
}
