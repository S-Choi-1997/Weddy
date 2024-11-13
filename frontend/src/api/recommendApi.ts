import axios from "axios";
import { RecommendData } from "./recommend.type";

const BASE_URL = "http://localhost:8086/api/recommends";

export const aiRecommend = async (message: string): Promise<RecommendData[]> => {
  const response = await axios({
    method: "get",
    url: BASE_URL,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
    data: message,
  });
  console.log(response.data);
  return response.data;
};