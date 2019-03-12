'use strict'

class Grafo extends Observer {
    constructor($grafo){
        super()
        this.$root = $grafo
        this.vertices = []
        this.$linha1 = this.criarNovaLinha()
        this.$linha2 = this.criarNovaLinha()

        this.linhas = [this.$linha1, this.$linha2]

        this.verticesSelecionados = []
    }

    update(obj){
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
            
            const posicaoVertice1 = vertice1.pegarPosicao() 
            const posicaoVertice2 = vertice2.pegarPosicao()

            const pos = { 
                x1: posicaoVertice1.x, 
                x2: posicaoVertice2.x,
                y1: posicaoVertice1.y, 
                y2: posicaoVertice2.y
            }

            const aresta = new Edge(vertice1.$ponto, {
                vertice1,
                vertice2
            })
            aresta.place({ ...pos })

            this.verticesSelecionados.forEach(vertice => vertice.estadoPadrao())
            this.verticesSelecionados = []
        }
    }

    criarNovaLinha() {
        const $linha = document.createElement('div')
        $linha.classList.add('linha')
        return $linha
    }

    criarLinha({ linhaIndex, numColunas }) {
        const $linha = this.linhas[linhaIndex]
        for (let i = 0; i < numColunas; i++){
            let vertice = new Vertice(i, { x: i, y: linhaIndex })
            
            // adiciona vertice na linha especificada
            // sempre ao lado direito
            $linha.appendChild(vertice.$vertice)
            this.vertices.push(vertice)
        }
        this.$root.appendChild($linha)
    }

    criar({ numColunas }){
        console.log('grafo.criar')
        this.criarLinha({ linhaIndex: 0, numColunas })
        this.criarLinha({ linhaIndex: 1, numColunas })
    }

    limpar(){
        this.$root.innerHTML = ''
        this.$linha1.innerHTML = ''
        this.$linha2.innerHTML = ''
    }
}
