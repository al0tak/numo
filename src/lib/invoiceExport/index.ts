import { type Invoice } from "@/types/invoice";

function serializeInvoice(invoice: Invoice): string {
  return JSON.stringify(invoice, null, 2);
}

function withJsonExtension(name: string): string {
  const trimmed = name.trim() || "invoice";
  return trimmed.toLowerCase().endsWith(".json") ? trimmed : `${trimmed}.json`;
}

export function defaultInvoiceFileName(invoice: Invoice): string {
  return invoice.companyName.trim() || "invoice";
}

export function downloadInvoiceJson(invoice: Invoice, fileName: string): void {
  const blob = new Blob([serializeInvoice(invoice)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = withJsonExtension(fileName);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
