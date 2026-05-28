import { motion } from "framer-motion";

import { SuperMenu } from "../components/SuperMenu";

export function SettingsPage() {
  return (
    <motion.div
      className="flex h-screen justify-center overflow-y-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <SuperMenu variant="settings" />
    </motion.div>
  );
}
