import { type ReactNode, useCallback, useEffect, useState } from "react";

import { LanguageContext } from "./context";
import { DEFAULT_LANGUAGE, type Language, LANGUAGES, translations } from "./translations";

const STORAGE_KEY = "numo.language";

function isLanguage(value: string | null): value is Language {
  return value !== null && value in LANGUAGES;
}

function readInitialLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLanguage(stored)) return stored;
  const browser = window.navigator.language.slice(0, 2);
  if (isLanguage(browser)) return browser;
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext>
  );
}
