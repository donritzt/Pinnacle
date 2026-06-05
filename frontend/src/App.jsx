import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PinDetail from './pages/PinDetail'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import CreatePin from './pages/CreatePin'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pins/:id" element={<PinDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreatePin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App