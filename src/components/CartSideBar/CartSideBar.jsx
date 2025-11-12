import React, { useState, useEffect } from "react";
import styles from "./CartSideBar.module.css";
import AddCart from "../Alerts/AddCart";
import RemoveCart from "../Alerts/RemoveCart";

const STORAGE_KEY = "cart_v1";

export default function CartSidebar({ isOpen, onClose }) {
  // cartItems: array de itens no carrinho
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Erro ao ler cart do localStorage:", e);
      return [];
    }
  });

  // showAdd / showRemove controlam os componentes de notificação
  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);

  // internalOpen permite que o sidebar seja aberto por evento global
  const [internalOpen, setInternalOpen] = useState(false);

  // Atualiza o localStorage sempre que o carrinho muda
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      try {
        window.dispatchEvent(
          new CustomEvent("cartUpdated", { detail: cartItems })
        );
      } catch (e) {}
    } catch (e) {
      console.error("Falha ao salvar cart", e);
    }
  }, [cartItems]);

  // Sincroniza multi-aba e listeners customizados
  useEffect(() => {
    function onStorage(e) {
      if (e.key === STORAGE_KEY) {
        try {
          const newCart = e.newValue ? JSON.parse(e.newValue) : [];
          setCartItems(newCart);
        } catch (err) {
          console.error("Erro ao parsear storage event:", err);
        }
      }
    }

    function onCartUpdated(e) {
      if (e && e.detail) {
        setCartItems(e.detail);
      } else {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          setCartItems(raw ? JSON.parse(raw) : []);
        } catch (err) {
          console.error("Erro ao ler cart no evento cartUpdated:", err);
        }
      }
    }

    // Listener para mostrar a notificação de item adicionado (disparado em ProductPage)
    function onShowAddNotification() {
      // Força o "reset" do componente de notificação
      setShowAdd(false);
      setTimeout(() => {
        setShowAdd(true);
      }, 10);
    }

    // Listener para abrir o sidebar (disparado em ProductPage)
    function onOpenCartSidebar() {
      setInternalOpen(true);
      // também garante que a notificação de adição apareça (caso venha ao mesmo tempo)
      setShowAdd(false);
      setTimeout(() => {
        setShowAdd(true);
      }, 10);
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("cartUpdated", onCartUpdated);
    window.addEventListener("showAddNotification", onShowAddNotification);
    window.addEventListener("openCartSidebar", onOpenCartSidebar);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cartUpdated", onCartUpdated);
      window.removeEventListener("showAddNotification", onShowAddNotification);
      window.removeEventListener("openCartSidebar", onOpenCartSidebar);
    };
  }, []);

  // =================================================================
  // AQUI ESTÁ A CORREÇÃO (mantive seu código de manipulação de quantidade)
  // =================================================================

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, productQuantity: item.productQuantity + 1 }
          : item
      )
    );

    // Força o "reset" do componente de notificação
    setShowAdd(false);
    setTimeout(() => {
      setShowAdd(true);
    }, 10); // Um delay mínimo para o React processar o "false"
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.productQuantity > 1
          ? { ...item, productQuantity: item.productQuantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    // Força o "reset" do componente de notificação de remoção
    setShowRemove(false);
    setTimeout(() => {
      setShowRemove(true);
    }, 10); // Um delay mínimo para o React processar o "false"
  };

  // =================================================================
  // FIM DA CORREÇÃO
  // =================================================================

  const total = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.productQuantity,
    0
  );

  // Determina se o sidebar deve estar visível (prop OR interno)
  const open = Boolean(isOpen) || internalOpen;

  // Função de fechamento que respeita pai e estado interno
  const handleClose = () => {
    setInternalOpen(false);
    if (typeof onClose === "function") {
      try {
        onClose();
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <>
      {/* passamos `show={showAdd}` para AddCart porque o useEffect dentro de AddCart verifica `show`. */}
      {showAdd && <AddCart show={showAdd} duration={3000} />}
      {showRemove && <RemoveCart onDone={() => setShowRemove(false)} />}

      {/* Overlay */}
      <div
        className={`${styles.cartOverlay} ${open ? styles.show : ""}`}
        onClick={handleClose}
      ></div>

      {/* Sidebar */}
      <div className={`${styles.cartSidebar} ${open ? styles.open : ""}`}>
        <div className={styles.cartHeader}>
          <p>Meu Carrinho</p>
          <button className={styles.closeBtn} onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className={styles.cartItemsContainer}>
          {cartItems.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.cartItemContent}>
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className={styles.cartItemImg}
                    />
                    <div className={styles.cartItemInfo}>
                      <strong>{item.productName}</strong>
                      <p>R$ {item.productPrice}</p>

                      <div className={styles.cartControls}>
                        <div className={styles.cartQuantity}>
                          <button onClick={() => decreaseQuantity(item.id)}>
                            -
                          </button>
                          <span>{item.productQuantity}</span>
                          <button onClick={() => increaseQuantity(item.id)}>
                            +
                          </button>
                        </div>

                        <button
                          className={styles.removeBtn}
                          onClick={() => removeItem(item.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.cartFooter}>
          <strong>Total: R$ {total.toFixed(2)}</strong>
          <button
            className={styles.checkoutBtn}
            onClick={() => {
              if (cartItems.length > 0) {
                window.location.href = "/carrinho";
              } else {
                alert(
                  "Seu carrinho está vazio. Adicione produtos antes de prosseguir."
                );
              }
            }}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
}
