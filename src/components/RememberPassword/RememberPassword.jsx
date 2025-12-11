import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft, Loader2, KeyRound, CheckCircle, Timer } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RememberPassword.module.css";
import emailjs from "@emailjs/browser"; // Certifique-se de ter instalado: npm install @emailjs/browser

// Componentes de Layout
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

// Inicializa o cliente Supabase
import SupabaseClient from "../KEYS/App.jsx";

export default function RememberPassword() {
  const navigate = useNavigate();

  // Chaves do EmailJS (Configuradas conforme seu pedido)
  const EMAILJS_PUBLIC_KEY = "ZDiEPa83j373g5Npc";
  const EMAILJS_SERVICE_ID = "service_5vap9bm";
  const EMAILJS_TEMPLATE_ID = "template_avq4sk9";

  // Estados do formulário
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState(""); // Input do usuário
  const [generatedOtp, setGeneratedOtp] = useState(null); // Código gerado

  // Controle de fluxo: 'EMAIL' (digitar email) | 'OTP' (digitar código)
  const [step, setStep] = useState("EMAIL");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Timer
  const [timer, setTimer] = useState(0);

  // Inicializa o EmailJS ao montar o componente
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Controle do Timer (Contagem regressiva)
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Função auxiliar para enviar o e-mail via EmailJS
  const sendEmailJS = async (userEmail, code) => {
    const templateParams = {
      codigo: code,
      email: userEmail,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      console.log("Email enviado com sucesso para:", userEmail);
      return true;
    } catch (err) {
      console.error("Erro ao enviar email:", err);
      throw new Error("Falha ao enviar o e-mail. Verifique sua conexão.");
    }
  };

  // ---------------------------------------------------------
  // 1. Verificar Email no Banco e Enviar Código
  // ---------------------------------------------------------
  const handleSendCode = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (!email.includes("@")) {
        throw new Error("Por favor, insira um e-mail válido.");
      }

      // 1. Verificar se o cliente existe no Supabase
      // Precisamos verificar se ele existe antes de enviar o código
      const { data: clientData, error: dbError } = await SupabaseClient
        .from("DBclients")
        .select("id")
        .eq("email", email)
        .single();

      if (dbError || !clientData) {
        throw new Error("E-mail não encontrado em nossa base de dados.");
      }

      // 2. Gerar código de 6 dígitos
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);

      // 3. Enviar E-mail via EmailJS
      await sendEmailJS(email, code);

      // 4. Configurar estados para o próximo passo
      setStep("OTP");
      setTimer(180); // Inicia contagem de 3 minutos (180s) para reenviar
      setSuccessMsg("Código enviado com sucesso!");

    } catch (err) {
      setError(err.message || "Erro ao processar solicitação.");
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------
  // 2. Função de Reenvio (Botão "Reenviar Código")
  // ---------------------------------------------------------
  const handleResendCode = async () => {
    if (timer > 0) return; // Impede clique se ainda tiver tempo
    await handleSendCode(null); // Reutiliza a lógica de envio
  };

  // ---------------------------------------------------------
  // 3. Verificar Código e Fazer Login
  // ---------------------------------------------------------
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Valida o código localmente
      if (otpCode !== generatedOtp) {
        throw new Error("Código incorreto. Tente novamente.");
      }

      // 2. Busca os dados do usuário para o Login Automático
      const { data: userData, error: userError } = await SupabaseClient
        .from("DBclients")
        .select("encrypted_key, email, id, name") // Adicionei 'nome' se houver, opcional
        .eq("email", email)
        .single();

      if (userError) throw userError;

      // 3. Simula a sessão de login
      // Salva no localStorage como se tivesse feito login na tela principal
      localStorage.setItem("user_session", JSON.stringify(userData));
      localStorage.setItem("is_logged_in", "true");

      setSuccessMsg("Código validado! Redirecionando...");

      // Pequeno delay para usuário ver a mensagem de sucesso
      setTimeout(() => {
        // Redireciona para a seção de alterar senha
        navigate("/trocar-senha?email=" + email);
      }, 1000);

    } catch (err) {
      setError(err.message || "Erro ao verificar código.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <WhatsAppButton />

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.card}>

            {/* Cabeçalho do Card */}
            <div className={styles.header}>
              {step === "EMAIL" ? (
                <Mail className={styles.iconMain} />
              ) : (
                <KeyRound className={styles.iconMain} />
              )}
              <h1 className={styles.title}>
                {step === "EMAIL" ? "Recuperar Senha" : "Verificação"}
              </h1>
            </div>

            {/* Mensagens de Feedback */}
            {error && <div className={styles.errorMessage}>{error}</div>}
            {successMsg && !error && <div className="text-green-600 text-sm mb-4 text-center font-medium">{successMsg}</div>}

            {/* PASSO 1: INSERIR EMAIL */}
            {step === "EMAIL" && (
              <>
                <p className={styles.description}>
                  Informe seu e-mail cadastrado. Enviaremos um código de verificação para você redefinir sua senha.
                </p>

                <form onSubmit={handleSendCode} className={styles.form}>
                  <div>
                    <label htmlFor="email" className={styles.label}>E-mail</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      placeholder="seu@email.com"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Código"
                    )}
                  </button>
                </form>
              </>
            )}

            {/* PASSO 2: INSERIR CÓDIGO (OTP) */}
            {step === "OTP" && (
              <>
                <div className="mb-6 text-center">
                  <div className={styles.iconCircle}>
                    <CheckCircle className={styles.iconSuccess} />
                  </div>
                  <p className={styles.description}>
                    Enviamos um código para <strong>{email}</strong>.
                  </p>

                  {/* Timer Visual */}
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
                    <Timer size={16} />
                    <span>Tempo restante: <b>{timer}s</b></span>
                  </div>
                </div>

                <form onSubmit={handleVerifyCode} className={styles.form}>
                  <div>
                    <label htmlFor="otp" className={styles.label}>Código de 6 dígitos</label>
                    <input
                      type="text"
                      id="otp"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className={styles.input}
                      placeholder="Ex: 123456"
                      required
                      maxLength={6}
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Verificando...
                      </>
                    ) : (
                      "Validar e Entrar"
                    )}
                  </button>
                </form>

                {/* Botão de Reenvio */}
                <div className="text-center mt-4">
                  <button
                    onClick={handleResendCode}
                    disabled={timer > 0 || isLoading}
                    className={styles.button}
                  >
                    {timer > 0 ? `Aguarde ${timer}s para reenviar` : "Reenviar código"}
                  </button>
                </div>

                <div className="text-center mt-2">
                  <button
                    onClick={() => { setStep("EMAIL"); setError(""); setOtpCode(""); }}
                    className={styles.button}
                  >
                    Trocar e-mail
                  </button>
                </div>
              </>
            )}

            {/* Link de Voltar */}
            <div className={styles.backLinkContainer}>
              <Link to="/login" className={styles.link}>
                <ArrowLeft size={16} />
                Voltar para o Login
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}