import { loadMap } from "./loadMap.js";
import { refreshDynamicLinks } from "./setupLinks.js";

// ===========================================================================\\
export function loadPage(url, contentDiv) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar a página");
      }
      return response.text();
    })
    .then((data) => {
      contentDiv.innerHTML = data;
      window.scrollTo(0, 0);

      // Recarrega os links dinâmicos
      refreshDynamicLinks(contentDiv);

      // Atualiza o título da página
      updatePageTitle(url);

      // Atualiza a URL (com hash)
      updatePageUrl(url);

      // Verifica se a página de contatos foi carregada
      if (url.includes("contatos.html")) {
        loadMap();
      }

      // Verifica se a página carregada é 'agendar.html'
      if (url.includes("agendar.html")) {
        loadAgendarScript();
      }
    })
    .catch((error) => console.error("Erro:", error));
}

function loadAgendarScript() {
  if (!window.agendarScriptLoaded) {
    window.agendarScriptLoaded = true;

    const script = document.createElement("script");
    script.src = "assets/js/agendar.js";
    script.onload = () => {
      console.log("Script agendar.js carregado com sucesso!");
    };
    script.onerror = () => {
      console.error("Erro ao carregar o script agendar.js");
    };

    document.head.appendChild(script);
  }
}

// Função para atualizar o título da página conforme o nome da página carregada
function updatePageTitle(url) {
  const titles = {
    "home.html": "Página Inicial - JohnBravo Barbearia",
    "sobre.html": "Sobre - JohnBravo Barbearia",
    "services.html": "Serviços - JohnBravo Barbearia",
    "agendar.html": "Agendar - JohnBravo Barbearia",
    "contatos.html": "Contatos - JohnBravo Barbearia",
    // Adicione mais títulos conforme necessário
  };

  // Extrai o nome da página do URL e atualiza o título
  const pageName = url.split("/").pop();
  document.title = titles[pageName] || "JohnBravo Barbearia"; // Título padrão
}

// Função para atualizar a URL com hash
function updatePageUrl(url) {
  const pageName = url.split("/").pop().replace(".html", ""); // Extrai o nome da página sem a extensão

  // Define o novo caminho como #nome-da-página (ex: #home, #sobre)
  const newUrl = `#${pageName}`;

  // Atualiza a URL no navegador sem recarregar a página
  window.history.pushState({ path: newUrl }, "", newUrl);
}

// Função para carregar a página inicial com base no hash da URL
function loadPageByHash() {
  const hash = window.location.hash.slice(1); // Remove o "#" da URL

  const contentDiv = document.getElementById("content");

  // Carrega o conteúdo de acordo com o hash
  switch (hash) {
    case "home":
      loadPage("home.html", contentDiv);
      break;
    case "sobre":
      loadPage("sobre.html", contentDiv);
      break;
    case "services":
      loadPage("services.html", contentDiv);
      break;
    case "agendar":
      loadPage("agendar.html", contentDiv);
      break;
    case "contatos":
      loadPage("contatos.html", contentDiv);
      break;
    default:
      loadPage("404.html", contentDiv);
      break;
  }
}

// Quando a URL hash mudar (ao clicar nos links, por exemplo), carrega o conteúdo correspondente
window.addEventListener("hashchange", loadPageByHash);

// Quando a página for carregada, verifica o hash atual para carregar a página
document.addEventListener("DOMContentLoaded", () => {
  loadPageByHash(); // Carrega a página inicial com base no hash atual
});