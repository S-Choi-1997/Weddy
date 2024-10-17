import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/user'

//== 카카오 로그인 ==//
export const kakaoLogin = () => {

}

//== 구글 로그인 ==//
export const googleLogin = () => {

}

//== 로그아웃 ==//
export const logout = () => {
  axios({
    method: 'post',
    url: `${BASE_URL}/logout`
  });
}

//== 내 정보 조회 ==//
export const myInfo = async (): Promise<void> => {
  const response = await axios ({
    method: 'get',
    url: `${BASE_URL}/info/`,
    headers: {
      Authorization: `Bearer `
    }
  });

  console.log(response.data);
}