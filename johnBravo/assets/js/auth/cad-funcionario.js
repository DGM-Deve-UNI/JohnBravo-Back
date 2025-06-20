// Inicializa máscaras quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  Inputmask({ mask: "(99) 99999-9999" }).mask(
    document.getElementById("telefoneFuncionario")
  );
});

// Função para mostrar modal de feedback
function showFeedbackModal(title, message, isSuccess = true) {
  const modalTitle = document.getElementById("feedbackModalTitle");
  const modalBody = document.getElementById("feedbackModalBody");

  modalTitle.textContent = title;
  modalBody.textContent = message;

  modalTitle.className = isSuccess
    ? "modal-title text-success"
    : "modal-title text-danger";

  const feedbackModal = new bootstrap.Modal(
    document.getElementById("feedbackModal")
  );
  feedbackModal.show();

  setTimeout(() => {
    bootstrap.Modal.getInstance(
      document.getElementById("feedbackModal")
    ).hide();
  }, 3000);
}

// Função para validar email básico
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// Função para validar telefone simples (apenas números e parênteses)
function validarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, "");
  return numeros.length === 10 || numeros.length === 11;
}

// Função para cadastrar novo funcionário
async function novoFuncionario() {
  const nome = document.getElementById("nomeFuncionario").value.trim();
  const cargo = document.getElementById("cargoFuncionario").value;
  const telefone = document.getElementById("telefoneFuncionario").value.trim();
  const email = document.getElementById("emailFuncionario").value.trim();
  const status = document.getElementById("statusFuncionario").value;
  const fotoInput = document.getElementById("fotoFuncionario");

  if (!nome || !cargo || !telefone || !email || !status) {
    showFeedbackModal("Erro", "Preencha todos os campos obrigatórios.", false);
    return;
  }

  if (!validarEmail(email)) {
    showFeedbackModal("Erro", "E-mail inválido.", false);
    return;
  }

  if (!validarTelefone(telefone)) {
    showFeedbackModal("Erro", "Telefone inválido.", false);
    return;
  }

  const formData = new FormData();
  formData.append("nomeFuncionario", nome);
  formData.append("cargoFuncionario", cargo);
  formData.append("telefoneFuncionario", telefone);
  formData.append("emailFuncionario", email);
  formData.append("statusFuncionario", status);
  if (fotoInput.files.length > 0) {
    formData.append("fotoFuncionario", fotoInput.files[0]);
  }

  try {
    const response = await fetch(
      "../../../../back-end/src/funcionario/cad-funcionario.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      showFeedbackModal(
        "Sucesso",
        data.message || "Funcionário cadastrado com sucesso!",
        true
      );

      setTimeout(() => {
        // Fecha o modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalNovoFuncionario")
        );
        modal.hide();

        // Limpa o formulário
        document.getElementById("addNovoFuncionario").reset();

        // Atualiza a tabela de funcionários sem recarregar a página
        if (typeof loadEmployees === "function") {
          loadEmployees(); // Atualiza lista após cadastrar
        }        
      }, 2000);
    } else {
      showFeedbackModal(
        "Erro",
        data.message || "Erro ao cadastrar funcionário.",
        false
      );
    }
  } catch (error) {
    showFeedbackModal("Erro", "Erro na comunicação com o servidor.", false);
    console.error("Erro no cadastro do funcionário:", error);
  }
}
// -----------------------------------------------------------------------------
// Editar funcionário
async function editEmployee(id) {
  try {
    const res = await fetch(
      `../../../../back-end/src/funcionario/buscarFuncionario.php?id=${id}`
    );
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    const f = data.funcionario;
    document.getElementById("employeeId").value = f.id;
    document.getElementById("employeeName").value = f.nome;
    document.getElementById("employeeRole").value = f.cargo;
    document.getElementById("employeePhone").value = f.telefone;
    document.getElementById("employeeEmail").value = f.email;
    document.getElementById("employeeStatus").value = f.status;

    new bootstrap.Modal(document.getElementById("employeeModal")).show();
  } catch (error) {
    showFeedbackModal("Erro", error.message, false);
  }
}


// Salvar alterações do funcionário
async function saveEmployee() {
  const id = document.getElementById("employeeId").value;
  const nome = document.getElementById("employeeName").value.trim();
  const cargo = document.getElementById("employeeRole").value;
  const telefone = document.getElementById("employeePhone").value.trim();
  const email = document.getElementById("employeeEmail").value.trim();
  const status = document.getElementById("employeeStatus").value;

  if (!nome || !cargo || !telefone || !email || !status) {
    showFeedbackModal("Erro", "Preencha todos os campos obrigatórios.", false);
    return;
  }

  try {
    const res = await fetch(
      "../../../../back-end/src/funcionario/editarFuncionario.php",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nome, cargo, telefone, email, status }),
      });

    const data = await res.json();
    if (data.success) {
      showFeedbackModal("Sucesso", "Funcionário atualizado com sucesso!", true);
      bootstrap.Modal.getInstance(document.getElementById("employeeModal")).hide();
      loadEmployees(); // Atualiza a lista
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    showFeedbackModal("Erro", error.message, false);
  }
}

// Excluir funcionário
async function confirmDeleteEmployee(id) {
  if (!confirm("Tem certeza que deseja excluir este funcionário?")) return;

  try {
    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(
      "../../../../back-end/src/funcionario/excluirFuncionario.php",
      {
        method: "POST", // Usando POST ao invés de DELETE
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      showFeedbackModal("Sucesso", "Funcionário excluído com sucesso!", true);
      loadEmployees(); // Atualiza a lista
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    showFeedbackModal("Erro", error.message, false);
    console.error("Erro ao excluir funcionário:", error);
  }
}

// =============================================================================
// Função para carregar os funcionários e implementar a busca
  // Elementos globais usados por loadEmployees
const tbody = document.getElementById("employeesTableBody");
const searchInput = document.getElementById("searchEmployee");
const paginationContainer = document.querySelector("#funcionarios .pagination");

let currentPage = 1;
let lastSearch = "";

// Função global para carregar funcionários
async function loadEmployees(search = "", page = 1) {
  try {
    const res = await fetch(
      `../../../../back-end/src/funcionario/pesquisarFuncionario.php?pesquisa=${encodeURIComponent(search)}&page=${page}`
    );

    // const text = await res.text();
    // console.log("Resposta bruta:", text);
    // const data = JSON.parse(text);
    const data = await res.json();

    console.log("Funcionários:", data);

    tbody.innerHTML = "";

    if (!data.success || data.funcionarios.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="7" class="text-center">Nenhum funcionário encontrado.</td></tr>';
      paginationContainer.innerHTML = "";
      return;
    }

    data.funcionarios.forEach((f) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${f.id}</td>
        <td>${f.nome}</td>
        <td>${f.cargo}</td>
        <td>${f.telefone}</td>
        <td>${f.email}</td>
        <td><span class="badge bg-${getStatusColor(f.status)}">${f.status}</span></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="editEmployee(${f.id})"><i class="fas fa-edit"></i></button>
          <button class="btn btn-sm btn-danger" onclick="confirmDeleteEmployee(${f.id})"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    renderPagination(data.total, data.pagina, data.porPagina);
  } catch (err) {
    console.error("Erro ao carregar funcionários:", err);
    tbody.innerHTML =
      '<tr><td colspan="7" class="text-center">Erro ao carregar funcionários.</td></tr>';
    paginationContainer.innerHTML = "";
  }
}

// Cor de status
function getStatusColor(status) {
  switch (status) {
    case "Ativo":
      return "success";
    case "Férias":
      return "warning";
    case "Afastado":
      return "info";
    case "Inativo":
      return "secondary";
    default:
      return "dark";
  }
}

// Paginação
function renderPagination(totalItems, currentPage, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = "";

  const createPageItem = (page, label, active = false, disabled = false) => {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (active) li.classList.add("active");
    if (disabled) li.classList.add("disabled");

    const a = document.createElement("a");
    a.classList.add("page-link");
    a.href = "#";
    a.textContent = label;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (!disabled && page !== currentPage) {
        loadEmployees(lastSearch, page);
      }
    });

    li.appendChild(a);
    return li;
  };

  paginationContainer.appendChild(
    createPageItem(currentPage - 1, "Anterior", false, currentPage === 1)
  );

  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.appendChild(createPageItem(i, i, i === currentPage));
  }

  paginationContainer.appendChild(
    createPageItem(currentPage + 1, "Próximo", false, currentPage === totalPages)
  );
}

// Inicializa a busca e eventos após o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  searchInput.addEventListener("input", () => {
    lastSearch = searchInput.value;
    currentPage = 1;
    loadEmployees(lastSearch, currentPage);
  });

  loadEmployees(); // Carrega a lista inicialmente
});

// Funções globais para edição e exclusão (placeholders)
// function editEmployee(id) {
//   console.log("Editar funcionário ID:", id);
// }

// function confirmDeleteEmployee(id) {
//   if (confirm("Tem certeza que deseja excluir este funcionário?")) {
//     console.log("Excluir funcionário ID:", id);
//   }
// }
