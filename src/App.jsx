import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import React, { useEffect, useState } from 'react';
import WhatsAppButton from './components/WhatsappButton.jsx';
import { FaMotorcycle, FaCampground } from "react-icons/fa";
import { FaBridge } from 'react-icons/fa6';
import NavBar from './components/Navbar/NavBar.jsx';

function App() {

  return (
    <>
      <Header />
      <WhatsAppButton />
      <NavBar />
      <main>

        <div className="carousel">
          <img src="https://media.canva.com/v2/image-resize/format:PNG/height:302/quality:100/uri:ifs%3A%2F%2FM%2F81cef53e-a9d7-4b2b-b965-7018ffd1d39d/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAAyyncRgKvSo4mLt1aKg8tULX2GwJ-sqI1Iphyacxph6&exp=1761082843&osig=AAAAAAAAAAAAAAAAAAAAABVtAHuDzX63nfyHQDBh6FJw4CjMmkF6jizjX2J4qdkp&signer=media-rpc&x-canva-quality=screen" alt="" />
        </div>
        <div className="brand-section">
          {/* H1 - Apenas o nome da marca */}
          <h1 className="brand-title">
            {/* "BRAS" em verde sólido */}
            <span className="brand-part-green">
              BRAS
            </span>

            {/* "MÉRICA" com o gradiente */}
            <span className="brand-part-gradient">
              MÉRICA
            </span>
            <FaMotorcycle />
          </h1>

          {/* H2 - O Slogan (Subtítulo) */}
          <h2 className="slogan-subtitle">
            O maior estoque atacadista, agora na sua garagem.
          </h2>
        </div>
        <h3 style={{ color: '#b22234', fontSize: '30px' }}>NOSSAS NOVIDADES</h3>
        <div className='productCards'><ProductCard /></div>

      </main>
      <Footer/>
    </>
  )
}

export default App
