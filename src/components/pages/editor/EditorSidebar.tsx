import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { type Invoice } from "@/types/invoice";

import { ExportInvoiceButton } from "./ExportInvoiceButton";
import { InvoiceForm } from "./InvoiceForm";

interface EditorSidebarProps {
  invoice: Invoice;
  onInvoiceChange: (invoice: Invoice) => void;
}

export function EditorSidebar({ invoice, onInvoiceChange }: EditorSidebarProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => navigate("/")}
          className="
            -ml-0.5 cursor-pointer text-muted-foreground transition-colors
            hover:text-foreground
          "
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-lg font-semibold tracking-tight">numo</span>
        <ExportInvoiceButton invoice={invoice} />
      </div>

      <InvoiceForm invoice={invoice} onChange={onInvoiceChange} />
    </>
  );
}
