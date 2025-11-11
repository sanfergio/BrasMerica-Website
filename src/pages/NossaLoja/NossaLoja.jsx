import React, { useEffect } from "react";
import styles from "./NossaLoja.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

export default function NossaLoja() {
  useEffect(() => {
    try {
      document.title = "Brasmérica | Nossa Loja";
    } catch (e) {
      // ambiente sem DOM: ignora
    }
  }, []);

  return (
    <div className={styles.nossaLoja}>
      <StoreLocation />
    </div>
  );
}

function StoreLocation() {
  return (<>
    <Header />
    <WhatsAppButton />
    <div className={styles.storeContainer}>
      <div className={styles.storeSection}>
        <h1 className={styles.storeTitle}>Nossa Loja</h1>
        <p className={styles.storeDescription}>
          Aqui hasteamos nossa bandeira! Atendemos aos clientes há
          diversos anos, oferecendo produtos de qualidade e atendimento
          excepcional ao cliente. Nossa equipe experiente está sempre pronta para ajudar você a encontrar
          exatamente o que precisa. Seja você um visitante de primeira viagem ou um cliente
          fiel, temos o compromisso de tornar sua experiência de compra inesquecível.
        </p>
      </div>

      <div className={styles.visitSection}>
        <h2 className={styles.visitTitle}>Venha nos visitar!</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.72970259827!2d-42.75578629999999!3d-18.541112899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xae3da91ea54895%3A0xbbbd3451c6c678c2!2sBrasmerica%20Motope%C3%A7as!5e0!3m2!1spt-BR!2sbr!4v1761235989067!5m2!1spt-BR!2sbr"
          className={styles.mapPlaceholder}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p className={styles.visitText}>
          R. José Guimarães, 509 - Centro, São João Evangelista - MG, 39705-000 <br />
          Abertos de segunda a sábado, das 08:00 às 18:00
        </p>
      </div>
    </div>
    <Footer />
  </>
  );
}
