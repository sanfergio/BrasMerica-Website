import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";
import bcrypt from "bcryptjs";

// Inicializa o cliente Supabase
import SupabaseClient from "../../components/KEYS/App.jsx";

const supabase = SupabaseClient;

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Define o título da página conforme solicitado
  useEffect(() => {
    try {
      document.title = "Brasmérica | Login";
    } catch (e) {
      // ambiente sem DOM — ignora
    }
  }, []);

  // 🔤 Atualiza campos
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  }

  // 👁️ Alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ✅ Validação de e-mail robusta
  function validateEmail(email) {
    const re =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return re.test(email);
  }

  // 🔒 Login principal
  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Formato de e-mail inválido.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "A senha é obrigatória.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess("");
      return;
    }

    setLoading(true);

    try {
      // 🔍 Busca o usuário na tabela correta
      const { data: user, error } = await supabase
        .from("DBclients")
        .select("*")
        .eq("email", formData.email)
        .single();

      if (error || !user) {
        setErrors({ email: "Usuário não encontrado." });
        setLoading(false);
        return;
      }

      // 🔑 Compara a senha com o hash do banco
      const isValid = await bcrypt.compare(
        formData.password,
        user.encrypted_key
      );

      if (!isValid) {
        setErrors({ password: "Senha incorreta." });
        setLoading(false);
        return;
      }

      // ✅ Login bem-sucedido
      setSuccess("Login realizado com sucesso!");
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);

      // Redireciona após 1s
      setTimeout(() => {
        window.location.href = `./`;
      }, 1000);
    } catch (err) {
      console.error("Erro no login:", err);
      setErrors({
        general: "Erro ao conectar ao servidor. Tente novamente mais tarde.",
      });
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>Entre com sua conta</h2>

          <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <label
              className={`${styles.inputGroup} ${errors.email ? styles.inputGroupError : ""
                }`}
            >
              <span className={styles.icon} aria-hidden>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <polyline points="3 7 12 13 21 7"></polyline>
                </svg>
              </span>
              <input
                className={styles.inputBox}
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={loading}
              />
            </label>
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email}</p>
            )}

            {/* Senha */}
            <label
              className={`${styles.inputGroup} ${errors.password ? styles.inputGroupError : ""
                }`}
            >
              <span className={styles.icon} aria-hidden>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                className={styles.inputBox}
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePasswordVisibility}
                disabled={loading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </label>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}

            {/* Link "Esqueci minha senha" */}
            <div className={styles.forgotPasswordContainer}>
              <a 
                href="/forgot-password" 
                className={styles.forgotPasswordLink}
                onClick={(e) => {
                  e.preventDefault();
                  alert("Entre em contato com o suporte para recuperar sua senha.");
                }}
              >
                Esqueci minha senha
              </a>
            </div>

            {/* Botões */}
            <div className={styles.actionsRow}>
              <a className={styles.link} href="/register">
                Não tenho uma conta
              </a>
              <button 
                className={styles.signupButton} 
                type="submit"
                disabled={loading}
              >
                {loading ? "Entrando..." : "LOGIN"}
              </button>
            </div>

            {errors.general && (
              <p className={styles.errorMessage}>{errors.general}</p>
            )}
            {success && <p className={styles.successMessage}>{success}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}