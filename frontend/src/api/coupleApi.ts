import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/users'

//== 커플 코드 조회 ==//
export const getCoupleCode = async (): Promise<string> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/couple-code`,
    headers: {
      Authorization: sessionStorage.getItem("token")
    }
  });
  return response.data.data.coupleCode;
}

//== 커플 코드 연결 ==//
export const connectCoupleCode = async (code: string): Promise<void> => {
  const response = await axios({
    method: 'patch',
    url: `${BASE_URL}/couple-connect`,
    headers: {
      Authorization: sessionStorage.getItem("token")
    },
    data: code
  });
  console.log(response.data);
}