import React from "react";
import { Truck } from "lucide-react";
import "./PoliticaEnvio.css";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";
import ShortFooter from "../../components/ShortFooter/ShortFooter";

export default function PoliticaEnvio() {
    return (
        <>
            <Header />
            <WhatsAppButton />
            <div className="shipping-container">
                <div className="shipping-wrapper">
                    <div className="shipping-card">
                        <div className="shipping-header">
                            <Truck className="shipping-icon" />
                            <h1 className="shipping-title">Política de Envio</h1>
                        </div>

                        <div className="shipping-text">
                            <p>
                                A Brasmérica assegura que a sua motopeça importada chegue até você com a máxima agilidade e segurança. Para isso, nossa política de envio é baseada em uma logística eficiente que utiliza os serviços de transporte mais confiáveis do mercado, incluindo os Correios do Brasil e transportadoras privadas parceiras. Nosso foco é garantir a entrega das suas peças em todo o território nacional, mantendo a integridade e a qualidade dos produtos.
                            </p>

                            <p>
                                No momento da finalização da sua compra, você terá a liberdade de escolher entre as diversas modalidades de frete que disponibilizamos, que variam em prazo e custo. O valor do frete e a estimativa de prazo de entrega são calculados de forma automática e transparente. Estes fatores dependem diretamente do peso volumétrico das motopeças e da sua localização. Nosso sistema busca sempre apresentar a melhor relação custo-benefício para atender à sua urgência.
                            </p>

                            <p>
                                A transparência no processo de entrega é um pilar fundamental da Brasmérica. Por isso, todos os pedidos processados e despachados recebem um código de rastreamento. Este código é enviado ao cliente para que seja possível acompanhar o status da entrega em tempo real, desde a nossa central de distribuição até o endereço de destino. Essa prática visa proporcionar tranquilidade e precisão na sua previsão de recebimento.
                            </p>

                            <p>
                                Com uma logística de distribuição robusta e parcerias com transportadoras de excelência, a Brasmérica reafirma o seu compromisso em oferecer um serviço de envio de alto padrão. Trabalhamos incansavelmente para que você receba suas motopeças importadas no prazo e nas condições esperadas, garantindo a sua satisfação e fidelidade.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ShortFooter />
        </>
    );
}
