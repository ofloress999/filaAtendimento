class Fila {
    #inicio;
    #fim;
    #qtd;
    #elementos;

    constructor(tamanho = 10) {
        this.#inicio = 0;
        this.#fim = 0;
        this.#qtd = 0;
        this.#elementos = new Array(tamanho);
    }

    isFull() {
        return this.#qtd === this.#elementos.length;
    }

    isEmpty() {
        return this.#qtd === 0;
    }

    enqueue(dado) {
        if (!this.isFull()) {
            this.#elementos[this.#fim] = dado;
            this.#fim++;
            if (this.#fim === this.#elementos.length) {
                this.#fim = 0; // reinicia
            }
            this.#qtd++;
            return true;
        } else {
            return false;
        }
    }

    dequeue() {
        if (!this.isEmpty()) {
            const dado = this.#elementos[this.#inicio];
            this.#elementos[this.#inicio] = null;
            this.#inicio++;
            if (this.#inicio === this.#elementos.length) {
                this.#inicio = 0; // reinicia
            }
            this.#qtd--;
            return dado;
        } else {
            return null;
        }
    }

    toString() {
        let filaString = "";
        let index = this.#inicio;
        for (let i = 0; i < this.#qtd; i++) {
            filaString += this.#elementos[index] + " | ";
            index++;
            if (index === this.#elementos.length) {
                index = 0;
            }
        }
        console.log(filaString);
        return filaString;
    }

    peek() {
        if(!this.isEmpty()){
            return this.#elementos[this.#inicio];
        } else {
            return null;
        }
    }
    
}
