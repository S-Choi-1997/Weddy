import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/auth'

//== 카카오 로그인 ==//
export const kakaoLogin = () => {
  axios({
    method: 'post',
    url: `${BASE_URL}/login`,
  });
};

//== 구글 로그인 ==//
export const googleLogin = () => {
  axios({
    method: 'post',
    url: `${BASE_URL}/login`,
  });
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