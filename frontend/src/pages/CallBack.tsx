import { getToken, getUserInfo } from "@/api/userApi";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

const CallBack = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const userId = params.get('id');

  const [ userInfoEnabled, setUserInfoEnabled ] = useState(false);
  
  //== 토큰 정보 ==//
  useQuery(
    ['getToken', userId],
    () => getToken(userId ?? undefined),
    {
      enabled: !!userId,
      onSuccess: () => {
        setUserInfoEnabled(true);
      }
    }
  );

  //== 회원 정보 ==//
  const { data: userInfo } = useQuery('getUserInfo', getUserInfo, {
    enabled: userInfoEnabled,
  });

  useEffect(() => {
    if (userInfo?.date) {
      navigate('/');
    } else {
      navigate('/userInfo');
    }
  }, [userInfo]);

  return null;
}

export default CallBack;