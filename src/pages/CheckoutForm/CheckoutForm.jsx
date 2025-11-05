import React, { useState, useEffect } from "react";
import styles from "./CheckoutForm.module.css";
import ShortHeader from "../../components/ShortHeader/ShortHeader.jsx";
import ShortFooter from "../../components/ShortFooter/ShortFooter";

const STORAGE_KEY = "cart_v1";
const CUPONS_VALIDOS = ["GIOVANI", "CUPOMPEDRO", "DESCONTOALL", "NATAL", "LUDTKE", "VICTOR01", "EDUARDA", "EMANUEL10", "PAIXAO", "DUDA10"];

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

  const [fieldErrors, setFieldErrors] = useState({
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

  const [fieldValidity, setFieldValidity] = useState({
    nome: false,
    cpf: false,
    email: false,
    telefone: false,
    cep: false,
    endereco: false,
    cidade: false,
    bairro: false,
    uf: false,
    numero: false,
    cupom: true, // Cupom é opcional
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

    // Buscar dados do usuário se email estiver na URL
    const urlParams = new URLSearchParams(window.location.search);
    const emailUser = urlParams.get('email');
    
    if (emailUser && validarEmail(emailUser)) {
      setFormData(prev => ({ ...prev, email: emailUser }));
      buscarDadosUsuario(emailUser);
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("cartUpdated", onCartUpdated);
    
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cartUpdated", onCartUpdated);
    };
  }, []);

  // Buscar dados do usuário
  const buscarDadosUsuario = async (email) => {
    try {
      const response = await fetch(`https://newandrews.com.br/NA-COMPONENTS/User-Name.php?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error("Erro HTTP: " + response.status);
      
      const data = await response.json();
      if (data && data.nome) {
        const updates = {};
        
        if (data.nome) updates.nome = data.nome;
        if (data.cpf) updates.cpf = data.cpf;
        if (data.telefone) updates.telefone = data.telefone;
        if (data.cep) updates.cep = data.cep;
        if (data.complemento) updates.numero = data.complemento;

        setFormData(prev => ({ ...prev, ...updates }));
        
        // Disparar validações para campos preenchidos
        setTimeout(() => {
          Object.keys(updates).forEach(field => {
            if (updates[field]) {
              handleValidation(field, updates[field]);
            }
          });
        }, 100);
      }
    } catch (error) {
      console.error("Erro ao consultar o usuário:", error.message);
    }
  };

  // Validações
  const validarEmail = (email) => {
    return email && email.length >= 5 && email.includes("@");
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (!cpf || cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    if (digito1 !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    if (digito2 !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  const formatarCPF = (valor) => {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 11);

    if (valor.length > 9)
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    if (valor.length > 6)
      return valor.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    if (valor.length > 3)
      return valor.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    return valor;
  };

  // Buscar CEP
  const buscarCEP = async (cep) => {
    cep = cep.replace(/\D/g, "");
    
    if (cep.length !== 8) {
      setFieldErrors(prev => ({ ...prev, cep: "CEP inválido." }));
      setFieldValidity(prev => ({ ...prev, cep: false }));
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setFieldErrors(prev => ({ ...prev, cep: "CEP não encontrado." }));
        setFieldValidity(prev => ({ ...prev, cep: false }));
      } else {
        const updates = {
          endereco: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          uf: data.uf || ""
        };

        setFormData(prev => ({ ...prev, ...updates }));
        
        // Validar campos preenchidos automaticamente
        Object.keys(updates).forEach(field => {
          if (updates[field]) {
            setFieldValidity(prev => ({ ...prev, [field]: true }));
            setFieldErrors(prev => ({ ...prev, [field]: "" }));
          }
        });

        setFieldErrors(prev => ({ ...prev, cep: "" }));
        setFieldValidity(prev => ({ ...prev, cep: true }));
      }
    } catch (err) {
      setFieldErrors(prev => ({ ...prev, cep: "Erro ao buscar CEP." }));
      setFieldValidity(prev => ({ ...prev, cep: false }));
    }
  };

  // Validação em tempo real
  const handleValidation = (field, value) => {
    let isValid = false;
    let error = "";

    switch (field) {
      case "nome":
        const partesNome = value.trim().split(" ");
        if (value === "" || partesNome.length < 2) {
          error = "Digite seu nome completo.";
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value)) {
          error = "Seu nome não pode conter números ou caracteres especiais.";
        } else {
          isValid = true;
        }
        break;

      case "cpf":
        const cpfNumeros = value.replace(/\D/g, "");
        if (cpfNumeros.length === 0) {
          error = "";
        } else if (!validarCPF(cpfNumeros)) {
          error = "CPF inválido.";
        } else {
          isValid = true;
        }
        break;

      case "email":
        if (!validarEmail(value)) {
          error = "E-mail inválido.";
        } else {
          isValid = true;
        }
        break;

      case "telefone":
        const telefone = value.replace(/\D/g, "");
        if (telefone === "" || telefone.length < 10 || telefone.length > 13) {
          error = "Telefone/Celular inválido.";
        } else {
          isValid = true;
        }
        break;

      case "cep":
        const cep = value.replace(/\D/g, "");
        if (cep === "" || cep.length < 8) {
          error = "CEP inválido.";
        } else {
          isValid = true;
          // Buscar CEP automaticamente
          setTimeout(() => buscarCEP(value), 500);
        }
        break;

      case "endereco":
      case "cidade":
      case "bairro":
      case "uf":
      case "numero":
        if (value.trim() === "") {
          error = `Digite seu ${field}.`;
        } else {
          isValid = true;
        }
        break;

      case "cupom":
        if (value === "") {
          isValid = true;
          error = "";
        } else if (CUPONS_VALIDOS.includes(value.toUpperCase())) {
          isValid = true;
          error = "Cupom válido.\n10% de desconto aplicado na compra!";
        } else {
          error = "Cupom inválido.";
        }
        break;

      default:
        isValid = true;
    }

    setFieldValidity(prev => ({ ...prev, [field]: isValid }));
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Formatação específica para CPF
    if (name === "cpf") {
      processedValue = formatarCPF(value);
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
    handleValidation(name, processedValue);
  };

  // Navegação entre etapas
  const handleStep1 = () => {
    const fields = ["nome", "cpf", "email", "telefone"];
    const allValid = fields.every(field => fieldValidity[field]);
    
    if (allValid) {
      setCurrentStep(2);
      window.location.href = "#step2";
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  const handleStep2 = () => {
    const fields = ["cep", "endereco", "cidade", "bairro", "uf", "numero"];
    const allValid = fields.every(field => fieldValidity[field]);
    
    if (allValid) {
      setCurrentStep(3);
      window.location.href = "#step3";
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  const handleStep3 = () => {
    setCurrentStep(4);
    window.location.href = "#step4";
  };

  // Cálculo do carrinho com desconto
  const calcularItensComDesconto = () => {
    const itensAgrupados = {};
    cart.forEach(item => {
      if (!itensAgrupados[item.productName]) {
        itensAgrupados[item.productName] = { ...item };
      } else {
        itensAgrupados[item.productName].productQuantity += item.productQuantity;
      }
    });

    let totalUnidades = 0;
    Object.values(itensAgrupados).forEach(item => totalUnidades += item.productQuantity);

    let descontoAplicado = false;
    let menorPrecoUnitario = Infinity;
    let nomeProdutoDesconto = null;

    if (totalUnidades >= 4) {
      Object.values(itensAgrupados).forEach(item => {
        const precoUnitario = item.productPrice;
        if (precoUnitario < menorPrecoUnitario) {
          menorPrecoUnitario = precoUnitario;
          nomeProdutoDesconto = item.productName;
        }
      });
    }

    const itensComDesconto = Object.values(itensAgrupados).map(item => {
      const precoUnitario = item.productPrice;
      let precoTotal;
      let temDesconto = false;

      if (!descontoAplicado && totalUnidades >= 4 && item.productName === nomeProdutoDesconto) {
        precoTotal = precoUnitario * (item.productQuantity - 1);
        temDesconto = true;
        descontoAplicado = true;
      } else {
        precoTotal = precoUnitario * item.productQuantity;
      }

      return {
        ...item,
        precoTotal,
        temDesconto
      };
    });

    const subtotal = itensComDesconto.reduce((acc, item) => acc + item.precoTotal, 0);
    
    return { itensComDesconto, subtotal };
  };

  const { itensComDesconto, subtotal } = calcularItensComDesconto();
  const frete = 0;
  const total = subtotal + frete;

  // Modal de pagamento
  const PaymentModal = () => {
    if (!showPaymentModal) return null;

    const formatarURLPagamento = (tipo) => {
      const params = new URLSearchParams();
      
      const cupomValue = formData.cupom && formData.cupom.trim().length >= 1 ? formData.cupom : "NONE";
      
      params.append("cupom", cupomValue);
      params.append("email", formData.email);
      params.append("name", formData.nome);
      params.append("cpf", formData.cpf.replace(/\D/g, ""));
      params.append("phone", formData.telefone);
      params.append("postal_code", formData.cep);
      params.append("street", formData.endereco);
      params.append("number", formData.numero);
      params.append("neighborhood", formData.bairro);
      params.append("city", formData.cidade);
      params.append("state", formData.uf);

      cart.forEach((item, index) => {
        const precoUnitario = item.productPrice;
        if (index === 0) {
          params.append("productsName", item.productName);
          params.append("productsPrice", precoUnitario.toFixed(2));
          params.append("productsQuantity", item.productQuantity);
        } else {
          const idx = index + 1;
          params.append(`productsName${idx}`, item.productName);
          params.append(`productsPrice${idx}`, precoUnitario.toFixed(2));
          params.append(`productsQuantity${idx}`, item.productQuantity);
        }
      });

      params.append("totalValue", total.toFixed(2));
      params.append("payment", tipo);

      const baseURL = tipo === "PIX" 
        ? "https://newandrews.com.br/check-out/pix-payment/?"
        : "https://newandrews.com.br/check-out/card-payment/?";

      return baseURL + params.toString();
    };

    return (
      <div className={styles.modalOverlay} onClick={() => setShowPaymentModal(false)}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h2>Escolha a forma de pagamento</h2>
          <div className={styles.paymentOptions}>
            <button 
              className={styles.paymentOption}
              onClick={() => window.location.href = formatarURLPagamento("PIX")}
            >
              <img src="https://img.icons8.com/color/200/pix.png" alt="PIX" />
              <span>PIX</span>
            </button>
            <button 
              className={styles.paymentOption}
              onClick={() => window.location.href = formatarURLPagamento("CARD")}
            >
              <img src="https://cdn-icons-png.flaticon.com/512/7510/7510522.png" alt="Cartão" />
              <span>Cartão de Crédito</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Finalizar compra
  const handleFinalize = (e) => {
    e.preventDefault();
    
    const allFieldsValid = Object.keys(fieldValidity).every(key => 
      key === "cupom" ? true : fieldValidity[key]
    );

    if (!allFieldsValid) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setShowPaymentModal(true);
  };

  return (
    <>
      <ShortHeader />
      <div className={styles.checkoutPage}>
        <div className={styles.checkoutGrid}>
          {/* --- Etapa 1 --- */}
          <div className={`${styles.checkoutCard} ${currentStep >= 1 ? styles.active : ''}`}>
            <h3><span className={styles.cardNumber}>1</span> Dados cadastrais</h3>
            <input 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              type="text" 
              placeholder="Nome completo" 
              className={fieldValidity.nome ? styles.valid : fieldErrors.nome ? styles.invalid : ''}
            />
            {fieldErrors.nome && <span className={styles.error}>{fieldErrors.nome}</span>}
            
            <input 
              name="cpf" 
              value={formData.cpf} 
              onChange={handleChange} 
              type="text" 
              placeholder="CPF" 
              className={fieldValidity.cpf ? styles.valid : fieldErrors.cpf ? styles.invalid : ''}
            />
            {fieldErrors.cpf && <span className={styles.error}>{fieldErrors.cpf}</span>}
            
            <input 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              type="email" 
              placeholder="E-mail" 
              className={fieldValidity.email ? styles.valid : fieldErrors.email ? styles.invalid : ''}
            />
            {fieldErrors.email && <span className={styles.error}>{fieldErrors.email}</span>}
            
            <input 
              name="telefone" 
              value={formData.telefone} 
              onChange={handleChange} 
              type="tel" 
              placeholder="Telefone/Celular" 
              className={fieldValidity.telefone ? styles.valid : fieldErrors.telefone ? styles.invalid : ''}
            />
            {fieldErrors.telefone && <span className={styles.error}>{fieldErrors.telefone}</span>}
            
            <button className={styles.cardButton} onClick={handleStep1}>Continuar</button>
          </div>

          {/* --- Etapa 2 --- */}
          <div className={`${styles.checkoutCard} ${currentStep >= 2 ? styles.active : ''}`}>
            <h3><span className={styles.cardNumber}>2</span> Endereço de entrega</h3>
            <input 
              name="cep" 
              id="step2"
              value={formData.cep} 
              onChange={handleChange} 
              type="text" 
              placeholder="CEP para entrega" 
              className={fieldValidity.cep ? styles.valid : fieldErrors.cep ? styles.invalid : ''}
            />
            {fieldErrors.cep && <span className={styles.error}>{fieldErrors.cep}</span>}
            
            <input 
              name="endereco" 
              value={formData.endereco} 
              onChange={handleChange} 
              type="text" 
              placeholder="Endereço" 
              readOnly
              className={fieldValidity.endereco ? styles.valid : fieldErrors.endereco ? styles.invalid : ''}
            />
            {fieldErrors.endereco && <span className={styles.error}>{fieldErrors.endereco}</span>}
            
            <input 
              name="cidade" 
              value={formData.cidade} 
              onChange={handleChange} 
              type="text" 
              placeholder="Cidade" 
              readOnly
              className={fieldValidity.cidade ? styles.valid : fieldErrors.cidade ? styles.invalid : ''}
            />
            {fieldErrors.cidade && <span className={styles.error}>{fieldErrors.cidade}</span>}
            
            <input 
              name="bairro" 
              value={formData.bairro} 
              onChange={handleChange} 
              type="text" 
              placeholder="Bairro" 
              readOnly
              className={fieldValidity.bairro ? styles.valid : fieldErrors.bairro ? styles.invalid : ''}
            />
            {fieldErrors.bairro && <span className={styles.error}>{fieldErrors.bairro}</span>}
            
            <input 
              name="uf" 
              value={formData.uf} 
              onChange={handleChange} 
              type="text" 
              placeholder="UF" 
              readOnly
              className={fieldValidity.uf ? styles.valid : fieldErrors.uf ? styles.invalid : ''}
            />
            {fieldErrors.uf && <span className={styles.error}>{fieldErrors.uf}</span>}
            
            <input 
              name="numero" 
              value={formData.numero} 
              onChange={handleChange} 
              type="text" 
              placeholder="Número/Complemento" 
              className={fieldValidity.numero ? styles.valid : fieldErrors.numero ? styles.invalid : ''}
            />
            {fieldErrors.numero && <span className={styles.error}>{fieldErrors.numero}</span>}
            
            <button className={styles.cardButton} onClick={handleStep2}>Continuar</button>
          </div>

          {/* --- Etapa 3 --- */}
          <div className={`${styles.checkoutCard} ${currentStep >= 3 ? styles.active : ''}`}>
            <h3><span className={styles.cardNumber}>3</span> Cupom de desconto</h3>
            <input 
              name="cupom" 
              id="step3"
              value={formData.cupom} 
              onChange={handleChange} 
              type="text" 
              placeholder="Cupom (Opcional)" 
              className={fieldValidity.cupom ? styles.valid : fieldErrors.cupom ? styles.invalid : ''}
            />
            {fieldErrors.cupom && (
              <span className={fieldErrors.cupom.includes("válido") ? styles.success : styles.error}>
                {fieldErrors.cupom}
              </span>
            )}
            <button className={styles.cardButton} onClick={handleStep3}>Continuar</button>
          </div>

          {/* --- Etapa 4 --- */}
          <div className={`${styles.checkoutCard} ${currentStep >= 4 ? styles.active : ''}`}>
            <h3><span className={styles.cardNumber}>4</span> Pagamento</h3>
            <button id="step4" className={`${styles.cardButton} ${styles.finalize}`} onClick={handleFinalize}>
              Prosseguir Compra
            </button>
          </div>
        </div>

        {/* --- Resumo do carrinho --- */}
        <div className={styles.checkoutSummary}>
          <h3 className={styles.summaryTitle}>
            Carrinho: <span><a href="/carrinho">Editar carrinho</a></span>
          </h3>

          <div className={styles.summaryList}>
            {itensComDesconto.map((item, index) => (
              <div className={styles.summaryProduct} key={index}>
                <img src={item.productImage} alt={item.productName} />
                <div>
                  <p>{item.productName} (x{item.productQuantity})</p>
                  {item.temDesconto ? (
                    <span className={styles.discountPrice}>
                      <span className={styles.oldPrice}>
                        R$ {(item.productPrice * item.productQuantity).toFixed(2)}
                      </span>
                      <span className={styles.newPrice}>
                        R$ {item.precoTotal.toFixed(2)} (1 unidade grátis)
                      </span>
                    </span>
                  ) : (
                    <span>R$ {item.precoTotal.toFixed(2)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summaryTotal}>
            <h4>Resumo</h4>
            <div className={styles.summaryLine}>
              <span>Subtotal</span>
              <span className={styles.price}>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Frete</span>
              <span className={styles.green}>Grátis</span>
            </div>
            <div className={`${styles.summaryLine} ${styles.total}`}>
              <span>Total</span>
              <span className={styles.price}>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal />
      <ShortFooter />
    </>
  );
}