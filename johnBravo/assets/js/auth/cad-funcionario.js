async function novoFuncionario() {
  const form = document.getElementById("addNovoFuncionario");
  const formData = new FormData(form);

  try {
    const basePath = window.location.pathname.split("/")[1];
    const apiUrl = `${window.location.origin}/${basePath}/back-end/src/cad-funcionario.php`; // ajuste o nome do arquivo se necessário

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      alert("✅ Funcionário cadastrado com sucesso!");
      // Pode fechar o modal, limpar formulário, atualizar lista, etc.
      form.reset();
      bootstrap.Modal.getInstance(
        document.getElementById("modalNovoFuncionario")
      ).hide();
    } else {
      alert("⚠️ Erro: " + result.message);
    }
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro de comunicação com o servidor.");
  }
}
