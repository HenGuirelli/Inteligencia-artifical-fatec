'use strict'

class Grafo extends Observer {
    constructor($grafo){
        super()
        this.$root = $grafo
        this.proximoNomeVertice = geradorNomes()
        this.proximoNomeAresta  = geradorNomes()
        this.arestas = []
        this.$linha1 = this.criarNovaLinha()
        this.$linha2 = this.criarNovaLinha()

        this.grafo = new GrafoModel()

        this.linhas = [this.$linha1, this.$linha2]

        this.verticesSelecionados = []

        this._agirParaExpedidores = { 
            [expedidor.VERTICE]: this._updateVertice.bind(this),
            [expedidor.ARESTA]: this._updateAresta.bind(this)
        }
    }

    _pegarArestaPeloNome(nome){
        return this.arestas.filter(aresta => aresta.nome === nome)[0]
    }

    _removerAresta(aresta){
        const arestaEliminada = this._pegarArestaPeloNome(aresta.nome)
        return this.arestas.filter(aresta => aresta.nome !== arestaEliminada.nome )
    }

    _updateAresta(obj){
        // metodo chamado apenas quando aresta é excluida    
        this.arestas = this._removerAresta(obj)
        const verticeModel1 = pegarItemPorKey('nome', this.grafo.vertices, obj.aresta.vertice1.nome)
        const verticeModel2 = pegarItemPorKey('nome', this.grafo.vertices, obj.aresta.vertice2.nome)

        verticeModel1.removerFilho(verticeModel2)
        verticeModel2.removerFilho(verticeModel1)
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
                nome: this.proximoNomeAresta()                
            })
            aresta.place()
            this.arestas.push(aresta)

            this.verticesSelecionados.forEach(vertice => vertice.estadoPadrao())
            this.verticesSelecionados = []
        }
    }


    update({ obj, expedidor }){
        console.log(this.grafo)
        this._agirParaExpedidores[expedidor](obj)
    }

    criarNovaLinha() {
        const $linha = document.createElement('div')
        $linha.classList.add('linha')
        return $linha
    }

    criarLinha({ linhaIndex, numColunas }) {
        const $linha = this.linhas[linhaIndex]
        for (let i = 0; i < numColunas; i++){
            let vertice = new Vertice(i, { x: i, y: linhaIndex, nome: this.proximoNomeVertice() })
            this.grafo.addVertice(vertice.vertice)
            
            // adiciona vertice na linha especificada
            // sempre ao lado direito
            $linha.appendChild(vertice.$vertice)
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

}
