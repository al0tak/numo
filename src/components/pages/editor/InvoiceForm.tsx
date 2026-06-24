import { Plus, X } from "lucide-react";

import { useTranslation } from "@/lib/i18n";
import { createEmptyPosition, type Invoice, type Position } from "@/types/invoice";

interface InvoiceFormProps {
  invoice: Invoice;
  onChange: (invoice: Invoice) => void;
}

const inputClass = `
  w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm
  shadow-sm outline-none
  placeholder:text-muted-foreground
  focus-visible:ring-2 focus-visible:ring-ring
`;

const textareaClass = `
  w-full resize-y rounded-md border border-input bg-background px-2.5 py-1.5
  text-sm shadow-sm outline-none
  placeholder:text-muted-foreground
  focus-visible:ring-2 focus-visible:ring-ring
`;

const labelClass = "flex flex-col gap-1";
const labelTextClass = "text-xs text-muted-foreground";

export function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
  const { t } = useTranslation();

  const update = <K extends keyof Invoice>(key: K, value: Invoice[K]) => {
    onChange({ ...invoice, [key]: value });
  };

  const updatePosition = (index: number, patch: Partial<Position>) => {
    const next = invoice.positions.map((p, i) => (i === index ? { ...p, ...patch } : p));
    update("positions", next);
  };

  const addPosition = () => {
    update("positions", [...invoice.positions, createEmptyPosition()]);
  };

  const removePosition = (index: number) => {
    update(
      "positions",
      invoice.positions.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <label className={labelClass}>
        <span className={labelTextClass}>{t.invoice.companyName}</span>
        <input
          type="text"
          value={invoice.companyName}
          onChange={(e) => update("companyName", e.target.value)}
          placeholder={t.invoice.companyNamePlaceholder}
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>{t.invoice.topText}</span>
        <input
          type="text"
          value={invoice.topText}
          onChange={(e) => update("topText", e.target.value)}
          placeholder={t.invoice.topTextPlaceholder}
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>{t.invoice.date}</span>
        <input
          type="date"
          value={invoice.date}
          onChange={(e) => update("date", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>{t.invoice.sender}</span>
        <textarea
          value={invoice.sender}
          onChange={(e) => update("sender", e.target.value)}
          placeholder={t.invoice.senderPlaceholder}
          rows={3}
          className={textareaClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>{t.invoice.receiver}</span>
        <textarea
          value={invoice.receiver}
          onChange={(e) => update("receiver", e.target.value)}
          placeholder={t.invoice.receiverPlaceholder}
          rows={3}
          className={textareaClass}
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className={labelTextClass}>{t.invoice.positions}</span>
        <div className="flex flex-col gap-2">
          {invoice.positions.map((position, index) => (
            <div
              key={index}
              className="
                relative flex flex-col gap-1.5 rounded-md border border-border
                bg-background/40 p-2
              "
            >
              <button
                type="button"
                onClick={() => removePosition(index)}
                aria-label={t.invoice.removePosition}
                className="
                  absolute top-1.5 right-1.5 flex size-5 cursor-pointer
                  items-center justify-center rounded-sm text-muted-foreground
                  transition-colors
                  hover:bg-foreground/5 hover:text-foreground
                "
              >
                <X size={12} />
              </button>
              <input
                type="text"
                value={position.description}
                onChange={(e) => updatePosition(index, { description: e.target.value })}
                placeholder={t.invoice.positionDescriptionPlaceholder}
                aria-label={t.invoice.positionDescription}
                className={[inputClass, "pr-7"].join(" ")}
              />
              <div className="flex gap-1.5">
                <label className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[10px] text-muted-foreground">
                    {t.invoice.positionQuantity}
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    value={Number.isFinite(position.quantity) ? position.quantity : 0}
                    onChange={(e) =>
                      updatePosition(index, { quantity: Number(e.target.value) })
                    }
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[10px] text-muted-foreground">
                    {t.invoice.positionUnitPrice}
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step="any"
                    value={Number.isFinite(position.unitPrice) ? position.unitPrice : 0}
                    onChange={(e) =>
                      updatePosition(index, { unitPrice: Number(e.target.value) })
                    }
                    className={inputClass}
                  />
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addPosition}
            className="
              flex cursor-pointer items-center justify-center gap-1.5 rounded-md
              border border-dashed border-border px-2 py-1.5 text-xs
              text-muted-foreground transition-colors
              hover:border-foreground/30 hover:text-foreground
            "
          >
            <Plus size={12} />
            {t.invoice.addPosition}
          </button>
        </div>
      </div>

      <label className={labelClass}>
        <span className={labelTextClass}>{t.invoice.bottomText}</span>
        <textarea
          value={invoice.bottomText}
          onChange={(e) => update("bottomText", e.target.value)}
          placeholder={t.invoice.bottomTextPlaceholder}
          rows={3}
          className={textareaClass}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>{t.invoice.footer}</span>
        <textarea
          value={invoice.footer}
          onChange={(e) => update("footer", e.target.value)}
          placeholder={t.invoice.footerPlaceholder}
          rows={2}
          className={textareaClass}
        />
      </label>
    </div>
  );
}
