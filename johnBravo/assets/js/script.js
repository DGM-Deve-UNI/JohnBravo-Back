import { loadPage } from "./utils/loadPage.js";
import { setupLinks } from "./utils/setupLinks.js";
import { highlightMenu } from "./utils/highlightMenu.js";
import { setTheme } from "./utils/theme.js";
import { setupAccessibility } from "./utils/accessibility.js";
import { handleScrollToTopButton, scrollToTop } from "./utils/scrollToTop.js";

// Função para atualizar o título da página
function updatePageTitle(pageName) {
  const titles = {
    "home.html": "Página Inicial - JohnBravo Barbearia",
    "sobre.html": "Sobre - JohnBravo Barbearia",
    "services.html": "Serviços - JohnBravo Barbearia",
    "agendar.html": "Agendar - JohnBravo Barbearia",
    "contatos.html": "Contatos - JohnBravo Barbearia",
    // Adicione mais títulos conforme necessário
  };

  document.title = titles[pageName] || "JohnBravo Barbearia"; // Título padrão
}

document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  // Página inicial definida com fallback
  const initialPage =
    sessionStorage.getItem("currentPage") || "assets/html/pages/home.html";
  loadPage(initialPage, contentDiv); // Carregar conteúdo da página inicial

  // Atualizar título da página carregada
  const pageName = initialPage.split("/").pop(); // Pega o nome da página, ex: "home.html"
  updatePageTitle(pageName); // Atualiza o título conforme o nome da página

  // Configura os links de navegação
  setupLinks(contentDiv, navbarCollapse, navbarToggler);

  const currentLink = [...document.querySelectorAll("nav a, footer a")].find(
    (link) => link.getAttribute("href") === initialPage
  );
  if (currentLink) {
    highlightMenu(currentLink); // Destacar o item de menu correto
  }

  // --- Seção de Dark Mode ---
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

  // Configura o botão de rolar para o topo
  handleScrollToTopButton();
  document
    .getElementById("scrollToTopBtn")
    .addEventListener("click", scrollToTop);

  // --- Seção de Acessibilidade ---
  const increaseFontBtn = document.getElementById("increase-font-btn");
  const decreaseFontBtn = document.getElementById("decrease-font-btn");
  let fontSize = localStorage.getItem("fontSize")
    ? parseInt(localStorage.getItem("fontSize"))
    : 16;
  setupAccessibility(fontSize, increaseFontBtn, decreaseFontBtn);
});

// const basePath = window.location.pathname.split("/")[1];
// const apiUrl = `${window.location.origin}/${basePath}/johnBravo/assets/html/components/modal.html`;
// fetch(apiUrl)
//   .then((response) => response.text())
//   .then((data) => {
//     document.getElementById("modalContainer").innerHTML = data;
//   });
