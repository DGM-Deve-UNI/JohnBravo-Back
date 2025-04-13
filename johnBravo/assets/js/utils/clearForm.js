// === Função do botão para limpar formulário === \\
export function limparFormulario() {
  // Limpar todos os campos
  document.querySelectorAll("input, select, textarea").forEach((campo) => {
    campo.value = "";
    campo.classList.remove("is-invalid", "is-valid");
  });

  // Limpar radio buttons
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
    radio.classList.remove("is-invalid", "is-valid");
  });

  // Limpar feedbacks
  document.querySelectorAll('[id^="feedback"]').forEach((feedback) => {
    feedback.textContent = "";
    feedback.className = "";
  });

  // Habilitar campos de endereço
  ["endereco", "bairro", "cidade", "estado"].forEach((campo) => {
    const elemento = document.getElementById(campo);
    if (elemento) elemento.disabled = false;
  });
}

// === Só adiciona o evento se o botão existir ===
const clearBtn = document.getElementById("clearBtn");
if (clearBtn) {
  clearBtn.addEventListener("click", limparFormulario);
}