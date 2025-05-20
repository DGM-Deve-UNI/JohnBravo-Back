// -=-=-= FUNÇÕES DE VALIDAÇÃO =-=-=- \\
// Validação de campo vazio, apenas letras e mínimo de 3 caracteres
export function validarNome(input, feedback) {
  input.value = input.value.replace(/^\s+/, "");

  input.classList.remove("is-invalid", "is-valid");
  feedback.classList.remove(
    "invalid-feedback",
    "valid-feedback",
    "ms-2",
    "pt-2"
  );
  feedback.textContent = "";

  if (input.value === "") {
    feedback.textContent = `O campo ${input.id} é obrigatório!`;
    feedback.classList.add("invalid-feedback", "ms-2", "pt-2");
    input.classList.add("is-invalid");
    return false;
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(input.value)) {
    feedback.textContent = `O ${input.id} deve conter apenas letras e espaços`;
    feedback.classList.add("invalid-feedback", "ms-2", "pt-1");
    input.classList.add("is-invalid");
    return false;
  } else if (input.value.trim().length < 3) {
    feedback.textContent = `${
      input.id.charAt(0).toUpperCase() + input.id.slice(1)
    } deve ter pelo menos 3 caracteres`;
    feedback.classList.add("invalid-feedback", "ms-2", "pt-1");
    input.classList.add("is-invalid");
    return false;
  } else {
    feedback.textContent = `${
      input.id.charAt(0).toUpperCase() + input.id.slice(1)
    } válido`;
    input.classList.add("is-valid");
    feedback.classList.add("valid-feedback", "ms-2", "pt-2");
    return true;
  }
}
// Validação da data de nascimento
export function validarIdade(data, feedback) {
  const dataNascimento = new Date(data.value);
  const hoje = new Date();

  const mes = hoje.getMonth() - dataNascimento.getMonth();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();

  feedback.classList.remove(
    "valid-feedback",
    "invalid-feedback",
    "ms-2",
    "mt-1"
  );
  data.classList.remove("is-valid", "is-invalid", "mb-0");

  if (!data.value || isNaN(dataNascimento.getFullYear())) {
    feedback.textContent = "Idade inválida: Ano de nascimento não informado.";
    feedback.classList.add("invalid-feedback", "ms-2", "mt-1");
    data.classList.add("is-invalid", "mb-0");
    return false;
  }

  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }

  if (idade < 18) {
    feedback.textContent = "Você deve ter pelo menos 18 anos";
    feedback.classList.add("invalid-feedback", "ms-2", "mt-1");
    data.classList.add("is-invalid", "mb-0");
    return false;
  } else if (idade > 85) {
    feedback.textContent = "Idade máxima permitida é 85 anos";
    feedback.classList.add("invalid-feedback", "ms-2", "mt-1");
    data.classList.add("is-invalid", "mb-0");
    return false;
  } else {
    feedback.textContent = `Idade válida: ${idade} anos.`;
    feedback.classList.add("valid-feedback", "ms-2", "mt-1");
    data.classList.add("is-valid", "mb-0");
    return true;
  }
}
// Validação do gênero
export function validarGenero(radioInputs, feedback) {
  const selecionado = Array.from(radioInputs).some((radio) => radio.checked);

  if (!selecionado) {
    radioInputs.forEach((radio) => radio.classList.add("is-invalid"));
    feedback.textContent = "Selecione um gênero!";
    feedback.classList.add("invalid-feedback", "mt-1", "m-0");
    return false;
  } else {
    radioInputs.forEach((radio) => radio.classList.remove("is-invalid"));
    feedback.textContent = "";
    radioInputs.forEach((radio) => radio.classList.remove("is-valid"));
    document
      .querySelector('input[name="genero"]:checked')
      .classList.add("is-valid");
    return true;
  }
}
// Validação do Email
export function validarEmail(campo, feedEmail) {
  const email = campo.value;
  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  campo.classList.remove("is-invalid", "is-valid");
  feedEmail.classList.remove(
    "invalid-feedback",
    "valid-feedback",
    "ms-2",
    "pt-2"
  );
  feedEmail.textContent = "";

  if (campo.value === "") {
    feedEmail.textContent = `O campo ${campo.id} é obrigatório!`;
    campo.classList.add("is-invalid");
    feedEmail.classList.add("invalid-feedback", "ms-2", "pt-2");
    return false;
  } else if (!regexEmail.test(email)) {
    feedEmail.textContent = "Use um email válido!";
    campo.classList.add("is-invalid");
    feedEmail.classList.add("invalid-feedback", "ms-2", "pt-2");
    return false;
  } else {
    feedEmail.textContent = "Email válido!";
    feedEmail.classList.add("valid-feedback", "ms-2", "pt-2");
    campo.classList.add("is-valid");
    return true;
  }
}
// Validação do celular
export function validarCelular(cel, feedCel) {
  const valor = cel.value.replace(/\D/g, "").trim();

  cel.classList.remove("is-invalid", "is-valid");
  feedCel.classList.remove(
    "invalid-feedback",
    "valid-feedback",
    "ms-2",
    "pt-2"
  );
  feedCel.textContent = "";

  if (valor === "") {
    feedCel.textContent = `O campo ${cel.id} é obrigatório!`;
    cel.classList.add("is-invalid");
    feedCel.classList.add("invalid-feedback", "ms-2", "pt-2");
    return false;
  }

  if (valor.length < 11 || valor.length > 11) {
    feedCel.textContent = "Celular inválido! O número deve ter 11 dígitos.";
    feedCel.classList.add("invalid-feedback", "ms-2", "pt-2");
    cel.classList.add("is-invalid");
    return false;
  }

  cel.classList.add("is-valid");
  feedCel.textContent = "Celular válido!";
  feedCel.classList.add("valid-feedback", "ms-2", "pt-2");
  return true;
}
// Validação do telefone fixo
export function validarTelefone(tel, feedTel) {
  const valor = tel.value.replace(/\D/g, "");

  tel.classList.remove("is-invalid", "is-valid");
  feedTel.classList.remove("invalid-feedback", "ms-2", "pt-2");
  feedTel.textContent = "";

  if (valor.length === 0) {
    feedTel.textContent = "O telefone não pode ser vazio";
    feedTel.classList.add("invalid-feedback", "ms-2", "pt-2");
    return;
  } else if (valor.length < 10 || valor.length > 11) {
    feedTel.textContent = "Telefone fixo inválido";
    tel.classList.add("is-invalid");
    feedTel.classList.add("invalid-feedback", "ms-2", "pt-2");
    return false;
  } else {
    feedTel.textContent = "Telefone válido!";
    tel.classList.add("is-valid");
    feedTel.classList.add("valid-feedback", "ms-2", "pt-2");
    return true;
  }
}
// Validação CEP (Validação básica de campo vazio)
export function validarCEP(inputCep, feedbackCep) {
  const camposEndereco = ["endereco", "bairro", "cidade", "estado"];

  camposEndereco.forEach((campo) => {
    const campoInput = document.getElementById(campo);
    if (inputCep.value.trim() === "") {
      campoInput.classList.add("is-invalid");
      return false;
    }
  });

  inputCep.classList.remove("is-invalid", "is-valid");
  feedbackCep.classList.remove(
    "invalid-feedback",
    "valid-feedback",
    "ms-2",
    "pt-2"
  );
  feedbackCep.textContent = "";

  if (inputCep.value.trim() === "") {
    feedbackCep.textContent = `O campo ${inputCep.id} é obrigatório!`;
    feedbackCep.classList.add("invalid-feedback", "ms-2", "pt-2");
    inputCep.classList.add("is-invalid");
    return false;
  } else {
    inputCep.classList.add("is-valid");
    return true;
  }
}
// Validação número de endereço
export function validarNumEnd(numEnd, feedNumEnd) {
  numEnd.classList.remove("is-invalid", "is-valid");
  feedNumEnd.classList.remove(
    "invalid-feedback",
    "valid-feedback",
    "ms-2",
    "pt-2"
  );
  feedNumEnd.textContent = "";

  const numero = numEnd.value.trim();

  if (numero === "") {
    feedNumEnd.textContent = `O campo ${numEnd.id} é obrigatório!`;
    feedNumEnd.classList.add("invalid-feedback", "ms-2", "pt-2");
    numEnd.classList.add("is-invalid");
    return false;
  } else if (numero.length > 4) {
    feedNumEnd.textContent = "Número do endereço deve ter no máximo 4 dígitos!";
    feedNumEnd.classList.add("invalid-feedback", "ms-2", "pt-2");
    numEnd.classList.add("is-invalid");
  } else {
    feedNumEnd.textContent = "Número válido!";
    feedNumEnd.classList.add("valid-feedback", "ms-2", "pt-2");
    numEnd.classList.add("is-valid");
    return true;
  }

  feedNumEnd.classList.add("invalid-feedback", "ms-2", "pt-2");
  numEnd.classList.add("is-invalid");
  return false;
}
// Validação de login
export function validarLogin(campo, feedLogin) {
  const login = campo.value;

  campo.classList.remove("is-invalid", "is-valid");
  feedLogin.classList.remove(
    "invalid-feedback",
    "valid-feedback",
    "ms-2",
    "pt-2"
  );
  feedLogin.textContent = "";

  if (campo.value === "") {
    feedLogin.textContent = `O campo ${campo.id} é obrigatório!`;
    feedLogin.classList.add("invalid-feedback", "ms-2", "pt-2");
    campo.classList.add("is-invalid");
    return false;
  }

  if (login.length === 0) {
    return false;
  }

  if (login.length < 8) {
    campo.classList.add("is-invalid");
    feedLogin.classList.add("invalid-feedback", "ms-2", "pt-2");
    feedLogin.textContent = "O login deve ter 8 caracteres";
    return false;
  } else {
    campo.classList.add("is-valid");
    return true;
  }
}
// Validação de senha
export function validarSenha(senha, confSenha, feedSenha, feedConfiSenha) {
  senha.classList.remove("is-invalid", "is-valid");
  confSenha.classList.remove("is-invalid", "is-valid");
  feedSenha.classList.remove(
    "invalid-feedback",
    "ms-2",
    "pt-2",
    "valid-feedback"
  );
  feedConfiSenha.classList.remove(
    "invalid-feedback",
    "ms-2",
    "pt-2",
    "valid-feedback"
  );
  feedSenha.textContent = "";
  feedConfiSenha.textContent = "";

  if (senha.value.length === 0) {
    feedSenha.textContent = `O campo ${senha.id} é obrigatório!`;
    feedSenha.classList.add("invalid-feedback", "ms-2", "pt-2");
    senha.classList.add("is-invalid");
    return false;
  }

  if (senha.value.length < 6) {
    feedSenha.textContent = "A senha deve ter pelo menos 6 caracteres";
    feedSenha.classList.add("invalid-feedback", "ms-2", "pt-2");
    senha.classList.add("is-invalid");
    return false;
  } else {
    feedSenha.textContent = "Senha válida";
    feedSenha.classList.add("valid-feedback", "ms-2", "pt-2");
    senha.classList.add("is-valid");
  }

  if (confSenha.value !== "" && senha.value !== confSenha.value) {
    feedConfiSenha.textContent = "As senhas não coincidem";
    feedConfiSenha.classList.add("invalid-feedback", "ms-2", "pt-2");
    confSenha.classList.add("is-invalid");
    return false;
  } else if (confSenha.value !== "") {
    feedConfiSenha.textContent = "Senhas coincidem";
    feedConfiSenha.classList.add("valid-feedback", "ms-2", "pt-2");
    confSenha.classList.add("is-valid");
  }
  return (
    senha.classList.contains("is-valid") &&
    confSenha.classList.contains("is-valid")
  );
}
// Validação de checkbox
export function validarCheckbox(termos) {
  if (!termos.checked) {
    termos.setCustomValidity("Você precisa aceitar os termos para continuar!");
    termos.reportValidity();
    return false;
  } else {
    termos.setCustomValidity("");
    return true;
  }
}
// Modal de Feedbacks
export function feedModal(titulo, mensagem, corH, corB) {
  const modalHeader = document.querySelector(".modal-header");
  const modalLabel = document.getElementById("modalLabel");
  const modalMessage = document.getElementById("modalMessage");
  const modalBtn = document.getElementById("btn-modal");

  // Definir o título de forma segura
  modalLabel.textContent = titulo;

  // Sanitizar a mensagem antes de inserir no innerHTML
  let mensagemSegura = DOMPurify.sanitize(mensagem);
  modalMessage.innerHTML = mensagemSegura;

  // Remover classes antigas de cores
  modalLabel.classList.add("text-white");
  modalHeader.classList.remove(
    "bg-danger",
    "bg-success",
    "bg-warning",
    "bg-info"
  );
  modalBtn.classList.remove(
    "btn-secondary",
    "btn-danger",
    "btn-success",
    "btn-warning",
    "btn-info"
  );

  // Adicionar as novas cores
  modalHeader.classList.add(corH);
  modalBtn.classList.add(corB);
}