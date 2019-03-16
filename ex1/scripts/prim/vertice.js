const estadoVerticePRIM = {
    USADO: 'USADO',
    NAO_USADO: 'NAO_USADO'
}

class VerticePRIM {
    constructor(verticeModel){
        this.verticeModel = verticeModel
        this.estado = estadoVerticePRIM.NAO_USADO
    }

    get nome(){
        return this.verticeModel.nome
    }

    get tipoVertice(){
        return this.verticeModel.tipoVertice
    }

    usar(){
        this.estado = estadoVerticePRIM.USADO
    }
}