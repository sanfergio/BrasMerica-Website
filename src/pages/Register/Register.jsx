import React, { useState } from "react";
import bcrypt from "bcryptjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Register.module.css";
import ShortFooter from "../../components/ShortFooter/ShortFooter";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";
import { useNavigate } from "react-router-dom";

// Initialize Supabase client
import SupabaseClient from "../../components/KEYS/App.jsx";

const supabase = SupabaseClient;

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone_number: "",
    birth: null, // Date object
    cep: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    number: "",
    complement: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});
  const [success, setSuccess] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // === Handle form change ===
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    if (name === "cpf") val = val.replace(/\D/g, "");
    if (name === "phone_number") val = val.replace(/\D/g, "");

    setForm((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");

    validateField(name, val);

    if (name === "cpf") checkUnique("cpf", val);
    if (name === "email") checkUnique("email", val);
  }

  async function checkUnique(field, value) {
    if (!value) return;
    try {
      const { data, error } = await supabase
        .from("DBclients")
        .select("id")
        .eq(field, value)
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") {
        setErrors((prev) => ({ ...prev, [field]: "Erro ao verificar" }));
        return;
      }

      if (data) {
        setErrors((prev) => ({
          ...prev,
          [field]: field === "cpf" ? "CPF já cadastrado" : "Email já cadastrado",
        }));
        setValidFields((prev) => ({ ...prev, [field]: false }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: "" }));
        setValidFields((prev) => ({ ...prev, [field]: true }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCepChange(e) {
    const cep = e.target.value.replace(/\D/g, "");
    setForm((p) => ({ ...p, cep }));

    if (cep.length !== 8) {
      setErrors((p) => ({ ...p, cep: "CEP inválido" }));
      setValidFields((p) => ({ ...p, cep: false }));
      return;
    }

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setErrors((p) => ({ ...p, cep: "CEP não encontrado" }));
        setValidFields((p) => ({ ...p, cep: false }));
      } else {
        setForm((p) => ({
          ...p,
          address: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
        }));
        setErrors((p) => ({ ...p, cep: "" }));
        setValidFields((p) => ({
          ...p,
          cep: true,
          address: true,
          neighborhood: true,
          city: true,
          state: true,
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      setErrors((p) => ({ ...p, cep: "Erro ao buscar CEP" }));
      setValidFields((p) => ({ ...p, cep: false }));
    }
  }

  function validateField(name, value) {
    let error = "";
    let valid = true;

    if (name === "terms" && !value) {
      error = "Você deve aceitar os Termos de Uso";
      valid = false;
    } else if (!value || value.toString().trim() === "") {
      error = "Campo obrigatório";
      valid = false;
    } else {
      switch (name) {
        case "email":
          if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ) {
            error = "E-mail inválido";
            valid = false;
          }
          break;

        case "cpf":
          if (!validarCPF(value)) {
            error = "CPF inválido";
            valid = false;
          }
          break;
        case "phone_number":
          if (!/^\d{10,11}$/.test(value)) {
            error = "Telefone inválido";
            valid = false;
          }
          break;
        case "password":
          if (!/^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]).{8,15}$/.test(value)) {
            error = "Senha: 8-15 caracteres, 1 número e 1 símbolo";
            valid = false;
          }
          break;
        case "confirmPassword":
          if (value !== form.password) {
            error = "As senhas não coincidem";
            valid = false;
          }
          break;
        case "birth":
          if (!value) {
            error = "Data de nascimento é obrigatória";
            valid = false;
          }
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    setValidFields((prev) => ({ ...prev, [name]: valid }));
    return valid;
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    if (digito1 !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    return digito2 === parseInt(cpf.charAt(10));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const allValid = Object.keys(form).every((key) => validateField(key, form[key]));
    if (!allValid) return;

    try {
      const { data: existing } = await supabase
        .from("DBclients")
        .select("id, email, cpf")
        .or(`cpf.eq.${form.cpf},email.eq.${form.email}`)
        .limit(1)
        .single();

      if (existing) {
        if (existing.cpf === form.cpf) setErrors((prev) => ({ ...prev, cpf: "CPF já cadastrado" }));
        if (existing.email === form.email) setErrors((prev) => ({ ...prev, email: "Email já cadastrado" }));
        return;
      }

      const { data: lastUser } = await supabase
        .from("DBclients")
        .select("id")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      const newId = lastUser ? lastUser.id + 1 : 1;
      const hashedPassword = await bcrypt.hash(form.password, 10);

      const { data, error } = await supabase.from("DBclients").insert([
        {
          id: newId,
          name: form.name,
          email: form.email,
          cpf: form.cpf,
          phone_number: form.phone_number,
          birthday: form.birth ? form.birth.toISOString().split("T")[0] : null,
          cep: form.cep,
          neighborhood: form.neighborhood,
          city: form.city,
          state: form.state,
          complement_number: `${form.number}, ${form.complement}`,
          encrypted_key: hashedPassword,
        },
      ]);

      if (error) {
        setErrors({ form: "Erro ao cadastrar usuário" });
        console.error(error);
      } else {
        setSuccess("✅ Cadastro realizado com sucesso!");
        setShowSuccessModal(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2500);
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: "Erro inesperado" });
    }
  }

  const renderField = (key, placeholder, type = "text", readOnly = false, extraProps = {}) => (
    <label
      key={key}
      className={`${styles.inputGroup} ${errors[key] ? styles.inputGroupError : validFields[key] ? styles.inputGroupValid : ""
        }`}
    >
      {key === "birth" ? (
        <DatePicker
          selected={form.birth}
          onChange={(date) => {
            setForm((prev) => ({ ...prev, birth: date }));
            validateField("birth", date);
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de nascimento"
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className={styles.inputBox}
          {...extraProps}
        />
      ) : (
        <input
          className={styles.inputBox}
          name={key}
          type={type}
          placeholder={placeholder}
          value={form[key]}
          onChange={key === "cep" ? handleCepChange : handleChange}
          readOnly={readOnly}
          {...extraProps}
        />
      )}
      <span className={styles.fieldError}>{errors[key]}</span>
    </label>
  );

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className={styles.regContainer}>
        <div className={styles.regCard}>
          <h2 className={styles.regTitle}>Crie sua conta</h2>
          <form className={styles.regForm} onSubmit={handleSubmit} noValidate>
            {["name", "email", "phone_number"].map((k) =>
              renderField(
                k,
                k === "name"
                  ? "Nome completo"
                  : k === "email"
                    ? "E-mail"
                    : "Telefone"
              )
            )}

            <div className={`${styles.row} ${styles.two}`}>
              {renderField("cpf", "CPF")}
              {renderField("birth", "Data de nascimento")}
            </div>

            <div className={`${styles.row} ${styles.two}`}>
              {renderField("cep", "CEP")}
              {renderField("number", "Número")}
            </div>

            <div className={`${styles.row} ${styles.two}`}>
              {renderField("address", "Endereço", "text", true)}
              {renderField("neighborhood", "Bairro", "text", true)}
            </div>

            <div className={`${styles.row} ${styles.two}`}>
              {renderField("city", "Cidade", "text", true)}
              {renderField("state", "UF", "text", true)}
            </div>

            {renderField("complement", "Complemento")}
            <div className={`${styles.row} ${styles.two}`}>
              {renderField("password", "Senha", "password")}
              {renderField("confirmPassword", "Confirmar senha", "password")}
            </div>

            <div className={styles.termsRow}>
              <label className={styles.termsLabel}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  required
                />
                <span onClick={() => setShowTermsModal(true)} style={{ cursor: "pointer", textDecoration: "underline", color: "green" }}>
                  Concordo com os Termos de Uso e Serviço do site
                </span>
              </label>
              {errors.terms && <div className={styles.fieldError}>{errors.terms}</div>}
            </div>

            <a className={styles.smallLink} href="/login">
              Já tenho uma conta
            </a>

            <button className={styles.submitBtn} type="submit">
              Cadastrar
            </button>
            {errors.form && <div className={styles.fieldError}>{errors.form}</div>}
          </form>

          {success && <div className={styles.formSuccess}>{success}</div>}
        </div>
      </main>
      <ShortFooter />

      {/* Modal de termos */}
      {showTermsModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowTermsModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Termos de Uso e Serviço</h2>
            <div className={styles.modalBody}>
              <p>
                Ao acessar e utilizar este site, você concorda com nossos termos de uso e política de privacidade. Se não concordar, não utilize nossos serviços.
              </p>
              <p>
                É proibido utilizar o site para fins ilegais ou fraudulentos. Todas as informações de produtos e preços podem ser alteradas sem aviso prévio.
              </p>
              <p>
                Seus dados pessoais são protegidos e utilizados apenas para processar pedidos e melhorar nossos serviços.
              </p>
            </div>
            <button className={styles.closeModal} onClick={() => setShowTermsModal(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.successContainer}>
            <div className={styles.loader}>
              <svg viewBox="0 0 52 52" className={styles.checkmark}>
                <circle cx="26" cy="26" r="25" fill="green" />
                <path
                  d="M14 27l10 10 15-15"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{color: 'white'}} className={styles.confirmationText}>Conta criada com sucesso!</div>
          </div>
        </div>
      )}
    </>
  );
}
