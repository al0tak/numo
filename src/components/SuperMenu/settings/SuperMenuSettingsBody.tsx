import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SuperMenuSettingsBody() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          onClick={() => navigate({ to: "/" })}
          className="
            -ml-0.5 cursor-pointer text-book-muted transition-colors
            hover:text-book-foreground
          "
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-lg font-semibold tracking-tight">numo</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </>
  );
}
