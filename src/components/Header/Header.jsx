import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css'; // Importa como módulo CSS

import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';

function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const setHeight = () => {
      if (headerRef.current) {
        setPlaceholderHeight(headerRef.current.offsetHeight);
      }
    };

    const handleScroll = () => {
      const threshold = 200;
      if (window.scrollY > threshold) setIsFixed(true);
      else setIsFixed(false);
    };

    setHeight();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', setHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  function toggleCart() {
    alert('Clicou no carrinho');
  }

  return (
    <>
      <div className={styles.blackHeader}></div>
      <div className={styles.redHeader}></div>

      {/* Placeholder que evita o "salto" do conteúdo */}
      <div style={{ height: isFixed ? placeholderHeight : 0 }} />

      <div
        ref={headerRef}
        className={`${styles.headerWrapper} ${isFixed ? styles.fixedHeader : ''}`}
      >
        <header className={styles.header}>
          <div className={styles.imgHeader}>
            <div><FaBars className={styles.icon} /></div>

            <a href="./">
              <img
                src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/logo-sem-fundo-border.png?raw=true"
                alt="Logo Brasmerica"
              />
            </a>

            <div onClick={toggleCart}>
              <FaShoppingCart className={styles.icon} />
            </div>
          </div>

          <div className={styles.inputSearch}>
            <input type="text" placeholder="O quê você procura?" />
            <FaSearch className={styles.searchIcon} />
          </div>

          <div className={styles.userActions}>
            <div className={styles.locationIcon}>
              <FaMapMarkerAlt />
              <p>
                CONHEÇA <br />
                <a href="#">NOSSA LOJA</a>
              </p>
            </div>

            <div className={styles.userIcon}>
              <FaUser />
              <p>
                OLÁ VISITANTE,<br />
                <a href="/login">ENTRE</a> OU <a href="/register">CADASTRE-SE</a>
              </p>
            </div>

            <div className={styles.cartIcon}>
              <FaShoppingCart onClick={toggleCart} />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
