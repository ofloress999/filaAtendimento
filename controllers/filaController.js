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

function buscarCPF(){
    const cpfBuscado = document.getElementById("txtnovoCPF").value;

    if(cpfBuscado){
        let encontrado = false;
        for(let atendimento of minhaFila){
            if(atendimento.cpf === cpfBuscado){
                alert("Atendimento encontrado: " + atendimento.toString());
                encontrado = true;
                break;
            }
        }
        if(!encontrado){
            alert("CPF não encontrado na fila!");
        }
    } else {
        alert("Por favor, insira um CPF para buscar!");
    }
}

function atenderFila(){
   if(!minhaFila.isEmpty()){
      const atendido = minhaFila.dequeue();
      const horaSaida = getHoraAtual();
      const tempoFila = calcularTempoFila(atendido.hora, horaSaida);

      const msg = `Pessoa atendida: ${atendido.nome}<br>Entrada: ${atendido.hora}<br>Saída: ${horaSaida}<br>Tempo na fila: ${tempoFila}`;
      
      // Mostra na div mensagem-remocao
      document.getElementById("mensagem-remocao").innerHTML = msg;

      localStorage.setItem('ultimoAtendido', msg);
      mostrarFila();
   }
   else
      alert("Fila vazia!");
}
