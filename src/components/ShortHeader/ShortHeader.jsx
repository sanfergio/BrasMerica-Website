import styles from './ShortHeader.module.css';
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { useState } from "react";
import MenuMobile from "../MenuMobile/MenuMobile";
import CartSideBar from "../CartSideBar/CartSideBar";

function Header() {


  return (
    <>
      <div id='top' className={styles.blackHeader}></div>
      <div className={styles.redHeader}></div>

      <div className={styles.headerWrapper}>
        <header className={styles.header}>
          <div className={styles.imgHeader}>
  

            <a href="./">
              <img
                src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/logo-sem-fundo-border.png?raw=true"
                alt="Logo Brasmerica"
              />
            </a>

          </div>

        </header>
      </div>

    </>
  );
}

export default Header;
