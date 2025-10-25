import { useState, useEffect } from "react";
import { barrakinhaService } from "@/services";
import { Either, right, wrong } from "@/utils/either";
import { storage, StorageKeys } from "@/utils/storage";
import { Screens } from "@/enums";
import { useRouter } from "expo-router";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const checkAuth = async () => {
    try {
      const refreshToken = await storage.get<string>(StorageKeys.REFRESH_TOKEN);
      setIsAuthenticated(!!refreshToken);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (
    code: string,
    phone: string
  ): Promise<Either<Error, void>> => {
    try {
      const result = await barrakinhaService.login(code, phone);
      if (result.isWrong()) return wrong(result.value);

      await storage.set<string>(
        StorageKeys.REFRESH_TOKEN,
        result.value.refreshToken
      );

      await refreshToken();

      setIsAuthenticated(true);
      return right(undefined);
    } catch (error) {
      return wrong(error as Error);
    }
  };

  const logout = async () => {
    try {
      await storage.delete(StorageKeys.REFRESH_TOKEN);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = await storage.get<string>(StorageKeys.REFRESH_TOKEN);
      if (!refreshToken)
        return wrong(
          new Error(
            "Não foi possível persistir sua sessão. Faça login novamente."
          )
        );

      const result = await barrakinhaService.refreshToken(refreshToken);

      if (result.isWrong()) {
        await logout();
        router.replace(Screens.WELCOME);
        return wrong(result.value);
      }

      await storage.set<string>(
        StorageKeys.ACCESS_TOKEN,
        result.value.accessToken
      );
      setIsAuthenticated(true);
      return right(undefined);
    } catch (error) {
      console.error("Erro ao atualizar token:", error);
      return wrong(error as Error);
    }
  };

  const setRefreshToken = async (refreshToken: string) => {
    await storage.set<string>(StorageKeys.REFRESH_TOKEN, refreshToken);
    await checkAuth();
  };

  return {
    login,
    logout,
    refreshToken,
    setRefreshToken,
    checkAuth,
    isAuthenticated,
    isLoading,
  };
}
