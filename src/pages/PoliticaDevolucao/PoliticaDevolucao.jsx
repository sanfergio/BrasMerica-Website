import React from "react";
import { RotateCcw } from "lucide-react";
import "./PoliticaDevolucao.css";

export default function PoliticaDevolucao() {
  return (
    <>
      <div className="return-container">
        <div className="return-wrapper">
          <div className="return-card">
            <div className="return-header">
              <RotateCcw className="return-icon" />
              <h1 className="return-title">Política de Devolução</h1>
            </div>

            <div className="return-text">
              <p>
                A Brasmerica preza pela satisfação completa de seus clientes ao adquirir motopeças importadas.
                Nossa política de devolução e troca foi desenvolvida em total conformidade com o Código de Defesa
                do Consumidor. Aceitamos a devolução por desistência ou arrependimento em até 7 (sete) dias corridos,
                contados a partir da data de recebimento do produto, garantindo seu direito de manifestar insatisfação
                após a entrega.
              </p>

              <p>
                Para iniciar qualquer processo de troca ou devolução, é imprescindível que o cliente entre em contato com
                o nosso Serviço de Atendimento, informando o número do pedido e o motivo detalhado. É fundamental que o
                produto seja devolvido em sua embalagem original, sem apresentar qualquer indício de uso, montagem ou
                violação de lacres e etiquetas originais, pois as peças passarão por uma rigorosa inspeção ao retornarem
                ao nosso Centro de Distribuição.
              </p>

              <p>
                Em casos de defeito de fabricação comprovado, a Brasmerica se responsabiliza integralmente pelos custos
                logísticos envolvidos no retorno da peça e no reenvio de um novo item ao cliente. Contudo, se a solicitação
                for motivada por simples desistência ou escolha inadequada do produto, as despesas de frete para o envio
                de volta à nossa central serão de responsabilidade do cliente.
              </p>

              <p>
                A Brasmerica reserva-se o direito de recusar qualquer solicitação que não atenda integralmente às condições
                estabelecidas nesta política. Nosso objetivo é processar sua solicitação de forma ágil e justa, e nossa
                equipe de atendimento está sempre disponível para esclarecer dúvidas e garantir a melhor e mais transparente
                experiência de compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
