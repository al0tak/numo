import { useNavigate } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { useTranslation } from "@/i18n";
import { parseInvoiceJson, stashImportedInvoice } from "@/lib/invoiceIo";

import { SuperMenuHomeButton } from "./SuperMenuHomeButton";

export function ImportInvoiceButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const handleFile = async (file: File) => {
    try {
      const invoice = parseInvoiceJson(await file.text());
      stashImportedInvoice(invoice);
      await navigate({ to: "/invoices/new" });
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void handleFile(file);
        }}
      />
      <SuperMenuHomeButton
        icon={<Upload size={22} />}
        label={t.io.import}
        onClick={() => inputRef.current?.click()}
      />
      <Dialog
        open={error}
        onOpenChange={setError}
        title={t.io.importErrorTitle}
        description={t.io.importError}
      />
    </>
  );
}
