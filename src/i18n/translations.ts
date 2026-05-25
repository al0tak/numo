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
    zoomIn: string;
    zoomOut: string;
    fitToScreen: string;
  };
  invoice: {
    companyName: string;
    companyNamePlaceholder: string;
    topText: string;
    topTextPlaceholder: string;
    sender: string;
    senderPlaceholder: string;
    receiver: string;
    receiverPlaceholder: string;
    date: string;
    positions: string;
    positionDescription: string;
    positionDescriptionPlaceholder: string;
    positionQuantity: string;
    positionUnitPrice: string;
    positionTotal: string;
    addPosition: string;
    removePosition: string;
    bottomText: string;
    bottomTextPlaceholder: string;
    footer: string;
    footerPlaceholder: string;
    total: string;
    untitled: string;
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
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    fitToScreen: "Fit to screen",
  },
  invoice: {
    companyName: "Company name",
    companyNamePlaceholder: "Acme Inc.",
    topText: "Top text",
    topTextPlaceholder: "Invoice #001",
    sender: "Sender",
    senderPlaceholder: "Name, address, tax ID…",
    receiver: "Receiver",
    receiverPlaceholder: "Client name, address…",
    date: "Date",
    positions: "Positions",
    positionDescription: "Description",
    positionDescriptionPlaceholder: "Service or item",
    positionQuantity: "Qty",
    positionUnitPrice: "Price",
    positionTotal: "Total",
    addPosition: "Add position",
    removePosition: "Remove position",
    bottomText: "Bottom text",
    bottomTextPlaceholder: "Payment terms, notes…",
    footer: "Footer",
    footerPlaceholder: "Bank details, contact…",
    total: "Total",
    untitled: "Untitled",
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
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    fitToScreen: "Ajustar a pantalla",
  },
  invoice: {
    companyName: "Nombre de la empresa",
    companyNamePlaceholder: "Acme S.L.",
    topText: "Texto superior",
    topTextPlaceholder: "Factura n.º 001",
    sender: "Emisor",
    receiverPlaceholder: "Nombre del cliente, dirección…",
    senderPlaceholder: "Nombre, dirección, NIF…",
    receiver: "Receptor",
    date: "Fecha",
    positions: "Conceptos",
    positionDescription: "Descripción",
    positionDescriptionPlaceholder: "Servicio o artículo",
    positionQuantity: "Cant.",
    positionUnitPrice: "Precio",
    positionTotal: "Total",
    addPosition: "Añadir concepto",
    removePosition: "Quitar concepto",
    bottomText: "Texto inferior",
    bottomTextPlaceholder: "Condiciones de pago, notas…",
    footer: "Pie",
    footerPlaceholder: "Datos bancarios, contacto…",
    total: "Total",
    untitled: "Sin título",
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
    zoomIn: "Vergrößern",
    zoomOut: "Verkleinern",
    fitToScreen: "An Bildschirm anpassen",
  },
  invoice: {
    companyName: "Firmenname",
    companyNamePlaceholder: "Acme GmbH",
    topText: "Kopftext",
    topTextPlaceholder: "Rechnung Nr. 001",
    sender: "Absender",
    senderPlaceholder: "Name, Adresse, USt-IdNr…",
    receiver: "Empfänger",
    receiverPlaceholder: "Kundenname, Adresse…",
    date: "Datum",
    positions: "Positionen",
    positionDescription: "Beschreibung",
    positionDescriptionPlaceholder: "Leistung oder Artikel",
    positionQuantity: "Menge",
    positionUnitPrice: "Preis",
    positionTotal: "Summe",
    addPosition: "Position hinzufügen",
    removePosition: "Position entfernen",
    bottomText: "Fußtext",
    bottomTextPlaceholder: "Zahlungsbedingungen, Notizen…",
    footer: "Fußzeile",
    footerPlaceholder: "Bankverbindung, Kontakt…",
    total: "Gesamt",
    untitled: "Ohne Titel",
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
    zoomIn: "Збільшити",
    zoomOut: "Зменшити",
    fitToScreen: "За розміром екрана",
  },
  invoice: {
    companyName: "Назва компанії",
    companyNamePlaceholder: "ТОВ «Акме»",
    topText: "Верхній текст",
    topTextPlaceholder: "Рахунок №001",
    sender: "Відправник",
    senderPlaceholder: "Ім'я, адреса, ІПН…",
    receiver: "Отримувач",
    receiverPlaceholder: "Ім'я клієнта, адреса…",
    date: "Дата",
    positions: "Позиції",
    positionDescription: "Опис",
    positionDescriptionPlaceholder: "Послуга або товар",
    positionQuantity: "К-сть",
    positionUnitPrice: "Ціна",
    positionTotal: "Сума",
    addPosition: "Додати позицію",
    removePosition: "Видалити позицію",
    bottomText: "Нижній текст",
    bottomTextPlaceholder: "Умови оплати, нотатки…",
    footer: "Підвал",
    footerPlaceholder: "Банківські реквізити, контакти…",
    total: "Разом",
    untitled: "Без назви",
  },
};

export const translations: Record<Language, TranslationDict> = { en, es, de, uk };
