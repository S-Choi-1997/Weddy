import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './common/Footer'
import Navbar from './common/Navbar'
import './index.css'
import Board from './pages/BoardPage'
import ContractList from './pages/ContractListPage'
import Contract from './pages/ContractPage'
import Login from './pages/LoginPage'
import Main from './pages/MainPage'
import Mypage from './pages/MyPage'
import Planner from './pages/PlannerPage'
import Schedule from './pages/SchedulePage'


function App() {

  return (
    <div className='content'>
      <BrowserRouter>
        {location.pathname !== "/login" && (
          <Navbar />)}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/contractlist" element={<ContractList />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        {location.pathname !== "/login" && (
          <Footer />)}
      </BrowserRouter>
    </div>

  )
}

export default App
