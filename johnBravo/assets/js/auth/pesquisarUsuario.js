document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("clientsTableBody");
  const searchInput = document.getElementById("searchClient");
  const paginationContainer = document.getElementById("paginationContainer");

  let currentPage = 1;
  let lastSearch = "";

  async function loadClients(search = "", page = 1) {
    try {
      const res = await fetch(
        `../../../../back-end/src/usuario/pesquisarUsuario.php?pesquisa=${encodeURIComponent(
          search
        )}&page=${page}`
      );
      const data = await res.json();

      // Forçar paginação para testes
    //   data.total = 20;
    //   data.pagina = page;
    //   data.porPagina = 5;


      // console.log("Resposta da API:", data);

      if (data.success) {
        tbody.innerHTML = "";
        if (data.usuarios.length === 0) {
          tbody.innerHTML =
            '<tr><td colspan="7" class="text-center">Nenhum cliente encontrado.</td></tr>';
          paginationContainer.innerHTML = "";
          return;
        }

        data.usuarios.forEach((c) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${c.id_user}</td>
              <td>${c.nome_user}</td>
              <td>${c.cel_user}</td>
              <td>${c.email_user}</td>
              <td>${c.data_cadastro_user ?? ""}</td>
              <td>
                ${
                  c.assinatura
                    ? `<span class="badge bg-success">${c.assinatura}</span>`
                    : `<span class="text-muted">Sem assinatura</span>`
                }
              </td>
             <!-- <td>
                <button class="btn btn-sm btn-primary" onclick="editClient(${
                  c.id_user
                })">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteClient(${
                  c.id_user
                })">Excluir</button>
              </td> -->
            `;
          tbody.appendChild(tr);
        });

        // Atualiza paginação
        renderPagination(data.total, data.pagina, data.porPagina);
      } else {
        tbody.innerHTML =
          '<tr><td colspan="7" class="text-center">Erro ao carregar clientes.</td></tr>';
        paginationContainer.innerHTML = "";
      }
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      tbody.innerHTML =
        '<tr><td colspan="7" class="text-center">Erro ao carregar clientes.</td></tr>';
      paginationContainer.innerHTML = "";
    }
  }

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
          loadClients(lastSearch, page);
        }
      });

      li.appendChild(a);
      return li;
    };

    // Anterior
    paginationContainer.appendChild(
      createPageItem(currentPage - 1, "Anterior", false, currentPage === 1)
    );

    for (let i = 1; i <= totalPages; i++) {
      paginationContainer.appendChild(createPageItem(i, i, i === currentPage));
    }

    // Próximo
    paginationContainer.appendChild(
      createPageItem(
        currentPage + 1,
        "Próximo",
        false,
        currentPage === totalPages
      )
    );
  }

  // Busca em tempo real
  searchInput.addEventListener("input", () => {
    lastSearch = searchInput.value;
    currentPage = 1;
    loadClients(lastSearch, currentPage);
  });

  // Inicializa
  loadClients();

  // Placeholder para ações
  window.editClient = function (id) {
    console.log("Editar cliente", id);
  };

  window.deleteClient = function (id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      console.log("Excluir cliente", id);
    }
  };
});
