import { Mail, Phone, Clock, Instagram, Facebook, CreditCard } from "lucide-react"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer-container">
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

      <div className="footer-main">
        <div className="footer-grid">
          <div>
            <h3 className="footer-heading">Institucional</h3>
            <div className="footer-links">
              <a href="/quem-somos">Sobre nós</a>
              <a href="/termo-de-uso">Termos de Uso</a>
              <a href="/politica-privacidade">Política de Privacidade</a>
              <a href="#">Política de envio e entrega</a>
              <a href="#">Política de devolução</a>
              <a href="#">Entre em contato</a>
              <a href="#">Formas de pagamento</a>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Contato</h3>
            <div className="footer-contact">
              <p><Phone size={18} color="#b22234" /> (33) 3412-2593</p>
              <p><Mail size={18} color="#b22234" /> atendimento@brasmerica.com.br</p>
              <p><Clock size={18} color="#b22234" /> Segunda a Sexta-feira das 09:00 às 18:00 </p>
            </div>
          </div>

          <div>
            <div className="footer-social">
              <h3 className="footer-heading">Nossas Redes</h3>
              <div className="footer-icons">
                <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="footer-heading">Formas de pagamento</h3>
              <div className="footer-payments">
                <div className="payment-item"><CreditCard size={24} className="payment-icon" /></div>
                <div className="payment-item"><span>VISA</span></div>
                <div className="payment-item"><span>MC</span></div>
                <div className="payment-item"><span>AMEX</span></div>
                <div className="payment-item"><span>PIX</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="follow-row">
        <div className="follow-content">
          <div className="follow-left">
            <h3 className="follow-title">Siga-nos</h3>
            <div className="social-inline">
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>
          <div className="follow-right">
            <p className="address">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b22234" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              São João Evangelista MG, Rua José Guimarães número 509 - Centro, 39705000
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
