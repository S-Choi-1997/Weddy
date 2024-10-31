import axios from "axios";
import { userInformation } from "./user.type";

const BASE_URL = "http://localhost:8080/api/users/reissue";

//== 토큰 정보 ==//
export const getToken = async (userId: string | null): Promise<void> => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/${userId}`,
  });
  console.log(response.data);
};

//== 회원 정보 ==//
export const getUserInfo = async (): Promise<userInformation> => {
  // const response = await axios({
  //   method: 'get',
  //   url: `${BASE_URL}/userinfo`,
  //   headers: {
  //     Authorization: `Bearer `
  //   }
  // });
  // console.log(response.data);
  // return response.data;

  //== dummy ==//
  return {
    name: "이병수",
    phone: "010-1234-5678",
    email: "lbs@naver.com",
    address: "광주광역시 광산구 하남동 1234",
  };
};

//== 회원 정보 수정 ==//
export const editInfomation = async (
  userInfo?: userInformation
): Promise<void> => {
  const response = await axios({
    method: "patch",
    url: BASE_URL,
    headers: {
      Authorization: `Bearer `,
    },
    data: userInfo,
  });
  console.log(response.data);
};
