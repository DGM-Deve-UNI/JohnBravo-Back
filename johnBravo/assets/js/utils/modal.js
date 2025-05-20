document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os botões com data-mdb-modal-init
  const modalButtons = document.querySelectorAll("[data-mdb-modal-init]");

  modalButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Impede o envio do formulário (caso seja um botão de submit)

      const targetModal = button.getAttribute("data-mdb-target"); // Obtém o ID do modal

      // Preenche o conteúdo do modal dinamicamente
      const modal = new mdb.Modal(document.querySelector(targetModal)); // Inicializa o modal
      const modalTitle = document.querySelector(targetModal + " .modal-title");
      const modalMessage = document.querySelector(
        targetModal + " #modalMessage"
      );

      // Preenche o conteúdo
      modalTitle.innerText = "Título Dinâmico";
      modalMessage.innerText = "Mensagem dinâmico no modal.";

      // Exibe o modal
      modal.show();
    });
  });
});
