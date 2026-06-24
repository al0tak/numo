import { FileText, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "@/lib/i18n";

import { HomeMenuButton } from "./HomeMenuButton";
import { ImportInvoiceButton } from "./ImportInvoiceButton";

export function HomeMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="
      flex w-full max-w-[360px] flex-col items-center gap-5 rounded-3xl border
      border-border bg-card/60 p-4 backdrop-blur-xl
    ">
      <span className="text-3xl font-semibold tracking-tight">numo</span>

      <div className="flex w-full gap-4">
        <HomeMenuButton
          icon={<FileText size={22} />}
          label={t.mainMenu.newInvoice}
          onClick={() => navigate("/invoices/new")}
        />
        <ImportInvoiceButton />
        <HomeMenuButton
          icon={<Settings size={22} />}
          label={t.mainMenu.settings}
          onClick={() => navigate("/settings")}
        />
      </div>
    </div>
  );
}
