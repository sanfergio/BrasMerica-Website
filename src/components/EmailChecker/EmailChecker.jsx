import { useState, useEffect, useRef } from "react";
import styles from "./EmailChecker.module.css";
import emailjs from "@emailjs/browser"; //tem que baixar "npm install @emailjs/browser"

export default function EmailChecker({ email, onSuccess, onCancel }) {
  const [codigoGerado, setCodigoGerado] = useState("");
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [timer, setTimer] = useState(60);
  const [mensagem, setMensagem] = useState("");
  const codigoEnviadoRef = useRef(false);

  useEffect(() => {
    if (!codigoEnviadoRef.current) {
        emailjs.init("ZDiEPa83j373g5Npc");
        gerarCodigo();
        codigoEnviadoRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  function gerarCodigo() {
    const novoCodigo = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGerado(novoCodigo);
    setTimer(180);

    enviarEmail(novoCodigo);
  }

  function enviarEmail(codigo) {
    const templateParams = {
      codigo: codigo,
      email: email,
    };

    emailjs
      .send(
        "service_5vap9bm",     
        "template_avq4sk9",    
        templateParams
      )
      .then(() => {
        console.log("Código enviado para:", email);
      })
      .catch((err) => {
        console.error("Erro ao enviar email:", err);
        setMensagem("Erro ao enviar e-mail.");
      });
  }

  function validarCodigo() {
    if (codigoDigitado === codigoGerado) {
      setMensagem("Código validado com sucesso!");
      setTimeout(() => onSuccess(), 800);
    } else {
      setMensagem("Código incorreto. Tente novamente.");
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Verificação de E-mail</h2>
        <p>Enviamos um código para:</p>
        <strong>{email}</strong>

        <p className={styles.timer}>
          Tempo restante: <b>{timer}s</b>
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="Digite o código"
          value={codigoDigitado}
          onChange={(e) => setCodigoDigitado(e.target.value)}
          className={styles.input}
        />

        <button onClick={validarCodigo} className={styles.confirmBtn}>
          Validar
        </button>

        <button
          onClick={gerarCodigo}
          disabled={timer > 0}
          className={styles.resendBtn}
        >
          Reenviar código
        </button>

        <button onClick={onCancel} className={styles.cancelBtn}>
          Cancelar
        </button>

        {mensagem && <p className={styles.msg}>{mensagem}</p>}
      </div>
    </div>
  );
}
