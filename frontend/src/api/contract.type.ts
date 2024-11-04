interface ContractProduct {
  product_id: string;
  product_name: string;
  product_content: string;
  type: string;
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