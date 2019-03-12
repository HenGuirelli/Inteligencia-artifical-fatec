class VerticeModel {
    constructor({ x, y, nome }){
        this.x = x
        this.y = y
        this.nome = nome
        
        this.filhos = []
        this.arestas = []
    }

    _validarTipo(obj, T){
        if ( !(obj instanceof T) ){
            throw "objeto incorredo espertado 'VerticeModel' recebido: " + typeof verticeModel
        }
    }

    addFilho(verticeModel){
        this._validarTipo(verticeModel, VerticeModel)
        this.filhos.push(verticeModel)
    }

    removeFilho(verticeModel){
        this._validarTipo(verticeModel, VerticeModel)
        const filhoRemover = this._pegarFilhoPorNome(verticeModel.nome)
        this.filhos = this.filhos.filter(f => f.nome !== filhoRemover.nome)
    }

    _pegarFilhoPorNome(nome){
        return this.filhos.filter(filho => filho.nome === nome)[0]
    }
}