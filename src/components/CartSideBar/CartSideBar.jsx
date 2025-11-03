// CartSideBar.jsx
import React, { useState, useEffect } from "react";
import { mockProducts } from "../../mocks/products";
import "./CartSideBar.css"

const STORAGE_KEY = "cart_v1";

export default function CartSidebar({ isOpen, onClose }) {
  // Carrega do localStorage, se existir, senão usa mockProducts
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : mockProducts;
    } catch (e) {
      console.error("Erro ao ler cart do localStorage:", e);
      return mockProducts;
    }
  });

  // Sempre que cartItems mudar, salva no localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Erro ao salvar cart no localStorage:", e);
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
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
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
        className={`cart-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Meu Carrinho</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-content">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <strong>{item.productName}</strong>
                    <p>R$ {item.productPrice}</p>

                    <div className="cart-controls">
                      <div className="cart-quantity">
                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>
                        <span>{item.productQuantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>

                      <button
                        className="remove-btn"
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

        <div className="cart-footer">
          <strong>Total: R$ {total.toFixed(2)}</strong>
          <a href="/carrinho">
          <button className="checkout-btn">Finalizar Compra</button>
          </a>
        </div>
      </div>
    </>
  );
}
