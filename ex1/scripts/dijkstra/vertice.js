class VerticeDijksTra {
    constructor(verticeModel){
        this.estimativa = Infinity
        this.fechado = false
        this.precedente = null        
        this.verticeModel = verticeModel

        this.nome = verticeModel.nome
    }
}