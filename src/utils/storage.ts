import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const STORAGE_KEYS = {
  THEME: "theme",
} as const;

export const getStoredTheme = (): "light" | "dark" | null => {
  const theme = storage.getString(STORAGE_KEYS.THEME);
  return theme === "light" || theme === "dark" ? theme : null;
};

export const setStoredTheme = (theme: "light" | "dark") => {
  storage.set(STORAGE_KEYS.THEME, theme);
};
