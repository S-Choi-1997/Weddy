import axios from "axios";
import { Product } from "./product.type";

const URL = import.meta.env.VITE_PUBLIC_URL
const BASE_URL = `${URL}/api/recommends`

export const aiRecommend = async (message: string): Promise<Product[]> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}`,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
    params: { message },
  });
  
  console.log(response.data);
  return response.data;
};
