// WhatsAppButton.js
import React from 'react';
import ReactDOM from 'react-dom';

const WhatsAppButton = () => {
  // Define o link e o texto
  const phoneNumber = "553334122593";
  const message = "Olá! Vim pelo website e desejo tirar dúvidas.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappHref = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Estilos para o link (botão)
  const linkStyle = {
    position: 'fixed',
    bottom: '50px',
    left: '2%', // Posição que você definiu
    zIndex:99,
    
    // Estilos para fazer o botão ter 56x56 e ser circular
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'white', // Fundo branco do botão
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    
    // Estilos para centralizar o ícone SVG
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // O JSX que queremos renderizar
  const buttonJsx = (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer" // Boa prática de segurança para target="_blank"
      style={linkStyle}
      aria-label="Abrir conversa no WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // Tamanho do ícone (menor que o botão de 56px)
        width="32" 
        height="32"
        viewBox="0 0 24 24"
        fill="#25D366" // Cor verde do ícone
        // O style no SVG não é mais necessário aqui
      >
        <path d="M12.002 2.003c-5.522 0-10 4.478-10 10 0 1.766.472 3.428 1.362 4.896l-1.456 5.101 5.22-1.386a9.967 9.967 0 004.874 1.252c5.523 0 10-4.477 10-10s-4.477-10-10-10zm5.476 14.515c-.23.646-1.343 1.207-1.88 1.283-.49.069-1.095.098-1.75-.112-.401-.13-.914-.296-1.567-.579-2.757-1.196-4.562-4.057-4.698-4.25-.137-.193-1.123-1.495-1.123-2.851s.711-2.023.963-2.3c.23-.253.508-.316.678-.316.169 0 .339.002.487.009.157.007.369-.06.577.438.23.558.779 1.924.849 2.063.07.138.114.302.023.496-.092.193-.138.315-.276.484-.137.168-.291.376-.416.505-.137.14-.28.295-.12.578.16.282.71 1.171 1.524 1.896 1.048.946 1.933 1.237 2.215 1.375.282.139.444.123.611-.075.167-.199.703-.816.89-1.096.184-.281.387-.233.654-.14.27.093 1.701.801 1.991.946.29.146.483.215.554.337.07.123.07.712-.16 1.358z" />
      </svg>
    </a>
  );

  // Usa um Portal para renderizar o botão diretamente no <body>
  return ReactDOM.createPortal(buttonJsx, document.body);
};

export default WhatsAppButton;