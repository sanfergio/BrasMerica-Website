// === CPF ===
export function validarCPF(cpf) {
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

// === VALIDAÇÃO GENÉRICA DO PERFIL ===
export function validateUserData(data) {
  const errors = {};

  if (!data.name?.trim()) errors.name = "Nome é obrigatório";

  if (data.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
    errors.email = "E-mail inválido";
  }

  if (data.cpf && !validarCPF(data.cpf)) {
    errors.cpf = "CPF inválido";
  }

  if (data.phone_number && !/^\d{10,11}$/.test(data.phone_number)) {
    errors.phone_number = "Telefone inválido";
  }

  if (!data.birthday) errors.birthday = "Data de nascimento obrigatória";

  if (data.cep && !/^\d{8}$/.test(data.cep)) {
    errors.cep = "CEP inválido";
  }

  //if (!data.address) errors.address = "Endereço não preenchido";
  if (!data.neighborhood) errors.neighborhood = "Bairro não preenchido";
  if (!data.city) errors.city = "Cidade não preenchida";
  if (!data.state) errors.state = "Estado não preenchido";

  return errors;
}
