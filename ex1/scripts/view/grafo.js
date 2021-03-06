'use strict'

class Grafo extends Observer {
    constructor($grafo){
        super()
        this.$root = $grafo
        this.proximoNomeVertice = geradorNomes()
        this.proximoNomeAresta  = geradorNomes()
        this.$arestas = []
        this.$linha1 = this.criarNovaLinha()
        this.$linha2 = this.criarNovaLinha()
        this.$vertices = []
        this.$pontoInicial = null
        this.$pontoFinal = null

        this.grafoModel = new GrafoModel()

        this.linhas = [this.$linha1, this.$linha2]

        this.verticesSelecionados = []

        this._agirParaExpedidores = { 
            [expedidor.VERTICE]: this._updateVertice.bind(this),
            [expedidor.ARESTA]: this._updateAresta.bind(this)
        }
    }

    setPontoInicial(){
        if (this.$pontoInicial !== null){
            this.$pontoInicial.$ponto.classList.remove('ponto-inicial')
            const pontoInicialModel = pegarItemPorKey('tipoVertice', this.grafoModel.vertices, tipoVertice.INICIO)
            pontoInicialModel.tipoVertice = tipoVertice.INDEFINIDO
        }

        const $novoInicio = pegarItemPorKey('nome', this.$vertices, $txtPontoDePartida.value.toUpperCase())

        $novoInicio.$ponto.classList.add('ponto-inicial')
        $novoInicio.vertice.setInicio()
        this.$pontoInicial = $novoInicio
    }

    setPontoFinal(){
        if (this.$pontoFinal !== null){
            this.$pontoFinal.$ponto.classList.remove('ponto-final')
            const pontoFinalModel = pegarItemPorKey('tipoVertice', this.grafoModel.vertices, tipoVertice.FIM)
            pontoFinalModel.tipoVertice = tipoVertice.INDEFINIDO
        }

        const $novoFim = pegarItemPorKey('nome', this.$vertices, $txtPontoFinal.value.toUpperCase())

        $novoFim.$ponto.classList.add('ponto-final')
        $novoFim.vertice.setFim()
        this.$pontoFinal = $novoFim
    }

    _pegarArestaPeloNome(nome){
        return this.$arestas.filter(aresta => aresta.nome === nome)[0]
    }

    pegarVerticePeloNome(nome){
        return this.$vertices.filter($vertice => $vertice.nome === nome)[0]
    }

    _removerAresta(aresta){
        const arestaEliminada = this._pegarArestaPeloNome(aresta.nome)
        return this.$arestas.filter(aresta => aresta.nome !== arestaEliminada.nome )
    }

    _updateAresta(obj){
        // metodo chamado apenas quando aresta é excluida
        const arestaModel = obj.aresta
        this.grafoModel.removerAresta(arestaModel)
        arestaModel.remover()
        this.$arestas = this._removerAresta(obj)
        const verticeModel1 = pegarItemPorKey('nome', this.grafoModel.vertices, obj.aresta.vertice1.nome)
        const verticeModel2 = pegarItemPorKey('nome', this.grafoModel.vertices, obj.aresta.vertice2.nome)

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
            this.$arestas.push(aresta)
            this.grafoModel.addAresta(aresta.aresta)

            this.verticesSelecionados.forEach(vertice => vertice.estadoPadrao())
            this.verticesSelecionados = []
        }
    }


    update({ obj, expedidor }){
        console.log(this.grafoModel)
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
            this.grafoModel.addVertice(vertice.vertice)
            this.$vertices.push(vertice)
            
            // adiciona vertice na linha especificada
            // sempre ao lado direito
            $linha.appendChild(vertice.$vertice)
        }
        this.$root.appendChild($linha)
    }

    criar({ numColunas }){
        let qtdVerticesLinha1
        let qtdVerticesLinha2

        if (parseInt(numColunas) % 2 == 0){
            qtdVerticesLinha1 = parseInt(numColunas) / 2
            qtdVerticesLinha2 = parseInt(numColunas) / 2
        }else{
            qtdVerticesLinha1 = parseInt(numColunas) / 2
            qtdVerticesLinha2 = parseInt(numColunas) / 2 - 1
        }

        this.criarLinha({ linhaIndex: 0, numColunas: qtdVerticesLinha1 })
        this.criarLinha({ linhaIndex: 1, numColunas: qtdVerticesLinha2 })
    }

    limpar(){
        this.$root.innerHTML = ''
        this.$linha1.innerHTML = ''
        this.$linha2.innerHTML = ''
    }

    limparArestas(){
        this.$arestas.forEach($arestaView => $arestaView.$aresta.className = 'edge')
    }


    _criarHeaderMatrizAdjacentes(tamanhoMatriz){
        const proximoNome = geradorNomes()
        const $linhaHeader = document.createElement('tr')
        
        // pular primeira coluna
        $linhaHeader.appendChild(document.createElement('th'))

        for(let i = 0; i < tamanhoMatriz; i++){
            const $th = document.createElement('th')
            const nomeVertice = proximoNome()
            $th.innerHTML = nomeVertice
            $linhaHeader.appendChild($th)
        }
        $matrizAdjacentes.appendChild($linhaHeader)
    }

    mostrarMatrizAdjacentes() {
        const matriz = this.grafoModel.gerarMatrizAdjacentes()
        const tamanhoMatriz = matriz.length
        const proximoNome = geradorNomes()
        
        this._criarHeaderMatrizAdjacentes(tamanhoMatriz)        

        matriz.forEach(linha => {
            const $row = document.createElement('tr')
            const diff = tamanhoMatriz - linha.length

            const nome = proximoNome()
            const $td = document.createElement('th')
            $td.innerHTML = nome
            $row.appendChild($td)

            for (let i = 0; i < diff; i++){               
                $row.appendChild(document.createElement('td'))
            }
            linha.forEach((peso, index) => {
                const $peso = document.createElement('td')
                $peso.innerHTML = peso
                $row.appendChild($peso)
            })
            $matrizAdjacentes.appendChild($row)
        })
    }
}
