import { useColorScheme } from "nativewind";
import { useEffect } from "react";
// import { getStoredTheme, setStoredTheme } from "../utils/storage";

export function useTheme() {
  const { colorScheme, setColorScheme } = useColorScheme();

  // Carregar tema salvo no MMKV ao inicializar
  useEffect(() => {
    // const storedTheme = getStoredTheme();
    // if (storedTheme && storedTheme !== colorScheme) {
    //   setColorScheme(storedTheme);
    // }
  }, []);

  const toggleTheme = () => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(newTheme);
    // setStoredTheme(newTheme);
  };

  const setTheme = (theme: "light" | "dark") => {
    setColorScheme(theme);
    // setStoredTheme(theme);
  };

  return {
    colorScheme,
    toggleTheme,
    setTheme,
  };
}
