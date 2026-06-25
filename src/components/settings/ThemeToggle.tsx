import { Monitor, Moon, Sun } from "lucide-react";

import { useTranslation } from "@/lib/i18n";
import { type ThemeMode, useTheme } from "@/lib/theme";

const OPTIONS: { mode: ThemeMode; labelKey: "light" | "auto" | "dark"; Icon: typeof Sun }[] = [
  { mode: "light", labelKey: "light", Icon: Sun },
  { mode: "auto", labelKey: "auto", Icon: Monitor },
  { mode: "dark", labelKey: "dark", Icon: Moon },
];

export const ThemeToggle = () => {
  const { mode, setMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{t.theme.label}</span>
      <div
        role="radiogroup"
        aria-label={t.theme.label}
        className="relative flex w-full gap-0.5 rounded-md bg-foreground/5 p-1"
      >
        {OPTIONS.map(({ mode: optionMode, labelKey, Icon }) => {
          const label = t.theme[labelKey];
          const active = mode === optionMode;
          return (
            <button
              key={optionMode}
              role="radio"
              aria-checked={active}
              aria-label={label}
              onClick={() => setMode(optionMode)}
              className="
                relative flex flex-1 cursor-pointer items-center justify-center
                gap-1.5 rounded-sm px-2 py-1 text-xs font-medium
                text-foreground/70 transition-colors
                hover:text-foreground
              "
            >
              {active && (
                <span className="absolute inset-0 rounded-sm bg-card shadow-sm" />
              )}
              <span
                className={[
                  "relative z-10 flex items-center gap-1.5",
                  active ? "text-foreground" : "",
                ].join(" ")}
              >
                <Icon size={14} />
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
