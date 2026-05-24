import { createContext, useContext } from "react";

import { type Language, type TranslationDict } from "./translations";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDict;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used inside <LanguageProvider>");
  return ctx;
}
