import { Appearance } from "react-native";

/**
 * Detecta o tema atual do sistema
 * @returns "light" ou "dark" baseado no tema do sistema
 */
export function getSystemTheme(): "light" | "dark" {
  const colorScheme = Appearance.getColorScheme();

  return colorScheme === "dark" ? "dark" : "light";
}

/**
 * Detecta se o sistema está em modo escuro
 * @returns true se o tema for dark, false caso contrário
 */
export function isSystemDarkMode(): boolean {
  return getSystemTheme() === "dark";
}
