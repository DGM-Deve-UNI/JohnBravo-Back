// Função para alternar a exibição dos campos de pagamento
function togglePaymentFields() {
  const selected = document.querySelector(
    'input[name="payment"]:checked'
  ).value;
  document.getElementById("cardFields").style.display =
    selected === "credit" || selected === "debit" ? "block" : "none";
  document
    .getElementById("boletoInfo")
    .classList.toggle("d-none", selected !== "boleto");
  document
    .getElementById("pixInfo")
    .classList.toggle("d-none", selected !== "pix");
}

window.onload = togglePaymentFields;

// Lógica de copiar + toast + ícone
document.getElementById("btnCopiar").addEventListener("click", function () {
  const texto = document.getElementById("meuTexto").value;
  navigator.clipboard.writeText(texto).then(() => {
    const toast = new bootstrap.Toast(document.getElementById("toastCopiado"));
    toast.show();
  });
});

// Função de validação dos campos ao enviar o formulário
function validarFormulario(event) {
  const form = event.target;

  // Verifica se o formulário está válido
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Adiciona a classe 'was-validated' para ativar feedback visual
  form.classList.add("was-validated");

  return false; // previne envio real (remova se quiser enviar de fato)
}
// ========================================================================== \\
// Gera uma string alfanumérica aleatória (tipo Pix copia e cola)
function gerarCodigoPix(tamanho = 40) {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";
  for (let i = 0; i < tamanho; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

// Ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("meuTexto");
  input.value = gerarCodigoPix();
});

// Lógica de copiar + toast + ícone
const btn = document.getElementById("btnCopiar");
const input = document.getElementById("meuTexto");
const toastEl = document.getElementById("toastCopiado");
const toast = new bootstrap.Toast(toastEl);
const iconeBotao = document.getElementById("iconeBotao");

btn.addEventListener("click", function () {
  navigator.clipboard
    .writeText(input.value)
    .then(() => {
      toast.show();
      iconeBotao.classList.replace("fa-clipboard", "fa-clipboard-check");

      // Volta ao ícone de copiar após 2s
      setTimeout(() => {
        iconeBotao.classList.replace("fa-clipboard-check", "fa-clipboard");
      }, 2000);
    })
    .catch((err) => {
      console.error("Erro ao copiar:", err);
      alert("Erro ao copiar o código Pix");
    });
});
// ========================================================================== \\
document.addEventListener("DOMContentLoaded", () => {
  // Alterna exibição dos campos com base na forma de pagamento
  function togglePaymentFields() {
    const selected = document.querySelector(
      'input[name="payment"]:checked'
    ).value;
    document.getElementById("cardFields").style.display =
      selected === "credit" || selected === "debit" ? "block" : "none";
    document
      .getElementById("boletoInfo")
      .classList.toggle("d-none", selected !== "boleto");
    document
      .getElementById("pixInfo")
      .classList.toggle("d-none", selected !== "pix");
  }
  togglePaymentFields();
  document
    .querySelectorAll('input[name="payment"]')
    .forEach((el) => el.addEventListener("change", togglePaymentFields));

  // Máscara número do cartão (0000 0000 0000 0000)
  IMask(document.getElementById("cardNumber"), {
    mask: "0000 0000 0000 0000",
  });

  // Máscara validade (MM/AA)
  IMask(document.getElementById("expiry"), {
    mask: "00/00",
  });

  // Máscara CVV (3 ou 4 dígitos)
  IMask(document.getElementById("cvv"), {
    mask: "0000",
  });

  // Validação do campo nome (mínimo 3 letras por parte, sem espaços no início/fim)
  const nameInput = document.getElementById("cardName");

  nameInput.addEventListener("beforeinput", (e) => {
    const value = nameInput.value;
    const inputChar = e.data;

    // Impede espaço no início
    if (value.length === 0 && inputChar === " ") {
      e.preventDefault();
      return;
    }

    // Permite apenas letras e espaço
    if (inputChar && !/^[a-zA-ZÀ-ÿ ]$/.test(inputChar)) {
      e.preventDefault();
      return;
    }

    // Bloqueia espaço se a primeira palavra ainda não tiver 3 letras
    if (inputChar === " ") {
      const partes = value.trim().split(" ");
      const primeiraPalavra = partes[0] || "";

      if (primeiraPalavra.length < 3) {
        e.preventDefault();
        return;
      }
    }
  });

  // Validação visual no blur
  nameInput.addEventListener("blur", () => {
    const value = nameInput.value.trim();
    const partes = value.split(" ");

    if (partes[0].length < 3) {
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
      nameInput.setCustomValidity(
        "O primeiro nome deve ter no mínimo 3 letras."
      );
    } else {
      nameInput.classList.remove("is-invalid");
      nameInput.classList.add("is-valid");
      nameInput.setCustomValidity("");
    }
  });
  // Validação ao enviar o formulário
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.classList.add("was-validated");
    }
  });

  // Gerar código Pix aleatório
  const inputPix = document.getElementById("meuTexto");
  inputPix.value = [...Array(40)]
    .map(() => Math.random().toString(36)[2])
    .join("");

  // Copiar Pix para a área de transferência com feedback visual
  const btn = document.getElementById("btnCopiar");
  const toastEl = document.getElementById("toastCopiado");
  const toast = new bootstrap.Toast(toastEl);
  const icone = document.getElementById("iconeBotao");

  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(inputPix.value).then(() => {
      toast.show();
      icone.classList.replace("fa-clipboard", "fa-clipboard-check");
      setTimeout(
        () => icone.classList.replace("fa-clipboard-check", "fa-clipboard"),
        2000
      );
    });
  });
});