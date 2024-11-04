export interface ContractProduct {
  product_id: string;
  product_name: string;
  product_content: string;
}

export interface SentContractType {
  userId: string;
  totalMount: string;
  companyName: string;
  startDate: string;
  endDate: string;
  type: string;
  product: ContractProduct;
}

export interface ContractData {
  id: number;
  product: ContractProduct;
  customer?: string;
  type: string;
  content: string;
  status: "CONTRACT_PENDING" | "SIGN_PENDING" | "PAYMENT_PENDING" | "PAYMENT_COMPLETED";
  totalMount: string;
  downPayment: string;
  finalPayment: string;
  companyName: string;
  startDate: Date;
  endDate: Date;
  title: string;
  userName: string;
};