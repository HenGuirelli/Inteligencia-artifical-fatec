class Linha {
    constructor(x1, x2, nome, tipo){
        this.x1 = x1
        this.x2 = x2
        this.nome = nome
        this.tipo = tipo
    }
}

class Item {
    constructor(nome){
        this.linhas = []
        this.nome = nome
    }

    addLinha(linha){
        this.linhas.push(linha)
    }

    getLinhaPorPaladar(x, paladar) {
        const result = this.linhas.filter(linha => linha.x1 <= x && linha.x2 > x && linha.nome === paladar)
        return result.length > 0 ? result[0] : null
    }
}

class ResultadoFuzzy {
    constructor() {
        // valores do usuario
        this.refrigerante = ''
        this.run = ''
        this.gelo = ''

        this.maximo = ''
        this.empate = false
        this.maximoDasMedias = ''

        this.paladar = ''
        this.preco = ''

        // expressoes
        this.suaveMin1 = ''
        this.suaveMin2 = ''
        this.suaveMin3 = ''
        this.suaveMaximo = ''
        this.suaveMedia = ''

        this.forteMin1 = ''
        this.forteMin2 = ''
        this.forteMin3 = ''
        this.forteMaximo = ''
        this.forteMedia = ''

        this.fracoMin1 = ''
        this.fracoMin2 = ''
        this.fracoMin3 = ''
        this.fracoMaximo = ''
        this.fracoMedia = ''

        // valores calculados
        this.refrigeranteFraco = ''
        this.refrigeranteSuave = ''
        this.refrigeranteForte = ''
    
        this.runFraco = ''
        this.runSuave = ''
        this.runForte = ''
    
        this._gelo = ''

    }
}