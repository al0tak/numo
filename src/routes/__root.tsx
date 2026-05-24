import { Outlet } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait" initial={false}>
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  );
}
