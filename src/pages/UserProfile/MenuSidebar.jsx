import { User, Package, Lock, RefreshCw, LogOut } from 'lucide-react';
import styles from "./UserProfile.module.css";

export default function MenuSidebar({ menuItems, activeTab, setActiveTab }) {
  return (
    <div className={styles.sidebar}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`${styles.menuItem} ${activeTab === item.id ? styles.active : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon className={styles.icon} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}