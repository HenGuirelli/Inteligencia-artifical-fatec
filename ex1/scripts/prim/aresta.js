class ArestaPRIM {
    constructor(arestaModel){
        this.arestaModel = arestaModel
        this.estado = ArestaPRIM.INDEFINIDO
    }

    get EXCLUIDO(){
        return 'EXCLUIDO'
    }

    get USADO(){
        return 'USADO'
    }

    get INDEFINIDO(){
        return undefined
    }
}