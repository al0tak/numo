import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { FileText, LayoutDashboard, Settings } from "lucide-react";
import { spring } from "./MainMenu";
import { MainMenuHomeButton } from "./MainMenuHomeButton";

export function MainMenuHomeBody() {
  const navigate = useNavigate();

  return (
    <>
      <motion.span layout="position" transition={spring} className="text-3xl font-semibold tracking-tight">
        numo
      </motion.span>

      <motion.div layout="position" transition={spring} className="flex gap-4 w-full">
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
