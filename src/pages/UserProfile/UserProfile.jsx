"use client";

import { useState, useEffect } from "react";
import { User, Package, Lock, RefreshCw, LogOut, Truck, CreditCard } from 'lucide-react';
import styles from "./UserProfile.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("personal-data");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // <-- Toggle aqui: true = exibe mockOrders, false = exibe pedidos reais do cliente (carregados do localStorage)
  // Por padrão defini como true para não quebrar ambientes que ainda não possuem pedidos reais.
  // Se quiser forçar pedidos reais, coloque false ou armazene "useMockOrders"="false" no localStorage.
  const [useMock, setUseMock] = useState(true);

  // pedidos reais do cliente (carregados do localStorage, caso exista)
  const [realOrders, setRealOrders] = useState(null);

  useEffect(() => {
    try {
      // se existir uma preferência salva no localStorage, respeitamos ela
      const storedUseMock = localStorage.getItem("useMockOrders");
      if (storedUseMock !== null) {
        setUseMock(storedUseMock === "true");
      }

      // tenta carregar pedidos reais salvos no localStorage (se houver)
      const storedOrders = localStorage.getItem("userOrders");
      if (storedOrders) {
        try {
          const parsed = JSON.parse(storedOrders);
          // garanta que parsed é um array
          setRealOrders(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          console.warn("Erro ao parsear userOrders do localStorage:", e);
          setRealOrders([]);
        }
      } else {
        // sem dados => array vazio (significa "ainda não fez pedidos")
        setRealOrders([]);
      }
    } catch (e) {
      // ambiente sem localStorage ou erro — fallback para array vazio
      setRealOrders([]);
    }
  }, []);

  const userData = {
    name: "João Silva",
    email: "joao.silva@email.com"
  };

  const menuItems = [
    { id: "personal-data", label: "Dados pessoais", icon: User },
    { id: "my-orders", label: "Meus Pedidos", icon: Package },
    { id: "change-password", label: "Alterar Senha", icon: Lock },
    { id: "refund", label: "Reembolso", icon: RefreshCw },
    { id: "logout", label: "Sair", icon: LogOut },
  ];

  const mockOrders = [
    {
      id: "ORD-2024-001",
      transactionId: "TXN-ABC123456",
      status: "preparing",
      statusLabel: "Preparando",
      products: [
        { name: "Óleo Verde", price: 1999.99, image: "https://s3.us-east-2.amazonaws.com/main.s3.atacadaoec.astrus/tb_estrutura_produtos/1096/20w50-moto-4t_025d8e45ae91880bd9b27e9ffbfaaaa6.webp" },
        { name: "Óleo Preto", price: 49.99, image: "https://cdn.awsli.com.br/600x450/877/877231/produto/43792412/20w50-5000--wwsx9lx0er.png" }
      ],
      total: 2049.98
    },
    {
      id: "ORD-2024-002",
      transactionId: "TXN-DEF789012",
      status: "on-the-way",
      statusLabel: "A caminho",
      products: [
        { name: "Óleo Cinza", price: 299.99, image: "https://io.convertiez.com.br/m/sbsmotos/shop/products/images/5813578/medium/oleo-mobil-4t-10w30-mx-para-moto-honda_586.png" }
      ],
      total: 299.99
    },
    {
      id: "ORD-2024-003",
      transactionId: "TXN-GHI345678",
      status: "delivered",
      statusLabel: "Entregado",
      products: [
        { name: "Óleo Amarelo", price: 899.99, image: "https://images.tcdn.com.br/img/img_prod/1039962/oleo_para_moto_lubrax_10w30_4t_api_sl_1l_1819_1_f9a4cf28e6c2202c4b58043c6fb01e12.png" },
        { name: "Óleo Vermelho", price: 79.99, image: "https://images.tcdn.com.br/img/img_prod/589388/oleo_mineral_4t_10w30_moto_injetada_original_ipiranga_27129_1_9c7caadcea7e7772e9ceee38b8706376.png" }
      ],
      total: 979.98
    },
    {
      id: "ORD-2024-004",
      transactionId: "TXN-JKL901234",
      status: "canceled",
      statusLabel: "Cancelado",
      products: [
        { name: "Óleo Branco", price: 2499.99, image: "https://images.tcdn.com.br/img/img_prod/681364/oleo_honda_10w30_semi_sintetico_4t_1l_1233_1_b569571204f7551c470c2b8e52c86d17.jpg" }
      ],
      total: 2499.99
    },
    {
      id: "ORD-2024-005",
      transactionId: "TXN-MNO567890",
      status: "refunded",
      statusLabel: "Reembolsado",
      products: [
        { name: "Óleo Azul", price: 149.99, image: "https://m.magazineluiza.com.br/a-static/420x420/oleo-moto-motor-4t-20w50-titan-fan-cg-125-150-biz-100-biz125-gulf/vitoriarepresentante/1511ee/9128cca3a308ed38c33d957d27934278.jpeg" }
      ],
      total: 149.99
    }
  ];

  const handleSaveChanges = () => {
    // TODO: Implement save functionality
    console.log("Save changes");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // TODO: Implement logout functionality
    console.log("User logged out");
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  // Decide qual lista exibir: mock ou real
  const ordersToDisplay = useMock ? mockOrders : (realOrders || []);

  return (
    <>
      <Header />
      <WhatsAppButton />

      <div className={styles.container}>
        <div className={styles.sidebar}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`${styles.menuItem} ${
                  activeTab === item.id ? styles.active : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className={styles.icon} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className={styles.content}>
          {activeTab === "personal-data" && (
            <div className={styles.card}>
              <h1 className={styles.title}>Dados pessoais</h1>

              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="fullName"
                    className={styles.input}
                    placeholder="Nome completo"
                  />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    id="email"
                    className={styles.input}
                    placeholder="Email"
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    id="phone"
                    className={styles.input}
                    placeholder="Telefone"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="cpf"
                      className={styles.input}
                      placeholder="CPF"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="date"
                      id="birthDate"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="zipCode"
                      className={styles.input}
                      placeholder="CEP"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="houseNumber"
                      className={styles.input}
                      placeholder="Número"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="address"
                      className={styles.input}
                      placeholder="Rua"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="neighborhood"
                      className={styles.input}
                      placeholder="Bairro"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="city"
                      className={styles.input}
                      placeholder="Cidade"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      id="state"
                      className={styles.input}
                      placeholder="UF"
                      maxLength={2}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="additionalInfo"
                    className={styles.input}
                    placeholder="Complemento"
                  />
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
          )}

          {activeTab === "my-orders" && (
            <div className={styles.card}>
              <h1 className={styles.title}>Meus pedidos</h1>
              <div className={styles.ordersContainer}>
                {Array.isArray(ordersToDisplay) && ordersToDisplay.length > 0 ? (
                  ordersToDisplay.map((order) => (
                    <div key={order.id || order.transactionId} className={`${styles.orderCard} ${styles[order.status] || ""}`}>
                      <div className={styles.orderHeader}>
                        <div className={styles.orderInfo}>
                          <div className={styles.infoRow}>
                            <CreditCard className={styles.infoIcon} size={16} />
                            <span className={styles.transactionId}>{order.transactionId || "—"}</span>
                          </div>
                          <div className={styles.infoRow}>
                            <Truck className={styles.infoIcon} size={16} />
                            <span className={styles.trackingCode}>{order.id || "—"}</span>
                          </div>
                        </div>
                        <span className={`${styles.orderStatus} ${styles[`status-${order.status}`] || ""}`}>
                          {order.statusLabel || order.status || "—"}
                        </span>
                      </div>

                      <div className={styles.orderProducts}>
                        {(order.products || []).map((product, index) => (
                          <div key={index} className={styles.productItem}>
                            <img 
                              src={product.image || "/placeholder.svg"} 
                              alt={product.name || "Produto"}
                              className={styles.productImage}
                            />
                            <span className={styles.productName}>{product.name || "Produto"}</span>
                            <span className={styles.productPrice}>
                              R$ {typeof product.price === "number" ? product.price.toFixed(2) : (product.price || "0.00")}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.orderTotal}>
                        <span className={styles.totalLabel}>Total:</span>
                        <span className={styles.totalValue}>R$ {typeof order.total === "number" ? order.total.toFixed(2) : (order.total || "0.00")}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.shortMessage}>Você ainda não fez nenhum pedido.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "change-password" && (
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
          )}

          {activeTab === "logout" && (
            <div className={styles.card}>
              <h1 className={styles.title}>Sair</h1>

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
                  onClick={handleLogoutClick}
                >
                  <LogOut className={styles.icon} />
                  Sair
                </button>
              </div>
            </div>
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
                onClick={handleLogoutConfirm}
              >
                Sim
              </button>
              <button 
                className={styles.modalButtonNo}
                onClick={handleLogoutCancel}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
