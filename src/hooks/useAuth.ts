import {
  getStoredUser,
  removeStoredUser,
  setStoredUser,
} from "@/utils/storage";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    // Carrega o usuário do storage na inicialização
    const loadUser = async () => {
      try {
        const storedUser = getStoredUser();
        setUser(storedUser);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStoredUser(userData);
    setUser(userData);
  };

  const logout = async () => {
    removeStoredUser();
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
  };
}
