// Mock do storage para testes
// Para usar o storage real, descomente as linhas abaixo:

// import { MMKV } from "react-native-mmkv";
// export const storage = new MMKV();

// Mock do storage
const mockStorage: Record<string, string> = {};

export const storage = {
  getString: (key: string) => mockStorage[key] || null,
  set: (key: string, value: string) => {
    mockStorage[key] = value;
  },
  delete: (key: string) => {
    delete mockStorage[key];
  },
};

export const STORAGE_KEYS = {
  THEME: "theme",
  USER: "user",
} as const;

export const getStoredTheme = (): "light" | "dark" | null => {
  const theme = storage.getString(STORAGE_KEYS.THEME);
  return theme === "light" || theme === "dark" ? theme : null;
};

export const setStoredTheme = (theme: "light" | "dark") => {
  storage.set(STORAGE_KEYS.THEME, theme);
};

export const getStoredUser = (): string | null => {
  return storage.getString(STORAGE_KEYS.USER) || null;
};

export const setStoredUser = (user: string) => {
  storage.set(STORAGE_KEYS.USER, user);
};

export const removeStoredUser = () => {
  storage.delete(STORAGE_KEYS.USER);
};
