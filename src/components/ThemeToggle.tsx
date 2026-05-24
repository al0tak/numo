import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";

import { type ThemeMode, useTheme } from "@/lib/theme";

const OPTIONS: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { mode: "light", label: "Light", Icon: Sun },
  { mode: "auto", label: "Auto", Icon: Monitor },
  { mode: "dark", label: "Dark", Icon: Moon },
];

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="
        relative flex aspect-square flex-1 flex-col gap-0.5 rounded-sm
        bg-foreground/5 p-1
      "
    >
      {OPTIONS.map(({ mode: optionMode, label, Icon }) => {
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
              gap-2 rounded-xs px-2 text-xs font-medium text-foreground/70
              transition-colors
              hover:text-foreground
            "
          >
            {active && (
              <motion.span
                layoutId="theme-toggle-active"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className="absolute inset-0 rounded-xs bg-card shadow-sm"
              />
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
  );
}
