import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, FileText, LayoutDashboard } from "lucide-react";
import { spring } from "./MainMenu";
import { MainMenuSidebarButton } from "./MainMenuSidebarButton";

export function MainMenuSidebarBody() {
  const navigate = useNavigate();

  return (
    <>
      <motion.div layout="position" transition={spring} className="flex items-center gap-1.5">
        <button
          onClick={() => navigate({ to: "/" })}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer -ml-0.5"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-lg font-semibold tracking-tight">numo</span>
      </motion.div>

      <motion.div layout="position" transition={spring} className="flex flex-col gap-2">
        <MainMenuSidebarButton
          icon={<FileText size={16} />}
          label="New Invoice"
          onClick={() => navigate({ to: "/invoices/new" })}
          active={true}
        />
        <MainMenuSidebarButton
          icon={<LayoutDashboard size={16} />}
          label="Option 2"
          onClick={() => {}}
          active={false}
        />
      </motion.div>
    </>
  );
}
