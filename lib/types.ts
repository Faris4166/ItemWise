export interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
}

export interface InvoiceData {
  seller: { name: string; phone: string; address: string };
  buyer: { name: string; phone: string };
  items: InvoiceItem[];
  labor: number;
  promptPay: { id: string; type: "phone" | "citizen" };
}
