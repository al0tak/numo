export const LANGUAGES = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  uk: "Українська",
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: Language = "en";

export interface TranslationDict {
  mainMenu: {
    newInvoice: string;
    option2: string;
    languageLabel: string;
  };
  theme: {
    label: string;
    light: string;
    auto: string;
    dark: string;
  };
  editor: {
    bodyLabel: string;
    bodyPlaceholder: string;
  };
}

const en: TranslationDict = {
  mainMenu: {
    newInvoice: "New Invoice",
    option2: "Option 2",
    languageLabel: "Language",
  },
  theme: {
    label: "Theme",
    light: "Light",
    auto: "Auto",
    dark: "Dark",
  },
  editor: {
    bodyLabel: "Body",
    bodyPlaceholder: "Type something…",
  },
};

const es: TranslationDict = {
  mainMenu: {
    newInvoice: "Nueva factura",
    option2: "Opción 2",
    languageLabel: "Idioma",
  },
  theme: {
    label: "Tema",
    light: "Claro",
    auto: "Auto",
    dark: "Oscuro",
  },
  editor: {
    bodyLabel: "Cuerpo",
    bodyPlaceholder: "Escribe algo…",
  },
};

const de: TranslationDict = {
  mainMenu: {
    newInvoice: "Neue Rechnung",
    option2: "Option 2",
    languageLabel: "Sprache",
  },
  theme: {
    label: "Thema",
    light: "Hell",
    auto: "Auto",
    dark: "Dunkel",
  },
  editor: {
    bodyLabel: "Inhalt",
    bodyPlaceholder: "Schreibe etwas…",
  },
};

const uk: TranslationDict = {
  mainMenu: {
    newInvoice: "Новий рахунок",
    option2: "Опція 2",
    languageLabel: "Мова",
  },
  theme: {
    label: "Тема",
    light: "Світла",
    auto: "Авто",
    dark: "Темна",
  },
  editor: {
    bodyLabel: "Вміст",
    bodyPlaceholder: "Введіть щось…",
  },
};

export const translations: Record<Language, TranslationDict> = { en, es, de, uk };
