class VerticeModel {
    constructor({ x, y, nome }){
        this.x = x
        this.y = y
        this.nome = nome
        
        this.filhos = []
        this.arestas = []
        this.estado = estadoVertice.VAZIO
    }

    mudarEstado(){
        this.estado = this.estado === estadoVertice.VAZIO ? estadoVertice.CLICADO : estadoVertice.VAZIO
    }    

    addFilho(verticeModel){
        validarTipo(verticeModel, VerticeModel)
        this.filhos.push(verticeModel)
    }

    removerFilho(verticeModel){
        validarTipo(verticeModel, VerticeModel)
        const filhoRemover = this._pegarFilhoPorNome(verticeModel.nome)
        this.filhos = VerticeModel.removerFilhoPorNome(this.filhos, filhoRemover.nome)
    }

    _pegarFilhoPorNome(nome){
        return VerticeModel.pegarFilhoPorNome(this.filhos, nome)
    }

    static pegarFilhoPorNome(vet, nome){
        return pegarItemPorKey('nome', vet, nome)
    }

    static removerFilhoPorNome(vet, nome){
        return removerItemPorKey('nome', vet, nome)
    }
}