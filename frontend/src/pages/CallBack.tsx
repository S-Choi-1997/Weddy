import { getToken, getUserInfo, saveFcmToken } from "@/api/userApi";
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

  const [userInfoEnabled, setUserInfoEnabled] = useState(false);

  const setToken = useSetRecoilState(firebaseTokenState);
  // const userId = sessionStorage.getItem("userId");

  //== 토큰 정보 ==//
  useQuery(["getToken", userId], () => getToken(userId ?? undefined), {
    enabled: !!userId,
    onSuccess: () => {
      setUserInfoEnabled(true);
    },
  });

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        const isRegistered = registrations.some(
          (registration) =>
            registration.active &&
            registration.scope === "/firebase-messaging-sw.js"
        );

        if (!isRegistered) {
          try {
            await navigator.serviceWorker.register("/firebase-messaging-sw.js");
            console.log("Service Worker registered successfully");
          } catch (err) {
            console.error("Service Worker registration failed:", err);
          }
        } else {
          console.log("Service Worker already registered");
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
            setToken(token);
            saveFcmToken(token, userId);
          } else {
            console.warn("No token received");
          }
        } catch (error) {
          console.error("Error requesting permissions or token:", error);
        }
      } else {
        console.warn("User ID is null, skipping requestPermissionsAndToken");
      }
    };
    requestPermissionsAndToken();
  }, [setToken, userId]);

  //== 회원 정보 ==//
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
