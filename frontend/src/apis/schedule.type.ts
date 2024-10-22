export interface Schedule {
  type: string;
  startDate: Date | null;
  endDate: Date | null;
  content: string;
};