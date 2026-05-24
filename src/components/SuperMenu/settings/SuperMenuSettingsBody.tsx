import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

import { spring } from "../spring";

export function SuperMenuSettingsBody() {
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        layout="position"
        transition={spring}
        className="flex shrink-0 items-center gap-1.5 px-5 pt-5 pb-3"
      >
        <button
          onClick={() => navigate({ to: "/" })}
          className="
            -ml-0.5 cursor-pointer text-muted-foreground transition-colors
            hover:text-foreground
          "
        >
          <ChevronLeft size={18} />
        </button>
        <motion.span
          layoutId="numo-title"
          transition={spring}
          className="text-lg font-semibold tracking-tight"
        >
          numo
        </motion.span>
      </motion.div>

      <motion.div
        layout="position"
        transition={spring}
        className="
          flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pt-2 pb-5
        "
      >
        <ThemeToggle />
        <LanguageSwitcher />
      </motion.div>
    </>
  );
}
