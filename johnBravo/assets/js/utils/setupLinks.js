import { loadPage } from './loadPage.js';
import { highlightMenu } from './highlightMenu.js';
import { closeNavbar } from './closeNavMenu.js';
// ===========================================================================\\
// Função para configurar links dinâmicos
function setupDynamicLinks(contentDiv) {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.dynamic-links');
        if (link) {
            const url = link.getAttribute('href');
    
            if (!url || url.startsWith('javascript:')) {
                return;
            }
    
            // Tratar âncoras internas manualmente
            if (url.startsWith('#')) {
                e.preventDefault();
                const destino = document.querySelector(url);
                if (destino) {
                    destino.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }
    
            e.preventDefault();
    
            if (
                link.id === "login-btn" ||
                link.id === "registro-btn" ||
                link.id === "btn-perfil" ||
                link.id === "btn-settings"
            ) {
                window.location.href = url;
                return;
            }
    
            loadPage(url, contentDiv);
            highlightMenu(link);
            sessionStorage.setItem('currentPage', url);
        }
    });    
}

// Função para recarregar os links dinâmicos após carregar novo conteúdo
export function refreshDynamicLinks(contentDiv) {
    setupDynamicLinks(contentDiv);
}

// Função original modificada para incluir setupDynamicLinks
export function setupLinks(contentDiv, navbarCollapse, navbarToggler) {
    const menuLinks = document.querySelectorAll('nav a, footer a');
    
    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const url = link.getAttribute("href");

            // Se for um link especial, deixa o navegador tratar normalmente
            if (!url || url.startsWith("javascript:") || url.startsWith("#")) {
                return;
            }

            e.preventDefault();

            if (
                link.id === "login-btn" ||
                link.id === "registro-btn" ||
                link.id === "btn-perfil" ||
                link.id === "btn-settings"
            ) {
                window.location.href = url;
                return;
            }

            loadPage(url, contentDiv);
            highlightMenu(link);
            sessionStorage.setItem("currentPage", url);
            closeNavbar(navbarCollapse, navbarToggler);
        });
    });

    setupDynamicLinks(contentDiv);
}