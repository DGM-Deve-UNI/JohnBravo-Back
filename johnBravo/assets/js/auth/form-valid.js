// == Validação de formulário == \\
// --- IMPORTS APIS INTERNAL --- \\
import { validarCPF } from "../api/valid-cpf.js";
import { maskForm } from "../api/maskForm.js";
import { consultaCEP } from "../api/api-cep.js";
// ========================================================================== \\
// ====- CAMPOS E SPAN DE ERRO -==== \\
const form = document.getElementById("form");

const nome = document.getElementById("nome");
const feedNome = document.getElementById("feedbackNome");

const sobrenome = document.getElementById("sobrenome");
const feedSobrenome = document.getElementById("feedbackSobrenome");

const data = document.getElementById("data");
const feedData = document.getElementById("feedbackData");

const generos = document.querySelectorAll('input[name="genero"]');
const feedGenero = document.getElementById("feedbackGenero");

const cpf = document.getElementById("cpf");
const feedCPF = document.getElementById("feedbackCPF");

const email = document.getElementById("email");
const feedEmail = document.getElementById("feedbackEmail");

const cel = document.getElementById("celular");
const feedCel = document.getElementById("feedbackCel");

const tel = document.getElementById("telFixo");
const feedTel = document.getElementById("feedbackTel");

const cep = document.getElementById("cep");
const feedCep = document.getElementById("feedbackCep");

const numEnd = document.getElementById("numero");
const feedNumEnd = document.getElementById("feedbackNum");

const login = document.getElementById("login");
const feedLogin = document.getElementById("feedbackLogin");

const senha = document.getElementById("senha");
const confSenha = document.getElementById("confiSenha");

const feedSenha = document.getElementById("feedbackSenha");
const feedConfiSenha = document.getElementById("feedbackConfiSenha");

const termos = document.getElementById("checkbox");
// ========================================================================== \\
// -=-=-= FUNÇÕES DE VALIDAÇÃO =-=-=- \\
// Validação de campo vazio, apenas letras e mínimo de 3 caracteres
function validarNome(input, feedback) {
  input.value = input.value.replace(/^\s+/, "");

  input.classList.remove("is-invalid", "is-valid");
  feedback.classList.remove("invalid-feedback", "valid-feedback", "ms-2", "pt-2");
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
function validarIdade(data) {
  const dataNascimento = new Date(data.value);
  const hoje = new Date();

  const mes = hoje.getMonth() - dataNascimento.getMonth();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();

  feedData.classList.remove("valid-feedback", "invalid-feedback", "ms-2", "mt-1");
  data.classList.remove("is-valid", "is-invalid", "mb-0");

  if (!data.value || isNaN(dataNascimento.getFullYear())) {
    feedData.textContent = "Idade inválida: Ano de nascimento não informado.";
    feedData.classList.add("invalid-feedback", "ms-2", "mt-1");
    data.classList.add("is-invalid", "mb-0");
    return false;
  }

  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }

  if (idade < 18) {
    feedData.textContent = "Você deve ter pelo menos 18 anos";
    feedData.classList.add("invalid-feedback", "ms-2", "mt-1");
    data.classList.add("is-invalid", "mb-0");
    return false;
  } else if (idade > 85) {
    feedData.textContent = "Idade máxima permitida é 85 anos";
    feedData.classList.add("invalid-feedback", "ms-2", "mt-1");
    data.classList.add("is-invalid", "mb-0");
    return false;
  } else {
    feedData.textContent = `Idade válida: ${idade} anos.`;
    feedData.classList.add("valid-feedback", "ms-2", "mt-1");
    data.classList.add("is-valid", "mb-0");
    return true;
  }
}
// Validação do gênero
function validarGenero() {
  const selecionado = Array.from(generos).some((radio) => radio.checked);

  if (!selecionado) {
    generos.forEach((radio) => radio.classList.add("is-invalid"));
    feedGenero.textContent = "Selecione um gênero!";
    feedGenero.classList.add("invalid-feedback", "mt-1", "m-0");
    return false;
  } else {
    generos.forEach((radio) => radio.classList.remove("is-invalid"));
    feedGenero.textContent = "";

    generos.forEach((radio) => radio.classList.remove("is-valid"));
    document
      .querySelector('input[name="genero"]:checked')
      .classList.add("is-valid");
    return true;
  }
}
// Validação do Email
function validarEmail(campo) {
  const email = campo.value;
  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  campo.classList.remove("is-invalid", "is-valid");
  feedEmail.classList.remove("invalid-feedback", "valid-feedback", "ms-2", "pt-2");
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
function validarCelular(cel) {
  const valor = cel.value.replace(/\D/g, "").trim();

  cel.classList.remove("is-invalid", "is-valid");
  feedCel.classList.remove("invalid-feedback", "valid-feedback", "ms-2", "pt-2");
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
function validarTelefone(tel) {
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
function validarCEP(inputCep, feedbackCep) {
  const camposEndereco = ["endereco", "bairro", "cidade", "estado"];

  camposEndereco.forEach((campo) => {
    const campoInput = document.getElementById(campo);
    if (inputCep.value.trim() === "") {
      campoInput.classList.add("is-invalid");
      return false;
    }
  });

  inputCep.classList.remove("is-invalid", "is-valid");
  feedbackCep.classList.remove("invalid-feedback", "valid-feedback", "ms-2", "pt-2");
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
function validarNumEnd(numEnd, feedNumEnd) {
  numEnd.classList.remove("is-invalid", "is-valid");
  feedNumEnd.classList.remove("invalid-feedback", "valid-feedback", "ms-2", "pt-2");
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
function validarLogin(campo) {
  const login = campo.value;

  campo.classList.remove("is-invalid", "is-valid");
  feedLogin.classList.remove("invalid-feedback", "valid-feedback", "ms-2", "pt-2");
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
function validarSenha() {
  senha.classList.remove("is-invalid", "is-valid");
  confSenha.classList.remove("is-invalid", "is-valid");
  feedSenha.classList.remove("invalid-feedback", "ms-2", "pt-2", "valid-feedback");
  feedConfiSenha.classList.remove("invalid-feedback", "ms-2", "pt-2", "valid-feedback");
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
function validarCheckbox() {
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
function feedModal(titulo, mensagem, corH, corB) {
  const modalHeader = document.querySelector(".modal-header");
  const modalLabel = document.getElementById("modalLabel");
  const modalMessage = document.getElementById("modalMessage");
  const modalBtn = document.getElementById("btn");

  // Definir o título de forma segura
  modalLabel.textContent = titulo;

  // Sanitizar a mensagem antes de inserir no innerHTML
  let mensagemSegura = DOMPurify.sanitize(mensagem);
  modalMessage.innerHTML = mensagemSegura;

  // Remover classes antigas de cores
  modalLabel.classList.add("text-white");
  modalHeader.classList.remove("bg-danger", "bg-success");
  modalBtn.classList.remove("btn-secondary", "btn-danger", "btn-success");

  // Adicionar as novas cores
  modalHeader.classList.add(corH);
  modalBtn.classList.add(corB);
}
// ========================================================================== \\
// Ativa o feedback quando a página é carregada
document.addEventListener("DOMContentLoaded", function () {
  // Validação nome e sobrenome
  document.addEventListener("input", (e) => {
    if (e.target.id === "nome") {
      validarNome(e.target, feedNome);
    } else if (e.target.id === "sobrenome") {
      validarNome(e.target, feedSobrenome);
    }
  });
  // Validação data
  data.addEventListener("input", (e) => validarIdade(e.target));
  // Validação gêneros
  generos.forEach((radio) => {
    radio.addEventListener("change", validarGenero);
  });
  // Validação CPF
  cpf.addEventListener("input", (e) => validarCPF(e.target, feedCPF));
  // Validação Email
  email.addEventListener("input", (e) => validarEmail(e.target, feedEmail));
  // Validação Celular
  cel.addEventListener("input", (e) => validarCelular(e.target, feedCel));
  // Validação Telefone Fixo
  tel.addEventListener("input", (e) => validarTelefone(e.target, feedTel));
  // Validação CEP
  // cep.addEventListener("blur", () => consultaCEP(cep.value));
  cep.addEventListener("input", function() {
    // Remove máscara e recupera apenas números
    const cepValue = this.value.replace(/\D/g, '');
    // Reseta validação se não tiver 8 dígitos
    if (cepValue.length !== 8) {
        const camposEndereco = ['endereco', 'bairro', 'cidade', 'estado'];
        camposEndereco.forEach(campo => {
            const campoInput = document.getElementById(campo);
            campoInput.value = "";
            campoInput.disabled = false;
            campoInput.classList.remove("is-valid");
            campoInput.classList.add("is-invalid");
        });

        feedCep.textContent = 'CEP inválido! Digite 8 dígitos.';
        feedCep.classList.add("invalid-feedback", "ms-2", "pt-2");
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
    // Dispara consulta apenas com 8 dígitos
    if (cepValue.length === 8) {
        consultaCEP(this.value);
    }
  });
  // Validação Número endereço
  numEnd.addEventListener("input", function () {
    validarNumEnd(numEnd, feedNumEnd);
  });
  // Validação login
  login.addEventListener("input", (e) => validarLogin(e.target, feedLogin));
  senha.addEventListener("input", (e) => validarSenha(e.target, feedSenha));
  confSenha.addEventListener("input", (e) => validarSenha(e.target, feedConfiSenha));
// -------------------------------------------------------------------------- \\
  // ==== Máscaras ==== \\
  document.addEventListener("input", (e) => {
    if (e.target.id === "cpf") {
      e.target.value = maskForm.cpf(e.target.value); // Máscara CPF
    } else if (e.target.id === "celular") {
      e.target.value = maskForm.cel(e.target.value); // Máscara celular
    } else if (e.target.id === "telFixo") {
      e.target.value = maskForm.tel(e.target.value); // Máscara Telefone
    } else if (e.target.id === "cep") {
      e.target.value = maskForm.cep(e.target.value); // Máscara CEP
    } else if (e.target.id === "numero") {
      e.target.value = maskForm.num(e.target.value); // Máscara Número Endereço
    }
  });
// ========================================================================== \\
  // Validação e envio OK
  form.setAttribute("novalidate", "novalidate");
// --- Validar e enviar via Ajax para o PHP --- \\
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    // Reativa os campos preenchidos automaticamente
    const camposEndereco = ["endereco", "bairro", "cidade", "estado"];
    camposEndereco.forEach((campo) => {
      document.getElementById(campo).disabled = false;
    });
// -------------------------------------------------------------------------- \\
    // Validar campos (ANTES de montar o FormData)
    let formValid = true;

    const validation = [
      () => validarNome(nome, feedNome),
      () => validarNome(sobrenome, feedSobrenome),
      () => validarIdade(data),
      validarGenero,
      () => validarCPF(cpf, feedCPF),
      () => validarEmail(email),
      () => validarCelular(cel),
      // () => validarTelefone(tel),
      () => validarNumEnd(numEnd, feedNumEnd),
      () => validarLogin(login),
      validarSenha,
      validarCheckbox,
      () => {
        // Validação do CEP já preenchido
        const cepValue = cep.value.replace(/\D/g, "");
        if (cepValue.length !== 8 || !cep.classList.contains("is-valid")) {
          feedCep.textContent = "CEP inválido ou não validado!";
          feedCep.classList.add("invalid-feedback", "ms-2", "pt-2");
          cep.classList.add("is-invalid");
          return false;
        }
        return true;
      },
      () => {
        const senha = document.getElementById("senha").value;
        const confiSenha = document.getElementById("confiSenha").value;
        if (senha !== confiSenha) {
          feedConfiSenha.textContent = "As senhas não coincidem";
          feedConfiSenha.classList.add("invalid-feedback", "ms-2", "pt-2");
          confSenha.classList.add("is-invalid");
          return false;
        }
        return true;
      },
    ];
// -------------------------------------------------------------------------- \\
    // Roda as validações
    validation.forEach((check) => {
      if (!check()) formValid = false;
    });

    if (!formValid) {
      feedModal(
        "⚠️ Erro no formulário",
        "Revise os campos antes de enviar.",
        "bg-danger",
        "btn-danger"
      );
      return;
    }
// -------------------------------------------------------------------------- \\
    // Monta os dados
    const form = e.target;
    const formData = new FormData(form);
    formData.delete("confiSenha");

    try {
      const response = await fetch("/dgm-projetos/back-end/src/cadastro.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        feedModal(
          "✅ Cadastro realizado com sucesso!",
          result.message || "Redirecionando para o login...",
          "bg-success",
          "btn-success"
        );
        setTimeout(() => (window.location.href = "login.html"), 4000);
      } else {
        feedModal(
          "⚠️ Erro",
          result.message || "Erro ao salvar no banco.",
          "bg-danger",
          "btn-danger"
        );
      }
    } catch (err) {
      // console.error("Erro na requisição:", err);
      feedModal(
        "⚠️ Erro servidor",
        "Problema na comunicação com o servidor.",
        "bg-danger",
        "btn-danger"
      );
    }
  });
});