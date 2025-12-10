import React, { useState, useEffect } from "react";
import { Save, Lock, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css"; // Certifique-se que este CSS existe ou use o do RememberPassword

// Componentes de Layout
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

// Cliente Supabase
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

  // 1. Verificar se usuário está logado ao carregar a página
  useEffect(() => {
    const storedSession = localStorage.getItem("user_session");
    if (storedSession) {
      setUserSession(JSON.parse(storedSession));
    } else {
      // Se não tiver sessão, redireciona para login
      navigate("/login");
    }
  }, [navigate]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Validações básicas de front-end
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("A nova senha e a confirmação não coincidem.");
      }

      if (newPassword.length < 6) {
        throw new Error("A nova senha deve ter pelo menos 6 caracteres.");
      }

      // Validação de segurança: Buscar a senha atual no banco para confirmar
      // Isso evita que alguém mude a senha se o computador estiver desbloqueado mas não souber a senha atual
      const { data: userData, error: fetchError } = await SupabaseClient
        .from("DBclients")
        .select("encrypted_key")
        .eq("id", userSession.id)
        .single();

      if (fetchError || !userData) {
        throw new Error("Erro ao verificar usuário. Tente fazer login novamente.");
      }

      // Verifica se a senha atual digitada bate com a do banco
      if (userData.encrypted_key !== currentPassword) {
        throw new Error("A senha atual informada está incorreta.");
      }

      // 2. Atualizar a senha no Supabase
      const { error: updateError } = await SupabaseClient
        .from("DBclients")
        .update({ encrypted_key: newPassword })
        .eq("id", userSession.id);

      if (updateError) {
        throw updateError;
      }

      // Sucesso
      setMessage({ type: "success", text: "Senha alterada com sucesso!" });
      
      // Limpar campos
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Opcional: Atualizar a sessão local com a nova senha (se você armazena a key lá)
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

      {/* Container principal para centralizar (usando classes genéricas ou o seu module) */}
      <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem", backgroundColor: "#f9fafb" }}>
        
        {/* Card */}
        <div className={styles.card} style={{ width: "100%", maxWidth: "500px", padding: "2rem", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
            <Lock size={28} className="text-blue-600" />
            <h1 className={styles.title} style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>Alterar Senha</h1>
          </div>

          {/* Mensagens de Erro/Sucesso */}
          {message.text && (
            <div 
              style={{ 
                padding: "12px", 
                borderRadius: "8px", 
                marginBottom: "1rem", 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                fontSize: "0.9rem",
                backgroundColor: message.type === "error" ? "#fee2e2" : "#dcfce7",
                color: message.type === "error" ? "#991b1b" : "#166534"
              }}
            >
              {message.type === "error" ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
              {message.text}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSaveChanges}>
            
            {/* Current Password */}
            <div className={styles.formGroup} style={{ marginBottom: "1rem" }}>
              <label htmlFor="currentPassword" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>Senha Atual</label>
              <input
                type="password"
                id="currentPassword"
                className={styles.input}
                placeholder="Digite sua senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            {/* New Password */}
            <div className={styles.formGroup} style={{ marginBottom: "1rem" }}>
               <label htmlFor="newPassword" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>Nova Senha</label>
              <input
                type="password"
                id="newPassword"
                className={styles.input}
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm New Password */}
            <div className={styles.formGroup} style={{ marginBottom: "2rem" }}>
               <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: 500 }}>Confirmar Nova Senha</label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.input}
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isLoading}
              style={{ 
                width: "100%", 
                padding: "12px", 
                backgroundColor: "#2563eb", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Salvar Alterações
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}