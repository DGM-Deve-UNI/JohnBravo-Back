// Função para mostrar o modal com título, mensagem e cor
function mostrarModal(titulo, mensagem, corFundo) {
  document.getElementById("modalLabel").innerText = titulo;
  document.getElementById("modalMessage").innerHTML = mensagem;

  let modalElement = document.getElementById("modal");
  let modal = new mdb.Modal(modalElement);

  let modalHeader = document.getElementById("modal-header");
  let btn = document.getElementById("btn-modal");

  modalHeader.className = "modal-header rounded-8 rounded-bottom-0 border";
  btn.className = "btn btn-rounded border border-2";

  modalHeader.classList.add(corFundo, "text-white");
  btn.classList.add(corFundo, "text-white");

  modal.show();

  modalElement.addEventListener("hidden.mdb.modal", function () {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  });
}
// ===========================================================================\\
async function login(event) {
  event.preventDefault();
// console.log("🧪 Login disparado");
  const login = document.getElementById("email-login").value;
  const senha = document.getElementById("senha").value;
// console.log("🚀 Enviando dados...", login, senha);
  try {
    const response = await fetch("/dgm-projetos/back-end/src/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, senha }),
    });

    const data = await response.json();
// console.log("📦 Resposta:", data);

    if (data.success) {
      mostrarModal("✅ Sucesso", data.message, "bg-success", "border-success");
    // Gerar um token aleatório
      let token = Math.random().toString(16).substring(2);
    // Salvar os dados do usuário e o token no sessionStorage
      sessionStorage.setItem("userData", JSON.stringify(data.userData));
      sessionStorage.setItem("token", token);
    // Salvar os dados do usuário no sessionStorage
      sessionStorage.setItem("userData", JSON.stringify(data.userData));

      setTimeout(() => {
        window.location.href = "../../../index.html";
      }, 2000);
    } else {
      mostrarModal(
        "⚠️ Erro de Login",
        data.message,
        "bg-danger",
        "border-danger"
      );
    }
  } catch (err) {
// console.error("❌ Erro:", err);
    mostrarModal(
      "⚠️ Erro",
      "Ocorreu um erro ao tentar fazer login. Tente novamente.",
      "bg-danger",
      "border-danger"
    );
  }
} document.getElementById("loginBtn").addEventListener("click", login);