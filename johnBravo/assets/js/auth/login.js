// Função para mostrar o modal com título, mensagem e cor
function mostrarModal(titulo, mensagem, corFundo, corBotao, mostrarBotao) {
  document.getElementById("modalLabel").innerText = titulo;
  document.getElementById("modalMessage").innerHTML = mensagem;

  let modalElement = document.getElementById("modal");
  let modal = new mdb.Modal(modalElement);

  let modalHeader = document.getElementById("modal-header");
  let btn = document.getElementById("btn-modal");

  modalHeader.className = "modal-header rounded-8 rounded-bottom-0 border";
  btn.className = "btn btn-rounded border border-2";

  modalHeader.classList.add(corFundo, "text-white");
  btn.classList.add(corBotao, "text-white");

  // Se mostrarBotao for true, remove a classe d-none, caso contrário, adiciona
  if (mostrarBotao) {
    btn.classList.remove("d-none");
  } else {
    btn.classList.add("d-none");
  }

  modal.show();

  modalElement.addEventListener("hidden.mdb.modal", function () {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  });
}

// Função de login
async function login(event) {
  event.preventDefault();

  const login = document.getElementById("email-login").value;
  const senha = document.getElementById("senha").value;

  try {
    const basePath = window.location.pathname.split("/")[1];
    const apiUrl = `${window.location.origin}/${basePath}/back-end/src/login.php`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, senha }),
    });

    const data = await response.json();

    if (data.success) {
      // Exibe o modal de sucesso
      mostrarModal(
        "✅ Sucesso",
        data.message,
        "bg-success",
        "btn-success",
        false
      );

      // Gerar um token aleatório
      let token = Math.random().toString(16).substring(2);

      // Salvar os dados do usuário e o token no sessionStorage
      sessionStorage.setItem("userData", JSON.stringify(data.userData));
      sessionStorage.setItem("token", token);

      // Exibe o modal informando que o redirecionamento está acontecendo
      setTimeout(() => {
        mostrarModal(
          "⏳ Redirecionando...",
          "Você será redirecionado para a página inicial em breve...",
          "bg-warning",
          "btn-warning",
          false // Não mostrar o botão "Fechar"
        );

        // Redirecionar após 2 segundos
        setTimeout(() => {
          window.location.href = "../../../index.html";
        }, 2000);
      }, 1000);
    } else {
      // Caso falhe o login, mostra a mensagem de erro
      mostrarModal(
        "⚠️ Erro de Login",
        data.message,
        "bg-danger",
        "btn-danger",
        true // Mostrar o botão "Fechar"
      );
    }
  } catch (err) {
    // Caso ocorra erro na requisição
    mostrarModal(
      "⚠️ Erro",
      "Ocorreu um erro ao tentar fazer login. Tente novamente.",
      "bg-danger",
      "btn-danger",
      true // Mostrar o botão "Fechar"
    );
  }
}

document.getElementById("loginBtn").addEventListener("click", login);
