import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(pw) {
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]).{8,15}$/;
    return re.test(pw);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "O nome é obrigatório.";

    if (!formData.email.trim()) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Formato de e-mail inválido.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "A senha é obrigatória.";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "A senha deve ter 8-15 caracteres, com pelo menos 1 número e 1 caractere especial.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess("");
      return;
    }

    setErrors({});
    setSuccess("Login realizado com sucesso!");
    setFormData({ name: "", email: "", password: "" });
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Entre com sua conta</h2>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Nome */}
          <label
            className={`input-group ${errors.name ? "input-group-error" : ""}`}
          >
            <span className="icon" aria-hidden>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              className="input-box"
              type="text"
              placeholder="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
            />
          </label>
          {errors.name && <p className="error-message">{errors.name}</p>}

          {/* Email */}
          <label
            className={`input-group ${errors.email ? "input-group-error" : ""}`}
          >
            <span className="icon" aria-hidden>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <polyline points="3 7 12 13 21 7"></polyline>
              </svg>
            </span>
            <input
              className="input-box"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}

          {/* Senha */}
          <label
            className={`input-group ${
              errors.password ? "input-group-error" : ""
            }`}
          >
            <span className="icon" aria-hidden>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <input
              className="input-box"
              type="password"
              placeholder="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </label>
          {errors.password && <p className="error-message">{errors.password}</p>}

          <div className="actions-row">
            <a className="link" href="#">
              Não tenho uma conta
            </a>
            <button className="signup-button" type="submit">
              SIGN UP
            </button>
          </div>

          <button type="button" className="google-button">
            <span className="google-icon" aria-hidden>
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
            <span>Fazer Login com Google</span>
          </button>

          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
}
