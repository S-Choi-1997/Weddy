import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/users/auth'

//== 카카오 로그인 ==//
export const kakaoLogin = () => {
  window.location.href = `http://localhost:8080/api/oauth2/authorization/naver`;
};

//== 구글 로그인 ==//
export const googleLogin = () => {
  window.location.href = `http://localhost:8080/api/oauth2/authorization/google`;
};

//== 로그아웃 ==//
export const logout = () => {
  axios({
    method: 'post',
    url: `${BASE_URL}/logout`,
    headers: {
      Authorization: `Bearer `
    }
  });
};