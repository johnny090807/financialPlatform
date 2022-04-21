export interface Invoice {
  uid?: string,
  date?: number,
  invoiceNumber?: number,
  period?: number,
  name?: string,
  description?: string,
  cost: number,
  type: string,
  VAT: number,

}
