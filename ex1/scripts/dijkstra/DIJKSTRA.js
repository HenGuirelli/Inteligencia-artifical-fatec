"use strict";

/**
 * 
 * @param {json} json
 * 
 * @returns {function} 
 * cara iteração do json chama a função de callback
 * que recebe 3 parametros
 * 1: cópia do próprio item do json
 * 2: chave do json atual
 * 3: index 
 */
function iterJson(json) {
    return cb => {
        const keys = Object.keys(json)
        keys.forEach((key, i) => cb({ [key]: json[key] }, key, i))
   }
}

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

    setPrecedente(nomeVertice, nomePrecedente) {
        this.tabela[nomeVertice].precedente = nomePrecedente
    }

    pegarDadosDoVertice(nomeVertice){
        return this.tabela[nomeVertice]
    }

    _pegarMenorEstimativa(){
        const candidatos = []
        iterJson(this.tabela)((coluna, key) => {
            if (!coluna[key].fechado)
                candidatos.push(coluna[key].estimativa)
        })
        return Math.min(...candidatos)
    }

    _pegarNomePelaEstimativa(estimativa) {
        let result = ''
        iterJson(this.tabela)((coluna, key) => {
            if (coluna[key].estimativa === estimativa)
                result = key
        })
        return result
    }

    existeVerticeAberto() {
        let existe = false
        iterJson(this.tabela)((coluna, key) => {
            if(coluna[key].fechado == false){
                existe = true
            }
        })
        return existe
    }

    pegarNomeDosVerticesFechados(){
        const result = []
        iterJson(this.tabela)((coluna, key) => {
            if (coluna[key].fechado)
                result.push(key)
        })
        return result
    }

    pegarNomeDoVerticeMinimo(){
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

    _pegarVerticePorNome(nome){
        return this.verticesDijkstra.filter(vertice => vertice.nome == nome)[0]
    }

    _pegarFilhos(verticeDijkstra){
        return verticeDijkstra.verticeModel.filhos.map(vertice => this._pegarVerticePorNome(vertice.nome))
    }

    _pegarFilhosDosVerticesFechados(){
        const result = []
        const verticesFechados = this._pegarVerticesFechados()
        for (let verticeFechado of verticesFechados){
            const filhos = this._pegarFilhos(verticeFechado)
            result.push(...filhos)
        }
        return result
    }

    // retorna uma Arvore
    iniciar(){
        const tabela = this.tabela

        // const nohInicial = new Noh(this.verticeInicial, this.verticeInicial.nome)
        // const arvore = new Arvore(nohInicial)

        tabela.fecharVertice(this.verticeInicial.nome)
        
        while (tabela.existeVerticeAberto()){
            const verticesFechados = tabela.pegarNomeDosVerticesFechados().map(nome => this._pegarVerticePorNome(nome))
            verticesFechados.forEach(verticeFechado => {
                const filhos = this._pegarFilhos(verticeFechado)
                filhos.forEach(filho => {
                    const pai = verticeFechado
                    const estimativaAtualDoFilho = tabela.pegarDadosDoVertice(filho.nome).estimativa
                    const novaEstimativa = (tabela.pegarDadosDoVertice(pai.nome).estimativa + this._pegarPesoEntreVertices(pai, filho))
                    if ( novaEstimativa < estimativaAtualDoFilho ){
                        tabela.alterarEstimativa(filho.nome, novaEstimativa)
                        tabela.setPrecedente(filho.nome, pai.nome)
                    }
                })
            })
            const minimo = tabela.pegarNomeDoVerticeMinimo()
            tabela.fecharVertice(minimo)
        }
    }
}