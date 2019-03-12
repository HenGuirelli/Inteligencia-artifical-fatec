'use strict'

class Grafo {
    constructor($grafo){
        this.$root = $grafo
        this.vertices = []
        this.$linha1 = this.criarNovaLinha()
        this.$linha2 = this.criarNovaLinha()

        this.linhas = [this.$linha1, this.$linha2]
    }

    criarNovaLinha() {
        const $linha = document.createElement('div')
        $linha.classList.add('linha')
        return $linha
    }

    criarLinha({ linhaIndex, numColunas }) {
        const $linha = this.linhas[linhaIndex]
        for (let i = 0; i < numColunas; i++){
            let vertice = new Vertice(i, linhaIndex)
            
            // adiciona vertice na linha especificada
            // sempre ao lado direito
            $linha.appendChild(vertice.$vertice)
            this.vertices.push(vertice)
        }
        this.$root.appendChild($linha)
    }

    criar({ numColunas }){
        console.log('grafo.criar')
        console.log(numColunas)
        this.criarLinha({ linhaIndex: 0, numColunas })
        this.criarLinha({ linhaIndex: 1, numColunas })
    }

    limpar(){
        this.$root.innerHTML = ''
        this.$linha1.innerHTML = ''
        this.$linha2.innerHTML = ''
    }
}
