import { useTranslation } from "@/i18n";
import { type Invoice, type Position } from "@/types/invoice";

interface InvoiceDocumentProps {
  invoice: Invoice;
}

function positionTotal(position: Position) {
  const q = Number.isFinite(position.quantity) ? position.quantity : 0;
  const p = Number.isFinite(position.unitPrice) ? position.unitPrice : 0;
  return q * p;
}

function formatMoney(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(value: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString();
}

export function InvoiceDocument({ invoice }: InvoiceDocumentProps) {
  const { t } = useTranslation();
  const total = invoice.positions.reduce((sum, p) => sum + positionTotal(p), 0);

  return (
    <div className="
      pointer-events-none flex h-full flex-col px-14 pt-14 pb-10 text-[13px]
      text-black select-none
    ">
      <header className="flex items-start justify-between gap-6">
        <div className="text-2xl font-semibold tracking-tight">
          {invoice.companyName || (
            <span className="text-neutral-300">{t.invoice.untitled}</span>
          )}
        </div>
        <div className="text-right">
          {invoice.topText && (
            <div className="text-base font-medium">{invoice.topText}</div>
          )}
          {invoice.date && (
            <div className="mt-1 text-xs text-neutral-500">
              {formatDate(invoice.date)}
            </div>
          )}
        </div>
      </header>

      <section className="mt-10 grid grid-cols-2 gap-8">
        <div>
          <div className="
            mb-1 text-[10px] font-medium tracking-wider text-neutral-400
            uppercase
          ">
            {t.invoice.sender}
          </div>
          <div className="whitespace-pre-wrap">{invoice.sender}</div>
        </div>
        <div>
          <div className="
            mb-1 text-[10px] font-medium tracking-wider text-neutral-400
            uppercase
          ">
            {t.invoice.receiver}
          </div>
          <div className="whitespace-pre-wrap">{invoice.receiver}</div>
        </div>
      </section>

      <section className="mt-10">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="
              border-b border-neutral-300 text-left text-neutral-500
            ">
              <th className="py-2 font-medium">{t.invoice.positionDescription}</th>
              <th className="w-16 py-2 text-right font-medium">
                {t.invoice.positionQuantity}
              </th>
              <th className="w-24 py-2 text-right font-medium">
                {t.invoice.positionUnitPrice}
              </th>
              <th className="w-24 py-2 text-right font-medium">
                {t.invoice.positionTotal}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.positions.map((position, index) => (
              <tr key={index} className="border-b border-neutral-200 align-top">
                <td className="py-2 pr-2">{position.description}</td>
                <td className="py-2 text-right tabular-nums">
                  {Number.isFinite(position.quantity) ? position.quantity : 0}
                </td>
                <td className="py-2 text-right tabular-nums">
                  {formatMoney(
                    Number.isFinite(position.unitPrice) ? position.unitPrice : 0,
                  )}
                </td>
                <td className="py-2 text-right tabular-nums">
                  {formatMoney(positionTotal(position))}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}></td>
              <td className="
                pt-3 text-right text-[10px] font-medium tracking-wider
                text-neutral-500 uppercase
              ">
                {t.invoice.total}
              </td>
              <td className="
                pt-3 text-right text-base font-semibold tabular-nums
              ">
                {formatMoney(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>

      {invoice.bottomText && (
        <section className="mt-8 whitespace-pre-wrap">{invoice.bottomText}</section>
      )}

      <div className="mt-auto" />

      {invoice.footer && (
        <footer className="
          mt-8 border-t border-neutral-200 pt-3 text-[11px] whitespace-pre-wrap
          text-neutral-500
        ">
          {invoice.footer}
        </footer>
      )}
    </div>
  );
}
