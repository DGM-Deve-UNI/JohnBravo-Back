document.addEventListener("DOMContentLoaded", function () {
  // Verificar se usuário está logado e tem cartão cadastrado
  checkUserStatus();

  // Máscaras para os campos do cartão
  const cardNumber = document.getElementById("cardNumber");
  const cardExpiry = document.getElementById("cardExpiry");
  const cardCvv = document.getElementById("cardCvv");
  const debitCardNumber = document.getElementById("debitCardNumber");
  const debitCardExpiry = document.getElementById("debitCardExpiry");
  const debitCardCvv = document.getElementById("debitCardCvv");

  if (cardNumber) {
    cardNumber.addEventListener("input", function (e) {
      e.target.value = e.target.value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    });
  }

  if (debitCardNumber) {
    debitCardNumber.addEventListener("input", function (e) {
      e.target.value = e.target.value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    });
  }

  if (cardExpiry) {
    cardExpiry.addEventListener("input", function (e) {
      e.target.value = e.target.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(?=\d)/g, "$1/")
        .substring(0, 5);
    });
  }

  if (debitCardExpiry) {
    debitCardExpiry.addEventListener("input", function (e) {
      e.target.value = e.target.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(?=\d)/g, "$1/")
        .substring(0, 5);
    });
  }

  if (cardCvv) {
    cardCvv.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "").substring(0, 4);
    });
  }

  if (debitCardCvv) {
    debitCardCvv.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "").substring(0, 4);
    });
  }

  // Formulário de cartão de crédito
  const creditCardForm = document.getElementById("creditCardForm");
  if (creditCardForm) {
    creditCardForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showPaymentConfirmation("credit");
    });
  }

  // Formulário de cartão de débito
  const debitCardForm = document.getElementById("debitCardForm");
  if (debitCardForm) {
    debitCardForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showPaymentConfirmation("debit");
    });
  }

  // Botão de copiar chave PIX
  const copyPixBtn = document.getElementById("copyPixBtn");
  if (copyPixBtn) {
    copyPixBtn.addEventListener("click", function () {
      navigator.clipboard.writeText("123.456.789-00");
      showToast("Chave PIX copiada para a área de transferência!");
    });
  }

  // Botão de gerar QR Code
  const generateQrCodeBtn = document.getElementById("generateQrCodeBtn");
  if (generateQrCodeBtn) {
    generateQrCodeBtn.addEventListener("click", function () {
      const qrCodeModal = new bootstrap.Modal(
        document.getElementById("qrCodeModal")
      );
      qrCodeModal.show();
    });
  }

  // Botão de confirmar PIX
  const confirmPixBtn = document.getElementById("confirmPixBtn");
  if (confirmPixBtn) {
    confirmPixBtn.addEventListener("click", function () {
      const pixPaid = document.getElementById("pixPaid").checked;
      if (!pixPaid) {
        showToast(
          'Por favor, marque a opção "Já efetuei o pagamento via PIX" para continuar.',
          "warning"
        );
        return;
      }
      showPaymentConfirmation("pix");
    });
  }

  // Botão de confirmar pagamento no modal
  const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
  if (confirmPaymentBtn) {
    confirmPaymentBtn.addEventListener("click", function () {
      processPayment();
    });
  }

  // Mostrar modal de confirmação de pagamento
  function showPaymentConfirmation(paymentMethod) {
    const paymentConfirmationModal = new bootstrap.Modal(
      document.getElementById("paymentConfirmationModal")
    );

    // Atualizar texto do modal baseado no método de pagamento
    const modalBody = document.querySelector(
      "#paymentConfirmationModal .modal-body p:first-child"
    );
    if (paymentMethod === "credit") {
      modalBody.textContent =
        "Tem certeza que deseja finalizar o pagamento com cartão de crédito?";
    } else if (paymentMethod === "debit") {
      modalBody.textContent =
        "Tem certeza que deseja finalizar o pagamento com cartão de débito?";
    } else if (paymentMethod === "pix") {
      modalBody.textContent =
        "Tem certeza que deseja confirmar o pagamento via PIX?";
    }

    paymentConfirmationModal.show();
  }

  // Processar pagamento (simulação)
  function processPayment() {
    // Simular processamento
    showToast("Processando seu pagamento...", "info");

    // Fechar modal de confirmação
    const paymentConfirmationModal = bootstrap.Modal.getInstance(
      document.getElementById("paymentConfirmationModal")
    );
    paymentConfirmationModal.hide();

    // Simular atraso no processamento
    setTimeout(function () {
      // Simular sucesso no pagamento
      simulatePaymentSuccess();
    }, 2000);
  }

  // Simular sucesso no pagamento
  function simulatePaymentSuccess() {
    // Mostrar mensagem de sucesso
    showToast("Pagamento realizado com sucesso! Redirecionando...", "success");

    // Redirecionar para página de sucesso após 3 segundos
    setTimeout(function () {
      window.location.href = "../../html/pages/sucesso.html";
    }, 3000);
  }

  // Mostrar toast notification
  function showToast(message, type = "success") {
    const toast = document.getElementById("paymentToast");
    const toastBody = toast.querySelector(".toast-body");

    // Configurar cor baseada no tipo
    if (type === "success") {
      toast.querySelector(".toast-header").className =
        "toast-header bg-success text-white";
    } else if (type === "warning") {
      toast.querySelector(".toast-header").className =
        "toast-header bg-warning text-dark";
    } else if (type === "error") {
      toast.querySelector(".toast-header").className =
        "toast-header bg-danger text-white";
    } else if (type === "info") {
      toast.querySelector(".toast-header").className =
        "toast-header bg-info text-white";
    }

    toastBody.textContent = message;

    // Mostrar toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  }

  // Verificar status do usuário (simulação)
  function checkUserStatus() {
    // Simular verificação no servidor
    setTimeout(function () {
      // Simular que usuário está logado mas não tem cartão cadastrado
      const isLoggedIn = true;
      const hasSavedCard = false;

      if (isLoggedIn && !hasSavedCard) {
        showToast(
          "Você está logado. Não encontramos cartões cadastrados.",
          "info"
        );
      }
    }, 1000);
  }
});
