// Header.jsx
import styles from './Header.module.css';
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { useState, useEffect } from "react";
import "./Header.module.css";
import MenuMobile from "../MenuMobile/MenuMobile";
import CartSideBar from "../CartSideBar/CartSideBar";

import InputSearch from "../InputSearch/InputSearch"; // adicionado

function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    // tenta ler o nome do localStorage ao montar
    try {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        const first = storedName.trim().split(/\s+/)[0];
        setFirstName(first);
      }
    } catch (e) {
      // ambiente sem localStorage ou erro — ignora
      setFirstName(null);
    }

    // atualiza se outro tab/iframe modificar o localStorage
    function handleStorage(e) {
      if (e.key === "userName") {
        if (e.newValue) {
          const first = e.newValue.trim().split(/\s+/)[0];
          setFirstName(first);
        } else {
          setFirstName(null);
        }
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <>
      <div id='top' className={styles.blackHeader}></div>
      <div className={styles.redHeader}></div>

      <div className={styles.headerWrapper}>
        <header className={styles.header}>
          <div className={styles.imgHeader}>
            <div onClick={() => setIsMenuOpen(true)}>
              <FaBars className={styles.icon} />
            </div>

            <a href="./">
              <img
                src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/logo-sem-fundo-border.png?raw=true"
                alt="Logo Brasmerica"
              />
            </a>

            <div onClick={() => setIsCartOpen(true)}>
              <FaShoppingCart className={styles.icon} />
            </div>
          </div>

          <div className={styles.inputSearch}>
            <InputSearch />
          </div>

          <div className={styles.userActions}>
            <div className={styles.locationIcon}>
              <FaMapMarkerAlt />
              <p>
                CONHEÇA <br />
                <a href="/nossa-loja">NOSSA LOJA</a>
              </p>
            </div>

            <div className={styles.userIcon}>
              <FaUser />
              <p>
                {firstName ? (
                  <>
                    OLÁ, {firstName.toUpperCase()}<br />
                    <a href="/perfil-usuario">Meu perfil</a>
                  </>
                ) : (
                  <>
                    OLÁ VISITANTE,<br />
                    <a href="/login">ENTRE</a> OU <a href="/register">CADASTRE-SE</a>
                  </>
                )}
              </p>
            </div>

            <div className={styles.cartIcon}>
              <FaShoppingCart onClick={() => setIsCartOpen(true)} />
            </div>
          </div>
        </header>
      </div>
      <MenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSideBar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;
