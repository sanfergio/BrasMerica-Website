import React, { useState, useEffect } from "react";
import { FaTimes, FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";
import styles from "./MenuMobile.module.css";

function MenuMobile({ isOpen, onClose }) {
  const [showCategorias, setShowCategorias] = useState(false);
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    // 1. Tenta ler o nome do localStorage ao montar o componente
    try {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        const first = storedName.trim().split(/\s+/)[0];
        setFirstName(first);
      }
    } catch (e) {
      setFirstName(null);
    }

    // 2. Ouve eventos de storage (caso o login ocorra em outra aba)
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
      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      ></div>

      <div className={`${styles.menuMobile} ${isOpen ? styles.open : ""}`}>
        <div className={styles.menuHeader}>
          {/* Lógica condicional no título do menu */}
          <p>Olá, {firstName ? firstName : "Visitante"}</p>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.menuLogin}>
          <FaUser className={styles.loginIcon} />
          <p>
            {/* Lógica condicional nos links de ação */}
            {firstName ? (
              <a href="/perfil-usuario">Meu Perfil</a>
            ) : (
              <>
                <a href="/login">Entrar</a> / <a href="/register">Cadastrar-se</a>
              </>
            )}
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
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://api.whatsapp.com/send/?phone=553334122593&text=Ol%C3%A1%21+Vim+pelo+website+e+desejo+tirar+d%C3%BAvidas.&type=phone_number&app_absent=0"
            >
              Contato
            </a>
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