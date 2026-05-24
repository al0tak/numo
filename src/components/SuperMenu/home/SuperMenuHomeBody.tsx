import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, LayoutDashboard, Settings } from "lucide-react";

import { useTranslation } from "@/i18n";

import { spring } from "../spring";
import { SuperMenuHomeButton } from "./SuperMenuHomeButton";

export function SuperMenuHomeBody() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <motion.span
        layoutId="numo-title"
        transition={spring}
        className="text-3xl font-semibold tracking-tight"
      >
        numo
      </motion.span>

      <motion.div layout="position" transition={spring} className="
        flex w-full gap-4
      ">
        <SuperMenuHomeButton
          icon={<FileText size={22} />}
          label={t.mainMenu.newInvoice}
          onClick={() => navigate({ to: "/invoices/new" })}
        />
        <SuperMenuHomeButton
          icon={<LayoutDashboard size={22} />}
          label={t.mainMenu.option2}
          onClick={() => {}}
        />
        <SuperMenuHomeButton
          icon={<Settings size={22} />}
          label={t.mainMenu.settings}
          onClick={() => navigate({ to: "/settings" })}
        />
      </motion.div>
    </>
  );
}
