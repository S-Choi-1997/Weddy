import { Product } from "./product.type";

export interface Schedule {
  type: string;
  startDate: Date | null;
  endDate: Date | null;
  content: string;
}

export interface GetSchedule {
  id: string;
  startDate: Date;
  endDate: Date;
  content: string;
  venderName: string;
  venderPhone: string;
  product: Product;
}
