const URL = process.env.VITE_PUBLIC_URL
const BASE_URL = `${URL}/api/oauth2/authorization`
//== 네이버 로그인 ==//
export const naverLogin = () => {
  window.location.href = `${BASE_URL}/naver`;
};

//== 구글 로그인 ==//
export const googleLogin = () => {
  window.location.href = `${BASE_URL}/google`;
};