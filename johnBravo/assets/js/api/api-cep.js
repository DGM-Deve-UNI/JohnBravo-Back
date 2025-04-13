export async function consultaCEP(cep) {
    const camposEndereco = ['endereco', 'bairro', 'cidade', 'estado'];
    const feedbackCep = document.getElementById('feedbackCep');
    const inputCep = document.getElementById('cep');

    // Limpa classes e feedback anterior
    inputCep.classList.remove("is-invalid", "is-valid");
    feedbackCep.classList.remove("invalid-feedback", "valid-feedback", "ms-2", "pt-2");
    feedbackCep.textContent = '';

    // Remove tudo que não for número
    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) {
        camposEndereco.forEach(campo => {
            const campoInput = document.getElementById(campo);
            campoInput.value = "";
            campoInput.disabled = false;
            campoInput.classList.remove("is-valid");
            campoInput.classList.add("is-invalid");
        });

        // Feedback para CEP inválido
        feedbackCep.textContent = 'CEP inválido! Digite 8 dígitos.';
        feedbackCep.classList.add("invalid-feedback", "ms-2", "pt-2");
        inputCep.classList.add("is-invalid");

        return false;
    }

    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const response = await fetch(url);
        
        // Verifica se a resposta é ok
        if (!response.ok) {
            throw new Error('Erro na consulta de CEP');
        }
        
        const data = await response.json();

        if (data.erro) {
            camposEndereco.forEach(campo => {
                const campoInput = document.getElementById(campo);
                campoInput.value = "";
                campoInput.disabled = false;
                campoInput.classList.remove("is-valid");
                campoInput.classList.add("is-invalid");
            });

            // Feedback para CEP não encontrado
            feedbackCep.textContent = 'CEP não encontrado!';
            feedbackCep.classList.add("invalid-feedback", "ms-2", "pt-2");
            inputCep.classList.add("is-invalid");

            return false;
        }

        // Preenche campos de endereço
        document.getElementById('endereco').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;

        camposEndereco.forEach(campo => {
            const campoInput = document.getElementById(campo);
            campoInput.classList.remove("is-invalid");
            campoInput.classList.add("is-valid");
            campoInput.disabled = true;
        });

        // Ativa efeito do label
        atualizarLabelEndereco();
        
        // Marca o CEP como válido
        feedbackCep.textContent = 'CEP válido!';
        inputCep.classList.add("is-valid");
        feedbackCep.classList.add("valid-feedback", "ms-2", "pt-2");

        return true;
    } catch (error) {
        console.error('Erro na consulta de CEP:', error);
        
        camposEndereco.forEach(campo => {
            const campoInput = document.getElementById(campo);
            campoInput.value = "";
            campoInput.disabled = false;
            campoInput.classList.remove("is-valid");
            campoInput.classList.add("is-invalid");
        });

        feedbackCep.textContent = 'Erro ao consultar CEP!';
        feedbackCep.classList.add("invalid-feedback", "ms-2", "pt-2");
        inputCep.classList.add("is-invalid");

        return false;
    }
}

// Função para "subir" os labels
function atualizarLabelEndereco() {
    const camposEndereco = ['endereco', 'bairro', 'cidade', 'estado'];
    camposEndereco.forEach(campo => {
        const input = document.getElementById(campo);
        input.dispatchEvent(new Event('input'));
    });
}