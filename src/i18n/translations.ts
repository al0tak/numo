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
    settings: string;
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
    zoomIn: string;
    zoomOut: string;
    fitToScreen: string;
  };
}

const en: TranslationDict = {
  mainMenu: {
    newInvoice: "New Invoice",
    option2: "Option 2",
    settings: "Settings",
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
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fitToScreen: "Fit to screen",
  },
};

const es: TranslationDict = {
  mainMenu: {
    newInvoice: "Nueva factura",
    option2: "Opción 2",
    settings: "Ajustes",
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
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    fitToScreen: "Ajustar a pantalla",
  },
};

const de: TranslationDict = {
  mainMenu: {
    newInvoice: "Neue Rechnung",
    option2: "Option 2",
    settings: "Einstellungen",
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
    zoomIn: "Vergrößern",
    zoomOut: "Verkleinern",
    fitToScreen: "An Bildschirm anpassen",
  },
};

const uk: TranslationDict = {
  mainMenu: {
    newInvoice: "Новий рахунок",
    option2: "Опція 2",
    settings: "Налаштування",
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
    zoomIn: "Збільшити",
    zoomOut: "Зменшити",
    fitToScreen: "За розміром екрана",
  },
};

export const translations: Record<Language, TranslationDict> = { en, es, de, uk };
