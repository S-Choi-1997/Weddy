import { useNavigate } from "react-router-dom";

const BASE_URL = "https://weddy.info/oauth2/authorization";
//== 네이버 로그인 ==//
export const naverLogin = () => {
  window.location.href = `${BASE_URL}/naver`;
};

//== 구글 로그인 ==//
export const googleLogin = () => {
  const navigate = useNavigate();
  // window.location.href = `${BASE_URL}/google`;
  navigate('/callback?id=3');
};
