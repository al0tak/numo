import { useNavigate } from "@tanstack/react-router";
import { FileText, LayoutDashboard, Settings } from "lucide-react";

import { useTranslation } from "@/i18n";

import { SuperMenuHomeButton } from "./SuperMenuHomeButton";

export function SuperMenuHomeBody() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <span className="text-center text-4xl font-semibold tracking-tight">
        numo
      </span>

      <div className="flex w-full flex-1 flex-col justify-center gap-3">
        <SuperMenuHomeButton
          icon={<FileText size={20} />}
          label={t.mainMenu.newInvoice}
          onClick={() => navigate({ to: "/invoices/new" })}
        />
        <SuperMenuHomeButton
          icon={<LayoutDashboard size={20} />}
          label={t.mainMenu.option2}
          onClick={() => {}}
        />
        <SuperMenuHomeButton
          icon={<Settings size={20} />}
          label={t.mainMenu.settings}
          onClick={() => navigate({ to: "/settings" })}
        />
      </div>

      <a
        href="https://github.com/al0tak"
        target="_blank"
        rel="noopener noreferrer"
        className="
          text-center text-xs text-book-muted transition-colors
          hover:text-book-foreground
        "
      >
        {t.mainMenu.by} al0tak
      </a>
    </>
  );
}
