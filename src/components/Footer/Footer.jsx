import { Mail, Phone, Clock, Instagram, Facebook, CreditCard } from "lucide-react"
import { SiPix, SiVisa, SiMastercard, SiAmericanexpress } from "react-icons/si";

import styles from "./Footer.module.css"
import AllProductsList from "../AllProductsList/AllProductsList";

export default function Footer() {
  return (

    <footer className={styles.footerContainer}>

      <AllProductsList />

      <div className={styles.newsletter}>
        <img
          src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/icon-logo2.png?raw=true"
          alt="Logo do rodapé"
          className={styles.newsletterLogo}
        />
        <h6 style={{ fontSize: '90%' }}>RECEBA NOSSAS NOVIDADES!</h6>
        <div className={styles.newsletterInput}>
          <input type="email" placeholder="Digite seu email" />
          <button aria-label="enviar">➤</button>
        </div>
      </div>

      <div className={styles.footerMain}>
        <div className={styles.footerGrid}>

          <div>
            <h6 className={styles.footerHeading}>Institucional</h6>
            <div className={styles.footerLinks}>
              <a href="/quem-somos">Quem Somos</a>
              <a href="/termo-de-uso">Termos de Uso</a>
              <a href="/politica-privacidade">Política de Privacidade</a>
              <a href="/politica-envio">Política de Envio e Entrega</a>
              <a href="/politica-devolucao">Política de Devolução</a>
              <a target="_blank" href="https://api.whatsapp.com/send/?phone=553334122593&text=Ol%C3%A1%21+Vim+pelo+website+e+desejo+tirar+d%C3%BAvidas.&type=phone_number&app_absent=0">Entre em Contato</a>
              <a href="/formas-pagamento">Formas de Pagamento</a>
            </div>
          </div>

          <div>
            <h6 className={styles.footerHeading}>Contato</h6>
            <div className={styles.footerContact}>
              <p><Phone size={18} color="#b22234" /> (33) 3412-2593</p>
              <p><Mail size={18} color="#b22234" /> gidero80@gmail.com </p>
              <p><Clock size={18} color="#b22234" /> Segunda a Sexta-feira das 09:00 às 18:00 </p>
            </div>
          </div>

          <div>
            <div className={styles.footerSocial}>
              <h6 className={styles.footerHeading}>Nossas Redes</h6>
              <div className={styles.footerIcons}>
                <a target="_blank" href="https://www.instagram.com/brasmerica_motopecas/" aria-label="Instagram"><Instagram size={20} /></a>
                <a target="_blank" href="https://www.facebook.com/brasmericamotopecas.santos/" aria-label="Facebook"><Facebook size={20} /></a>
              </div>
            </div>

            <div>
              <h6 className={styles.footerHeading}>Formas de pagamento</h6>
              <div className={`${styles.footerPayments} flex gap-3 items-center`}>
                {/* Pix */}
                <div className={styles.paymentItem}>
                  <SiPix color="#32BCAD" size={28} className="payment-icon" title="Pix" />
                </div>

                {/* Visa */}
                <div className={styles.paymentItem}>
                  <SiVisa color="#1A1F71" size={28} className="payment-icon" title="Visa" />
                </div>

                {/* Mastercard */}
                <div className={styles.paymentItem}>
                  <SiMastercard color="#EB001B" size={28} className="payment-icon" title="Mastercard" />
                </div>

                {/* Elo (não tem ícone na lib) */}
                <div className={styles.paymentItem}>
                  <span
                    className="payment-icon font-bold"
                    style={{ color: "#FFCB05" }}
                    title="Elo"
                  >
                    ELO
                  </span>
                </div>

                {/* Hipercard (não tem ícone na lib) */}
                <div className={styles.paymentItem}>
                  <span
                    className="payment-icon font-bold"
                    style={{ color: "#B20838" }}
                    title="Hipercard"
                  >
                    HIPERCARD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.followRow}>
        <div className={styles.followContent}>
          <div className={styles.followLeft}>
            <h6 className={styles.followTitle}>Siga-nos</h6>
            <div className={styles.socialInline}>
              <a target="_blank" href="https://www.instagram.com/brasmerica_motopecas/" aria-label="Instagram"><Instagram size={20} /></a>
              <a target="_blank" href="https://www.facebook.com/brasmericamotopecas.santos/" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>
          <div className={styles.followRight}>
            <p className={styles.address}>
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