import { motion } from "framer-motion";
import { useState } from "react";

import { EditorPreview } from "../components/Editor";
import { SuperMenu } from "../components/SuperMenu";

export function InvoicesNewPage() {
  const [text, setText] = useState("");

  return (
    <motion.div
      className="flex h-screen gap-4 overflow-hidden p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <SuperMenu variant="editor" editorText={text} onEditorTextChange={setText} />
      <motion.div
        className="flex min-w-0 flex-1"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.25 }}
      >
        <EditorPreview text={text} />
      </motion.div>
    </motion.div>
  );
}
