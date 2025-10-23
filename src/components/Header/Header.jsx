import styles from './Header.module.css';
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { useState } from "react";
import "./Header.module.css";
import MenuMobile from "../MenuMobile/MenuMobile";

function Header() {
  function toggleCart() {
    alert('Clicou no carrinho');
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <a href="/nossa-loja">NOSSA LOJA</a>
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
      <MenuMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default Header;
