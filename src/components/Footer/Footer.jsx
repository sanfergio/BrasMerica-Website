import React from "react";
import { Mail, Phone, Clock, MapPin, Instagram, Facebook } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="newsletter">
        <img
          src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/icon-logo2.png?raw=true"
          alt="Logo do rodapé"
          className="newsletter-logo"
        />
        <h3>RECEBA NOSSAS NOVIDADES!</h3>
        <div className="newsletter-input">
          <input type="email" placeholder="Digite seu email" />
          <button aria-label="enviar">➤</button>
        </div>
      </div>

      <div className="img_logo">
        <img
          src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/logo-sem-fundo-border.png?raw=true"
          alt="Logo brasmerica"
          className="brasmerica-logo"
        />
      </div>

      <div className="footer-content">
        <div className="footer-column">
          <h3>Entre em contato</h3>
          <br></br>
          <p>
            <Phone size={18} color={"#b22234"} /> (33) 3412-2593
          </p>
          <br></br>
          <p>
            <Mail size={18} color={"#b22234"} /> atendimento@brasmerica.com.br
          </p>
          <br></br>
          <p>
            <Clock size={18} color={"#b22234"} /> Segunda a Sexta-feira das
            09:00 às 18:00
          </p>
        </div>

        <div className="footer-column">
          <h3>Minha conta</h3>
          <br></br>
          <a href="#">Histórico de pedidos</a>
          <br></br>
          <a href="#">Lista de desejos</a>
          <br></br>
          <a href="#">Informativo</a>
        </div>

        <div className="footer-column">
          <h3>Serviços ao cliente</h3>
          <br></br>
          <a href="#">Entrar em contato</a>
          <br></br>
          <a href="#">Solicitar devolução</a>
          <br></br>
          <a href="#">Sobre a loja</a>
        </div>
      </div>

      <div className="follow-row">
        <div className="follow-left">
          <h3 className="follow-title">Siga-nos</h3>
          <div className="social-icons-inline">
            <a href="#" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="follow-right">
          <p className="address">
            <MapPin size={18} color={"#b22234"} /> São João Evangelista MG, Rua
            José Guimarães número 509 - Centro, 39705000
          </p>
        </div>
      </div>
    </footer>
  );
}
