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
import { firebaseTokenState } from './store/firebaseToken.ts';

import { useEffect } from 'react';
import { requestForToken, requestNotificationPermission } from './firebase.ts';

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
      </Routes>
      {(currentPath !== "login") && (currentPath !== "userinfo") && (currentDetail !== "detail") && <Footer />}
    </>
  );
}

function App() {
  const queryClient = new QueryClient();
  const setToken = useSetRecoilState(firebaseTokenState);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        // 기존 등록된 서비스 워커가 있는지 확인
        const isRegistered = registrations.some((registration) =>
          registration.active && registration.scope === '/firebase-messaging-sw.js'
        );

        if (!isRegistered) {
          // 서비스 워커가 등록되지 않았을 경우에만 등록
          navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then((registration) => {
              console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((err) => {
              console.error('Service Worker registration failed:', err);
            });
        } else {
          console.log('Service Worker already registered');
        }
      });
    }
  }, []);

  useEffect(() => {
    // 푸시 알림 요청 및 토큰 처리
    const requestPermissionsAndToken = async () => {
      await requestNotificationPermission();

      const token = await requestForToken();
      if (token) {
        console.log("Token received:", token);
        setToken(token);
      } else {
        console.warn("No token received");
      }
    };

    requestPermissionsAndToken();

    // 기존 코드에서 삭제된 포그라운드 메시지 수신 리스너 부분
    // onMessage(messaging, (payload) => {
    //   console.log("Message received in foreground:", payload);
    // });

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
