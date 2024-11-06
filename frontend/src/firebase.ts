// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { MessagePayload, getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDjRoo7pLucixUH8hPRF792FuUIOcwiK3k",
  authDomain: "weddy-69a91.firebaseapp.com",
  projectId: "weddy-69a91",
  storageBucket: "weddy-69a91.firebasestorage.app",
  messagingSenderId: "194642239012",
  appId: "1:194642239012:web:b8db8875468161f4b042b1",
  measurementId: "G-SYX7QVXCHF"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);  // messaging 초기화

// 알림 권한 요청 함수
export const requestNotificationPermission = async (): Promise<void> => {
  const permission = await Notification.requestPermission();
  // console.log("Permission result:", permission); // 권한 요청 결과 확인

  if (permission === 'granted') {
    // console.log("Notification permission granted.");
    await requestForToken(); // 권한이 허용되었을 때만 토큰 요청
  } else {
    console.warn("Notification permission denied.");
  }
};

// FCM 토큰 요청 함수
export const requestForToken = async (): Promise<string | null> => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BKojx5BxhDa3CC6MjLs1my1GxPfrOetsQqzdbNbUR4pQdrpVj2_NHOYNZJ7_psyILjQUgHICcNDCtu6z0yej3-s"
    });
    // console.log("Current token:", currentToken); // 토큰이 제대로 생성되는지 확인

    if (currentToken) {
      return currentToken; // 토큰 반환
    } else {
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
    return null;
  }
};

// 포그라운드 메시지 수신 리스너
export const onMessageListener = (): Promise<MessagePayload> => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload: MessagePayload) => {
      console.log("Message received in foreground:", payload); // 로그 출력
      resolve(payload);
    });
  });
};

// messaging 객체 export
export { messaging };
