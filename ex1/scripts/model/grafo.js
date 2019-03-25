'use strict'

class GrafoModel {
    constructor(){
        this.vertices = []
        this.arestas = []

        this.numLinhas = 2
        this.numColunas = 0
    }

    addAresta(arestaModel){
        validarTipo(arestaModel, ArestaModel)
        this.arestas.push(arestaModel)
    }

    removerAresta(arestaModel){
        validarTipo(arestaModel, ArestaModel)
        this.arestas = removerItemPorKey('nome', this.arestas, arestaModel.nome) || []
    }

    addVertice(verticeModel){
        validarTipo(verticeModel, VerticeModel)
        this.vertices.push(verticeModel)
    }

    pegarVerticeInicial(){
        for (vertice of this.vertices){
            if (vertice.tipoVertice === tipoVertice.INICIO)
                return vertice
        }
    }

    pegarVerticeFinal(){
        for (vertice of this.vertices){
            if (vertice.tipoVertice === tipoVertice.FIM)
                return vertice
        }
    }

    gerarMatrizAdjacentes(){
        // gerar vetor de nome de vertices ["A", "B", "C", ...]
        // percorrer o vetor de vertices, o vertice index deve criar um novo vetor com o peso da aresta
        // a cada iteração diminuit 1 no laço
        const matriz = []
        const nomesVertices = this.vertices.map(vertice => vertice.nome)
        
        let tamVet = nomesVertices.length

        for (let i = 0 ; i < tamVet ; i++){
            let aux = []
            let verticeAtual = pegarItemPorKey('nome', this.vertices, nomesVertices[i])
            for (let j = i; j < tamVet; j++){
                let quemEuVouComparar = pegarItemPorKey('nome', this.vertices, nomesVertices[j])
                let aresta = verticeAtual.pegarArestaSeExistir(quemEuVouComparar)
                let temAresta = aresta !== undefined

                if (temAresta){
                    aux.push(aresta.peso)
                }else{
                    aux.push(0)
                }
            }
            matriz.push(aux)
        }
        return matriz
    }
}