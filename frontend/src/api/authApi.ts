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
  sessionStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlck5hbWUiOiLstZzsirntmLgiLCJjb3VwbGVDb2RlIjoiamM3VllhIiwiaWF0IjoxNzMxNDgwNjEwLCJleHAiOjE3MzQwNzI2MTB9.Cyd6ujpcIBHibkdfBBq-OApOHykmVdlzRnRfyp5rfXI')
  sessionStorage.setItem('userId', '3')
  navigate('/callback?id=3');
};
