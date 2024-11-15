import axios from "axios";

const URL = import.meta.env.VITE_PUBLIC_URL
const BASE_URL = `${URL}/api/users`

//== 커플 코드 연결 ==//
export const connectCoupleCode = async (code: string): Promise<void> => {
  await axios({
    method: 'patch',
    url: `${BASE_URL}/couple-connect`,
    headers: {
      Authorization: sessionStorage.getItem("token")
    },
    data: {
      "code": code
    }
  });
};