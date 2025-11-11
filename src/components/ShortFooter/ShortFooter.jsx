import React from "react";
import { MapPin, Instagram, Facebook, Phone, Mail } from "lucide-react";
import styles from "./ShortFooter.module.css";

export default function ShortFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <img
          src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/icon-logo2.png?raw=true"
          alt="Logo do rodapé"
          className={styles.newsletterLogo}
        />

        <div>
          <p color={"white"}>
            <MapPin size={16} /> São João Evangelista MG, Rua José Guimarães
            número 509 - Centro, 39705000
          </p>
        </div>
      </div>
    </footer>
  );
}