export function setTheme(mode, darkModeToggle, htmlTag) {
  if (mode === "dark") {
    htmlTag.setAttribute("data-bs-theme", "dark");
    htmlTag.setAttribute("data-mdb-theme", "dark");
    darkModeToggle.checked = false;
  } else {
    htmlTag.setAttribute("data-bs-theme", "light");
    htmlTag.setAttribute("data-mdb-theme", "light");
    darkModeToggle.checked = true;
  }

  localStorage.setItem("theme", mode);

    const logo = document.getElementById("logo");
    if (logo) {
    // Localiza a raiz do projeto baseado em onde "assets" aparece no caminho
    const pathParts = window.location.pathname.split("/");
    const assetsIndex = pathParts.indexOf("assets");
    const projectRoot = pathParts.slice(0, assetsIndex).join("/");

    const basePath = `${window.location.origin}${projectRoot}`;

    logo.src =
        mode === "dark"
        ? `${basePath}/assets/imgs/logos/white/logo-white.png`
        : `${basePath}/assets/imgs/logos/dark/logo.png`;
    }
}