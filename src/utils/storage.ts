import {
  getStorageString,
  setStorageString,
  deleteStorageKey,
} from "./secureStorage";

export enum StorageKeys {
  THEME = "theme",
  USER = "user",
  REFRESH_TOKEN = "refresh_token",
  ACCESS_TOKEN = "access_token",
}

// API unificada e simples para storage
export const storage = {
  // Obter valor
  get: async <T = string>(key: StorageKeys): Promise<T | null> => {
    const value = await getStorageString(key);
    return value as T | null;
  },

  // Salvar valor
  set: async <T = string>(key: StorageKeys, value: T): Promise<void> => {
    await setStorageString(key, String(value));
  },

  // Deletar valor
  delete: async (key: StorageKeys): Promise<void> => {
    await deleteStorageKey(key);
  },

  // Verificar se existe
  has: async (key: StorageKeys): Promise<boolean> => {
    const value = await getStorageString(key);
    return value !== null;
  },
};
