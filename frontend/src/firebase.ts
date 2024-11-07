// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { MessagePayload, getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase 설정
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
// const firestore = getFirestore();     // Firestore 초기화

// 알림 권한 요청 함수
export const requestNotificationPermission = async (): Promise<void> => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
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

// 일정 데이터 타입 정의
// interface Schedule {
//   title: string;
//   message: string;
//   date: Date; // 알림을 보낼 날짜
// }

// Firestore에 일정 데이터를 저장하는 함수
// export const saveSchedule = async (schedule: Schedule): Promise<void> => {
//   try {
//     // FCM 토큰 생성
//     const fcmToken = await requestForToken();

//     if (fcmToken) {
//       // Firestore에 일정 데이터 저장
//       await addDoc(collection(firestore, "schedules"), {
//         ...schedule,
//         fcmToken,  // 알림을 보낼 FCM 토큰 저장
//         alertTime: schedule.date.getTime() - 24 * 60 * 60 * 1000,  // 하루 전 알림 시간 (밀리초로 변환)
//         createdAt: new Date().toISOString()  // 생성 시간
//       });
//       console.log("일정이 성공적으로 저장되었습니다.");
//     } else {
//       console.warn("FCM 토큰 생성에 실패하여 일정 알림을 설정할 수 없습니다.");
//     }
//   } catch (err) {
//     console.error("Firestore에 일정 데이터를 저장하는 중 오류가 발생했습니다:", err);
//   }
// };

// messaging 객체 export
export { messaging };
