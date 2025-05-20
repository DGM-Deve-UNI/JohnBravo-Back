document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  const registroBtn = document.getElementById("registro-btn");
  const userLogin = document.getElementById("login_user");
  const logoutBtn = document.getElementById("logout-btn");
  const userIcon = document.getElementById("user-icon");
  // Navbar ----------------------------------------------- \\
  const userNameNavbar = document.getElementById("user-name");
  // Informações do usuário ------------------------------------------ \\
  const userInfo = document.getElementById("user-info");
  const userNameInfo = document.getElementById("user-name-info");
  const userNascimentoInfo = document.getElementById("user-data-info");
  const userEmailInfo = document.getElementById("user-email-info");
  const userCelInfo = document.getElementById("user-cel-info");
  const userTelInfo = document.getElementById("user-tel-info");
  const userCEPInfo = document.getElementById("user-cep-info");
  const userEnderecoInfo = document.getElementById("user-endereco-info");
  const userNumEndInfo = document.getElementById("user-num_end-info");
  const userEstadoInfo = document.getElementById("user-estado-info");
  const userCidadeInfo = document.getElementById("user-cidade-info");
  const userBairroInfo = document.getElementById("user-bairro-info");
  // Sidebar Mobile ------------------------------------------------------- \\
  const userNameSidebarMob = document.getElementById("user-name-sidebar-mob");
  const userEmailSidebarMob = document.getElementById("user-email-sidebar-mob");
  // Sidebar ------------------------------------------------------- \\
  const userNameSidebar = document.getElementById("user-name-sidebar");
  const userEmailSidebar = document.getElementById("user-email-sidebar");
// -------------------------------------------------------------------------- \\
  // Função para atualizar a navbar e o sidebar
  const updateUserDisplay = () => {
    const userData = sessionStorage.getItem("userData");
    const token = sessionStorage.getItem("token");

    if (userData && token) {
      loginBtn?.classList.add("d-none");
      registroBtn?.classList.add("d-none");
      userInfo?.classList.remove("d-none");
// -------------------------------------------------------------------------- \\
      const parsedUserData = JSON.parse(userData);
      const nome = parsedUserData.nome || "";
      const sobrenome = parsedUserData.sobrenome || "";
      const nascimento = parsedUserData.nascimento || "";
      const email = parsedUserData.email || "";
      const cel = parsedUserData.cel || "";
      const tel = parsedUserData.tel || "Nenhum";
      const login = parsedUserData.login || "";
      const CEP = parsedUserData.cep || "";
      const endereco = parsedUserData.endereco || "";
      const numEnd = parsedUserData.numEnd || "";
      const estado = parsedUserData.estado || "";
      const cidade = parsedUserData.cidade || "";
      const bairro = parsedUserData.bairro || "";
// -------------------------------------------------------------------------- \\
      // Atualizar navbar --------------------------------- \\
      userNameNavbar.textContent = nome + " " + sobrenome;
      // Atualizar sidebar ------------------------------- \\
      userLogin.textContent = login;
      // -------------------------------------------------- \\
      userNameSidebar.textContent = nome + " " + sobrenome;
      userEmailSidebar.textContent = email;
      // -------------------------------------------------- \\
      userNameSidebarMob.textContent = nome + " " + sobrenome;
      userEmailSidebarMob.textContent = email;
      // -------------------------------------------------- \\
      userNameInfo.textContent = nome + " " + sobrenome;
      userNascimentoInfo.textContent = nascimento;
      userEmailInfo.textContent = email;
      userCelInfo.textContent = cel;
      userTelInfo.textContent = tel;
      userCEPInfo.textContent = CEP;
      userEnderecoInfo.textContent = endereco;
      userNumEndInfo.textContent = numEnd;
      userEstadoInfo.textContent = estado;
      userCidadeInfo.textContent = cidade;
      userBairroInfo.textContent = bairro;
      // Atualizar ícone do usuário --------------------- \\
      if (userIcon) {
        userIcon.classList.remove("d-none");
      }
    } else {
      loginBtn?.classList.remove("d-none");
      registroBtn?.classList.remove("d-none");
      userInfo?.classList.add("d-none");
// -------------------------------------------------------------------------- \\
      // Limpar informações do sidebar e navbar
      if (userLogin) userLogin.textContent = "";
      // -------------------------------------------------- \\
      if (userNameNavbar) userNameNavbar.textContent = "";
      // -------------------------------------------------- \\
      if (userNameSidebar) userNameSidebar.textContent = "";
      if (userEmailSidebar) userEmailSidebar.textContent = "";
      // -------------------------------------------------- \\
      if (userNameSidebarMob) userNameSidebarMob.textContent = "";
      if (userEmailSidebarMob) userEmailSidebarMob.textContent = "";
      // -------------------------------------------------- \\
      if (userNameInfo) userNameInfo.textContent = "";
      if (userNascimentoInfo) userNascimentoInfo.textContent = "";
      if (userEmailInfo) userEmailInfo.textContent = "";
      if (userCelInfo) userCelInfo.textContent = "";
      if (userTelInfo) userTelInfo.textContent = "Nenhum";
      if (userCEPInfo) userCEPInfo.textContent = "";
      if (userEnderecoInfo) userEnderecoInfo.textContent = "";
      if (userNumEndInfo) userNumEndInfo.textContent = "";
      if (userEstadoInfo) userEstadoInfo.textContent = "";
      if (userCidadeInfo) userCidadeInfo.textContent = "";
      if (userBairroInfo) userBairroInfo.textContent = "";
      // Atualizar ícone do usuário --------------------- \\
      if (userIcon) {
        userIcon.classList.add("d-none");
      }
    }
  };
// -------------------------------------------------------------------------- \\
  // Evento de logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("token");
      updateUserDisplay();
    });
  }
  // Inicializa a navbar e sidebar
  updateUserDisplay();
});
