import Header from './components/Header/Header'
import './App.css'
import WhatsAppButton from './components/WhatsappButton.jsx';
import { Routes, Route } from 'react-router-dom'; // 1. Importar
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NossaLoja from './pages/NossaLoja/NossaLoja.jsx';
import ProductsFilter from './pages/ProductsFilter/ProductsFilter.jsx';
import NavBar from './components/Navbar/NavBar.jsx';
import TermosUso from './pages/TermosUso/TermosUso.jsx';
import QuemSomos from './pages/QuemSomos/QuemSomos.jsx';


function App() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection:'column'}}>      
      {/* 3. Itens que aparecem em TODAS as páginas */}
      <Header />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nossa-loja" element={<NossaLoja />} />
        <Route path="/categorias" element={<ProductsFilter />} />
        <Route path="/termo-de-uso" element={<TermosUso />} />
        <Route path="/quem-somos" element={<QuemSomos />} />    
      </Routes>
    </div>
  )
}

export default App