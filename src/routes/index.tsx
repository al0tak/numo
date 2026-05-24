import { motion } from "framer-motion";

import { MainMenu } from "../components/MainMenu";

export function HomePage() {
  return (
    <motion.div
      className="flex min-h-screen items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <MainMenu variant="home" />
    </motion.div>
  );
}
