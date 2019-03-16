class PRIM {
    constructor({ arestas, vertices }){
        this.arestas = arestas.map(aresta => new ArestaPRIM(aresta))
        this.vertices = vertices.map(vertice => new VerticePRIM(vertice))
        this.verticeInicial = this._pegarPontoInicial()

        this.candidatos = new Candidatos()
    }

    iniciar(){
        this.candidatos.add(this._pegarArestaConectadaAoVertice(this.verticeInicial))
        this.verticeInicial.usar()
        while(this._existeArestaIndefinida()){
            let arestaEscolhida = this.candidatos.pegarMenorValor()
            // função sempre retorna vetor de 2 elementos (2 vertices conectados na aresta)
            let verticesConectadosNaAresta = this._pegarVerticesConectadosNaAresta(arestaEscolhida)

            if (this._ehParaExcluirAresta(arestaEscolhida)){
                this.candidatos.remove(arestaEscolhida)
                arestaEscolhida.excluir()
                continue
            }
            arestaEscolhida.usar()

            const vertice1 = verticesConectadosNaAresta[0]
            const vertice2 = verticesConectadosNaAresta[1]

            // sempre um vertice estará usado e outro não
            if (vertice1 === estadoVerticePRIM.NAO_USADO){
                this.candidatos.add(this._pegarArestaConectadaAoVertice(vertice1))
            }else{
                this.candidatos.add(this._pegarArestaConectadaAoVertice(vertice2))
            }

            vertice1.usar()
            vertice2.usar()

            this.candidatos.removerUsados()
        }
    }

    _ehParaExcluirAresta(arestaPRIM){
        const verticesConectadosNaAresta = this._pegarVerticesConectadosNaAresta(arestaPRIM)
        const vertice1 = verticesConectadosNaAresta[0]
        const vertice2 = verticesConectadosNaAresta[1]
        // vertices já usados
        return ( 
            (vertice1.estado === estadoVerticePRIM.USADO && vertice2.estado === estadoVerticePRIM.USADO)
        )
    }

    _pegarVerticesConectadosNaAresta(arestaPRIM){
        return this.vertices.filter(verticePRIM => arestaPRIM.nome.includes(verticePRIM.nome))
    }
    
    _pegarArestaConectadaAoVertice(verticePRIM){
        return this.arestas.filter(aresta => aresta.nome.includes(verticePRIM.nome))
    }

    _existeArestaIndefinida(){
        return this.arestas.filter(arestaPrim => arestaPrim.estado === estadoArestaPRIM.INDEFINIDO).length > 0
    }

    _pegarPontoInicial(){
        return pegarItemPorKey('tipoVertice', this.vertices, tipoVertice.INICIO)
    }
}