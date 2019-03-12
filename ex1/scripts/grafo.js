'use strict'

class Grafo extends Observer {
    constructor($grafo){
        super()
        this.$root = $grafo
        this.proximoNome = geradorNomes()
        this.vertices = []
        this.arestas = []
        this.$linha1 = this.criarNovaLinha()
        this.$linha2 = this.criarNovaLinha()

        this.linhas = [this.$linha1, this.$linha2]

        this.verticesSelecionados = []

        this._agirParaExpedidores = { 
            [expedidor.VERTICE]: this._updateVertice.bind(this),
            [expedidor.ARESTA]: this._updateAresta.bind(this)
        }
    }

    _updateAresta(obj){
        // metodo chamado apenas quando aresta é excluida
        console.log()
        this.arestas.splice(this.arestas.indexOf(obj))
    }

    _updateVertice(obj){
        if (obj.pegarEstado() === estadoVertice.CLICADO){
            this.verticesSelecionados.push(obj)
        }else{
            // só irá remover caso tenha apenas um vertice no vetor.
            // quando chegar a dois vertices ele cria a aresta e limpa o vetor
            this.verticesSelecionados.pop()
        }

        if (this.verticesSelecionados.length === 2){
            const vertice1 = this.verticesSelecionados[0]
            const vertice2 = this.verticesSelecionados[1]

            const aresta = new Aresta(vertice1.$ponto, {
                vertice1,
                vertice2,
                onExcluir: this.excluirAresta
            })
            aresta.place()
            this.arestas.push(aresta)

            this.verticesSelecionados.forEach(vertice => vertice.estadoPadrao())
            this.verticesSelecionados = []
        }
    }

    update({ obj, expedidor }){
        this._agirParaExpedidores[expedidor](obj)
        console.log(this.arestas)
    }

    criarNovaLinha() {
        const $linha = document.createElement('div')
        $linha.classList.add('linha')
        return $linha
    }

    criarLinha({ linhaIndex, numColunas }) {
        const $linha = this.linhas[linhaIndex]
        for (let i = 0; i < numColunas; i++){
            let vertice = new Vertice(i, { x: i, y: linhaIndex, nome: this.proximoNome() })
            
            // adiciona vertice na linha especificada
            // sempre ao lado direito
            $linha.appendChild(vertice.$vertice)
            this.vertices.push(vertice)
        }
        this.$root.appendChild($linha)
    }

    criar({ numColunas }){
        this.criarLinha({ linhaIndex: 0, numColunas })
        this.criarLinha({ linhaIndex: 1, numColunas })
    }

    limpar(){
        this.$root.innerHTML = ''
        this.$linha1.innerHTML = ''
        this.$linha2.innerHTML = ''
    }

    pegarMatrizAdjacentes(){

    }
}
