import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SettingsMenu() {
  const navigate = useNavigate();

  return (
    <div className="
      flex size-full max-w-[480px] flex-col overflow-hidden rounded-2xl border
      border-border bg-card
    ">
      <div className="flex shrink-0 items-center gap-1.5 px-5 pt-5 pb-3">
        <button
          onClick={() => navigate("/")}
          className="
            -ml-0.5 cursor-pointer text-muted-foreground transition-colors
            hover:text-foreground
          "
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-lg font-semibold tracking-tight">numo</span>
      </div>

      <div className="
        flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pt-2 pb-5
      ">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
