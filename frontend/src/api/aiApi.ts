import axios from "axios"

const BASE_URL = 'http://localhost:8000/api/recommends';

export const aiRecommend = async (data: string): Promise<void> => {
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
};