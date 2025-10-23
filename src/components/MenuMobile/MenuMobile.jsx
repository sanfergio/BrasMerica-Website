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
            <a href="#">Entrar</a> / <a href="#">Cadastrar-se</a>
          </p>
        </div>

        <ul className="menu-list">
          <li>
            <a href="#">Início</a>
          </li>

          <li className="menu-item-categorias">
            <button onClick={() => setShowCategorias(!showCategorias)}>
              <span>Categorias</span>
              {showCategorias ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {showCategorias && (
              <ul className="submenu">
                <li>
                  <a href="#">Acessórios</a>
                </li>
                <li>
                  <a href="#">Pneus</a>
                </li>
                <li>
                  <a href="#">Peças</a>
                </li>
                <li>
                  <a href="#">Óleos</a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a href="#">Contato</a>
          </li>
          <li>
            <a href="#">Sobre a Loja</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuMobile;
