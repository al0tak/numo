import { motion } from "framer-motion";
import { MainMenu } from "../components/MainMenu";

export function HomePage() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <MainMenu variant="home" />
    </motion.div>
  );
}
