document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  const registroBtn = document.getElementById("registro-btn");
  const userInfo = document.getElementById("user-info");
  const userName = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");
  const userIcon = document.getElementById("user-icon");
// ===========================================================================\\
  // Função para atualizar a navbar \\
  const updateNavbar = () => {
    const userData = sessionStorage.getItem("userData");
    const token = sessionStorage.getItem("token");

    if (userData && token) {
      loginBtn.classList.add("d-none");
      registroBtn.classList.add("d-none");
      userInfo.classList.remove("d-none");
    // Definindo o nome e sobrenome na navbar \\
      const parsedUserData = JSON.parse(userData);
      const nome = parsedUserData.nome || "Usuário";
      const sobrenome = parsedUserData.sobrenome || "";
    // Exibindo "Nome Sobrenome" \\
      userName.textContent = nome + " " + sobrenome;
    // Exibindo "Olá, Nome" \\
      // userName.textContent = "Olá, " + nome;
    // Mostrar o ícone do usuário (opcional)
      if (userIcon) {
        userIcon.classList.remove("d-none");
      }
    } else {
    // Mostrar os botões de login e cadastro \\
      loginBtn.classList.remove("d-none");
      registroBtn.classList.remove("d-none");
      userInfo.classList.add("d-none");
    // Esconder o ícone do usuário \\
      if (userIcon) {
        userIcon.classList.add("d-none");
      }
    }
  };
// ===========================================================================\\
  // Evento de logout \\
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
    // Limpar os dados de login e o token do sessionStorage \\
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("token");
    // Atualiza a navbar após logout \\
      updateNavbar();
    });
  } updateNavbar();
});