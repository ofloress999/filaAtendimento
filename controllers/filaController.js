const minhaFila = new FilaCircular(5);

function addElemento(){
    const nome = document.getElementById("txtnovoNome").value;
    const cpf = document.getElementById("txtnovoCPF").value;

    if(nome && cpf && !minhaFila.isFull()){
      const novoAtendimento = new Atendimento();
      novoAtendimento.nome = nome;
      novoAtendimento.cpf = cpf;
      novoAtendimento.data = getDataAtual();
      novoAtendimento.hora = getHoraAtual();

      minhaFila.enqueue(novoAtendimento);
      mostrarFila();
      document.getElementById("txtnovoNome").value = "";
      document.getElementById("txtnovoCPF").value = "";
      document.getElementById("txtnovoNome").focus();
    } else {
      alert("Por favor, preencha os campos corretamente!")
    }
}

function mostrarFila(){
   const listaFila = document.getElementById("listFila");
   listaFila.innerHTML = "";
   for(let atendimento of minhaFila) {
      const listaElemento = document.createElement("li");
      listaElemento.textContent = `${atendimento.nome} | ${atendimento.cpf} | ${atendimento.data} | ${atendimento.hora}`;
      listaFila.appendChild(listaElemento);
   }
}
function buscarCPF() {
    // Solicita o CPF ao usuário
    const cpfBuscado = prompt("Por favor, insira o CPF para buscar:").trim();

    if (!cpfBuscado) {
        alert("Por favor, insira um CPF válido!");
        return;
    }

    let posicao = 1;
    let encontradoNaFila = false;
    let encontradoAtendido = false;

    // Primeiro: procura na fila
    for (let atendimento of minhaFila) {
        if (atendimento.cpf.trim() === cpfBuscado) {  // Adicionando trim() para garantir que não haja espaços extras
            encontradoNaFila = true;
            alert(`Pessoa encontrada!\nNome: ${atendimento.nome}\nStatus: Ainda está na fila\nPosição: ${posicao}`);
            break;
        }
        posicao++;
    }

    if (!encontradoNaFila) {
        // Se não está na fila, procura nos atendidos
        let atendidos = JSON.parse(localStorage.getItem('listaAtendidos')) || [];

        for (let registro of atendidos) {
            if (registro.cpf.trim() === cpfBuscado) {  // Adicionando trim() também para os atendidos
                // Pessoa foi atendida, exibe detalhes do atendimento
                const tempoFila = calcularTempoFila(registro.horaEntrada, registro.horaSaida);
                alert(`Pessoa encontrada!\nNome: ${registro.nome}\nStatus: Já foi atendida\nHora de entrada: ${registro.horaEntrada}\nHora de saída: ${registro.horaSaida}\nTempo na fila: ${tempoFila}`);
                encontradoAtendido = true;
                break;
            }
        }

        if (!encontradoAtendido) {
            alert("CPF não encontrado na fila nem nos atendidos!");
        }
    }
}


function atenderFila(){
    if(!minhaFila.isEmpty()){
       const atendido = minhaFila.dequeue();
       const horaSaida = getHoraAtual();
       const tempoFila = calcularTempoFila(atendido.hora, horaSaida);
 
       // Monta a mensagem
       const msg = `Pessoa atendida: ${atendido.nome}<br>Entrada: ${atendido.hora}<br>Saída: ${horaSaida}<br>Tempo na fila: ${tempoFila}`;
       document.getElementById("mensagem-remocao").innerHTML = msg;
 
       // Armazena o último atendido
       localStorage.setItem('ultimoAtendido', msg);
 
       // Salva também na lista de atendidos
       let atendidos = JSON.parse(localStorage.getItem('listaAtendidos')) || [];
       atendidos.push({
           nome: atendido.nome,
           cpf: atendido.cpf,
           horaEntrada: atendido.hora,
           horaSaida: horaSaida,
           tempoFila: tempoFila
       });
       localStorage.setItem('listaAtendidos', JSON.stringify(atendidos));
 
       mostrarFila();
    }
    else {
       alert("Fila vazia!");
    }
 }
 