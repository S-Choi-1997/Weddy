// src/firebase.ts
import { initializeApp } from "firebase/app";
import {
  MessagePayload,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
// import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDjRoo7pLucixUH8hPRF792FuUIOcwiK3k",
  authDomain: "weddy-69a91.firebaseapp.com",
  projectId: "weddy-69a91",
  storageBucket: "weddy-69a91.firebasestorage.app",
  messagingSenderId: "194642239012",
  appId: "1:194642239012:web:b8db8875468161f4b042b1",
  measurementId: "G-SYX7QVXCHF",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app); // messaging 초기화
// const firestore = getFirestore();     // Firestore 초기화

// 알림 권한 요청 함수
export const requestNotificationPermission = async (): Promise<void> => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    await requestForToken(); // 권한이 허용되었을 때만 토큰 요청
  } else {
    console.warn("Notification permission denied.");
  }
};

// FCM 토큰 요청 함수
export const requestForToken = async (): Promise<string | null> => {
  try {
    // 특정 경로에 서비스 워커가 등록되었는지 확인
    const registration = await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    );

    if (!registration) {
      console.error("Service Worker is not registered");
      alert("Service Worker 등록 오류");
      return null;
    }

    console.log("Service Worker is active and ready");

    // FCM 토큰 발급 시도
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BKojx5BxhDa3CC6MjLs1my1GxPfrOetsQqzdbNbUR4pQdrpVj2_NHOYNZJ7_psyILjQUgHICcNDCtu6z0yej3-s",
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      console.log("FCM 토큰 발급 성공:", currentToken);
      return currentToken;
    } else {
      console.warn(
        "No registration token available. Request permission to generate one."
      );
      alert("토큰 생성 실패");
      return null;
    }
  } catch (err) {
    console.error("토큰 생성 에러:", err);
    alert("토큰 생성 에러: " + err);
    return null;
  }
};

// 포그라운드 메시지 수신 리스너
export const onMessageListener = (): Promise<MessagePayload> => {
  console.log("Message received in foreground");
  return new Promise((resolve) => {
    onMessage(messaging, (payload: MessagePayload) => {
      console.log("Message received in foreground:", payload);

      // 알림이 브라우저에서 지원되는지 확인 후, 수동으로 알림 표시
      if (Notification.permission === "granted") {
        const { title, body } = payload.notification || { title: "No title", body: "No body" };
        console.log("payload:",payload)
        new Notification(title, { body });
      } else {
        console.warn("Notification permission not granted.");
      }

      resolve(payload);
    });
  });
};

export { messaging };
