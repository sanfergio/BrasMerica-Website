import { useState } from "react";
import { validateUserData } from "../../utils/validation";
import styles from "./UserProfile.module.css";

export default function PersonalDataTab({ userData, setUserData, supabase }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Função para validar CPF
  const validarCPF = (cpf) => {
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
  };

  // Validar campo individual
  const validateField = (name, value) => {
    let error = "";
    let valid = true;

    if (!value || value.toString().trim() === "") {
      error = "Campo obrigatório";
      valid = false;
    } else {
      switch (name) {
        case "name":
          if (value.length < 2) {
            error = "Nome deve ter pelo menos 2 caracteres";
            valid = false;
          }
          break;
        case "email":
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
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
            error = "Telefone inválido (10 ou 11 dígitos)";
            valid = false;
          }
          break;
        case "birthday":
          const birthDate = new Date(value);
          const today = new Date();
          if (birthDate >= today) {
            error = "Data de nascimento deve ser anterior a hoje";
            valid = false;
          }
          break;
        case "cep":
          if (!/^\d{8}$/.test(value.replace(/\D/g, ""))) {
            error = "CEP inválido (8 dígitos)";
            valid = false;
          }
          break;
        case "complement_number":
          if (value.length < 1) {
            error = "Número é obrigatório";
            valid = false;
          }
          break;
        case "newPassword":
          if (value.length < 6) {
            error = "Senha deve ter pelo menos 6 caracteres";
            valid = false;
          }
          break;
        case "confirmPassword":
          if (value !== passwordData.newPassword) {
            error = "Senhas não coincidem";
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
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, ""); 
    const formattedCep = e.target.value;

    setUserData(prev => ({ ...prev, cep: formattedCep }));
    validateField("cep", formattedCep);

    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();

        if (!data.erro) {
          setUserData(prev => ({
            ...prev,
            address: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || ""
          }));
          
          // Validar campos preenchidos automaticamente
          validateField("address", data.logradouro || "");
          validateField("neighborhood", data.bairro || "");
          validateField("city", data.localidade || "");
          validateField("state", data.uf || "");
        } else {
          setErrors(prev => ({ ...prev, cep: "CEP não encontrado" }));
          setValidFields(prev => ({ ...prev, cep: false }));
        }
      } catch (err) {
        console.log("Erro no ViaCEP:", err);
        setErrors(prev => ({ ...prev, cep: "Erro ao buscar CEP" }));
        setValidFields(prev => ({ ...prev, cep: false }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Função para alternar visibilidade da senha
  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handlePasswordUpdate = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    // Validar campos de senha
    const passwordFieldsToValidate = ["newPassword", "confirmPassword"];
    let allValid = true;

    passwordFieldsToValidate.forEach(field => {
      const isValid = validateField(field, passwordData[field] || "");
      if (!isValid) allValid = false;
    });

    if (!allValid) {
      const errorFields = Object.keys(errors).filter(key => 
        passwordFieldsToValidate.includes(key) && errors[key]
      );
      if (errorFields.length > 0) {
        let msg = "Corrija os seguintes erros:\n\n";
        errorFields.forEach(field => {
          msg += `• ${errors[field]}\n`;
        });
        alert(msg);
      }
      return;
    }

    if (!passwordData.currentPassword) {
      alert("Por favor, digite sua senha atual");
      return;
    }

    setLoading(true);

    try {
      // Buscar usuário para verificar senha atual
      const { data: user, error: userError } = await supabase
        .from("DBclients")
        .select("encrypted_key")
        .eq("email", email)
        .single();

      if (userError || !user) {
        alert("Erro ao buscar dados do usuário");
        setLoading(false);
        return;
      }

      // Verificar senha atual (você precisará importar bcryptjs)
      const bcrypt = await import('bcryptjs');
      const isCurrentPasswordValid = await bcrypt.compare(
        passwordData.currentPassword,
        user.encrypted_key
      );

      if (!isCurrentPasswordValid) {
        alert("Senha atual incorreta");
        setLoading(false);
        return;
      }

      // Criptografar nova senha
      const saltRounds = 12;
      const hashedNewPassword = await bcrypt.hash(passwordData.newPassword, saltRounds);

      // Atualizar senha no banco
      const { error } = await supabase
        .from("DBclients")
        .update({ encrypted_key: hashedNewPassword })
        .eq("email", email);

      if (error) {
        console.error("Erro ao atualizar senha:", error);
        alert("❌ Erro ao atualizar senha");
      } else {
        alert("✔️ Senha atualizada com sucesso!");
        // Limpar campos de senha
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      }
    } catch (err) {
      console.error("Erro ao atualizar senha:", err);
      alert("❌ Erro ao atualizar senha");
    }

    setLoading(false);
  };

  const handleSaveChanges = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    setLoading(true);

    // Validar todos os campos antes de salvar
    const fieldsToValidate = [
      "name", "email", "phone_number", "cpf", "birthday", 
      "cep", "address", "neighborhood", "city", "state", "complement_number"
    ];

    let allValid = true;
    fieldsToValidate.forEach(field => {
      const isValid = validateField(field, userData[field] || "");
      if (!isValid) allValid = false;
    });

    if (!allValid) {
      const errorFields = Object.keys(errors).filter(key => errors[key]);
      if (errorFields.length > 0) {
        let msg = "Corrija os seguintes erros:\n\n";
        errorFields.forEach(field => {
          msg += `• ${errors[field]}\n`;
        });
        alert(msg);
      }
      setLoading(false);
      return;
    }

    // 2 — atualização no banco
    const { error } = await supabase
      .from("DBclients")
      .update({
        name: userData.name,
        phone_number: userData.phone_number,
        cpf: userData.cpf,
        birthday: userData.birthday,
        cep: userData.cep,
        address: userData.address,
        neighborhood: userData.neighborhood,
        city: userData.city,
        state: userData.state,
        complement_number: userData.complement_number,
      })
      .eq("email", email);

    if (error) {
      console.error("Erro ao salvar:", error);
      alert("❌ Erro ao salvar informações");
    } else {
      alert("✔️ Informações atualizadas com sucesso!");
    }

    setLoading(false);
  };

  // Função auxiliar para aplicar classes de validação
  const getInputClassName = (fieldName) => {
    const baseClass = styles.input;
    if (errors[fieldName]) {
      return `${baseClass} ${styles.inputError}`;
    }
    if (validFields[fieldName]) {
      return `${baseClass} ${styles.inputValid}`;
    }
    return baseClass;
  };

  return (
    <div >
      {/* Formulário de Dados Pessoais */}
      <form className={styles.card} onSubmit={(e) => e.preventDefault()}>
        <h1 className={styles.title}>Dados Pessoais</h1>

        {/* Full Name */}
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            className={getInputClassName("name")}
            placeholder="Nome completo"
            value={userData.name || ""}
            onChange={handleInputChange}
          />
          {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            className={getInputClassName("email")}
            placeholder="Email"
            value={userData.email || ""}
            readOnly
          />
          {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <input
            type="tel"
            id="phone_number"
            className={getInputClassName("phone_number")}
            placeholder="Telefone (apenas números)"
            value={userData.phone_number || ""}
            onChange={handleInputChange}
          />
          {errors.phone_number && <span className={styles.fieldError}>{errors.phone_number}</span>}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="cpf"
              className={getInputClassName("cpf")}
              placeholder="CPF"
              value={userData.cpf || ""}
              onChange={handleInputChange}
              readOnly
            />
            {errors.cpf && <span className={styles.fieldError}>{errors.cpf}</span>}
          </div>

          <div className={styles.formGroup}>
            <input
              type="date"
              id="birthday"
              className={getInputClassName("birthday")}
              value={userData.birthday || ""}
              onChange={handleInputChange}
            />
            {errors.birthday && <span className={styles.fieldError}>{errors.birthday}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="cep"
              className={getInputClassName("cep")}
              placeholder="CEP"
              value={userData.cep || ""}
              onChange={handleCepChange}
            />
            {errors.cep && <span className={styles.fieldError}>{errors.cep}</span>}
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              id="complement_number"
              className={getInputClassName("complement_number")}
              placeholder="Número e complemento"
              value={userData.complement_number || ""}
              onChange={handleInputChange}
            />
            {errors.complement_number && <span className={styles.fieldError}>{errors.complement_number}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="address"
              className={getInputClassName("address")}
              placeholder="Rua"
              value={userData.address || ""}
              readOnly
            />
            {errors.address && <span className={styles.fieldError}>{errors.address}</span>}
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              id="neighborhood"
              className={getInputClassName("neighborhood")}
              placeholder="Bairro"
              value={userData.neighborhood || ""}
              readOnly
            />
            {errors.neighborhood && <span className={styles.fieldError}>{errors.neighborhood}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="city"
              className={getInputClassName("city")}
              placeholder="Cidade"
              value={userData.city || ""}
              readOnly
            />
            {errors.city && <span className={styles.fieldError}>{errors.city}</span>}
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              id="state"
              className={getInputClassName("state")}
              placeholder="UF"
              maxLength={2}
              value={userData.state || ""}
              readOnly
            />
            {errors.state && <span className={styles.fieldError}>{errors.state}</span>}
          </div>
        </div>

        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSaveChanges}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>

      {/* Formulário de Alteração de Senha - Separado */}
      <div className={styles.card} style={{marginTop: '2rem'}}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h3 className={styles.title}>Alterar Senha</h3>
          
          {/* Senha Atual */}
          <div className={styles.formGroup}>
            <div className={styles.passwordInputContainer}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                className={getInputClassName("currentPassword")}
                placeholder="Senha atual"
                value={passwordData.currentPassword || ""}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => togglePasswordVisibility('current')}
              >
                {showCurrentPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className={styles.formRow}>
            {/* Nova Senha */}
            <div className={styles.formGroup}>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  className={getInputClassName("newPassword")}
                  placeholder="Nova senha"
                  value={passwordData.newPassword || ""}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.newPassword && <span className={styles.fieldError}>{errors.newPassword}</span>}
            </div>

            {/* Confirmar Senha */}
            <div className={styles.formGroup}>
              <div className={styles.passwordInputContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={getInputClassName("confirmPassword")}
                  placeholder="Confirmar senha"
                  value={passwordData.confirmPassword || ""}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
            </div>
          </div>

          <button
            type="button"
            className={styles.passwordButton}
            onClick={handlePasswordUpdate}
            disabled={loading}
          >
            {loading ? "Atualizando..." : "Atualizar Senha"}
          </button>
        </form>
      </div>
    </div>
  );
}