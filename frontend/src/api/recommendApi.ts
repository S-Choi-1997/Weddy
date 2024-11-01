import axios from "axios"
import { Product } from "./product.type";

const BASE_URL = 'http://localhost:8000/api/recommends';

export const aiRecommend = async (data: string): Promise<Product[]> => {
  const response = await axios({
    method: 'get',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `
    },
    data: {
      message: data
    }
  });
  console.log(response.data);
  return response.data;
};