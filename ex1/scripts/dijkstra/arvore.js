class Noh {
    constructor(conteudo, nome){
        this.conteudo = conteudo
        this.nome = nome
        this.filhos = []
    }

    addFilho(noh){
        //validarTipo(noh, Noh)
        this.filhos.push(noh)
    }
}

class Arvore {
    constructor(nohInicial){
        //validarTipo(nohInicial, Noh)
        this.nohInicial = nohInicial
    }

    pegarNohPorNome(noh, nome){
        if (!noh) { noh = this.nohInicial }
        if (noh.nome === nome){
            return noh
        }
        for(let filhoAtual of noh.filhos){
            const result = this.pegarNohPorNome(filhoAtual, nome)
            if (result === null){
                continue
            }else{
                return result
            }
        }
        return null
    }
}

