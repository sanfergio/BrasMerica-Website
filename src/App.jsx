// --- DEPENDÊNCIAS EXTERNAS ---
// Imports de bibliotecas de terceiros (como o React Router)
import { Routes, Route } from 'react-router-dom';

// --- ESTILIZAÇÃO GLOBAL ---
import './App.css';

// --- COMPONENTES GLOBAIS ---
// Componentes reutilizáveis que aparecem em várias partes do site
import Loading from './components/Loading.jsx';

// --- PÁGINAS PÚBLICAS (Pages) ---
// Componentes que representam uma "página" inteira
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NossaLoja from './pages/NossaLoja/NossaLoja.jsx';
import ProductsFilter from './pages/ProductsFilter/ProductsFilter.jsx';
import QuemSomos from './pages/QuemSomos/QuemSomos.jsx';
import NotFound from './pages/NotFound.jsx';
import ProductPage from './pages/ProductPage/ProductPage.jsx'

// --- PÁGINAS DE CARRINHO E CHECKOUT ---
// Componentes relacionados ao carrinho de compras e processo de checkout
import CartProducts from './pages/CartProducts/CartProducts.jsx'
import CheckoutForm from './pages/CheckoutForm/CheckoutForm.jsx'

// --- PÁGINAS INSTITUCIONAIS (Políticas, Termos, etc.) ---
import TermosUso from './pages/TermosUso/TermosUso.jsx';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade/PoliticaPrivacidade.jsx';
import PoliticaEnvio from "./pages/PoliticaEnvio/PoliticaEnvio.jsx";
import PoliticaDevolucao from './pages/PoliticaDevolucao/PoliticaDevolucao.jsx';
import FormasPagamento from './pages/FormasPagamento/FormasPagamento.jsx';

// --- PÁGINAS DE ADMIN (Dashboard) ---
import DashboardProducts from './Admin/DataBase/Products/DashboardProducts.jsx';
import EditProduct from './Admin/DataBase/Products/EditProducts.jsx';
import AddProduct from './Admin/DataBase/Products/AddProduct.jsx';


// --- DEFINIÇÃO DO COMPONENTE PRINCIPAL (App) ---
function App() {
  return (

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

      <Loading />

      {/* --- CONFIGURAÇÃO DAS ROTAS --- */}
      <Routes>
        {/* Rotas Públicas Principais */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nossa-loja" element={<NossaLoja />} />
        <Route path="/categorias" element={<ProductsFilter />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/produtos" element={<ProductPage />} />
        <Route path="/carrinho" element={<CartProducts />} />
        <Route path="/checkout" element={<CheckoutForm />} />

        {/* Rotas de Políticas e Termos */}
        <Route path="/termo-de-uso" element={<TermosUso />} />
        <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="/politica-envio" element={<PoliticaEnvio />} />
        <Route path="/politica-devolucao" element={<PoliticaDevolucao />} />
        <Route path="/formas-pagamento" element={<FormasPagamento />} />

        {/* Rotas do Painel de Admin */}
        <Route path="/admin/dataBase/products" element={<DashboardProducts />} />
        <Route path="/admin/dataBase/products/edit" element={<EditProduct />} />
        <Route path="/admin/dataBase/products/add" element={<AddProduct />} />

        {/* Forma de pagamento */}

        {/* Rota "Não Encontrado" (Catch-all) */}
        {/* Deve ser sempre a última rota da lista */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  )
}

// --- EXPORTAÇÃO DO COMPONENTE ---
export default App;
