import { User, LogOut } from 'lucide-react';
import styles from "./UserProfile.module.css";

export default function LogoutTab({ userData, onLogoutClick }) {

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Conta</h1>

      <div className={styles.logoutSection}>
        <div className={styles.userProfile}>
          <div className={styles.profileIconLarge}>
            <User size={64} />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{userData.name}</div>
            <div className={styles.userEmail}>{userData.email}</div>
          </div>
        </div>

        <button
          className={styles.logoutButton}
          onClick={onLogoutClick}
        >
          <LogOut className={styles.icon} />
          Sair
        </button>
      </div>
    </div>
  );
}