import React, { useState } from "react";
import "./Register.css";
import ShortFooter from "../../components/ShortFooter/ShortFooter";

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
      <main className="reg-container">
        <div className="reg-card">
          <h2 className="reg-title">Crie sua conta</h2>

          <form className="reg-form" onSubmit={handleSubmit} noValidate>
            {[{ name: "name", placeholder: "Nome" },
            { name: "email", placeholder: "Email" }].map((field) => (
              <label
                key={field.name}
                className={`input-group ${errors[field.name] ? "input-group-error" : ""}`}
              >
                <input
                  className="input-box"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                />
                {errors[field.name] && <span className="field-error">{errors[field.name]}</span>}
              </label>
            ))}

            <div className="row two">
              {[{ name: "cpf", placeholder: "CPF" },
              { name: "birth", placeholder: "dd/mm/aaaa" }].map((field) => (
                <label
                  key={field.name}
                  className={`input-group ${errors[field.name] ? "input-group-error" : ""}`}
                >
                  <input
                    className="input-box"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                  {errors[field.name] && <span className="field-error">{errors[field.name]}</span>}
                </label>
              ))}
            </div>

            <div className="row two">
              {[{ name: "address", placeholder: "Endereço" },
              { name: "neighborhood", placeholder: "Bairro" }].map((field) => (
                <label
                  key={field.name}
                  className={`input-group ${errors[field.name] ? "input-group-error" : ""}`}
                >
                  <input
                    className="input-box"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                  {errors[field.name] && <span className="field-error">{errors[field.name]}</span>}
                </label>
              ))}
            </div>

            <label className={`input-group ${errors.city ? "input-group-error" : ""}`}>
              <input
                className="input-box"
                name="city"
                placeholder="Cidade"
                value={form.city}
                onChange={handleChange}
              />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </label>

            <div className="row two">
              {[{ name: "cep", placeholder: "CEP" },
              { name: "number", placeholder: "Número" }].map((field) => (
                <label
                  key={field.name}
                  className={`input-group ${errors[field.name] ? "input-group-error" : ""}`}
                >
                  <input
                    className="input-box"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                  {errors[field.name] && <span className="field-error">{errors[field.name]}</span>}
                </label>
              ))}
            </div>

            <label className={`input-group ${errors.complement ? "input-group-error" : ""}`}>
              <input
                className="input-box"
                name="complement"
                placeholder="Complemento"
                value={form.complement}
                onChange={handleChange}
              />
              {errors.complement && <span className="field-error">{errors.complement}</span>}
            </label>

            <div className="row two">
              {[{ name: "password", placeholder: "Senha", type: "password" },
              { name: "confirmPassword", placeholder: "Confirme a senha", type: "password" }].map(
                (field) => (
                  <label
                    key={field.name}
                    className={`input-group ${errors[field.name] ? "input-group-error" : ""}`}
                  >
                    <input
                      className="input-box"
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                    />
                    {errors[field.name] && (
                      <span className="field-error">{errors[field.name]}</span>
                    )}
                  </label>
                )
              )}
            </div>

            <div className="terms-row">
              <label className="terms-label">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                />
                <span> Concordo com os Termos de Uso e Serviço do site</span>
              </label>
              {errors.terms && <div className="field-error">{errors.terms}</div>}
            </div>

            <a className="small-link" href="/login">
              Já tenho uma conta
            </a>

            <button className="submit-btn" type="submit">
              Cadastrar
            </button>

            {Object.keys(errors).length > 0 && (
              <div className="form-error">Por favor, corrija os campos destacados.</div>
            )}
            {success && <div className="form-success">{success}</div>}
          </form>
        </div>
      </main>
      <ShortFooter />
    </>
  );
}
