import React, { useState } from "react";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./RememberPassword.module.css";

// Componentes de Layout
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

export default function RememberPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Lógica simulada de envio
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!email.includes("@")) {
        throw new Error("Por favor, insira um e-mail válido.");
      }

      console.log("Password reset requested for:", email);
      setIsSubmitted(true);
    } catch (err) {
      setError("Ocorreu um erro ao tentar enviar o e-mail. Tente novamente.");
      console.error(err);
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
            <div className={styles.header}>
              <Mail className={styles.iconMain} />
              <h1 className={styles.title}>Recuperar Senha</h1>
            </div>

            {!isSubmitted ? (
              <>
                <p className={styles.description}>
                  Informe seu endereço de e-mail e enviaremos um link para você redefinir sua senha.
                </p>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div>
                    <label htmlFor="email" className={styles.label}>
                      E-mail
                    </label>
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
                      "Enviar Link de Recuperação"
                    )}
                  </button>
                </form>

                <div className={styles.backLinkContainer}>
                  <Link to="/login" className={styles.link}>
                    <ArrowLeft size={16} />
                    Voltar para o Login
                  </Link>
                </div>
              </>
            ) : (
              <div className={styles.successContainer}>
                <div className="mb-6">
                  <div className={styles.iconCircle}>
                    <Mail className={styles.iconSuccess} />
                  </div>
                  <h2 className={styles.successTitle}>Verifique seu E-mail</h2>
                  <p className={styles.description}>
                    Enviamos um link de redefinição de senha para <strong>{email}</strong>. Por favor, verifique sua caixa de entrada e siga as instruções.
                  </p>
                </div>

                <Link to="/login" className={styles.link}>
                  <ArrowLeft size={16} />
                  Voltar para o Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}