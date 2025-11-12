import React, { useState, useEffect } from "react";
import styles from "./CartProducts.module.css";
import { mockProducts } from "../../mocks/products";
import Footer from "../../components/Footer/Footer";
import ShortHeader from "../../components/ShortHeader/ShortHeader";
import WhatsAppButton from "../../components/WhatsappButton";

const STORAGE_KEY = "cart_v1";

export default function CartProduct() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : mockProducts;
    } catch (e) {
      console.error("Erro ao ler cart do localStorage:", e);
      return mockProducts;
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio. Adicione produtos antes de prosseguir.");
      window.location.href = "./";
    }
  })

  // Salva no localStorage sempre que o cart mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      // emitir também cartUpdated para demais listeners na mesma aba
      try {
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
      } catch (e) { }
    } catch (e) {
      console.error("Erro ao salvar cart no localStorage:", e);
    }
  }, [cart]);

  // Sincroniza mudanças feitas em outra aba/componente (ex: ProductCard ou CartSidebar)
  useEffect(() => {
    function onStorage(e) {
      if (e.key === STORAGE_KEY) {
        try {
          const newCart = e.newValue ? JSON.parse(e.newValue) : [];
          setCart(newCart);
        } catch (err) {
          console.error("Erro ao parsear storage event:", err);
        }
      }
    }

    function onCartUpdated(e) {
      if (e && e.detail) {
        setCart(e.detail);
      } else {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          setCart(raw ? JSON.parse(raw) : []);
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
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, productQuantity: item.productQuantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.productQuantity > 1
          ? { ...item, productQuantity: item.productQuantity - 1 }
          : item
      )
    );
  };

  const removeProduct = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.productPrice * item.productQuantity,
    0
  );

  const frete = 0;
  const total = subtotal + frete;

  const confirmRemove = () => {
    if (selectedItem) {
      removeProduct(selectedItem.id);
      setSelectedItem(null);
      setShowModal(false);
    }
  };

  const cancelRemove = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <>
      <ShortHeader />
      <div className={styles.cartContainer}>
        <div className={styles.cartProducts}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.productImage}
                alt={item.productName}
                className={styles.cartItemImage}
              />

              <div className={styles.cartItemDetails}>
                <div className={styles.cartItemInfo}>
                  <h3>{item.productName}</h3>
                  <p>R$ {item.productPrice.toFixed(2)}</p>
                </div>

                <div className={styles.quantityControl}>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <input type="text" value={item.productQuantity} readOnly />
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowModal(true);
                  }}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <h2>Resumo</h2>
          <div className={styles.summaryItem}>
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Frete</span>
            <span>Grátis</span>
          </div>
          <div className={`${styles.summaryItem} ${styles.total}`}>
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <a href="/checkout"><button className={styles.checkoutButton}>Prosseguir compra</button></a>
          <a href="../">
            <button className={styles.continueButton}>Continuar comprando</button>
          </a>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Remover produto</h3>
            <p>
              Tem certeza que deseja remover{" "}
              <strong>{selectedItem?.productName}</strong> do carrinho?
            </p>
            <div className={styles.modalButtons}>
              <button className={styles.confirmButton} onClick={confirmRemove}>
                Sim, remover
              </button>
              <button className={styles.cancelButton} onClick={cancelRemove}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}