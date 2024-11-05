// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDjRoo7pLucixUH8hPRF792FuUIOcwiK3k",
  authDomain: "weddy-69a91.firebaseapp.com",
  projectId: "weddy-69a91",
  storageBucket: "weddy-69a91.firebasestorage.app",
  messagingSenderId: "194642239012",
  appId: "1:194642239012:web:b8db8875468161f4b042b1",
  measurementId: "G-SYX7QVXCHF"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
