export interface Position {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  companyName: string;
  topText: string;
  sender: string;
  receiver: string;
  positions: Position[];
  bottomText: string;
  footer: string;
  date: string;
}

export const createEmptyPosition = (): Position => {
  return { description: "", quantity: 1, unitPrice: 0 };
};

export const createEmptyInvoice = (): Invoice => {
  return {
    companyName: "",
    topText: "",
    sender: "",
    receiver: "",
    positions: [createEmptyPosition()],
    bottomText: "",
    footer: "",
    date: new Date().toISOString().slice(0, 10),
  };
};
