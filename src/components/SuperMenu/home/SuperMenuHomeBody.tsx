import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, LayoutDashboard } from "lucide-react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n";

import { ThemeToggle } from "../../ThemeToggle";
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
        <ThemeToggle />
      </motion.div>

      <motion.div layout="position" transition={spring} className="w-full">
        <LanguageSwitcher />
      </motion.div>
    </>
  );
}
