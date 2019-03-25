'use strict'

class VerticeModel {
    constructor({ x, y, nome }){
        this.x = x
        this.y = y
        this.nome = nome
        this.tipoVertice = tipoVertice.INDEFINIDO
        
        this.filhos = []
        this.arestas = []
        this.estado = estadoVertice.VAZIO
    }

    mudarEstado(){
        this.estado = this.estado === estadoVertice.VAZIO ? estadoVertice.CLICADO : estadoVertice.VAZIO
    }

    setInicio(){
        this.tipoVertice = tipoVertice.INICIO
    }

    setFim(){
        this.tipoVertice = tipoVertice.FIM
    }

    setTipoIndefinido(){
        this.tipoVertice = tipoVertice.INDEFINIDO
    }

    pegarArestaSeExistir(vertice2){
        return pegarItemPorKey('nome', this.arestas, vertice2.nome + this.nome) || 
               pegarItemPorKey('nome', this.arestas, this.nome + vertice2.nome)
    }

    addAresta(arestaModel){
        validarTipo(arestaModel, ArestaModel)
        this.arestas.push(arestaModel)
    }

    removerAresta(arestaModel){
        validarTipo(arestaModel, ArestaModel)
        this.arestas = removerItemPorKey('nome', this.arestas, arestaModel.nome)
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