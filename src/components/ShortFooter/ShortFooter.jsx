import React from "react";
import { MapPin, Instagram, Facebook, Phone, Mail } from "lucide-react";
import "./ShortFooter.css";

export default function ShortFooter() {
  return (
    <footer className="footer">
      <div className="newsletter">
        <img
          src="/assets/logo_footer.webp"
          alt="Logo do rodapé"
          className="newsletter-logo"
        />

        <div>
          <p color={"white"}>
            <MapPin size={16} /> São João Evangelista MG, Rua José Guimarães
            número 509 - Centro, 39705000
          </p>
        </div>

        <div>
          <h3>Contato</h3>
          <div className="contact">
            <Phone size={16} />
            <Mail size={16} />
            <Instagram size={16} />
            <Facebook size={16} />
          </div>
        </div>
      </div>
    </footer>
  );
}
