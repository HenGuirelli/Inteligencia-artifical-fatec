const estadoArestaPRIM = {
    EXCLUIDO: 'EXCLUIDO',
    USADO: 'USADO',
    INDEFINIDO: undefined
}

class ArestaPRIM {
    constructor(arestaModel){
        this.arestaModel = arestaModel
        this.estado = ArestaPRIM.INDEFINIDO
    }

    usar(){
        this.estado = estadoArestaPRIM.USADO
    }

    excluir(){
        this.estado = estadoArestaPRIM.EXCLUIDO
    }

    get nome (){
        return this.arestaModel.nome
    }
}