import React, { useEffect } from "react";
import { Target, Eye, Heart } from "lucide-react";
import styles from "./QuemSomos.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

export default function QuemSomos() {
  useEffect(() => {
    try {
      document.title = "Brasmérica | Quem somos";
    } catch (e) {
      // ambiente sem DOM: ignora
    }
  }, []);

  return (
    <>
      <Header />
      <WhatsAppButton />

      <div className={styles.sobre}>
        <div className={styles.sobreContainer}>
          <div className={styles.sobreGrid}>
            <div>
              <h1 className={styles.sobreTitle}>Quem somos</h1>
              <h2 className={styles.sobreText}>
                Nós somos a <strong>Brasmérica</strong>, sua distribuidora de confiança, comprometida em trazer
                a excelência e a qualidade internacional do mercado de motopeças. Nossa jornada começou com uma visão clara:
                conectar o Brasil diretamente à vasta oferta de peças de reposição e performance dos Estados Unidos.
              </h2>
              <h2 className={styles.sobreText}>
                Através de anos de dedicação, logística apurada e um foco inabalável em nossos clientes, nos tornamos
                uma organização respeitada que prioriza a segurança e a performance da sua moto. Acreditamos na
                construção de parcerias duradouras, oferecendo um catálogo robusto e garantindo que você tenha acesso
                rápido e eficiente ao que há de melhor no setor.
              </h2>
              <h2 className={styles.sobreText}>
                Nossa abordagem combina o alto padrão de produtos americanos com um serviço de distribuição ágil
                e focado nas necessidades do mercado brasileiro.
              </h2>
            </div>

            <div className={styles.sobreImagem}>
              <img
                src="https://img.freepik.com/fotos-gratis/motociclista-fazendo-uma-acrobacia-em-sua-moto-motociclista-fazendo-uma-acrobacia-dificil-e-perigosa_654080-1058.jpg"
                alt="Homem andando de moto ao ar livre"
              />
            </div>
          </div>

          <div className={styles.botaoContainer}>
            <a href="https://api.whatsapp.com/send/?phone=553334122593&text=Ol%C3%A1%21+Vim+pelo+website+e+desejo+tirar+d%C3%BAvidas.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className={styles.botaoContato}>
              Entre em contato
            </a>
          </div>

          <div className={styles.cardsGrid}>
            <div className={`${styles.card} ${styles.cardVermelho}`}>
              <div className={styles.cardContent}>
                <div className={`${styles.cardIcone} ${styles.iconeVermelho}`}>
                  <Target className={styles.icone} />
                </div>
                <h3 className={`${styles.cardTitulo} ${styles.tituloVermelho}`}>Nossa missão</h3>
                <p className={styles.cardTexto}>
                  Oferecer ao mercado brasileiro acesso rápido e confiável às melhores motopeças importadas dos Estados Unidos,
                  garantindo a performance e a segurança que sua moto exige.
                </p>
              </div>
            </div>

            <div className={`${styles.card} ${styles.cardAzul}`}>
              <div className={styles.cardContent}>
                <div className={`${styles.cardIcone} ${styles.iconeAzul}`}>
                  <Eye className={styles.icone} />
                </div>
                <h3 className={`${styles.cardTitulo} ${styles.tituloAzul}`}>Nossa visão</h3>
                <p className={styles.cardTexto}>
                  Ser a principal e mais reconhecida distribuidora de motopeças americanas no Brasil, sinônimo de qualidade,
                  confiança e inovação em logística e atendimento.
                </p>
              </div>
            </div>

            <div className={`${styles.card} ${styles.cardVerde}`}>
              <div className={styles.cardContent}>
                <div className={`${styles.cardIcone} ${styles.iconeVerde}`}>
                  <Heart className={styles.icone} />
                </div>
                <h3 className={`${styles.cardTitulo} ${styles.tituloVerde}`}>Nossos valores</h3>
                <p className={styles.cardTexto}>
                  Qualidade impecável de produtos, transparência em todas as negociações, foco total no cliente e paixão
                  por duas rodas e pela cultura de alta performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
