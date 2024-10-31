export interface ContractData {
  id: number;
  productName?: string;
  customer?: string;
  type: string;
  status: "CONTRACT_PENDING" | "SIGN_PENDING" | "PAYMENT_PENDING" | "PAYMENT_COMPLETED";
  totalMount: string;
  downPayment: string;
  finalPayment: string;
  companyName: string;
  startDate: Date;
  endDate: Date;
};