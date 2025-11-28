import { useState } from "react";
import styles from "./UserProfile.module.css";

export default function ChangePasswordTab() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = () => {
    alert("Esta funcionalidade está em desenvolvimento!");
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Alterar senha</h1>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* SENHA ATUAL */}
        <div className={styles.formGroup}>
          <div className={styles.passwordInputContainer}>
            <input
              type={showPasswords.current ? "text" : "password"}
              id="currentPassword"
              className={styles.input}
              placeholder="Senha atual"
              value={formData.currentPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  current: !prev.current
                }))
              }
            >
              {showPasswords.current ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* NOVA SENHA */}
        <div className={styles.formGroup}>
          <div className={styles.passwordInputContainer}>
            <input
              type={showPasswords.new ? "text" : "password"}
              id="newPassword"
              className={styles.input}
              placeholder="Nova senha"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() =>
                setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
              }
            >
              {showPasswords.new ? "🙈" : "👁️"}
            </button>
          </div>

          <div className={styles.passwordHint}>
            A senha deve ter 8-15 caracteres, incluindo 1 número e 1 símbolo
          </div>
        </div>

        {/* CONFIRMAR SENHA */}
        <div className={styles.formGroup}>
          <div className={styles.passwordInputContainer}>
            <input
              type={showPasswords.confirm ? "text" : "password"}
              id="confirmPassword"
              className={styles.input}
              placeholder="Confirme sua nova senha"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />

            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  confirm: !prev.confirm
                }))
              }
            >
              {showPasswords.confirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSaveChanges}
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
}