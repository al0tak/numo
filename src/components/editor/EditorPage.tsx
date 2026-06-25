import { useState } from "react";

import { useTranslation } from "@/lib/i18n";
import { consumeImportedInvoice } from "@/lib/invoiceFileManagement";
import { createEmptyInvoice, type Invoice } from "@/types/invoice";

import { EditorPreview } from "./EditorPreview";
import { EditorSidebar } from "./EditorSidebar";

export const EditorPage = () => {
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
              <EditorSidebar invoice={invoice} onInvoiceChange={setInvoice} />
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
      <div className="
        hidden h-screen gap-4 overflow-hidden p-4
        md:flex
      ">
        <aside className="
          flex h-full w-[280px] shrink-0 flex-col gap-4 overflow-y-auto
          rounded-2xl border border-border bg-card p-5
        ">
          <EditorSidebar invoice={invoice} onInvoiceChange={setInvoice} />
        </aside>
        <div className="flex min-w-0 flex-1">
          <EditorPreview invoice={invoice} />
        </div>
      </div>
    </>
  );
};
