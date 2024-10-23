import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './common/Footer';
import Navbar from './common/Navbar';
import FooterButton from "./components/BoardDetailPage/FooterButton";
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
import PlannerList from "./pages/PlannerListPage";
import Planner from './pages/PlannerPage';
import Schedule from './pages/SchedulePage';

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];
  const currentDetail = location.pathname.split('/')[2];

  return (
    <>
      {currentPath !== "login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/detail" element={<BoardDetail />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/planner/list" element={<PlannerList />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/contractlist" element={<ContractList />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/callback" element={<CallBack />} />
      </Routes>
      {currentPath !== "login" && (currentPath !== "board" && currentDetail!=="datail") && <Footer />}
      {currentPath === "board" && currentDetail === "detail" && <FooterButton />}
    </>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <div className='content'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
