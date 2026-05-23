import { motion } from "framer-motion";
import { MainMenuHomeBody } from "./MainMenuHomeBody";
import { MainMenuSidebarBody } from "./MainMenuSidebarBody";

export const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

interface MainMenuProps {
  variant: "home" | "editor";
}

export function MainMenu({ variant }: MainMenuProps) {
  const isHome = variant === "home";

  return (
    <motion.div
      layoutId="nav-panel"
      transition={spring}
      className={[
        "flex flex-col",
        isHome
          ? "w-[360px] p-4 gap-5 rounded-3xl backdrop-blur-xl bg-white/50 items-center shadow-lg"
          : "w-[220px] h-full p-5 gap-4 rounded-2xl bg-card border border-border overflow-hidden",
      ].join(" ")}
    >
      {isHome ? <MainMenuHomeBody /> : <MainMenuSidebarBody />}
    </motion.div>
  );
}
