import { Upload } from "lucide-react";
import { useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { useTranslation } from "@/i18n";
import { defaultInvoiceFileName, downloadInvoiceJson } from "@/lib/invoiceIo";
import { type Invoice } from "@/types/invoice";

interface ExportInvoiceButtonProps {
  invoice: Invoice;
}

export function ExportInvoiceButton({ invoice }: ExportInvoiceButtonProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleOpenChange = (next: boolean) => {
    if (next) setFileName(defaultInvoiceFileName(invoice));
    setOpen(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    downloadInvoiceJson(invoice, fileName);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={t.io.export}
        onClick={() => handleOpenChange(true)}
        className="
          ml-auto flex size-7 cursor-pointer items-center justify-center
          rounded-md text-muted-foreground transition-colors
          hover:bg-foreground/5 hover:text-foreground
        "
      >
        <Upload size={18} />
      </button>
      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
        title={t.io.exportTitle}
        description={t.io.exportDescription}
      >
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">
              {t.io.fileNameLabel}
            </span>
            <input
              autoFocus
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder={t.io.fileNamePlaceholder}
              className="
                w-full rounded-md border border-input bg-background px-2.5
                py-1.5 text-sm shadow-sm outline-none
                placeholder:text-muted-foreground
                focus-visible:ring-2 focus-visible:ring-ring
              "
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                cursor-pointer rounded-md border border-border px-3 py-1.5
                text-sm font-medium text-foreground transition-colors
                hover:bg-foreground/5
              "
            >
              {t.io.cancel}
            </button>
            <button
              type="submit"
              className="
                cursor-pointer rounded-md bg-foreground px-3 py-1.5 text-sm
                font-medium text-background transition-colors
                hover:bg-foreground/90
              "
            >
              {t.io.download}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
