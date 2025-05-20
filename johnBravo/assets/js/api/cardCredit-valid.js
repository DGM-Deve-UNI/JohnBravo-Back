document.addEventListener("DOMContentLoaded", () => {
  const modalCardName = document.getElementById("modalCardName");
  const modalCardNumber = document.getElementById("modalCardNumber");
  const modalExpiry = document.getElementById("modalExpiry");
  const modalCvv = document.getElementById("modalCvv");
  const btnSalvar = document.getElementById("btnSalvarCartao");
  const toastSuccess = new bootstrap.Toast(
    document.getElementById("toastSuccess")
  );
  const toastError = new bootstrap.Toast(document.getElementById("toastError"));

  // Nome do titular - máscara e validação
  modalCardName.addEventListener("input", () => {
    let value = modalCardName.value;
    value = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    if (value.trim().length < 3) {
      value = value.replace(/\s/g, "");
    }
    modalCardName.value = value;
    validarCampo(modalCardName, value.length >= 3 && !/^ /.test(value));
  });

  // Número do cartão - máscara com limite de 16 dígitos
  modalCardNumber.addEventListener("input", () => {
    let value = modalCardNumber.value.replace(/\D/g, "").slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    modalCardNumber.value = value;
    validarCampo(modalCardNumber, value.replace(/\s/g, "").length === 16);
  });

  // Validade - MM/AA
  modalExpiry.addEventListener("input", () => {
    let value = modalExpiry.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    modalExpiry.value = value;
    validarCampo(modalExpiry, /^(0[1-9]|1[0-2])\/\d{2}$/.test(value));
  });

  // CVV - apenas números (3 ou 4 dígitos)
  modalCvv.addEventListener("input", () => {
    modalCvv.value = modalCvv.value.replace(/\D/g, "").slice(0, 4);
    validarCampo(modalCvv, /^\d{3,4}$/.test(modalCvv.value));
  });

  // Função de validação em tempo real
  function validarCampo(campo, condicao) {
    if (condicao) {
      campo.classList.add("is-valid");
      campo.classList.remove("is-invalid");
    } else {
      campo.classList.add("is-invalid");
      campo.classList.remove("is-valid");
    }
  }

  // Função de validação geral
  function validarModalCampos() {
    let valid = true;

    // Nome do titular
    const nome = modalCardName.value.trim();
    const partes = nome.split(" ");
    if (nome.length < 3 || !partes[0] || partes[0].length < 3) {
      modalCardName.classList.add("is-invalid");
      modalCardName.classList.remove("is-valid");
      valid = false;
    } else {
      modalCardName.classList.remove("is-invalid");
      modalCardName.classList.add("is-valid");
    }

    // Número do cartão
    const numero = modalCardNumber.value.replace(/\s/g, "");
    if (numero.length !== 16 || !/^\d+$/.test(numero)) {
      modalCardNumber.classList.add("is-invalid");
      modalCardNumber.classList.remove("is-valid");
      valid = false;
    } else {
      modalCardNumber.classList.remove("is-invalid");
      modalCardNumber.classList.add("is-valid");
    }

    // Validade
    const validade = modalExpiry.value;
    const regexValidade = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regexValidade.test(validade)) {
      modalExpiry.classList.add("is-invalid");
      modalExpiry.classList.remove("is-valid");
      valid = false;
    } else {
      modalExpiry.classList.remove("is-invalid");
      modalExpiry.classList.add("is-valid");
    }

    // CVV
    const cvv = modalCvv.value;
    if (!/^\d{3,4}$/.test(cvv)) {
      modalCvv.classList.add("is-invalid");
      modalCvv.classList.remove("is-valid");
      valid = false;
    } else {
      modalCvv.classList.remove("is-invalid");
      modalCvv.classList.add("is-valid");
    }

    return valid;
  }

  // Salvar
  btnSalvar.addEventListener("click", () => {
    if (validarModalCampos()) {
      toastSuccess.show();
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("exampleModal")
        );
        modal.hide();
        limparCampos();
      }, 2000);
    } else {
      toastError.show();
    }
  });

  // Limpar os campos após salvar
  function limparCampos() {
    modalCardName.value = "";
    modalCardNumber.value = "";
    modalExpiry.value = "";
    modalCvv.value = "";
    // ---------------------------------------------------- \\
    modalCardName.classList.remove("is-invalid", "is-valid");
    modalCardNumber.classList.remove("is-invalid", "is-valid");
    modalExpiry.classList.remove("is-invalid", "is-valid");
    modalCvv.classList.remove("is-invalid", "is-valid");
  }
});