import {
  createEmptyPosition,
  type Invoice,
  type Position,
} from "@/types/invoice";

const IMPORT_STORAGE_KEY = "numo:imported-invoice";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parsePosition(value: unknown): Position {
  if (!isRecord(value)) throw new Error("Invalid position");
  const { description, quantity, unitPrice } = value;
  if (
    typeof description !== "string" ||
    typeof quantity !== "number" ||
    typeof unitPrice !== "number"
  ) {
    throw new Error("Invalid position");
  }
  return { description, quantity, unitPrice };
}

export function parseInvoiceJson(text: string): Invoice {
  const data: unknown = JSON.parse(text);
  if (!isRecord(data)) throw new Error("Invalid invoice");

  const stringField = (key: string): string => {
    const value = data[key];
    if (value === undefined || value === null) return "";
    if (typeof value !== "string") {
      throw new Error(`Invalid field: ${key}`);
    }
    return value;
  };

  const rawPositions = data.positions;
  let positions: Position[];
  if (rawPositions === undefined) {
    positions = [createEmptyPosition()];
  } else if (Array.isArray(rawPositions)) {
    positions = rawPositions.map(parsePosition);
  } else {
    throw new Error("Invalid positions");
  }

  return {
    companyName: stringField("companyName"),
    topText: stringField("topText"),
    sender: stringField("sender"),
    receiver: stringField("receiver"),
    bottomText: stringField("bottomText"),
    footer: stringField("footer"),
    date: stringField("date"),
    positions,
  };
}

export function stashImportedInvoice(invoice: Invoice): void {
  sessionStorage.setItem(IMPORT_STORAGE_KEY, JSON.stringify(invoice, null, 2));
}

export function consumeImportedInvoice(): Invoice | null {
  const raw = sessionStorage.getItem(IMPORT_STORAGE_KEY);
  if (raw === null) return null;
  sessionStorage.removeItem(IMPORT_STORAGE_KEY);
  try {
    return parseInvoiceJson(raw);
  } catch {
    return null;
  }
}
