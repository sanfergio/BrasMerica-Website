import { useEffect } from "react";

export default function AddCart({ show = false, duration = 3000 }) {
  useEffect(() => {
    if (!show) return;

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
      Produto adicionado ao carrinho
      <div class="progress-bar"></div>
    `;
    document.body.appendChild(notification);

    const style = document.createElement("style");
    style.innerHTML = `
      .notification {
        position: fixed;
        top: 10px;
        right: 10px;
        background: #fff;
        color: #000;
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.25);
        font-size: 14px;
        font-weight: 500;
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
        width: 260px;
      }

      .progress-bar {
        width: 0;
        height: 4px;
        background-color: #22c55e;
        margin-top: 8px;
        border-radius: 2px;
        transition: width ${duration}ms linear;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    const progressBar = notification.querySelector(".progress-bar");
    setTimeout(() => {
      progressBar.style.width = "100%";
    }, 10);

    const timer = setTimeout(() => {
      notification.remove();
      style.remove();
    }, duration);

    return () => {
      clearTimeout(timer);
      notification.remove();
      style.remove();
    };
  }, [show, duration]);

  return null;
}