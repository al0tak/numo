import { motion } from "framer-motion";
import { MainMenu } from "../components/MainMenu";

export function InvoicesNewPage() {
  return (
    <motion.div
      className="min-h-screen flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="p-4 flex-shrink-0">
        <MainMenu variant="editor" />
      </div>
      <motion.div
        className="flex-1 p-8 flex flex-col gap-6"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.25 }}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">New Invoice</h1>
          <p className="text-sm text-muted-foreground">Fill in the details below</p>
        </div>
        <div className="border border-dashed border-border rounded-xl h-96 flex items-center justify-center text-muted-foreground text-sm">
          Invoice editor coming soon
        </div>
      </motion.div>
    </motion.div>
  );
}
