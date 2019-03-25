class Tabela {
    constructor(){
        this.tabela = {}
    }

    addColuna({nome, estimativa, precedente, fechado}){
        this.tabela[nome] = { estimativa, precedente, fechado }
    }

    alterarEstimativa(nome, novaEstimativa) {
        this.tabela[nome].estimativa = novaEstimativa
    }

    fecharVertice(nome) {
        this.tabela[nome].fechado = true
    }

    setPrecedente(nome, precedente) {
        this.tabela[nome].precedente = precedente
    }

    _pegarMenorEstimativa(){
        const candidatos = []
        for (let coluna of this.tabela){
            if (!coluna.fechado){
                candidatos.push(coluna.estimativa)
            }
        }
        return Math.min(...candidatos)
    }

    _pegarNomePelaEstimativa(estimativa) {
        for (let coluna of this.tabela){
            if (coluna.estimativa === estimativa)
                return coluna.nome
        }
    }

    pegarMinimo(){
        const menorEstimativa = this._pegarMenorEstimativa()
        return this._pegarNomePelaEstimativa(menorEstimativa)
    }
}

class Dijkstra {
    constructor(grafoModel){
        this.grafoModel = grafoModel
        this.verticesDijkstra = grafoModel.vertices.map(vertice => new VerticeDijksTra(vertice))
        this.arestasDijkstra = grafoModel.arestas.map(aresta => new ArestaDijsktra(aresta))
        this.verticeInicial = this._pegarVerticeInicial()
        this.tabela = this._montarTabela()
    }

    _pegarVerticeInicial(){
        for (let vertice of this.verticesDijkstra){
            if (vertice.verticeModel.tipoVertice === tipoVertice.INICIO){
                return vertice
            }
        }
    }

    _montarTabela() {
        const tabela = new Tabela()
        this.verticesDijkstra.forEach(vertice => tabela.addColuna({ ...vertice }))
        tabela.alterarEstimativa(this.verticeInicial.nome, 0)
        return tabela
    }

    _pegarArestaEntreVertices(verticeDijkstra1, verticeDijkstra2) {
        // sempre retorna um vetor de 1 elemento
        // a aresta entre os vertices
        const arestaDijkstra = this.arestasDijkstra.filter(aresta => (
            aresta.nome === verticeDijkstra1.nome + verticeDijkstra2.nome ||
            aresta.nome === verticeDijkstra2.nome + verticeDijkstra1.nome
        ))[0]

        return arestaDijkstra
    }

    _pegarPesoEntreVertices(verticeDijkstra1, verticeDijkstra2) {
        const arestaDijkstra = this._pegarArestaEntreVertices(verticeDijkstra1, verticeDijkstra2)
        return arestaDijkstra && arestaDijkstra.peso
    }

    // retorna uma Arvore
    iniciar(){
        const tabela = this.tabela

        const nohInicial = new Noh(this.verticeInicial, this.verticeInicial.nome)
        const arvore = new Arvore(nohInicial)

        tabela.fecharVertice(this.verticeInicial.nome)

    }
}