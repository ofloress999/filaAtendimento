const minhaFila = new Fila(5);

function addElemento(){
    const novoElemento = 
       document.getElementById("txtnovoNome");
    if(!minhaFila.isFull()){
       minhaFila.enqueue(novoElemento.value);
       mostrarFila();
       novoElemento.value = ""; // limpa onde inserimos o nome
       novoElemento.focus(); // cursor no imput
    } 
    else
        alert("Fila cheia!");     
}
//-------------------------------------------------------------

function mostrarFila(){
   const listaFila = document.getElementById("listFila");
   listaFila.textContent = minhaFila.toString();
}

//-------------------------------------------------------------

//Atender fila
function atenderFila(){
   if(!minhaFila.isEmpty()){
      const atendido = minhaFila.dequeue();
      alert("Pessoa atendida: " + atendido);
      mostrarFila();
      //salvar no banco texto do navegador
   } else {
      alert("Fila vazia!")
   }
}

//-------------------------------------------------------------
//Inserir o elemento na fila ao apertar Enter

document.addEventListener("DOMContentLoaded", function() {
   document.getElementById("txtnovoNome").addEventListener("keydown", function(event) {
       if (event.key === "Enter") {
           event.preventDefault();
           addElemento();
       }
   });
});
