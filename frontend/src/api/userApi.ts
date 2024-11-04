import axios from "axios";
import { userInformation } from "./user.type";

const BASE_URL = "http://localhost:8080/api/users";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwidXNlck5hbWUiOiJb6rSR7KO8XzHrsJhfYzEwM1_snbTrs5HsiJhdIiwiY29kZSI6IkczNzFSTyIsImlhdCI6MTczMDQyNDQ1MSwiZXhwIjoxNzMzMDE2NDUxfQ.R7YFdmlN-IZkTeo0veuMA4W2eW_9-dXJJ-pGU8SRmPk";

//== 토큰 정보 ==//
export const getToken = async (userId: string | null): Promise<void> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/token/super`,
    params: {
      id: userId,
    },
  });
  window.localStorage.setItem("token", response.data.accessToken);
};

//== 로그아웃 ==//
export const logout = () => {
  axios({
    method: "post",
    url: `${BASE_URL}/logout`,
    headers: {
      Authorization: `Bearer ${token}`
    }
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    // },
  });
};

//== 회원 정보 ==//
export const getUserInfo = async (): Promise<userInformation> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/userinfo`,
    headers: {
      Authorization: `Bearer ${token}`,
    }
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    // },
  });
  console.log(response.data);
  return response.data;
};

//== 회원 정보 수정 ==//
export const editInfomation = async ( userInfo?: userInformation ): Promise<void> => {
  const response = await axios({
    method: "patch",
    url: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem("token")} `,
    // },
    data: userInfo
  });
  console.log(response.data);
};
