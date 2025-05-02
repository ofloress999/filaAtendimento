// Função para pegar a data atual formatada (dd/mm/aaaa)
function getDataAtual() {
    return new Date().toLocaleDateString();
}

// Função para pegar a hora atual formatada (hh:mm:ss)
function getHoraAtual() {
    return new Date().toLocaleTimeString();
}

// Função para calcular o tempo em minutos entre duas horas
function calcularTempoFila(horaEntrada, horaSaida) {
    const [h1, m1, s1] = horaEntrada.split(":").map(Number);
    const [h2, m2, s2] = horaSaida.split(":").map(Number);
    const entradaEmSegundos = h1 * 3600 + m1 * 60 + s1;
    const saidaEmSegundos = h2 * 3600 + m2 * 60 + s2;
    let diferenca = saidaEmSegundos - entradaEmSegundos;
    if (diferenca < 0) diferenca += 24 * 3600; // correção caso passe da meia-noite
    const minutos = Math.floor(diferenca / 60);
    const segundos = diferenca % 60;
    return `${minutos} min ${segundos} seg`;
}