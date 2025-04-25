const minhaFila = new Fila(5);

function addElemento() {
    const novoElemento = document.getElementById("txtnovoNome");
    if (!minhaFila.isFull()) {
        minhaFila.enqueue(novoElemento.value);
        mostrarFila();
        novoElemento.value = ""; // limpa onde inserimos o nome
        novoElemento.focus(); // cursor no input
    } else {
        alert("Fila cheia!");
    }
}

// Mostrar a fila
function mostrarFila() {
    const listaFila = document.getElementById("listFila");
    listaFila.textContent = minhaFila.toString();
}

// Atender fila
function atenderFila() {
    if (!minhaFila.isEmpty()) {
        const atendido = minhaFila.dequeue();
        const prox = minhaFila.peek(); // Pega o próximo sem remover

        const proxAtendimento = document.getElementById("mensagem-remocao");
        const ultimoAtendimento = document.getElementById("mensagem-ultimo-atendido");

        const agora = new Date();
        const hora = agora.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Atualiza a div com quem foi atendido
        ultimoAtendimento.textContent = `Último atendido: ${atendido} às ${hora}`;
        proxAtendimento.textContent = prox ? `Próximo atendimento: ${prox}` : "Nenhum próximo atendimento";

        // Salva os dados no localStorage
        localStorage.setItem("ultimoAtendido", `${atendido} às ${hora}`);
        localStorage.setItem("proximoAtendimento", prox ? prox : "Nenhum próximo atendimento");

        mostrarFila();
    } else {
        alert("Fila vazia!");
    }
}

// Aparecer quem será atendido
function mostrarProxAtendimento() {
    const proxAtendimento = document.getElementById("mensagem-remocao");
    proxAtendimento.textContent = minhaFila.toString();
}

// Inserir o elemento na fila ao apertar Enter
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("txtnovoNome").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addElemento();
        }
    });
});
