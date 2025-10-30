import React, { useEffect, useState } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Mostra o logo com fade-in quase imediatamente
      setTimeout(() => setShowLogo(true), 100); // leve delay para parecer natural
      // Encerra o loading após 1.5s
      setTimeout(() => setLoading(false), 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!loading) return null;

  return (
    <div
      id="loading"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Container da moto e fumaça */}
      <div style={{ position: "absolute", width: "100%", height: "50px" }}>
        {/* Fumaça múltipla */}
        <div className="smoke-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="smoke"></div>
          ))}
        </div>

        {/* Moto */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1986/1986937.png"
          alt="Moto"
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            animation: "motoRun 1.5s linear infinite",
          }}
        />
      </div>

      {/* Logo */}
      {showLogo && (
        <img
          src="https://github.com/machadocalebe/repo-sanfer-imagens/blob/main/brasMerica/imagens/logo-sem-fundo-border.png?raw=true"
          alt="Logo"
          style={{
            position: "absolute",
            width: "300px",
            opacity: 0,
            animation: "fadeInOut 1.5s ease-in-out forwards",
          }}
        />
      )}

      <style>{`
        /* Moto acelerando da esquerda para a direita */
        @keyframes motoRun {
          0% { left: -60px; }
          100% { left: calc(100% + 60px); }
        }

        /* Container de fumaça */
        .smoke-container {
          position: absolute;
          width: 100%;
          height: 50px;
        }

        /* Cada partícula de fumaça */
        .smoke {
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(185,6,6,0.3);
          border-radius: 50%;
          filter: blur(5px);
          animation: smokeParticle 1.5s linear infinite;
          left: -30px;
        }

        /* Delay entre partículas */
        .smoke:nth-child(1) { animation-delay: 0s; }
        .smoke:nth-child(2) { animation-delay: 0.1s; }
        .smoke:nth-child(3) { animation-delay: 0.2s; }
        .smoke:nth-child(4) { animation-delay: 0.3s; }
        .smoke:nth-child(5) { animation-delay: 0.4s; }

        /* Movimento da fumaça */
        @keyframes smokeParticle {
          0% {
            left: -30px;
            bottom: 0px;
            opacity: 0.5;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.3;
            bottom: 10px;
            transform: scale(1.2);
          }
          100% {
            left: calc(100% + 30px);
            bottom: 20px;
            opacity: 0;
            transform: scale(1.5);
          }
        }

        /* Logo fade-in/fade-out em 1.5s */
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.8); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
