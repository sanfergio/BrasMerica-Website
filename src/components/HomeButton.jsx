// Recomendado renomear o arquivo para ScrollToTopButton.js
import React, { useState, useEffect } from 'react'; // Importa useState e useEffect
import ReactDOM from 'react-dom';
import { FaHome } from "react-icons/fa"; // Importa o ícone de casa

// Renomeado para refletir a nova funcionalidade
const HomeButton = () => {
  // Estado para controlar a visibilidade do botão
  const [isVisible, setIsVisible] = useState(false);

  // Função para rolar a página suavemente para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Efeito de rolagem suave
    });
  };

  // useEffect para adicionar e remover o listener de scroll
  useEffect(() => {
    // Função que verifica a posição do scroll
    const toggleVisibility = () => {
      // window.innerHeight é o equivalente a 100vh
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Adiciona o listener quando o componente é montado
    window.addEventListener('scroll', toggleVisibility);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // O array vazio [] garante que isso rode apenas no mount e unmount

  // Estilos para o botão
  const buttonStyle = {
    position: 'fixed',
    bottom: '50px',
    right: '8px',
    zIndex: 1000,
    background: '#b22234', // Fundo vermelho
    border: 'none',
    borderRadius: '50%',   // Botão redondo
    width: '56px',         // Largura do botão
    height: '56px',        // Altura do botão
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)', // Sombra
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // Adiciona transição para suavizar o aparecimento/desaparecimento
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    // Impede interação quando invisível
    pointerEvents: isVisible ? 'auto' : 'none', 
  };

  // O JSX que queremos renderizar
  const buttonJsx = (
    <div 
      onClick={scrollToTop} 
      style={buttonStyle}
      aria-label="Voltar ao topo" // Importante para acessibilidade
      role="button" // Adicionado para melhor acessibilidade, já que é uma div clicável
    >
      <FaHome 
        color="white" // Ícone branco
        size={30}     // Tamanho do ícone
      />
    </div>
  );


  return ReactDOM.createPortal(buttonJsx, document.body);
};

export default HomeButton;