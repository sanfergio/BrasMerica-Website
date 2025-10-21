import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';

function Header() {
  // Estado para controlar se o header está fixo ou não
  const [isFixed, setIsFixed] = useState(false);
  // Estado para guardar a altura do header (para o placeholder)
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  // Referência para o wrapper do header, para podermos medi-lo
  const headerRef = useRef(null);

  useEffect(() => {
    // --- 1. Função para medir e definir a altura do header ---
    const setHeight = () => {
      if (headerRef.current) {
        setPlaceholderHeight(headerRef.current.offsetHeight);
      }
    };

    // --- 2. Função para controlar o estado 'fixed' no scroll ---
    const handleScroll = () => {
      // Define o ponto em que o header deve ficar fixo (ex: 200px)
      // Você pode mudar esse valor
      const threshold = 200; 

      if (window.scrollY > threshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // --- 3. Adiciona os "ouvintes" (listeners) ---
    setHeight(); // Define a altura inicial
    window.addEventListener('scroll', handleScroll);
    // Atualiza a altura caso o usuário redimensione a janela (ex: vire o celular)
    window.addEventListener('resize', setHeight); 

    // --- 4. Limpeza (remove os listeners ao desmontar) ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setHeight);
    };
  }, []); // O array vazio [] garante que isso rode só uma vez

  function toggleMenu() { }

  function toggleCart() {
    alert('Clicou no carrinho');
  }

  return (
    <>
      {/* 1. O PLACEHOLDER 
        Este div só terá altura QUANDO o header estiver fixo (isFixed === true).
        Isso impede que o conteúdo da página "pule" para cima.
      */}
      <div style={{ height: isFixed ? placeholderHeight : 0 }} />

      {/* 2. O WRAPPER DO HEADER
        Usamos 'ref' para medi-lo.
        Aplicamos a classe 'fixed-header' condicionalmente.
      */}
      <div 
        ref={headerRef} 
        className={`header-wrapper ${isFixed ? 'fixed-header' : ''}`}
      >
        {/* Todo o seu JSX original vai aqui dentro */}
        <div className='blackHeader'></div>
        <div className='redHeader'></div>
        <header>
          <div className='imgHeader'>
            <div><FaBars className='icon' /></div>
            <img src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/logo-sem-fundo-border.png?raw=true" alt="Logo Brasmerica" />
            <div><FaShoppingCart className='icon' /></div>
          </div>
          <div className='inputSearch'>
            <input type="text" placeholder='O quê você procura?' />
            <FaSearch className='searchIcon' />
          </div>
          <div className='userActions'>
            <div className="locationIcon">
              <FaMapMarkerAlt />
              <p>CONHEÇA <br /> <a>NOSSA LOJA</a></p>
            </div>
            <div className="userIcon">
              <FaUser />
              <p>OLÁ VISITANTE,<br /> <a>ENTRE</a> OU <a>CADASTRE-SE</a></p>
            </div>
            <div className="cartIcon">
              <FaShoppingCart />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;