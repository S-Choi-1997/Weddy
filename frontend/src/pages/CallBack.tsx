import { getUserInfo } from "@/api/userApi";
import { requestForToken, requestNotificationPermission } from "@/firebase";
import { firebaseTokenState } from "@/store/firebaseToken";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const CallBack = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const userId = params.get("id");

  const [userInfoEnabled,] = useState(false);

  const setToken = useSetRecoilState(firebaseTokenState);

  // useQuery(["getToken", userId], () => getToken(userId ?? undefined), {
  //   enabled: !!userId,
  //   onSuccess: () => {
  //     setUserInfoEnabled(true);
  //   },
  // });

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const existingRegistration =
            await navigator.serviceWorker.getRegistration(
              "/firebase-messaging-sw.js"
            );

          if (existingRegistration) {
            return;
          }

          await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        } catch  {
          // 서비스 워커 등록 실패시 에러 처리 로직
        }
      }
    };

    registerServiceWorker();
  }, []);

  useEffect(() => {
    const requestPermissionsAndToken = async () => {
      if (userId) {
        try {
          await requestNotificationPermission();
          const token = await requestForToken();
          
          if (token) {
            sessionStorage.setItem('fcmToken', token);
            setToken(token);
          }
        } catch{
          // 권한 요청이나 토큰 발급 실패시 에러 처리 로직
        }
      }
    };
    requestPermissionsAndToken();
  }, [setToken, userId]);

  const { data: userInfo } = useQuery("getUserInfo", getUserInfo, {
    enabled: userInfoEnabled,
  });

  useEffect(() => {
    if (userInfo && userInfo[0]?.date != null) {
      navigate("/");
    } else if (userInfo) {
      navigate("/userInfo");
    }
  }, [userInfo, navigate]);

  return null;
};

export default CallBack;
