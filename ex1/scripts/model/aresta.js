'use strict'

class ArestaModel {
    constructor({ vertice1, vertice2, nome }){
        this.vertice1 = vertice1
        this.vertice2 = vertice2
        this.nome = nome

        this.indexes = {
            x1: vertice1.x, 
            x2: vertice2.x,
            y1: vertice1.y, 
            y2: vertice2.y
        }

        vertice1.addFilho(vertice2)
        vertice2.addFilho(vertice1)

        vertice1.addAresta(this)
        vertice2.addAresta(this)

        this.tipoPosicao = this._pegarTipoPosicao(this.indexes)
        this.peso = this._pegarPeso()
    }

    remover(){
        this.vertice1.removerAresta(this)
        this.vertice2.removerAresta(this)
    }

    _pegarPeso(){
        return this.tipoPosicao === posicaoAresta.DIAGONAL ? Math.sqrt(2) : 1
    }

    _pegarTipoPosicao(indexes) {
        if (indexes.y1 === indexes.y2)
            return posicaoAresta.HORIZONTAL
        else if (indexes.x1 === indexes.x2)
            return posicaoAresta.VERTICAL
        else
            return posicaoAresta.DIAGONAL
    }
}