import Header from './components/Header/Header'
import './App.css'
import WhatsAppButton from './components/WhatsappButton.jsx';
import HomeButton from './components/HomeButton.jsx';
import { Routes, Route } from 'react-router-dom'; // 1. Importar
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';


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
        <Route path="/register" element={<Register />} />
      </Routes>           
    </>
  )
}

export default App