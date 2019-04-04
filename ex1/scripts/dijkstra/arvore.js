let _$arestas = []
let _achouOCaminho = false
let _$pilhaCaminho = []
let pilhaNomeCaminho = []
let distanciasPercorrida = []

const _pegarArestaPorNome = (nome) => {
    return _$arestas.filter($aresta => $aresta.nome === nome)[0]
}

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

    marcarArestas() {
        this.filhos.forEach(filho => {
            const $aresta = _pegarArestaPorNome(this.nome + filho.nome) || _pegarArestaPorNome(filho.nome + this.nome)
            $aresta.$aresta.classList.add('arvore-minima')
            filho.marcarArestas()
        })
    }

}

class Arvore {
    constructor(nohInicial){
        this.nohInicial = nohInicial
    }

    addNoh({ noh, nomePai }){
        const pai = this.pegarNohPorNome(this.nohInicial, nomePai)
        pai.addFilho(noh)
    }

    desenharArvore($arestas){
        _$arestas = $arestas
        this.nohInicial.marcarArestas()
    }

    procurarCaminho(noh, pai, nomeVerticeFim){
        try{
            const $aresta = _pegarArestaPorNome(noh.nome + pai) || _pegarArestaPorNome(pai + noh.nome)
            _$pilhaCaminho.push($aresta.$aresta)
            pilhaNomeCaminho.push(noh.nome)
            distanciasPercorrida.push($aresta.aresta.peso)
            //pilhaNomeCaminho.push($aresta.nome)
        }catch(e) { /* a primeira vez que entra ele estoura uma exceção, já que o pai é null */
            pilhaNomeCaminho.push(noh.nome) 
        }

        if (noh.nome === nomeVerticeFim){
            _achouOCaminho = true
            return noh
        }
        for(let filhoAtual of noh.filhos){
            const result = this.procurarCaminho(filhoAtual, noh.nome, nomeVerticeFim)
            if (result === null){
                continue
            }else{
                return result
            }
        }
        _$pilhaCaminho.pop()
        pilhaNomeCaminho.pop()
        distanciasPercorrida.pop()
        return null
    }

    marcarCaminho(noh, pai, nomeVerticeFim){
        _$pilhaCaminho = []
        pilhaNomeCaminho = []
        distanciasPercorrida = []
        this.procurarCaminho(noh, pai, nomeVerticeFim)
        _$pilhaCaminho.forEach($aresta => {
            $aresta.classList.add('menor-caminho')
        })
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

