import React from "react";
import { Target, Eye, Heart } from "lucide-react";
import "./QuemSomos.css";
import ShortFooter from "../../components/ShortFooter/ShortFooter";

export default function QuemSomos() {
  return (
    <>
    <div className="sobre">
      <div className="sobre-container">
        <div className="sobre-grid">
          <div>
            <h1 className="sobre-title">Quem somos?</h1>
            <p className="sobre-text">
              Nós somos a Brasmerica, sua distribuidora de confiança, comprometida em trazer a excelência
               e a qualidade internacional do mercado de motopeças. Nossa jornada começou com uma visão clara:
                conectar o Brasil diretamente à vasta oferta de peças de reposição e performance dos Estados Unidos.
                 Através de anos de dedicação, logística apurada e um foco inabalável em nossos clientes, nos tornamos
                  uma organização respeitada que prioriza a segurança e a performance da sua moto. Acreditamos na 
                  construção de parcerias duradouras, oferecendo um catálogo robusto e garantindo que você tenha acesso
                   rápido e eficiente ao que há de melhor no setor. Nossa abordagem combina o alto padrão de produtos 
                   americanos com um serviço de distribuição ágil e focado nas necessidades do mercado brasileiro.
            </p>
          </div>
          <div className="sobre-imagem">
            <img
              src="https://img.freepik.com/fotos-gratis/motociclista-fazendo-uma-acrobacia-em-sua-moto-motociclista-fazendo-uma-acrobacia-dificil-e-perigosa_654080-1058.jpg"
              alt="Homem andando de moto ao ar livre"
              className="sobre-foto"
            />
          </div>
        </div>

        <div className="cards-grid">
          <div className="card card-vermelho">
            <div className="card-content">
              <div className="card-icone icone-vermelho">
                <Target className="icone" />
              </div>
              <h3 className="card-titulo titulo-vermelho">Nossa missão</h3>
              <p className="card-texto">
                Oferecer ao mercado brasileiro acesso rápido e confiável às melhores motopeças importadas dos Estados Unidos, garantindo a performance e a segurança que sua moto exige.
              </p>
            </div>
          </div>

          <div className="card card-azul">
            <div className="card-content">
              <div className="card-icone icone-azul">
                <Eye className="icone" />
              </div>
              <h3 className="card-titulo titulo-azul">Nossa visão</h3>
              <p className="card-texto">
                Ser a principal e mais reconhecida distribuidora de motopeças americanas no Brasil, sinônimo de qualidade, confiança e inovação em logística e atendimento.
              </p>
            </div>
          </div>

          <div className="card card-verde">
            <div className="card-content">
              <div className="card-icone icone-verde">
                <Heart className="icone" />
              </div>
              <h3 className="card-titulo titulo-verde">Nossos valores</h3>
              <p className="card-texto">
                Qualidade impecável de produtos, transparência em todas as negociações, foco total no cliente, e paixão por duas rodas e pela cultura de alta performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShortFooter />
    </>
  );
}
