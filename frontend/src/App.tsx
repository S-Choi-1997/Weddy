import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/MainPage'
import Test from './test/test'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
