import React, { useState } from "react";
import styles from "./Register.module.css";
import ShortFooter from "../../components/ShortFooter/ShortFooter";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    birth: "",
    address: "",
    neighborhood: "",
    city: "",
    cep: "",
    number: "",
    complement: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setSuccess("");
  }

  function validateRequired() {
    const req = [
      "name",
      "email",
      "cpf",
      "birth",
      "address",
      "neighborhood",
      "city",
      "cep",
      "number",
      "password",
      "confirmPassword",
    ];

    const newErr = {};
    req.forEach((k) => {
      if (!form[k] || (typeof form[k] === "string" && !form[k].trim())) {
        newErr[k] = "Campo obrigatório";
      }
    });

    // Email
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErr.email = "E-mail inválido";
    }

    // Senha
    const pwRe = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]).{8,15}$/;
    if (form.password && !pwRe.test(form.password)) {
      newErr.password = "Senha: 8-15 chars, 1 número e 1 caractere especial";
    }

    // Confirmação
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErr.confirmPassword = "As senhas não coincidem";
    }

    if (!form.terms) newErr.terms = "É preciso concordar com os termos.";

    return newErr;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErr = validateRequired();
    if (Object.keys(newErr).length) {
      setErrors(newErr);
      setSuccess("");
      return;
    }
    setErrors({});
    setSuccess("Cadastro realizado com sucesso!");
  }

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className={styles.regContainer}>
        <div className={styles.regCard}>
          <h2 className={styles.regTitle}>Crie sua conta</h2>

          <form className={styles.regForm} onSubmit={handleSubmit} noValidate>
            {[{ name: "name", placeholder: "Nome" },
            { name: "email", placeholder: "Email" }].map((field) => (
              <label
                key={field.name}
                className={`${styles.inputGroup} ${errors[field.name] ? styles.inputGroupError : ""}`}
              >
                <input
                  className={styles.inputBox}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                />
                {errors[field.name] && <span className={styles.fieldError}>{errors[field.name]}</span>}
              </label>
            ))}

            <div className={`${styles.row} ${styles.two}`}>
              {[{ name: "cpf", placeholder: "CPF" },
              { name: "birth", placeholder: "dd/mm/aaaa" }].map((field) => (
                <label
                  key={field.name}
                  className={`${styles.inputGroup} ${errors[field.name] ? styles.inputGroupError : ""}`}
                >
                  <input
                    className={styles.inputBox}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                  {errors[field.name] && <span className={styles.fieldError}>{errors[field.name]}</span>}
                </label>
              ))}
            </div>

            <div className={`${styles.row} ${styles.two}`}>
              {[{ name: "address", placeholder: "Endereço" },
              { name: "neighborhood", placeholder: "Bairro" }].map((field) => (
                <label
                  key={field.name}
                  className={`${styles.inputGroup} ${errors[field.name] ? styles.inputGroupError : ""}`}
                >
                  <input
                    className={styles.inputBox}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                  {errors[field.name] && <span className={styles.fieldError}>{errors[field.name]}</span>}
                </label>
              ))}
            </div>

            <label className={`${styles.inputGroup} ${errors.city ? styles.inputGroupError : ""}`}>
              <input
                className={styles.inputBox}
                name="city"
                placeholder="Cidade"
                value={form.city}
                onChange={handleChange}
              />
              {errors.city && <span className={styles.fieldError}>{errors.city}</span>}
            </label>

            <div className={`${styles.row} ${styles.two}`}>
              {[{ name: "cep", placeholder: "CEP" },
              { name: "number", placeholder: "Número" }].map((field) => (
                <label
                  key={field.name}
                  className={`${styles.inputGroup} ${errors[field.name] ? styles.inputGroupError : ""}`}
                >
                  <input
                    className={styles.inputBox}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                  {errors[field.name] && <span className={styles.fieldError}>{errors[field.name]}</span>}
                </label>
              ))}
            </div>

            <label className={`${styles.inputGroup} ${errors.complement ? styles.inputGroupError : ""}`}>
              <input
                className={styles.inputBox}
                name="complement"
                placeholder="Complemento"
                value={form.complement}
                onChange={handleChange}
              />
              {errors.complement && <span className={styles.fieldError}>{errors.complement}</span>}
            </label>

            <div className={`${styles.row} ${styles.two}`}>
              {[{ name: "password", placeholder: "Senha", type: "password" },
              { name: "confirmPassword", placeholder: "Confirme a senha", type: "password" }].map(
                (field) => (
                  <label
                    key={field.name}
                    className={`${styles.inputGroup} ${errors[field.name] ? styles.inputGroupError : ""}`}
                  >
                    <input
                      className={styles.inputBox}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                    />
                    {errors[field.name] && (
                      <span className={styles.fieldError}>{errors[field.name]}</span>
                    )}
                  </label>
                )
              )}
            </div>

            <div className={styles.termsRow}>
              <label className={styles.termsLabel}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                />
                <span> Concordo com os Termos de Uso e Serviço do site</span>
              </label>
              {errors.terms && <div className={styles.fieldError}>{errors.terms}</div>}
            </div>

            <a className={styles.smallLink} href="/login">
              Já tenho uma conta
            </a>

            <button className={styles.submitBtn} type="submit">
              Cadastrar
            </button>
          </form>

          <button type="button" className={styles.googleButton}>
            <span className={styles.googleIcon} aria-hidden>
              <svg
                viewBox="0 0 533.5 544.3"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.4h147.1c-6.3 34.3-25.1 63.4-53.6 83v68h86.6c50.6-46.6 81.4-115.4 81.4-196z"
                />
                <path
                  fill="#34A853"
                  d="M272 544.3c72.6 0 133.6-24 178.2-65.3l-86.6-68c-24 16.2-54.8 25.7-91.6 25.7-70.4 0-130-47.5-151.3-111.4H30.9v69.9C75.3 485.9 167.4 544.3 272 544.3z"
                />
                <path
                  fill="#FBBC05"
                  d="M120.7 325.3c-8.8-26.6-8.8-55.4 0-82l-89.8-69.9C7.2 214.7 0 242.6 0 272s7.2 57.3 30.9 98.6l89.8-69.9z"
                />
                <path
                  fill="#EA4335"
                  d="M272 108.1c39.5 0 75 13.6 103 40.4l77.4-77.4C405.6 24.1 344.6 0 272 0 167.4 0 75.3 58.4 30.9 145.7l89.8 69.9C142 155.6 201.6 108.1 272 108.1z"
                />
              </svg>
            </span>
            <span>Criar conta com Google</span>
          </button>

          {Object.keys(errors).length > 0 && (
            <div className={styles.formError}>Por favor, corrija os campos destacados.</div>
          )}
          {success && <div className={styles.formSuccess}>{success}</div>}

        </div>
      </main>
      <ShortFooter />
    </>
  );
}
