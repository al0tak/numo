import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { spring } from "../spring";
import { SuperMenuEditorTextArea } from "./SuperMenuEditorTextArea";

interface SuperMenuEditorBodyProps {
  editorText: string;
  onEditorTextChange: (value: string) => void;
}

export function SuperMenuEditorBody({
  editorText,
  onEditorTextChange,
}: SuperMenuEditorBodyProps) {
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        layout="position"
        transition={spring}
        className="flex items-center gap-1.5"
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

      <motion.div layout="position" transition={spring} className="
        flex flex-col gap-2
      ">
        <SuperMenuEditorTextArea value={editorText} onChange={onEditorTextChange} />
      </motion.div>
    </>
  );
}
