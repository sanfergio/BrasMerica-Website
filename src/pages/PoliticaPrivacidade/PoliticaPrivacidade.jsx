import React, { useEffect } from "react";
import { Shield } from "lucide-react"
import styles from "./PoliticaPrivacidade.module.css"
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header"
import WhatsAppButton from "../../components/WhatsappButton"

export default function PoliticaPrivacidade() {
    useEffect(() => {
        try {
            document.title = "Brasmérica | Política de Privacidade";
        } catch (e) {
            // ambiente sem DOM: ignora
        }
    }, []);

    return (
        <>
            <Header />
            <WhatsAppButton />

            <div className={styles.politicaContainer}>
                <div className={styles.politicaWrapper}>
                    <div className={styles.politicaCard}>
                        <div className={styles.politicaHeader}>
                            <Shield className={styles.politicaIcon} />
                            <h1 className={styles.politicaTitle}>Política de privacidade</h1>
                        </div>

                        <h2 className={styles.politicaText}>
                            <p>
                                A segurança e a privacidade dos dados de nossos clientes e parceiros são prioridades fundamentais para a Brasmerica - Distribuidora de Motopeças. Empregamos as mais rigorosas e avançadas medidas de segurança para proteger todas as informações pessoais que nos são confiadas, garantindo que sejam mantidas em total confidencialidade e utilizadas de maneira responsável.
                            </p>

                            <p>
                                No que diz respeito ao nosso site e plataformas, todas as transações, incluindo dados de pagamento e informações de cadastro, são protegidas por criptografia SSL (Secure Sockets Layer). Esta tecnologia de segurança de ponta assegura a integridade e a confidencialidade dos dados transmitidos entre o seu navegador e nossos servidores. Além disso, adotamos políticas internas rígidas, assegurando que suas informações sejam utilizadas estritamente para os fins para os quais foram fornecidas, como processamento de pedidos, entrega de motopeças e comunicação eficiente sobre nossos produtos e serviços importados.
                            </p>

                            <p>
                                A Brasmerica está em total e contínua conformidade com as leis e regulamentações de proteção de dados vigentes, incluindo a Lei Geral de Proteção de Dados (LGPD). Isso garante que seus dados sejam tratados com o máximo de cuidado, transparência e respeito aos seus direitos. Realizamos avaliações e auditorias regulares em nossos sistemas e processos para garantir a segurança e a integridade de todas as informações armazenadas.
                            </p>

                            <p>
                                Em suma, a Brasmerica está comprometida em garantir um ambiente online totalmente seguro e confiável. Adotamos as melhores práticas e tecnologias disponíveis no mercado para blindar seus dados e assegurar sua privacidade, permitindo que você se concentre na performance da sua moto com total tranquilidade.
                            </p>
                        </h2>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}
