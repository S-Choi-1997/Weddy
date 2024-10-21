import axios from "axios"

const BASE_URL = 'http://localhost:8080/api/users'

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

//== 회원 정보 수정 ==//
export const editInfomation = async (data: any) => {
  const response = await axios({
    method: 'patch',
    url: `${BASE_URL}`,
    headers: {
      Authorization: `Bearer `
    },
    data: data
  });
  console.log(response.data);
}