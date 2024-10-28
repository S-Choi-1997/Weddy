export interface Product {
  id: string;
  type: string;
  name: string;
  price: string;
  address: string;
  vendorName: string;
  vendorId: string;
}

export interface ReviewData {
  content: string;
  date: string;
  score: number;
}
