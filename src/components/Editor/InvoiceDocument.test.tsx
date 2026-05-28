import { render, screen, within } from "@testing-library/react";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";
import { type Invoice } from "@/types/invoice";

import { InvoiceDocument } from "./InvoiceDocument";

function makeInvoice(overrides: Partial<Invoice> = {}): Invoice {
  return {
    companyName: "Acme Inc",
    topText: "Invoice #1",
    sender: "Acme",
    receiver: "Globex",
    positions: [
      { description: "Design", quantity: 2, unitPrice: 100 },
      { description: "Hosting", quantity: 3, unitPrice: 50 },
    ],
    bottomText: "",
    footer: "",
    date: "2026-01-15",
    ...overrides,
  };
}

function renderDocument(invoice: Invoice) {
  return render(
    <LanguageProvider>
      <InvoiceDocument invoice={invoice} />
    </LanguageProvider>,
  );
}

const money = (value: number) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

describe("InvoiceDocument", () => {
  it("renders the company name and each position description", () => {
    renderDocument(makeInvoice());
    expect(screen.getByText("Acme Inc")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Hosting")).toBeInTheDocument();
  });

  it("sums the positions into a grand total", () => {
    const { container } = renderDocument(makeInvoice());
    // 2*100 + 3*50 = 350
    const tfoot = container.querySelector("tfoot");
    expect(tfoot).not.toBeNull();
    expect(within(tfoot!).getByText(money(350))).toBeInTheDocument();
  });

  it("shows the untitled placeholder when no company name is set", () => {
    renderDocument(makeInvoice({ companyName: "" }));
    expect(
      screen.getByText(translations.en.invoice.untitled),
    ).toBeInTheDocument();
  });

  it("treats non-finite quantities and prices as zero in the total", () => {
    const { container } = renderDocument(
      makeInvoice({
        positions: [
          { description: "Broken", quantity: Number.NaN, unitPrice: 10 },
          { description: "Valid", quantity: 1, unitPrice: 40 },
        ],
      }),
    );
    const tfoot = container.querySelector("tfoot");
    expect(within(tfoot!).getByText(money(40))).toBeInTheDocument();
  });
});
