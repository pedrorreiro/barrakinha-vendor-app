import * as SecureStore from "expo-secure-store";

// Funções de CRUD para SecureStore
export const getStorageString = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Erro ao obter item do SecureStore:", error);
    return null;
  }
};

export const setStorageString = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Erro ao salvar item no SecureStore:", error);
  }
};

export const deleteStorageKey = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Erro ao deletar item do SecureStore:", error);
  }
};

export const clearAllStorage = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("theme");
  } catch (error) {
    console.error("Erro ao limpar todo o storage:", error);
  }
};
