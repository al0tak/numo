import { type ReactNode, useEffect, useState } from "react";

import {
  isThemeMode,
  THEME_STORAGE_KEY,
  ThemeContext,
  type ThemeMode,
} from "./context";

const getInitialMode = (): ThemeMode => {
  if (typeof window === "undefined") return "auto";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(stored) ? stored : "auto";
};

const applyTheme = (mode: ThemeMode) => {
  const isDark =
    mode === "dark" ||
    (mode === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    applyTheme(mode);
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);

    if (mode !== "auto") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("auto");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mode]);

  return <ThemeContext value={{ mode, setMode }}>{children}</ThemeContext>;
};
