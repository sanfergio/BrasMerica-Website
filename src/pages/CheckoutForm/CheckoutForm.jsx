import React, { useState, useEffect } from "react";
import styles from "./CheckoutForm.module.css";
import ShortHeader from "../../components/ShortHeader/ShortHeader.jsx";
import ShortFooter from "../../components/ShortFooter/ShortFooter";

const STORAGE_KEY = "cart_v1";

export default function CheckoutForm() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Erro ao ler carrinho do localStorage:", e);
      return [];
    }
  });

  // Redireciona se o carrinho estiver vazio
  useEffect(() => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio. Adicione produtos antes de continuar.");
      window.location.href = "/carrinho";
    }
  }, [cart]);

  // Sincroniza com atualizações em outras abas ou componentes
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

  // Totais
  const subtotal = cart.reduce(
    (acc, item) => acc + item.productPrice * item.productQuantity,
    0
  );
  const frete = 0;
  const total = subtotal + frete;

  // Dados do formulário
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

  // Validações
  const validators = {
    nome: (val) => val.trim() !== "",
    cpf: (val) => /^\d{11}$/.test(val.replace(/\D/g, "")),
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    telefone: (val) => /^\d{10,11}$/.test(val.replace(/\D/g, "")),
    cep: (val) => /^\d{8}$/.test(val.replace(/\D/g, "")),
    endereco: (val) => val.trim() !== "",
    cidade: (val) => val.trim() !== "",
    bairro: (val) => val.trim() !== "",
    uf: (val) => /^[A-Za-z]{2}$/.test(val),
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
    <>
      <ShortHeader />
      <div className={styles.checkoutPage}>
        <div className={styles.checkoutGrid}>
          {/* --- Etapa 1 --- */}
          <div className={styles.checkoutCard}>
            <h3><span className={styles.cardNumber}>1</span> Dados cadastrais</h3>
            <input name="nome" value={formData.nome} onChange={handleChange} type="text" placeholder="Nome completo" required />
            <input name="cpf" value={formData.cpf} onChange={handleChange} type="text" placeholder="CPF (xxxxxxxxxxx)" required />
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="E-mail" required />
            <input name="telefone" value={formData.telefone} onChange={handleChange} type="tel" placeholder="Telefone/Celular" required />
            <button className={styles.cardButton} onClick={() => handleContinue(["nome", "cpf", "email", "telefone"])}>Continuar</button>
          </div>

          {/* --- Etapa 2 --- */}
          <div className={styles.checkoutCard}>
            <h3><span className={styles.cardNumber}>2</span> Endereço de entrega</h3>
            <input name="cep" value={formData.cep} onChange={handleChange} type="text" placeholder="CEP (xxxxxxxx)" required />
            <input name="endereco" value={formData.endereco} onChange={handleChange} type="text" placeholder="Endereço" required />
            <input name="cidade" value={formData.cidade} onChange={handleChange} type="text" placeholder="Cidade" required />
            <input name="bairro" value={formData.bairro} onChange={handleChange} type="text" placeholder="Bairro" required />
            <input name="uf" value={formData.uf} onChange={handleChange} type="text" placeholder="UF (xx)" required />
            <input name="numero" value={formData.numero} onChange={handleChange} type="text" placeholder="Número/Complemento" required />
            <button className={styles.cardButton} onClick={() => handleContinue(["cep", "endereco", "cidade", "bairro", "uf", "numero"])}>Continuar</button>
          </div>

          {/* --- Etapa 3 --- */}
          <div className={styles.checkoutCard}>
            <h3><span className={styles.cardNumber}>3</span> Cupom de desconto</h3>
            <input name="cupom" value={formData.cupom} onChange={handleChange} type="text" placeholder="Cupom (Opcional)" />
            <button className={styles.cardButton} onClick={() => alert("Cupom aplicado!")}>Continuar</button>
          </div>

          {/* --- Etapa 4 --- */}
          <div className={styles.checkoutCard}>
            <h3><span className={styles.cardNumber}>4</span> Pagamento</h3>
            <button className={`${styles.cardButton} ${styles.finalize}`} onClick={handleFinalize}>Prosseguir Compra</button>
          </div>
        </div>

        {/* --- Resumo do carrinho --- */}
        <div className={styles.checkoutSummary}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            Carrinho: <span style={{ fontSize: '80%' }}> <a href="/carrinho">Editar carrinho</a> </span>
          </h3>

          <div className={styles.summaryList}>
            {cart.map((item) => (
              <div className={styles.summaryProduct} key={item.id}>
                <img src={item.productImage} alt={item.productName} />
                <div>
                  <p>{item.productName} (x{item.productQuantity})</p>
                  <span>R$ {(item.productPrice * item.productQuantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summaryTotal}>
            <h4>Resumo</h4>
            <div className={styles.summaryLine}><span>Subtotal</span><span className={styles.price}>R$ {subtotal.toFixed(2)}</span></div>
            <div className={styles.summaryLine}><span>Frete</span><span className={styles.green}>Grátis</span></div>
            <div className={`${styles.summaryLine} ${styles.total}`}><span>Total</span><span className={styles.price}>R$ {total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
      <ShortFooter />
    </>
  );
}