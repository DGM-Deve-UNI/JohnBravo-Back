// == Validação de formulário == \\
// --- IMPORTS APIS INTERNAL --- \\
import { validarCPF } from "../api/valid-cpf.js";
import { maskForm } from "../api/maskForm.js";
import { consultaCEP } from "../api/api-cep.js";
import {
  validarNome,
  validarIdade,
  validarGenero,
  validarEmail,
  validarCelular,
  validarTelefone,
  validarCEP,
  validarNumEnd,
  validarLogin,
  validarSenha,
  validarCheckbox,
  feedModal,
} from "../api/form-valid.js";
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
  data.addEventListener("input", (e) => validarIdade(e.target, feedData));
  // Validação gêneros
  generos.forEach((radio) => {
    radio.addEventListener("change", () => validarGenero(generos, feedGenero));
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
  cep.addEventListener("input", function () {
    // Remove máscara e recupera apenas números
    const cepValue = this.value.replace(/\D/g, "");
    // Reseta validação se não tiver 8 dígitos
    if (cepValue.length !== 8) {
      const camposEndereco = ["endereco", "bairro", "cidade", "estado"];
      camposEndereco.forEach((campo) => {
        const campoInput = document.getElementById(campo);
        campoInput.value = "";
        campoInput.disabled = false;
        campoInput.classList.remove("is-valid");
        campoInput.classList.add("is-invalid");
      });

      feedCep.textContent = "CEP inválido! Digite 8 dígitos.";
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
  // Validação senha e confirmação de senha
  senha.addEventListener("input", () =>
    validarSenha(senha, confSenha, feedSenha, feedConfiSenha)
  );
  confSenha.addEventListener("input", () =>
    validarSenha(senha, confSenha, feedSenha, feedConfiSenha)
  );
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
    const validation = [
      {
        campo: "Nome",
        check: () => validarNome(nome, feedNome),
        mensagem: "Nome inválido",
      },
      {
        campo: "Sobrenome",
        check: () => validarNome(sobrenome, feedSobrenome),
        mensagem: "Sobrenome inválido",
      },
      {
        campo: "Data de nascimento",
        check: () => validarIdade(data, feedData),
        mensagem: "Data de nascimento inválida",
      },
      {
        campo: "Gênero",
        check: () => validarGenero(generos, feedGenero),
        mensagem: "Gênero não selecionado",
      },
      {
        campo: "CPF",
        check: () => validarCPF(cpf, feedCPF),
        mensagem: "CPF inválido",
      },
      {
        campo: "Email",
        check: () => validarEmail(email, feedEmail),
        mensagem: "E-mail inválido",
      },
      {
        campo: "Celular",
        check: () => validarCelular(cel, feedCel),
        mensagem: "Celular inválido",
      },
      {
        campo: "CEP",
        check: () => validarCEP(cep, feedCep),
        mensagem: "CEP inválido ou não validado",
      },
      {
        campo: "Número",
        check: () => validarNumEnd(numEnd, feedNumEnd),
        mensagem: "Número do endereço inválido",
      },
      {
        campo: "Login",
        check: () => validarLogin(login, feedLogin),
        mensagem: "Login inválido",
      },
      {
        campo: "Senha",
        check: () => validarSenha(senha, confSenha, feedSenha, feedConfiSenha),
        mensagem: "Senha ou confirmação de senha inválida",
      },
      {
        campo: "Termos",
        check: () => validarCheckbox(termos),
        mensagem: "Você deve aceitar os termos",
      },
      {
        campo: "CEP",
        check: () => {
          const cepValue = cep.value.replace(/\D/g, "");
          const valido =
            cepValue.length === 8 && cep.classList.contains("is-valid");
          if (!valido) {
            feedCep.textContent = "CEP inválido ou não validado!";
            feedCep.classList.add("invalid-feedback", "ms-2", "pt-2");
            cep.classList.add("is-invalid");
          }
          return valido;
        },
        mensagem: "CEP inválido ou não validado",
      },
    ];

    // Verifica se todos os campos estão vazios
    const todosVazios = [
      nome.value,
      sobrenome.value,
      data.value,
      cpf.value,
      email.value,
      cel.value,
      tel.value,
      cep.value,
      numEnd.value,
      login.value,
      senha.value,
      confSenha.value,
    ].every((v) => v.trim() === "");

    // Roda validações
    const erros = validation
      .map(({ campo, check, mensagem }) => ({
        campo,
        mensagem,
        ok: check(),
      }))
      .filter(({ ok }) => !ok);

    if (erros.length > 0) {
      if (todosVazios) {
        feedModal(
          "⚠️ Formulário vazio",
          "Por favor, preencha os campos antes de enviar.",
          "bg-warning",
          "btn-warning"
        );
      } else {
        const listaErros = erros
          .map(({ mensagem }) => `• ${mensagem}`)
          .join("<br>");
        feedModal(
          "⚠️ Dados inválidos!",
          `Corrija os seguintes campos:<br><br>${listaErros}`,
          "bg-danger",
          "btn-danger"
        );
      }
      return;
    }

    // -------------------------------------------------------------------------- \\
    // Monta os dados
    const form = e.target;
    const formData = new FormData(form);
    formData.delete("confiSenha");

    try {
      const basePath = window.location.pathname.split("/")[1];
      const apiUrl = `${window.location.origin}/${basePath}/back-end/src/usuario/cad-usuario.php`;
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Exibe a mensagem de sucesso e a notificação
        feedModal(
          "✅ Cadastro realizado com sucesso!",
          result.message || "Redirecionando para o login...",
          "bg-success",
          "btn-success"
        );

        setTimeout(() => {
          feedModal(
            "⏳ Redirecionando...",
            "Você será redirecionado para a página de login...",
            "bg-info",
            "btn-info"
          );

          setTimeout(() => (window.location.href = "login.html"), 2000);
        }, 1000);
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
