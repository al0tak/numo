import { Download } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Dialog } from "@/components/shared/Dialog";
import { useTranslation } from "@/lib/i18n";
import { parseInvoiceJson, stashImportedInvoice } from "@/lib/invoiceFileManagement";

import { HomeMenuButton } from "./HomeMenuButton";

export const ImportInvoiceButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const handleFile = async (file: File) => {
    try {
      const invoice = parseInvoiceJson(await file.text());
      stashImportedInvoice(invoice);
      await navigate("/invoices/new");
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
      <HomeMenuButton
        icon={<Download size={22} />}
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
};
