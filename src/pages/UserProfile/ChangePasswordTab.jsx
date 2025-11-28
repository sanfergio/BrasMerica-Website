import styles from "./UserProfile.module.css";

export default function ChangePasswordTab() {
  const handleSaveChanges = () => {
    // TODO: Implement password change functionality
    alert("Funcionalidade de alteração de senha em desenvolvimento");
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Alterar senha</h1>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Current Password */}
        <div className={styles.formGroup}>
          <input
            type="password"
            id="currentPassword"
            className={styles.input}
            placeholder="Senha atual"
          />
        </div>

        {/* New Password */}
        <div className={styles.formGroup}>
          <input
            type="password"
            id="newPassword"
            className={styles.input}
            placeholder="Nova senha"
          />
        </div>

        {/* Confirm New Password */}
        <div className={styles.formGroup}>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            placeholder="Confirme sua nova senha"
          />
        </div>

        {/* Save Button */}
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