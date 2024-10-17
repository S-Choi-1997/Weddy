import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './common/Footer'
import Navbar from './common/Navbar'
import Main from './pages/MainPage'
import Test from './test/Test'

function App() {

  return (
    <div className='content'>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>

  )
}

export default App
