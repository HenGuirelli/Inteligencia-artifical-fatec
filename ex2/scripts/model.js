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