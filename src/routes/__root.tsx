import { Outlet } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "@tanstack/react-router";

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait" initial={false}>
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  );
}
