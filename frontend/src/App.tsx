import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './common/Footer';
import Navbar from './common/Navbar';
import './index.css';
import BoardDetail from './pages/BoardDetailPage';
import Board from './pages/BoardPage';
import CallBack from './pages/CallBack';
import Cart from './pages/CartPage';
import ContractList from './pages/ContractListPage';
import Contract from './pages/ContractPage';
import Login from './pages/LoginPage';
import Main from './pages/MainPage';
import Mypage from './pages/MyPage';
import NFTLoading from "./pages/NFTLoadingPage";
import PlannerList from "./pages/PlannerListPage";
import Planner from './pages/PlannerPage';
import Prompt from './pages/PromptPage';
import RecommendLoading from "./pages/RecommendLoadingPage";
import Review from "./pages/ReviewPage";
import Schedule from './pages/SchedulePage';
import Sketch from './pages/SketchPage';
import UserInfo from "./pages/UserInfoPage";

import { useSetRecoilState } from 'recoil';
import { tokenState } from './store/token';

import { MessagePayload } from 'firebase/messaging';
import { useEffect } from 'react';
import { onMessageListener, requestForToken, requestNotificationPermission } from './firebase.ts';
import Test from "./pages/test.tsx";

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];
  const currentDetail = location.pathname.split('/')[2];

  return (
    <>
      {(currentPath !== "login") && (currentPath !== "userinfo") && <Navbar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/review/:productId" element={<Review />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/detail/:productId" element={<BoardDetail />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/planner/list/:category" element={<PlannerList />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/sketch" element={<Sketch />} />
        <Route path="/contract/:category/:contractId" element={<Contract />} />
        <Route path="/contract/list" element={<ContractList />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/callback" element={<CallBack />} />
        <Route path="/nft/loading" element={<NFTLoading />} />
        <Route path="/recommend/loading" element={<RecommendLoading />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      {(currentPath !== "login") && (currentPath !== "userinfo") && (currentDetail !== "detail") && <Footer />}
    </>
  );
}

function App() {
  // Query Client 설정
  const queryClient = new QueryClient();

  // Recoil 상태에 토큰을 저장하기 위한 함수
  const setToken = useSetRecoilState(tokenState);

  // FCM 설정 및 서비스 워커 등록
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);

  // FCM 알림 권한 및 토큰 요청, 메시지 리스너 설정
  useEffect(() => {
    const requestPermissionsAndToken = async () => {
      console.log("Requesting notification permission...");
      await requestNotificationPermission();  // 알림 권한 요청
      console.log("Notification permission requested.");
  
      const token = await requestForToken();  // FCM 토큰 요청
      console.log("Token request completed.");
  
      if (token) {
        console.log("Token received:", token);
        setToken(token);  // Recoil 상태에 토큰 저장
      } else {
        console.warn("No token received");
      }
    };
  
    requestPermissionsAndToken();
    console.log("Setting up FCM onMessage listener...");
  
    // 메시지 수신 리스너 설정
    onMessageListener()
      .then((payload: MessagePayload) => {
        console.log("Message received:", payload);  // 수신된 메시지 출력
        // TODO: 알림 처리 로직을 여기에 추가
      })
      .catch((err: any) => console.log("Failed to receive message:", err));
  }, [setToken]);

  return (
    <div className='container'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
