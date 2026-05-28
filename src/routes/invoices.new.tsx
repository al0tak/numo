import { motion } from "framer-motion";
import { useState } from "react";

import { SuperMenuEditorBody } from "@/components/SuperMenu/editor/SuperMenuEditorBody";
import { useTranslation } from "@/i18n";
import { consumeImportedInvoice } from "@/lib/invoiceIo";
import { createEmptyInvoice, type Invoice } from "@/types/invoice";

import { EditorPreview } from "../components/Editor";
import { SuperMenu } from "../components/SuperMenu";

export function InvoicesNewPage() {
  const [invoice, setInvoice] = useState<Invoice>(
    () => consumeImportedInvoice() ?? createEmptyInvoice(),
  );
  const [activeView, setActiveView] = useState<"form" | "preview">("form");
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile layout */}
      <div className="
        flex h-dvh flex-col gap-3 p-4
        md:hidden
      ">
        <div className="
          min-h-0 flex-1 overflow-hidden rounded-2xl border border-border
          bg-card
        ">
          {activeView === "form" ? (
            <div className="h-full overflow-y-auto p-5">
              <SuperMenuEditorBody invoice={invoice} onInvoiceChange={setInvoice} />
            </div>
          ) : (
            <EditorPreview invoice={invoice} />
          )}
        </div>
        <div className="
          flex shrink-0 rounded-xl border border-border bg-card/60 p-1
          backdrop-blur-xl
        ">
          <button
            onClick={() => setActiveView("form")}
            className={[
              "flex-1 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeView === "form"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {t.editor.edit}
          </button>
          <button
            onClick={() => setActiveView("preview")}
            className={[
              "flex-1 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeView === "preview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {t.editor.preview}
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <motion.div
        className="
          hidden h-screen gap-4 overflow-hidden p-4
          md:flex
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <SuperMenu variant="editor" invoice={invoice} onInvoiceChange={setInvoice} />
        <motion.div
          className="flex min-w-0 flex-1"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
        >
          <EditorPreview invoice={invoice} />
        </motion.div>
      </motion.div>
    </>
  );
}
