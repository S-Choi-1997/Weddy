import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './common/Footer'
import Navbar from './common/Navbar'
import Main from './pages/MainPage'
import Login from './pages/LoginPage'
import './index.css'; 
import Test from './test/Test'


function App() {

  return (
    <div className='content'>
      <BrowserRouter>
      {location.pathname !== "/login" && (
      <Navbar />)}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
      {location.pathname !== "/login" && (
      <Footer />)}
    </div>

  )
}

export default App
