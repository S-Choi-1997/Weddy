import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import "./index.css";
import BoardDetail from "./pages/BoardDetailPage";
import Board from "./pages/BoardPage";
import CallBack from "./pages/CallBack";
import Cart from "./pages/CartPage";
import ContractList from "./pages/ContractListPage";
import Contract from "./pages/ContractPage";
import Login from "./pages/LoginPage";
import Main from "./pages/MainPage";
import Mypage from "./pages/MyPage";
import NFTLoading from "./pages/NFTLoadingPage";
import PlannerList from "./pages/PlannerListPage";
import Planner from "./pages/PlannerPage";
import Prompt from "./pages/PromptPage";
import RecommendLoading from "./pages/RecommendLoadingPage";
import Review from "./pages/ReviewPage";
import Schedule from "./pages/SchedulePage";
import Sketch from "./pages/SketchPage";
import UserInfo from "./pages/UserInfoPage";
import DressSketch from "./pages/DressSketchPage.tsx";
import DressImg from "./pages/DressImgPage.tsx";
import { useRecoilValue } from "recoil";
import { firebaseTokenState } from "./store/firebaseToken.ts";
import { useEffect } from "react";
import { saveFcmToken } from "./api/userApi.ts";

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const currentDetail = location.pathname.split("/")[2];

  return (
    <>
      {currentPath !== "login" && currentPath !== "userinfo" && <Navbar />}
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
        <Route path="/dress" element={<DressSketch />} />
        <Route path="/dress/img" element={<DressImg />} />
        <Route path="/sketch" element={<Sketch />} />
        <Route path="/contract/:category/:contractId" element={<Contract />} />
        <Route path="/contract/list" element={<ContractList />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/callback" element={<CallBack />} />
        <Route path="/nft/loading" element={<NFTLoading />} />
        <Route path="/recommend/loading" element={<RecommendLoading />} />
      </Routes>
      {currentPath !== "login" &&
        currentPath !== "userinfo" &&
        currentDetail !== "detail" && <Footer />}
    </>
  );
}

function App() {
  const userId = sessionStorage.getItem("userId");
  const fcmToken = useRecoilValue(firebaseTokenState);
  const queryClient = new QueryClient();

  useEffect(() => {
    if (userId && fcmToken) {
      saveFcmToken(fcmToken, userId);
      console.log("fcmToken saved");
    }
  });

  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
