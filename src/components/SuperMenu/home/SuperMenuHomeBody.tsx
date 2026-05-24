import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, LayoutDashboard } from "lucide-react";

import { ThemeToggle } from "../../ThemeToggle";
import { spring } from "../spring";
import { SuperMenuHomeButton } from "./SuperMenuHomeButton";

export function SuperMenuHomeBody() {
  const navigate = useNavigate();

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
          label="New Invoice"
          onClick={() => navigate({ to: "/invoices/new" })}
        />
        <SuperMenuHomeButton
          icon={<LayoutDashboard size={22} />}
          label="Option 2"
          onClick={() => {}}
        />
        <ThemeToggle />
      </motion.div>
    </>
  );
}
