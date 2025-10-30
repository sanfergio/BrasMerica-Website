import React, { useState } from "react";
import { mockProducts } from "../../mocks/products";
import "./CartSidebar.css";

export default function CartSidebar({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState(mockProducts);

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
          <button className="checkout-btn">Finalizar Compra</button>
        </div>
      </div>
    </>
  );
}
