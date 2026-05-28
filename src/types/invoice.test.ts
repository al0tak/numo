import { createEmptyInvoice, createEmptyPosition } from "./invoice";

describe("createEmptyPosition", () => {
  it("returns a blank position with sensible defaults", () => {
    expect(createEmptyPosition()).toEqual({
      description: "",
      quantity: 1,
      unitPrice: 0,
    });
  });

  it("returns a fresh object on every call", () => {
    const a = createEmptyPosition();
    const b = createEmptyPosition();
    expect(a).not.toBe(b);
  });
});

describe("createEmptyInvoice", () => {
  it("starts with empty text fields and a single empty position", () => {
    const invoice = createEmptyInvoice();
    expect(invoice.companyName).toBe("");
    expect(invoice.sender).toBe("");
    expect(invoice.receiver).toBe("");
    expect(invoice.positions).toHaveLength(1);
    expect(invoice.positions[0]).toEqual(createEmptyPosition());
  });

  it("defaults the date to today as an ISO yyyy-mm-dd string", () => {
    const invoice = createEmptyInvoice();
    expect(invoice.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(invoice.date).toBe(new Date().toISOString().slice(0, 10));
  });

  it("does not share the positions array between invoices", () => {
    const a = createEmptyInvoice();
    const b = createEmptyInvoice();
    a.positions.push(createEmptyPosition());
    expect(b.positions).toHaveLength(1);
  });
});
