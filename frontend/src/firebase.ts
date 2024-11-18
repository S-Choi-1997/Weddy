import { initializeApp } from "firebase/app";
import {
  MessagePayload,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDjRoo7pLucixUH8hPRF792FuUIOcwiK3k",
  authDomain: "weddy-69a91.firebaseapp.com",
  projectId: "weddy-69a91",
  storageBucket: "weddy-69a91.firebasestorage.app",
  messagingSenderId: "194642239012",
  appId: "1:194642239012:web:b8db8875468161f4b042b1",
  measurementId: "G-SYX7QVXCHF",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async (): Promise<void> => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    await requestForToken();
  }
};

export const requestForToken = async (): Promise<string | null> => {
  try {
    const registration = await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    );

    if (!registration) {
      return null;
    }

    const currentToken = await getToken(messaging, {
      vapidKey:
        "BKojx5BxhDa3CC6MjLs1my1GxPfrOetsQqzdbNbUR4pQdrpVj2_NHOYNZJ7_psyILjQUgHICcNDCtu6z0yej3-s",
      serviceWorkerRegistration: registration,
    });

    return currentToken ?? null;
  } catch {
    return null;
  }
};

export const onMessageListener = (): Promise<MessagePayload> => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload: MessagePayload) => {
      // 디버깅 로그 추가
      console.log("Foreground message payload:", payload);

      if (Notification.permission === "granted") {
        const title = payload.notification?.title ?? "No title";
        const body = payload.notification?.body ?? "No body";

        // 브라우저 알림 표시
        new Notification(title, { body });
      } else {
        console.warn("Notification permission not granted");
      }

      resolve(payload); // 메시지 반환
    });
  });
};


export { messaging };
