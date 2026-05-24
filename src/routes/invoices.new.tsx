import { motion } from "framer-motion";

import { MainMenu } from "../components/MainMenu";

export function InvoicesNewPage() {
  return (
    <motion.div
      className="flex min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="shrink-0 p-4">
        <MainMenu variant="editor" />
      </div>
      <motion.div
        className="flex flex-1 flex-col gap-6 p-8"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.25 }}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">New Invoice</h1>
          <p className="text-sm text-muted-foreground">Fill in the details below</p>
        </div>
        <div className="
          flex h-96 items-center justify-center rounded-xl border border-dashed
          border-border text-sm text-muted-foreground
        ">
          Invoice editor coming soon
        </div>
      </motion.div>
    </motion.div>
  );
}
