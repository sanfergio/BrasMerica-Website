import React, { useState, useEffect, useRef } from 'react';
// 1. MUDANÇA: Importamos o CSS como um objeto 'styles'
import styles from './Header.module.css';
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';

function Header({ children }) {
  // Estados para o header fixo (lógica original mantida)
  const [isFixed, setIsFixed] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const headerRef = useRef(null);

  // useEffect para controlar o scroll (lógica original mantida)
  useEffect(() => {
    const setHeight = () => {
      if (headerRef.current) {
        setPlaceholderHeight(headerRef.current.offsetHeight);
      }
    };

    const handleScroll = () => {
      const threshold = 200;
      if (window.scrollY > threshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    setHeight();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', setHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  function toggleMenu() { }

  function toggleCart() {
    alert('Clicou no carrinho');
  }

  return (
    <>
      {/* 2. MUDANÇA: Aplicando classes do objeto 'styles' */}
      <div className={styles.blackHeader}></div>
      <div className={styles.redHeader}></div>

      {/* Placeholder (lógica original mantida) */}
      <div style={{ height: isFixed ? placeholderHeight : 0 }} />

      {/* 3. MUDANÇA: Classes dinâmicas usando template string e o objeto 'styles'.
           Repare que 'header-wrapper' virou 'styles.headerWrapper' e
           'fixed-header' virou 'styles.fixedHeader'.
      */}
      <div
        ref={headerRef}
        className={`${styles.headerWrapper} ${isFixed ? styles.fixedHeader : ''}`}
      >
        {/* 4. MUDANÇA: <header> agora usa a classe '.header' */}
        <header className={styles.header}>
          <div className={styles.imgHeader}>
            <div><FaBars className={styles.icon} /></div>
            <a href="./"><img src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/logo-sem-fundo-border.png?raw=true" alt="Logo Brasmerica" /></a>
            <div><FaShoppingCart className={styles.icon} /></div>
          </div>

          <div className={styles.inputSearch}>
            <input type="text" placeholder='O quê você procura?' />
            <FaSearch className={styles.searchIcon} />
          </div>

          <div className={styles.userActions}>
            <div className={styles.locationIcon}>
              <FaMapMarkerAlt />
              <p>CONHEÇA <br /> <a href='#'>NOSSA LOJA</a></p>
            </div>
            <div className={styles.userIcon}>
              <FaUser />
              <p>OLÁ VISITANTE,<br /> <a href='/login'>ENTRE</a> OU <a href='#'>CADASTRE-SE</a></p>
            </div>
            <div className={styles.cartIcon}>
              <FaShoppingCart />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;