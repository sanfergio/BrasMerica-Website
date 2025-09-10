import './Footer.css';
import { FaPaperPlane, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';


function Footer() {
    return (
        <footer>
            <div className="first">
                <img src="https://github.com/sanfergio/BrasMerica-Website/blob/main/brasmerica/public/images/icon-logo2.png?raw=true" alt="Logo Brasmerica   " />
                <form className='firstInput'>
                    <h7>RECEBA NOSSAS <br />
                        NOVIDADES!</h7>
                    <div>
                        <input type="email" placeholder="Digite seu email" required />
                        <button><FaPaperPlane /></button>
                    </div>
                </form>
            </div>
            <div className="second">
                <div className="imgFooter">
                    <img src="https://github.com/sanfergio/BrasMerica-Website/blob/main/brasmerica/public/images/logo-sem-fundo-border.png?raw=true" alt="Logo Brasmerica" />
                </div>
                <div class="textFooter">
                    <div class="textDvis">
                        <h4>Entre em contato</h4>
                        <a> <FaPhone className="icon-footer" /> (33) 3412-2593</a>
                        <a href="mailto:atendimento@brasmerica.com.br"> <FaEnvelope className="icon-footer" /> atendimento@brasmerica.com.br</a>
                        <a> <FaClock className="icon-footer" /> Segunda a Sexta-feira: 09:00 às 18:00</a>
                    </div>

                    <div class="textDvis">
                        <h4>Minha conta</h4>
                        <a href="#">Histórico de pedidos</a>
                        <a href="#">Informativo</a>
                    </div>

                    <div class="textDvis">
                        <h4>Serviços ao cliente</h4>
                        <a href="#">Entrar em contato</a>
                        <a href="#">Solicitar devolução</a>
                        <a href="#">Sobre a loja</a>
                    </div>
                </div>

                <div className="redes">
                    <p className="texto">
                        Siga-nos:
                        <span className="icones">
                            <FaInstagram className="icon" />
                            <FaFacebook className="icon" />
                            <FaTwitter className="icon" />
                        </span>
                    </p>
                    <p className="endereco">
                        São João Evangelista - MG, Rua José Guimarães nº 509 - Centro, 39705-000
                    </p>
                </div>

            </div>
            <div className="third">
                <p>Copyright © 2025 Brásmerica Motopeças ®</p>
            </div>
            <div className="forth">
            </div>
        </footer>
    )
}

export default Footer             