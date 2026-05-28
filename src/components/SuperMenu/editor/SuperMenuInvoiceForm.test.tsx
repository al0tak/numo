import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import { translations } from "@/i18n/translations";
import { createEmptyInvoice, type Invoice } from "@/types/invoice";

import { SuperMenuInvoiceForm } from "./SuperMenuInvoiceForm";

const t = translations.en.invoice;

/** Stateful host so the controlled form behaves like it does in the app. */
function Harness({ initial }: { initial?: Invoice }) {
  const [invoice, setInvoice] = useState<Invoice>(
    () => initial ?? createEmptyInvoice(),
  );
  return (
    <LanguageProvider>
      <SuperMenuInvoiceForm invoice={invoice} onChange={setInvoice} />
    </LanguageProvider>
  );
}

describe("SuperMenuInvoiceForm", () => {
  it("edits the company name through the controlled callback", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const input = screen.getByLabelText(t.companyName);
    await user.type(input, "Acme");

    expect(input).toHaveValue("Acme");
  });

  it("adds a new position when the add button is clicked", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    expect(screen.getAllByLabelText(t.positionDescription)).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: t.addPosition }));

    expect(screen.getAllByLabelText(t.positionDescription)).toHaveLength(2);
  });

  it("removes a position when its remove button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Harness
        initial={{
          ...createEmptyInvoice(),
          positions: [
            { description: "First", quantity: 1, unitPrice: 1 },
            { description: "Second", quantity: 1, unitPrice: 1 },
          ],
        }}
      />,
    );

    expect(screen.getAllByLabelText(t.positionDescription)).toHaveLength(2);

    const removeButtons = screen.getAllByRole("button", {
      name: t.removePosition,
    });
    await user.click(removeButtons[0]);

    const remaining = screen.getAllByLabelText(t.positionDescription);
    expect(remaining).toHaveLength(1);
    expect(remaining[0]).toHaveValue("Second");
  });
});
