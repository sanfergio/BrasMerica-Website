import React, { useState, useEffect } from "react";
import styles from "./CartSideBar.module.css";

const STORAGE_KEY = "cart_v1";

export default function CartSidebar({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Erro ao ler cart do localStorage:", e);
      return [];
    }
  });

  // Sempre que cartItems mudar, salva no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      try {
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cartItems }));
      } catch (e) { }
    } catch (e) {
      console.error("Falha ao salvar cart", e);
    }
  }, [cartItems]);

  // Sincroniza multi-aba: quando outro tab altera o storage, atualiza UI
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

    window.addEventListener("storage", onStorage);
    window.addEventListener("cartUpdated", onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cartUpdated", onCartUpdated);
    };
  }, []);

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, productQuantity: item.productQuantity + 1 }
          : item
      )
    );
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
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.productQuantity,
    0
  );

  return (
    <>
      <div
        className={`${styles.cartOverlay} ${isOpen ? styles.show : ""}`}
        onClick={onClose}
      ></div>

      <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.cartHeader}>
          <p>Meu Carrinho</p>
          <button className={styles.closeBtn} onClick={onClose}>
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
                alert("Seu carrinho está vazio. Adicione produtos antes de prosseguir.");
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