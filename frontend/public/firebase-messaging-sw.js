// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDjRoo7pLucixUH8hPRF792FuUIOcwiK3k",
  authDomain: "weddy-69a91.firebaseapp.com",
  projectId: "weddy-69a91",
  storageBucket: "weddy-69a91.firebasestorage.app",
  messagingSenderId: "194642239012",
  appId: "1:194642239012:web:b8db8875468161f4b042b1",
  measurementId: "G-SYX7QVXCHF",
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신 핸들러
self.addEventListener("push", function (event) {
  console.log("Push event received:", event);

  let data = { title: "기본 제목", body: "기본 내용" };
  if (event.data) {
    try {
      data = JSON.parse(event.data.text());
    } catch (e) {
      console.error("Push data JSON parse error:", e);
    }
  }

  const options = {
    body: data.body,
    icon: "/default-icon.png",
  };

  console.log("Attempting to show notification:", data.title, options);
  event.waitUntil(self.registration.showNotification(data.title, options));
});

// PWA 캐싱 설정
const CACHE_NAME = "weddy-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/styles.css",
  "/default-icon.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// 서비스워커 활성화 및 오래된 캐시 삭제
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName !== CACHE_NAME;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// 네트워크 요청 가로채기 및 캐시 제공
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 캐시된 응답이 있으면 반환하고, 없으면 네트워크 요청
      return (
        response ||
        fetch(event.request).catch(() => caches.match("/offline.html"))
      );
    })
  );
});
