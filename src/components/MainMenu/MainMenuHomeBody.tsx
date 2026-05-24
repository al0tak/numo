import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, LayoutDashboard, Settings } from "lucide-react";

import { MainMenuHomeButton } from "./MainMenuHomeButton";
import { spring } from "./spring";

export function MainMenuHomeBody() {
  const navigate = useNavigate();

  return (
    <>
      <motion.span layout="position" transition={spring} className="
        text-3xl font-semibold tracking-tight
      ">
        numo
      </motion.span>

      <motion.div layout="position" transition={spring} className="
        flex w-full gap-4
      ">
        <MainMenuHomeButton
          icon={<FileText size={22} />}
          label="New Invoice"
          onClick={() => navigate({ to: "/invoices/new" })}
        />
        <MainMenuHomeButton
          icon={<LayoutDashboard size={22} />}
          label="Option 2"
          onClick={() => {}}
        />
        <MainMenuHomeButton
          icon={<Settings size={22} />}
          label="Option 3"
          onClick={() => {}}
        />
      </motion.div>
    </>
  );
}
