import { setTheme } from "./utils/theme.js";

// Função para abrir o modal de funcionário com os dados
function openEmployeeModal(id, name, role, phone, email, status) {
  document.getElementById("employeeId").value = id;
  document.getElementById("employeeName").value = name;
  document.getElementById("employeeRole").value = role;
  document.getElementById("employeePhone").value = phone;
  document.getElementById("employeeEmail").value = email;
  document.getElementById("employeeStatus").value = status;

  var modal = new bootstrap.Modal(document.getElementById("employeeModal"));
  modal.show();
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

// Função para confirmar exclusão
function confirmDelete(id) {
  document.getElementById("employeeToDelete").value = id;
  var modal = new bootstrap.Modal(
    document.getElementById("confirmDeleteModal")
  );
  modal.show();
}

// Função para excluir funcionário
function deleteEmployee() {
  const id = document.getElementById("employeeToDelete").value;
  alert(`Funcionário ID ${id} excluído com sucesso!`);

  // Fechar os modais
  var confirmModal = bootstrap.Modal.getInstance(
    document.getElementById("confirmDeleteModal")
  );
  confirmModal.hide();

  var employeeModal = bootstrap.Modal.getInstance(
    document.getElementById("employeeModal")
  );
  if (employeeModal) employeeModal.hide();

  // Aqui você faria a requisição AJAX para excluir no servidor
}

// Função para salvar alterações do funcionário
function saveEmployee() {
  const form = document.getElementById("employeeForm");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const employeeData = {
    id: document.getElementById("employeeId").value,
    name: document.getElementById("employeeName").value,
    role: document.getElementById("employeeRole").value,
    phone: document.getElementById("employeePhone").value,
    email: document.getElementById("employeeEmail").value,
    status: document.getElementById("employeeStatus").value,
  };

  console.log("Dados atualizados:", employeeData);
  alert("Funcionário atualizado com sucesso!");

  var modal = bootstrap.Modal.getInstance(
    document.getElementById("employeeModal")
  );
  modal.hide();
}

// Função para adicionar novo funcionário
function addEmployee() {
  const form = document.getElementById("addEmployeeForm");
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const newEmployee = {
    name: document.getElementById("newEmployeeName").value,
    role: document.getElementById("newEmployeeRole").value,
    phone: document.getElementById("newEmployeePhone").value,
    email: document.getElementById("newEmployeeEmail").value,
  };

  console.log("Novo funcionário:", newEmployee);
  alert("Funcionário adicionado com sucesso!");

  var modal = bootstrap.Modal.getInstance(
    document.getElementById("addEmployeeModal")
  );
  modal.hide();
  form.reset();
  form.classList.remove("was-validated");
}
