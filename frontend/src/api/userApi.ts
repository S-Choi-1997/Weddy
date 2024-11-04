import axios from "axios";
import { userInformation } from "./user.type";

const BASE_URL = "http://localhost:8080/api/users";

//== 토큰 정보 ==//
export const getToken = async (userId: string | null): Promise<void> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/token/super`,
    params: {
      id: userId,
    }
  });
  sessionStorage.setItem("token", response.data.accessToken);
};

//== 로그아웃 ==//
export const logout = () => {
  axios({
    method: "post",
    url: `${BASE_URL}/logout`,
    headers: {
      Authorization: sessionStorage.getItem("token")
    },
  });
};

//== 회원 정보 ==//
export const getUserInfo = async (): Promise<userInformation> => {
  const response = await axios({
    method: "get",
    url: BASE_URL,
    headers: {
      Authorization: sessionStorage.getItem("token")
    },
  });
  return response.data.data;
};

//== 회원 정보 수정 ==//
export const editInfomation = async ( userInfo?: userInformation ): Promise<void> => {
  const response = await axios({
    method: "patch",
    url: BASE_URL,
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
    data: userInfo
  });
  console.log(response.data);
};
