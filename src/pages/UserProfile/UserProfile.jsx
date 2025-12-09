"use client";

import { useState, useEffect } from "react";
import { User, Package, Lock, RefreshCw, LogOut } from 'lucide-react';
import styles from "./UserProfile.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";
import SupabaseClient from "../../components/KEYS/App.jsx";
import PersonalDataTab from "./PersonalDataTab";
import MyOrdersTab from "./MyOrdersTab";
import ChangePasswordTab from "./ChangePasswordTab";
import LogoutTab from "./LogoutTab";
import MenuSidebar from "./MenuSidebar";

const supabase = SupabaseClient;

export default function UserProfile() {

  function verifyLoginUser() {

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Você precisa estar logado para acessar o perfil do usuário.");
      window.location.href = "../../";
    }

  }

  // utils/auth.js ou em um hook personalizado
  function logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "../../";
  }

  const [activeTab, setActiveTab] = useState("personal-data");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone_number: "",
    cpf: "",
    birthday: "",
    cep: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    complement_number: "",
  });

  const [useMock, setUseMock] = useState(true);
  const [realOrders, setRealOrders] = useState(null);

  // Mapeamento das hashs para as abas
  const tabHashMapping = {
    "personal-data": "dados-pessoais",
    // "my-orders": "meus-pedidos",
    "change-password": "alterar-senha",
    "logout": "sair"
  };

  // Mapeamento reverso (hash para tab id)
  const hashTabMapping = {
    "dados-pessoais": "personal-data",
    // "meus-pedidos": "my-orders",
    "alterar-senha": "change-password",
    "sair": "logout"
  };

  // Sincroniza a URL com a aba ativa
  const updateUrlHash = (tabId) => {
    const hash = tabHashMapping[tabId] || "dados-pessoais";
    if (window.location.hash !== `#${hash}`) {
      window.history.replaceState(null, null, `#${hash}`);
    }
  };

  // Atualiza a aba baseada na URL ao carregar a página
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hashTabMapping[hash]) {
      setActiveTab(hashTabMapping[hash]);
    } else {
      // Define a URL inicial se não houver hash
      updateUrlHash(activeTab);
    }
  }, []);

  // Atualiza a URL sempre que a aba muda
  useEffect(() => {
    updateUrlHash(activeTab);
  }, [activeTab]);

  // Função para mudar de aba que também atualiza a URL
  const handleSetActiveTab = (tabId) => {
    setActiveTab(tabId);
    updateUrlHash(tabId);
  };

  useEffect(() => {
    try {
      const storedUseMock = localStorage.getItem("useMockOrders");
      if (storedUseMock !== null) {
        setUseMock(storedUseMock === "true");
      }

      const storedOrders = localStorage.getItem("userOrders");
      if (storedOrders) {
        try {
          const parsed = JSON.parse(storedOrders);
          setRealOrders(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          console.warn("Erro ao parsear userOrders do localStorage:", e);
          setRealOrders([]);
        }
      } else {
        setRealOrders([]);
      }
    } catch (e) {
      setRealOrders([]);
    }
  }, []);

  // Carrega dados do usuário do Supabase
  useEffect(() => {
    async function loadUser() {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      const { data, error } = await supabase
        .from("DBclients")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        console.error("Erro ao carregar dados:", error);
        return;
      }

      setUserData({
        name: data.name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        cpf: data.cpf || "",
        birthday: data.birthday || "",
        cep: data.cep || "",
        address: data.address || "",
        neighborhood: data.neighborhood || "",
        city: data.city || "",
        state: data.state || "",
        complement_number: data.complement_number || "",
      });

      setLoading(false);
    }

    loadUser();
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    console.log("User logged out");
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const menuItems = [
    { id: "personal-data", label: "Dados pessoais", icon: User },
    // { id: "my-orders", label: "Meus Pedidos", icon: Package },
    // { id: "change-password", label: "Alterar Senha", icon: Lock },
    // { id: "refund", label: "Reembolso", icon: RefreshCw },
    { id: "logout", label: "Sair", icon: LogOut },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <p style={{ padding: 40, textAlign: "center" }}>Carregando...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <WhatsAppButton />

      <div className={styles.container}>
        <MenuSidebar
          menuItems={menuItems}
          activeTab={activeTab}
          setActiveTab={handleSetActiveTab}
        />

        <div className={styles.content}>
          {activeTab === "personal-data" && (
            <PersonalDataTab
              userData={userData}
              setUserData={setUserData}
              supabase={supabase}
            />
          )}

          {activeTab === "my-orders" && (
            <MyOrdersTab
              useMock={useMock}
              realOrders={realOrders}
            />
          )}

          {activeTab === "change-password" && (
            <ChangePasswordTab />
          )}

          {activeTab === "logout" && (
            <LogoutTab
              userData={userData}
              onLogoutClick={handleLogoutClick}
            />
          )}

          {activeTab !== "personal-data" && activeTab !== "my-orders" && activeTab !== "change-password" && activeTab !== "logout" && (
            <div className={styles.card}>
              <h1 className={styles.title}>
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h1>
              <p className={styles.shortMessage}>
                Esta sessão está em manutenção.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Você realmente deseja sair?</h2>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalButtonYes}
                onClick={logout}
              >
                Sim
              </button>
              <button
                className={styles.modalButtonNo}
                onClick={handleLogoutCancel}
              >
                Não
              </button >
            </div>
          </div>
        </div>
      )}
    </>
  );
}