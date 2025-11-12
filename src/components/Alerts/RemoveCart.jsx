import { useEffect } from "react";

// ID único para a tag <style>
const STYLE_ID = "remove-cart-notification-style";

export default function RemoveCart({ onDone }) {
  useEffect(() => {
    // 1. Injeção de Estilo (com verificação)
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.innerHTML = `
        .notification.remove {
          position: fixed;
          top: 10px;
          right: 10px;
          background: #fff;
          color: #000;
          padding: 12px 16px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.25);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          /* Usamos um nome de animação único */
          animation: fadeInRemove 0.3s ease-out;
          width: 270px;
          z-index: 9999;
          overflow: hidden;
          flex-direction: column;
          align-items: flex-start;
        }

        .notification.remove .content {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .notification.remove .icon {
          font-size: 18px;
        }

        .notification.remove .progress-bar {
          width: 100%; /* Inicia em 100% */
          height: 4px;
          background-color: #ef4444;
          /* margin-top: 8px; */
          align-self: stretch;
          border-radius: 2px;
          transition: width 3s linear;
        }

        /* Animação com nome único */
        @keyframes fadeInRemove {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }

    // 2. Criação da Notificação
    const notification = document.createElement("div");
    notification.className = "notification remove";
    notification.innerHTML = `
      <div class="content">
        <div class="icon">❌</div>
        <span>Produto removido do carrinho</span>
      </div>
      <div class="progress-bar"></div>
    `;
    document.body.appendChild(notification);

    // 3. Lógica da Animação
    const progressBar = notification.querySelector(".progress-bar");
    // Força o navegador a pintar o width 100% antes de animar para 0%
    setTimeout(() => {
      if (progressBar) {
        progressBar.style.width = "0%";
      }
    }, 10);

    // 4. Timer de Remoção
    const timer = setTimeout(() => {
      notification.remove();
      onDone(); // Avisa o componente pai que terminou
    }, 3000);

    // 5. Função de Limpeza
    return () => {
      clearTimeout(timer);
      // Remove a notificação imediatamente se o efeito for re-executado
      notification.remove();
    };
  }, [onDone]); // Adicionamos onDone como dependência

  return null;
}