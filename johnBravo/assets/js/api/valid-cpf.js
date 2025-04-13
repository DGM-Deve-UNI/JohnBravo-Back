// == Validação de CPF == \\
export function validarCPF(cpf) {
    const valor = cpf.value.replace(/[^\d]/g, '');
    const feedCPF = document.getElementById('feedbackCPF');
    
    cpf.classList.remove("is-invalid", "is-valid");
    feedCPF.classList.remove("invalid-feedback", "valid-feedback", "ms-2", "pt-2");
    feedCPF.textContent = "";

    if (cpf.value === '') {
        feedCPF.textContent = `O campo CPF é obrigatório!`;
        feedCPF.classList.add("invalid-feedback", "ms-2", "pt-2");
        cpf.classList.add("is-invalid");
        return false;
    }
    
    if (valor.length !== 11 || /^(\d)\1{10}$/.test(valor)) {
        feedCPF.textContent = `CPF inválido!`;
        feedCPF.classList.add("invalid-feedback", "ms-2", "pt-2");
        cpf.classList.add("is-invalid");
        return false;
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(valor.charAt(i)) * (10 - i);
    }
    
    let resto = 11 - (soma % 11);
    let digito1 = resto === 10 || resto === 11 ? 0 : resto;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(valor.charAt(i)) * (11 - i);
    }
    
    resto = 11 - (soma % 11);
    let digito2 = resto === 10 || resto === 11 ? 0 : resto;
    
    if (parseInt(valor.charAt(9)) === digito1 && parseInt(valor.charAt(10)) === digito2) {
        feedCPF.textContent = `CPF válido`;
        feedCPF.classList.add("valid-feedback", "ms-2", "pt-2");
        cpf.classList.add("is-valid");
        return true;
    } else {
        feedCPF.textContent = `Digite um CPF válido`;
        feedCPF.classList.add("invalid-feedback", "ms-2", "pt-2");
        cpf.classList.add("is-invalid");
        return false;
    }
}