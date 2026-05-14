import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Navbar from './components/navbar/Navbar'
import Login from './pages/auth/login/Login'
import Footer from './components/footer/Footer'
import Products from './pages/products/Products'  // 👈 add this

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />  {/* 👈 add this */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App