class Candidatos {
    constructor(){
        this.data = []
    }

    add(obj){
        if ( (obj instanceof Array ) ){
            this._addArray(obj)
        }else{
            this._addUm(obj)
        }
    }

    remove(obj){
        if ( (obj instanceof Array ) ){
            this._removerArray(obj)
        }else{
            this._removerUm(obj)
        }
    }

    pegarMenorValor(){
        const pesos = this.data.map(arestaPRIM => arestaPRIM.arestaModel.peso)
        const menorPeso = Math.min(...pesos)
        
        return this.data.filter(arestaPRIM => arestaPRIM.arestaModel.peso === menorPeso)[0]
    }

    _removerUm(arestaPRIM){
        validarTipo(arestaPRIM, ArestaPRIM)
        this.data = removerItemPorKey('nome', this.data, arestaPRIM.nome)
    }

    _removerArray(array){
        array.forEach(arestaPRIM => this._removerUm(arestaPRIM))
    }

    removerUsados(){
        if (this._existeArestaUsada())
            this.remove(this._pegarArestaUsada())
    }

    _pegarArestaUsada(){
        return this.data.filter(arestaPRIM => arestaPRIM.estado === estadoArestaPRIM.USADO)
    }

    _existeArestaUsada(){
        return this.data.filter(arestaPRIM => arestaPRIM.estado === estadoArestaPRIM.USADO).length > 0
    }
    
    _addUm(aresta){
        validarTipo(aresta, ArestaPRIM)
        this.data.push(aresta)
    }   

    _addArray(array){
        array.forEach(elemento => this._addUm(elemento))
    }
}