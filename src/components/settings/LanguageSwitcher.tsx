import { type Language, LANGUAGES, useTranslation } from "@/lib/i18n";

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useTranslation();

  return (
    <label className="flex w-full flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{t.mainMenu.languageLabel}</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="
          h-8 w-full cursor-pointer rounded-md border border-border
          bg-background px-2 text-xs text-foreground transition-colors
          hover:bg-accent
          focus:ring-1 focus:ring-ring focus:outline-none
        "
      >
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
};
