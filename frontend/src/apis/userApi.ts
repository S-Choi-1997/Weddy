import axios from "axios"
import { EditUserInfo } from "./user.type";

const BASE_URL = 'http://localhost:8080/api/users'

//== 토큰 정보 ==//
export const getToken = async (userId: string): Promise<void> => {
  const response = await axios({
    method: 'get',
    url: `${BASE_URL}/${userId}/token`
  });
  console.log(response.data);
};

//== 회원 정보 수정 ==//
export const editInfomation = async (userInfo?: EditUserInfo): Promise<void> => {
  const response = await axios({
    method: 'patch',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `
    },
    data: userInfo
  });
  console.log(response.data);
};