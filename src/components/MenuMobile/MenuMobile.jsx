import React, { useState } from "react";
import { FaTimes, FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";
import "./MenuMobile.css";

function MenuMobile({ isOpen, onClose }) {
  const [showCategorias, setShowCategorias] = useState(false);

  return (
    <>
      <div
        className={`menu-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`menu-mobile ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h2>Olá Visitante</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="menu-login">
          <FaUser className="login-icon" />
          <p>
            <a href="/login">Entrar</a> / <a href="/register">Cadastrar-se</a>
          </p>
        </div>

        <ul className="menu-list">
          <li>
            <a href="./">Início</a>
          </li>

          <li className="menu-item-categorias">
            <button onClick={() => setShowCategorias(!showCategorias)}>
              <span>Categorias</span>
              {showCategorias ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {showCategorias && (
              <ul className="submenu">
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
