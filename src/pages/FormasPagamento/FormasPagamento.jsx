import React from "react";
import { CreditCard } from "lucide-react";
import "./FormasPagamento.css";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";
import ShortFooter from "../../components/ShortFooter/ShortFooter";

export default function FormasPagamento() {
  return (
    <>
      <Header />
      <WhatsAppButton />
      <div className="pagamento-container">
        <div className="pagamento-wrapper">
          <div className="pagamento-card">
            <div className="pagamento-header">
              <CreditCard className="pagamento-icon" />
              <h1 className="pagamento-title">Formas de Pagamento</h1>
            </div>

            <div className="pagamento-text">
              <p>
                A Brasmérica está comprometida em oferecer a você uma experiência de compra ágil, segura e totalmente
                descomplicada. Para processar todos os pagamentos de forma transparente e protegida, utilizamos
                plataformas de pagamento reconhecidas por sua robustez e confiabilidade. Nosso objetivo principal é
                garantir que você possa adquirir suas motopeças importadas com a máxima conveniência e tranquilidade.
              </p>

              <p>
                Todas as transações financeiras realizadas em nosso site, desde a inserção de dados de cartão até a
                confirmação de boletos, são protegidas por criptografia avançada e protocolos de segurança de última
                geração, como o SSL (Secure Sockets Layer). Esta medida assegura que seus dados financeiros permaneçam
                confidenciais e protegidos contra qualquer acesso indevido, garantindo o rigoroso cumprimento das normas
                de segurança do mercado de pagamentos digitais.
              </p>

              <p>
                Pensando na sua comodidade, a Brasmérica disponibiliza uma ampla variedade de opções de pagamento. Você
                pode optar por métodos tradicionais e modernos, incluindo pagamento via cartões de crédito (com
                possibilidade de parcelamento), cartões de débito, transferência instantânea via PIX e pagamento por
                boleto bancário. Nosso sistema é integrado para processar todas essas modalidades com rapidez e
                eficiência.
              </p>

              <p>
                Ao selecionar qualquer uma das formas de pagamento disponíveis na Brasmérica, você tem a garantia de que
                suas informações são tratadas com o mais alto nível de sigilo e responsabilidade. Nosso compromisso é
                assegurar que a etapa de pagamento seja a mais segura, prática e eficiente de todo o seu processo de
                compra.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ShortFooter />
    </>
  );
}
