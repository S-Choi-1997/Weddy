export interface Product {
  type: string;
  name: string;
  price: string;
  location: string;
};

export interface Review {
  content: string;
  date: Date;
  score: number;
  image: string[];
};