import React, { useState, useEffect } from "react";
import "./CartProducts.css";
import { mockProducts } from "../../mocks/products";

export default function CartProduct() {
  const [cart, setCart] = useState(mockProducts);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (cart.length === 0) {
      window.location.href =
        "https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal";
    }
  }, [cart]);

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
      <div className="cart-container">
        <div className="cart-products">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.productImage}
                alt={item.productName}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <div className="cart-item-info">
                  <h3>{item.productName}</h3>
                  <p>R$ {item.productPrice.toFixed(2)}</p>
                </div>

                <div className="quantity-control">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <input type="text" value={item.productQuantity} readOnly />
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <button
                  className="remove-button"
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

        <div className="cart-summary">
          <h2>Resumo</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Frete</span>
            <span>Grátis</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button className="checkout-button">Prosseguir compra</button>
          <button className="continue-button">Continuar comprando</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Remover produto</h3>
            <p>
              Tem certeza que deseja remover{" "}
              <strong>{selectedItem?.productName}</strong> do carrinho?
            </p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={confirmRemove}>
                Sim, remover
              </button>
              <button className="cancel-button" onClick={cancelRemove}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
