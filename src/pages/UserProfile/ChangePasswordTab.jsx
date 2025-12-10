import React, { useState, useEffect } from "react";
import { Save, Lock, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./ChangePasswordTab.module.css";

// Componentes de Layout (mantidos externos)
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

// Cliente Supabase (use sua implementação existente)
import SupabaseClient from "../../components/KEYS/App.jsx";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  // Estados do formulário
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados de feedback
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" }); // type: 'error' | 'success'
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("user_session");
    if (storedSession) {
      setUserSession(JSON.parse(storedSession));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("A nova senha e a confirmação não coincidem.");
      }

      if (newPassword.length < 6) {
        throw new Error("A nova senha deve ter pelo menos 6 caracteres.");
      }

      // Busca usuário no Supabase (ajuste a tabela/coluna conforme seu esquema)
      const { data: userData, error: fetchError } = await SupabaseClient
        .from("DBclients")
        .select("encrypted_key")
        .eq("id", userSession.id)
        .single();

      if (fetchError || !userData) {
        throw new Error("Erro ao verificar usuário. Tente fazer login novamente.");
      }

      // ATENÇÃO: aqui estou comparando texto puro porque é o que seu código fazia.
      // Idealmente as senhas não devem ser armazenadas nem comparadas em texto plano.
      if (userData.encrypted_key !== currentPassword) {
        throw new Error("A senha atual informada está incorreta.");
      }

      const { error: updateError } = await SupabaseClient
        .from("DBclients")
        .update({ encrypted_key: newPassword })
        .eq("id", userSession.id);

      if (updateError) {
        throw updateError;
      }

      setMessage({ type: "success", text: "Senha alterada com sucesso!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      const updatedSession = { ...userSession, encrypted_key: newPassword };
      localStorage.setItem("user_session", JSON.stringify(updatedSession));
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Erro ao alterar senha." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <WhatsAppButton />

      <main className={styles.pageContainer}>
        <section className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.topRow}>
              <div className={styles.lockBadge}>
                <Lock size={18} />
              </div>
              <h1 className={styles.title}>Alterar Senha</h1>
            </div>

            {message.text && (
              <div
                className={
                  message.type === "error" ? styles.messageError : styles.messageSuccess
                }
                role="alert"
              >
                {message.type === "error" ? (
                  <AlertCircle size={16} className={styles.msgIcon} />
                ) : (
                  <CheckCircle size={16} className={styles.msgIcon} />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form className={styles.form} onSubmit={handleSaveChanges}>
              <div className={styles.formGroup}>
                <label htmlFor="currentPassword" className={styles.label}>
                  Senha Atual
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className={styles.input}
                  placeholder="Digite sua senha atual"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="newPassword" className={styles.label}>
                  Nova Senha
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className={styles.input}
                  placeholder="Digite a nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <small className={styles.hint}>Mínimo 6 caracteres</small>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirmar Nova Senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={styles.input}
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.saveButton}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={styles.loader} size={18} />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Salvar Alterações
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
