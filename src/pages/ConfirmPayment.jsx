import { useEffect, useState } from 'react';

const ConfirmationPage = () => {
  const [emailUser, setEmailUser] = useState('');
  const [valorTotal, setValorTotal] = useState(0);
  const [valorFrete, setValorFrete] = useState(0);
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  // Estilos inline
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'whitesmoke',
      padding: '20px'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    loader: {
      width: '150px',
      height: '150px',
      border: '15px solid #ddd',
      borderTop: '15px solid green',
      borderRadius: '50%',
      animation: 'spin 1.5s ease-out 1s forwards, fillGreen 1s 1.5s forwards',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    checkmark: {
      width: '70px',
      height: '70px',
      animation: 'drawCheck 0.5s ease-out 2.2s forwards',
      opacity: 0
    },
    confirmationText: {
      fontSize: '1.5rem',
      color: '#333',
      marginTop: '30px',
      opacity: 0,
      animation: 'fadeIn 1s ease-out forwards',
      animationDelay: '2.8s'
    },
    returnButton: {
      padding: '15px 30px',
      fontSize: '1.2rem',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s',
      marginTop: '20px',
      opacity: 0,
      animation: 'fadeIn 1s ease-out forwards',
      animationDelay: '2.8s'
    }
  };

  // Função para obter parâmetros da URL
  const obterParametrosDaUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const email = urlParams.get('email') || '';
    const total = parseFloat(urlParams.get('valorTotal')) || 0;
    const frete = parseFloat(urlParams.get('valorFrete')) || 0;

    return { email, total, frete };
  };

  // Função para voltar à página principal
  const handleBack = () => {
    window.open('../../perfil-usuario', '_blank');
  };

  // Função para enviar evento de purchase
  const enviarPurchaseComParametros = () => {
    if (compraFinalizada) return;

    setCompraFinalizada(true);

    // Enviar dados para o dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: "PEDIDO-" + Date.now(),
          value: valorTotal,
          tax: 0,
          shipping: valorFrete,
          currency: "BRL",
          affiliation: "New Andrews",
        }
      });
    }

    // Remover carrinho do localStorage
    localStorage.removeItem('carrinho');
  };

  // Efeito para carregar parâmetros e enviar evento
  useEffect(() => {
    const parametros = obterParametrosDaUrl();
    setEmailUser(parametros.email);
    setValorTotal(parametros.total);
    setValorFrete(parametros.frete);

    // Inicializar dataLayer se não existir
    window.dataLayer = window.dataLayer || [];

    // Enviar evento após um pequeno delay para garantir que o componente foi montado
    const timer = setTimeout(() => {
      enviarPurchaseComParametros();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fillGreen {
            to { border-color: green; background-color: green; }
          }
          @keyframes drawCheck {
            0% { stroke-dasharray: 0 100; opacity: 0; }
            100% { stroke-dasharray: 100 0; opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-NBXWDJVT"
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>

      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.loader}>
            <svg style={styles.checkmark} viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="25" fill="green"/>
              <path 
                d="M14 27l10 10 15-15" 
                fill="none" 
                stroke="white" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={styles.confirmationText}>Compra confirmada!</div>
          <button 
            style={styles.returnButton} 
            onClick={handleBack}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'darkgreen';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'green';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Voltar para página principal
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;