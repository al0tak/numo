import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { type Invoice } from "@/types/invoice";

import { spring } from "../spring";
import { SuperMenuInvoiceForm } from "./SuperMenuInvoiceForm";

interface SuperMenuEditorBodyProps {
  invoice: Invoice;
  onInvoiceChange: (invoice: Invoice) => void;
}

export function SuperMenuEditorBody({
  invoice,
  onInvoiceChange,
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

      <motion.div layout="position" transition={spring}>
        <SuperMenuInvoiceForm invoice={invoice} onChange={onInvoiceChange} />
      </motion.div>
    </>
  );
}
