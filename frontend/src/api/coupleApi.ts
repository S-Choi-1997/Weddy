import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/users'

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