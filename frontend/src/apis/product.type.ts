export interface Product {
  productId: number;
  type: string;
  name: string;
  price: string;
  address: string;
  vendorName: string;
};

export interface ReviewData {
  content: string;
  date: string;
  score: number;
};