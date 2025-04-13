// == Script global com funções básicas da página de login e cadastro == \\
import { setTheme } from '../utils/theme.js';
import { limparFormulario } from "../utils/clearForm.js";
import { handleScrollToTopButton, scrollToTop } from '../utils/scrollToTop.js';
// ===========================================================================\\
document.addEventListener('DOMContentLoaded', () => {
  // --- Seção de Dark Mode --- \\
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const htmlTag = document.documentElement;
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  setTheme(savedTheme, darkModeToggle, htmlTag);

  darkModeToggle.addEventListener("click", () => {
    const currentTheme =
      htmlTag.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    setTheme(currentTheme, darkModeToggle, htmlTag);
  });
  // -- Configura o botão de rolar para o topo -- \\
  handleScrollToTopButton();
  document
    .getElementById("scrollToTopBtn")
    .addEventListener("click", scrollToTop);
  // --- Seção de Acessibilidade "tamanho de fonte" --- \\
  const increaseFontBtn = document.getElementById("increase-font-btn");
  const decreaseFontBtn = document.getElementById("decrease-font-btn");
  let fontSize = localStorage.getItem("fontSize")
    ? parseInt(localStorage.getItem("fontSize"))
    : 16;
  // -- Configurar tamanho da fonte, se necessário -- \\
  document.body.style.fontSize = `${fontSize}px`;
  increaseFontBtn.addEventListener("click", () => {
    fontSize += 2;
    document.body.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  });
  decreaseFontBtn.addEventListener("click", () => {
    fontSize = Math.max(12, fontSize - 2);
    document.body.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  });
  // -- Botão de fechar o modal -- \\
  const closeButton = document.getElementById("closeModalButton");
  if (closeButton) {
    closeButton.addEventListener("click", fecharEVoltar);
  }

  function limparCampos() {
    document.getElementById("typeEmail").value = "";
  }
  // -- Adiciona o listener ao botão de cancelar -- \\
  const cancelButton = document.getElementById("cancelButton");
  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      limparCampos();
    });
  }
  // -- Fechar e desfocar o elemento ativo para os modais (página login) -- \\
  function handleModalBlur(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.addEventListener("hide.mdb.modal", () => {
        if (modal.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      });

      modal.addEventListener("hidden.mdb.modal", () => {
        if (modal.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      });
    }
  } handleModalBlur("modal"); handleModalBlur("RecModal");
});