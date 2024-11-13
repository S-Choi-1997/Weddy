import axios from "axios";
import { Product } from "./product.type";

const BASE_URL = "http://localhost:8007/api/recommends";

export const aiRecommend = async (message: string): Promise<Product[]> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}`,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
    params: { message }, // URL 파라미터로 message 전달
  });
  
  console.log(response.data);
  return response.data;
};
