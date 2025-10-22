import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'
import WhatsAppButton from './components/WhatsappButton.jsx';
import NavBar from './components/Navbar/NavBar.jsx';
import HomeButton from './components/HomeButton.jsx';
import { Routes, Route } from 'react-router-dom'; // 1. Importar
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';

function App() {
  return (
    <>
      {/* 3. Itens que aparecem em TODAS as páginas */}
      <Header />
      <WhatsAppButton />
      <HomeButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App