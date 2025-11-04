import React, { useState } from "react";
import "./CheckoutForm.css";
import { mockProducts } from "../../mocks/products";

export default function CheckoutForm() {
  const cart = mockProducts;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.productPrice * item.productQuantity,
    0
  );
  const frete = 0;
  const total = subtotal + frete;

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    cidade: "",
    bairro: "",
    uf: "",
    numero: "",
    cupom: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Regras de validação para cada campo
  const validators = {
    nome: (val) => val.trim() !== "",
    cpf: (val) => /^\d{11}$/.test(val.replace(/\D/g, "")), // apenas números, 11 dígitos
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    telefone: (val) => /^\d{10,11}$/.test(val.replace(/\D/g, "")), // 10 ou 11 dígitos
    cep: (val) => /^\d{8}$/.test(val.replace(/\D/g, "")), // 8 dígitos
    endereco: (val) => val.trim() !== "",
    cidade: (val) => val.trim() !== "",
    bairro: (val) => val.trim() !== "",
    uf: (val) => /^[A-Za-z]{2}$/.test(val), // duas letras
    numero: (val) => val.trim() !== "",
  };


  const validateFields = (fields) => {
    for (let field of fields) {
      if (!validators[field](formData[field])) {
        alert(`Por favor, insira um valor válido em: ${field}`);
        return false;
      }
    }
    return true;
  };

  const handleContinue = (fields) => {
    if (validateFields(fields)) {
      alert("Campos validados com sucesso!");
    }
  };

  const handleFinalize = () => {
    const allFields = Object.keys(validators);
    if (validateFields(allFields)) {
      alert("Compra finalizada com sucesso!");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-grid">
        <div className="checkout-card">
          <h3><span className="card-number">1</span> Dados cadastrais</h3>
          <input name="nome" value={formData.nome} onChange={handleChange} type="text" placeholder="Nome completo" required />
          <input name="cpf" value={formData.cpf} onChange={handleChange} type="text" placeholder="CPF(xxxxxxxxxxx)" required />
          <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="E-mail" required />
          <input name="telefone" value={formData.telefone} onChange={handleChange} type="tel" placeholder="Telefone/Celular" required />
          <button className="card-button" onClick={() => handleContinue(["nome","cpf","email","telefone"])}>Continuar</button>
        </div>

        <div className="checkout-card">
          <h3><span className="card-number">2</span> Endereço de entrega</h3>
          <input name="cep" value={formData.cep} onChange={handleChange} type="text" placeholder="CEP(xxxxxxxx)" required />
          <input name="endereco" value={formData.endereco} onChange={handleChange} type="text" placeholder="Endereço" required />
          <input name="cidade" value={formData.cidade} onChange={handleChange} type="text" placeholder="Cidade" required />
          <input name="bairro" value={formData.bairro} onChange={handleChange} type="text" placeholder="Bairro" required />
          <input name="uf" value={formData.uf} onChange={handleChange} type="text" placeholder="UF(xx)" required />
          <input name="numero" value={formData.numero} onChange={handleChange} type="text" placeholder="Número/Complemento" required />
          <button className="card-button" onClick={() => handleContinue(["cep","endereco","cidade","bairro","uf","numero"])}>Continuar</button>
        </div>

        <div className="checkout-card">
          <h3><span className="card-number">3</span> Cupom de desconto</h3>
          <input name="cupom" value={formData.cupom} onChange={handleChange} type="text" placeholder="Cupom (Opcional)" />
          <button className="card-button" onClick={() => alert("Cupom aplicado!")}>Continuar</button>
        </div>

        <div className="checkout-card">
          <h3><span className="card-number">4</span> Pagamento</h3>
          <button className="card-button finalize" onClick={handleFinalize}>Prosseguir Compra</button>
        </div>
      </div>

      <div className="checkout-summary">
        <h3>Carrinho:</h3>
        <div className="summary-list">
          {cart.map((item) => (
            <div className="summary-product" key={item.id}>
              <img src={item.productImage} alt={item.productName} />
              <div>
                <p>{item.productName} (x{item.productQuantity})</p>
                <span>R$ {(item.productPrice * item.productQuantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-total">
          <h4>Resumo</h4>
          <div className="summary-line"><span>Subtotal</span><span className="price">R$ {subtotal.toFixed(2)}</span></div>
          <div className="summary-line"><span>Frete</span><span className="green">Grátis</span></div>
          <div className="summary-line total"><span>Total</span><span className="price">R$ {total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
