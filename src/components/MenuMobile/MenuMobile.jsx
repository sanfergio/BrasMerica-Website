import React, { useState } from "react";
import { FaTimes, FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";
import styles from "./MenuMobile.module.css";

function MenuMobile({ isOpen, onClose }) {
  const [showCategorias, setShowCategorias] = useState(false);

  return (
    <>
      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      ></div>

      <div className={`${styles.menuMobile} ${isOpen ? styles.open : ""}`}>
        <div className={styles.menuHeader}>
          <p>Olá Visitante</p>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.menuLogin}>
          <FaUser className={styles.loginIcon} />
          <p>
            <a href="/login">Entrar</a> / <a href="/register">Cadastrar-se</a>
          </p>
        </div>

        <ul className={styles.menuList}>
          <li>
            <a href="./">Início</a>
          </li>

          <li className={styles.menuItemCategorias}>
            <button onClick={() => setShowCategorias(!showCategorias)}>
              <span>Categorias</span>
              {showCategorias ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {showCategorias && (
              <ul className={styles.submenu}>
                <li>
                  <a href="/categorias?categoria=acessorios">Acessórios</a>
                </li>
                <li>
                  <a href="/categorias?categoria=pneus">Pneus</a>
                </li>
                <li>
                  <a href="/categorias?categoria=pecas">Peças</a>
                </li>
                <li>
                  <a href="/categorias?categoria=oleos">Óleos</a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a target="_blank" href="https://api.whatsapp.com/send/?phone=553334122593&text=Ol%C3%A1%21+Vim+pelo+website+e+desejo+tirar+d%C3%BAvidas.&type=phone_number&app_absent=0">Contato</a>
          </li>
          <li>
            <a href="/quem-somos">Sobre a Loja</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuMobile;