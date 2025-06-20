// Função para adicionar uma nova assinatura
async function addSubscription() {
  const nome = document.getElementById('newSubscriptionName').value.trim();
  const descricao = document.getElementById('newSubscriptionDescription').value.trim();
  const preco = parseFloat(document.getElementById('newSubscriptionPrice').value);
  const ativo = document.getElementById('newSubscriptionActive').checked;
  const servicesContainer = document.getElementById('servicesContainer');

  // Validações básicas
  if (!nome) {
    alert('Informe o nome da assinatura.');
    return;
  }
  if (isNaN(preco) || preco <= 0) {
    alert('Informe um preço mensal válido.');
    return;
  }

  // Pega os serviços: nome e ativo
  const serviceDivs = servicesContainer.querySelectorAll('div.d-flex');
  const servicos = [];

  serviceDivs.forEach(div => {
    const nomeServico = div.querySelector('input[type="text"]').value.trim();
    const ativoServico = div.querySelector('input[type="checkbox"]').checked;
    if (nomeServico) {
      servicos.push({ nome: nomeServico, ativo: ativoServico ? 1 : 0 });
    }
  });

  if (servicos.length === 0) {
    alert('Adicione pelo menos um serviço.');
    return;
  }

  // Monta FormData para enviar
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('descricao', descricao);
  formData.append('valor', preco);
  formData.append('ativo', ativo ? 1 : 0);
  formData.append('servicos', JSON.stringify(servicos));

  try {
    const response = await fetch('../../../../back-end/src/assinatura/cad-assinatura.php', {
      method: 'POST',
      body: formData
    });

    const text = await response.text();
    console.log('Resposta do servidor:', text);

    const result = JSON.parse(text); // parse manual para pegar o erro

    if (result.success) {
      alert('Assinatura cadastrada com sucesso!');

      // Fecha o modal via JS usando Bootstrap 5
      const modalEl = document.getElementById('addSubscriptionModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
      }

      // Limpa os campos do formulário
      document.getElementById('addSubscriptionForm').reset();

      // Limpa os serviços adicionados dinamicamente
      servicesContainer.innerHTML = '';

    } else {
      alert('Erro: ' + (result.message || 'Não foi possível cadastrar a assinatura.'));
    }
  } catch (error) {
    alert('Erro na comunicação com o servidor.');
    console.error(error);
  }
}
// Função para adicionar um novo campo de serviço no modal
function addServiceField() {
  const container = document.getElementById("includedServicesContainer");
  const serviceDiv = document.createElement("div");
  serviceDiv.classList.add("d-flex", "align-items-center", "mb-2");
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("form-control", "me-2");
  input.placeholder = "Nome do serviço";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("form-check-input", "me-2");
  checkbox.checked = true; // padrão para ativo
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.classList.add("btn", "btn-danger", "btn-sm");
  removeBtn.textContent = "Remover";
  removeBtn.onclick = () => serviceDiv.remove();
  serviceDiv.appendChild(input);
  serviceDiv.appendChild(checkbox);
  serviceDiv.appendChild(removeBtn);
  container.appendChild(serviceDiv);
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
  // Exibir o botão "Voltar ao topo" quando o usuário rolar a página
  window.onscroll = function() {
    const btn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };
// =============================================================================
// Script modal assinaturas
document.addEventListener('DOMContentLoaded', () => {
    const addServiceBtn = document.getElementById('addServiceBtn');
    const servicesContainer = document.getElementById('servicesContainer');

    addServiceBtn.addEventListener('click', () => {
        const serviceDiv = document.createElement('div');
        serviceDiv.classList.add('d-flex', 'align-items-center', 'mb-2', 'gap-2');

        // Input do nome do serviço
        const serviceInput = document.createElement('input');
        serviceInput.type = 'text';
        serviceInput.classList.add('form-control');
        serviceInput.placeholder = 'Nome do serviço';
        serviceInput.name = 'serviceNames[]'; // nome para enviar no form se precisar
        serviceDiv.appendChild(serviceInput);

        // Checkbox ✔️❌
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input');
        checkbox.title = 'Ativado = ✔️ | Desmarcado = ❌';
        checkbox.checked = true;
        checkbox.name = 'serviceStatus[]';
        serviceDiv.appendChild(checkbox);

        // Botão de remover
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => serviceDiv.remove();
        serviceDiv.appendChild(removeBtn);

        servicesContainer.appendChild(serviceDiv);
    });
});
