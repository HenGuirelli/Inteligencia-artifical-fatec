'use strict'

class GrafoModel {
    constructor(){
        this.vertices = []
        this.arestas = []

        this.numLinhas = 2
        this.numColunas = 0
    }

    criarAresta({ v1, v2, nome }){
        this.arestas.push(new ArestaModel({ v1, v2, nome }))
    }

    addVertice(verticeModel){
        validarTipo(verticeModel, VerticeModel)
        this.vertices.push(verticeModel)
    }

    gerarMatrizAdjacentes(){

    }
}