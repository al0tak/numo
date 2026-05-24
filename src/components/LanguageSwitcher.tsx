import { type Language, LANGUAGES, useTranslation } from "@/i18n";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();

  return (
    <label className="
      flex w-full items-center gap-2 text-xs text-muted-foreground
    ">
      <span className="shrink-0">{t.mainMenu.languageLabel}</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="
          h-7 flex-1 cursor-pointer rounded-md border border-border
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
}
