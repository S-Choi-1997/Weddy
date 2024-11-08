export interface Schedule {
  contractType: string;
  startDate: string | null;
  endDate: string | null;
  content: string;
  productId?: string;
}

export interface GetSchedule {
  id: string;
  contractType: string;
  startDate: Date;
  endDate: Date;
  content: string;
  venderName: string;
  venderPhone: string;
  productId: string;
}