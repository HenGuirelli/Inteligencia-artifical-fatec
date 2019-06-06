const Paladar = {
    Fraco: 'fraco',
    Suave: 'suave',
    Forte: 'forte',
    Desconhecido: 'Não é Cuba livre'
}

const Tipo = {
    Reta: 'reta',
    Crescente: 'crescente',
    Decrescente: 'decrescente'
}

const Refrigerante = {
    CocaCola: 'coca-cola',
    Pepsi: 'pepsi'
}

const factory = item => {
    let obj = new Item(item)

    switch (item) {
        case Refrigerante.CocaCola: {
            let linha = new Linha(50, 52, Paladar.Forte, Tipo.Reta)
            obj.addLinha(linha)

            linha = new Linha(52, 54, Paladar.Forte, Tipo.Decrescente)
            obj.addLinha(linha)

            linha = new Linha(52, 54, Paladar.Suave, Tipo.Crescente)
            obj.addLinha(linha)

            linha = new Linha(54, 56, Paladar.Suave, Tipo.Reta)
            obj.addLinha(linha)

            linha = new Linha(56, 58, Paladar.Suave, Tipo.Decrescente)
            obj.addLinha(linha)

            linha = new Linha(56, 58, Paladar.Fraco, Tipo.Crescente)
            obj.addLinha(linha)
            
            linha = new Linha(58, 60, Paladar.Fraco, Tipo.Reta)
            obj.addLinha(linha)

            return obj
        }
        case Refrigerante.Pepsi : {
            let linha = new Linha(60, 62, Paladar.Forte, Tipo.Reta)
            obj.addLinha(linha)

            linha = new Linha(62, 64, Paladar.Forte, Tipo.Decrescente)
            obj.addLinha(linha)

            linha = new Linha(62, 64, Paladar.Suave, Tipo.Crescente)
            obj.addLinha(linha)

            linha = new Linha(64, 66, Paladar.Suave, Tipo.Reta)
            obj.addLinha(linha)

            linha = new Linha(66, 68, Paladar.Suave, Tipo.Decrescente)
            obj.addLinha(linha)

            linha = new Linha(66, 68, Paladar.Fraco, Tipo.Crescente)
            obj.addLinha(linha)
            
            linha = new Linha(68, 70, Paladar.Fraco, Tipo.Reta)
            obj.addLinha(linha)

            return obj
        }
        case 'Run': {
            let linha = new Linha(10, 15, Paladar.Fraco, Tipo.Reta)
            obj.addLinha(linha)

            linha = new Linha(15, 20, Paladar.Fraco, Tipo.Decrescente)
            obj.addLinha(linha)

            linha = new Linha(15, 20, Paladar.Suave, Tipo.Crescente)
            obj.addLinha(linha)

            linha = new Linha(20, 25, Paladar.Suave, Tipo.Reta)
            obj.addLinha(linha)

            linha = new Linha(25, 27, Paladar.Suave, Tipo.Decrescente)
            obj.addLinha(linha)

            linha = new Linha(23, 28, Paladar.Forte, Tipo.Crescente)
            obj.addLinha(linha)
            
            linha = new Linha(28, 30, Paladar.Forte, Tipo.Reta)
            obj.addLinha(linha)
            
            return obj
        }
        case 'Gelo': {            
            let linha = new Linha(20, 20, null, Tipo.Reta)
            obj.addLinha(linha)

            return obj
        }
    }
}

const calcCrescente = (x, x1, x2) => {
    return (x - x1) / (x2 / x1)
}

const calcDecrescente = (x, x1, x2) => {
    return (x2 - x) / (x2 / x1)
}

const pertinenciaRunFraco = (x, linha) => {
    if (x < 10)
        return 0
    if (x >= 10 && x < 15)
        return 1
    if (x >= 15 && x < 20)
        return calcCrescente(x, linha.x1, linha.x2)
    return 0
}

const pertinenciaRunSuave = (x, linha) => {
    if (x < 15)
        return 0
    if (x >= 15 && x < 20)
        return calcCrescente(x, linha.x1, linha.x2)
    if (x >= 20 && x < 25)
        return 1
    if (x >= 25 && x < 27)
        return calcDecrescente(x, linha.x1, linha.x2)
    return 0
}

const pertinenciaRunForte = (x, linha) => {
    if (x < 23)
        return 0
    if (x >= 23 && x < 28)
        return calcCrescente(x, linha.x1, linha.x2)
    if (x >= 28 && x < 30)
        return 1
    return 0
}


const pertinenciaCocaForte = (x, linha) => {
    if (x < 50)
        return 0

    if (x >= 50 && x < 52)
        return 1

    if (x >= 52 && x <= 54)
        return calcDecrescente(x, linha.x1, linha.x2)

    return 0
}

const pertinenciaCocaSuave = (x, linha) => {
    if (x < 52)
        return 0
    
    if (x >= 52 && x < 54)
        return calcCrescente(x, linha.x1, linha.x2)
    
    if (x >= 54 && x < 56)
        return 1
    
    if (x >= 56 && x < 58)
        return calcDecrescente(x, linha.x1, linha.x2)
    
    return 0
}

const pertinenciaCocaFraco = (x, linha) => {
    if ( x < 56 )
        return 0
    if (x >= 56 && x < 58)
        return calcCrescente(x, linha.x1, linha.x2)
    if (x >= 58 && x < 60)
        return 1
    return 0
}


const pertinenciaPepsiForte = (x, linha) => {
    if (x < 60)
        return 0
    if (x >= 60 && x < 62)
        return 1
    if (x >= 62 && x <= 64)
        return calcDecrescente(x, linha.x1, linha.x2)
    return 0
}

const pertinenciaPepsiSuave = (x, linha) => {
    if (x < 62)
        return 0
    if (x >= 62 && x < 64)
        return calcCrescente(x, linha.x1, linha.x2)
    if (x >= 64 && x < 66)
        return 1
    if (x >= 66 && x < 68)
        return calcDecrescente(x, linha.x1, linha.x2)
    return 0
}

const pertinenciaPepsiFraco = (x, linha) => {
    if (x < 66)
        return 0
    if (x >= 66 && x < 68)
        return calcCrescente(x, linha.x1, linha.x2)
    if (x >= 68 && x <= 70)
        return 1
    return 0
}

const pertinenciaGelo = (x) => {
    if (x === 20)
        return 1
    return 0
}

const count = (valores, val) => {
    return valores.filter(item => item === val).length
}

const getPaladar = (vet, valor) => {
    if (valor == 0)
        return Paladar.Desconhecido

    if (vet[0] == valor){
        return Paladar.Fraco
    } else if (vet[1] == valor){
        return Paladar.Suave
    }
    return Paladar.Forte
}

const getPreco = (paladar) => {
    switch(paladar){
        case Paladar.Fraco:
            return '15,00'
        case Paladar.Suave:
            return '20,00'
        case Paladar.Forte:
            return '25,00'
        default:
            return '30,00'
    }
}

const soma = (...valores) => {
    return valores.reduce((item, acc) => item + acc)
}

const getMedia = (...valores) => {
    return soma(...valores) / valores.length
}

const calcular = () => {
    console.clear()

    const resultado = new ResultadoFuzzy()

    // valores digitado pelo usuario
    const refrigerante = parseFloat($refrigerante.value)
    const run = parseFloat($run.value)
    const gelo = parseFloat($gelo.value)

    resultado.refrigerante = refrigerante
    resultado.run = run
    resultado.gelo = gelo

    // linhas do grafico
    const graficoRefrigerante = factory($nomeRefrigerante.value)
    const graficoRun = factory('Run')
    const linhaGelo = factory('Gelo')

    // Refrigerante
    const refrigeranteFraco = $nomeRefrigerante.value === Refrigerante.CocaCola ? 
        pertinenciaCocaFraco(refrigerante, graficoRefrigerante.getLinhaPorPaladar(refrigerante, Paladar.Fraco)) : 
        pertinenciaPepsiFraco(refrigerante, graficoRefrigerante.getLinhaPorPaladar(refrigerante, Paladar.Fraco))

    const refrigeranteSuave = $nomeRefrigerante.value === Refrigerante.CocaCola ? 
        pertinenciaCocaSuave(refrigerante, graficoRefrigerante.getLinhaPorPaladar(refrigerante, Paladar.Suave)) : 
        pertinenciaPepsiSuave(refrigerante, graficoRefrigerante.getLinhaPorPaladar(refrigerante, Paladar.Suave))

    const refrigeranteForte = $nomeRefrigerante.value === Refrigerante.CocaCola ? 
        pertinenciaCocaForte(refrigerante, graficoRefrigerante.getLinhaPorPaladar(refrigerante, Paladar.Forte)) : 
        pertinenciaPepsiForte(refrigerante, graficoRefrigerante.getLinhaPorPaladar(refrigerante, Paladar.Forte))

    // Run
    const runFraco = pertinenciaRunFraco(run, graficoRun.getLinhaPorPaladar(run, Paladar.Fraco))
    const runSuave = pertinenciaRunSuave(run, graficoRun.getLinhaPorPaladar(run, Paladar.Suave))
    const runForte = pertinenciaRunForte(run, graficoRun.getLinhaPorPaladar(run, Paladar.Forte))

    // Gelo
    const _gelo = pertinenciaGelo(gelo)

    resultado.refrigeranteFraco = refrigeranteFraco
    resultado.refrigeranteSuave = refrigeranteSuave
    resultado.refrigeranteForte = refrigeranteForte

    resultado.runFraco = runFraco
    resultado.runSuave = runSuave
    resultado.runForte = runForte

    resultado._gelo = _gelo

    const suaveMin1 = Math.min(refrigeranteForte, runFraco, _gelo)
    const suaveMin2 = Math.min(refrigeranteSuave, runSuave, _gelo)
    const suaveMin3 = Math.min(refrigeranteFraco, runForte, _gelo)
    const suaveMax = Math.max(suaveMin1, suaveMin2, suaveMin3)
    const suaveMedia = getMedia(suaveMin1, suaveMin2, suaveMin3)
    resultado.suaveMin1 = suaveMin1
    resultado.suaveMin2 = suaveMin2
    resultado.suaveMin3 = suaveMin3
    resultado.suaveMaximo = suaveMax
    resultado.suaveMedia = suaveMedia

    const forteMin1 = Math.min(refrigeranteForte, runSuave, _gelo)
    const forteMin2 = Math.min(refrigeranteForte, runForte, _gelo)
    const forteMin3 = Math.min(refrigeranteSuave, runForte, _gelo)
    const forteMax = Math.max(forteMin1, forteMin2, forteMin3)
    const forteMedia = getMedia(forteMin1, forteMin2, forteMin3)
    resultado.forteMin1 = forteMin1
    resultado.forteMin2 = forteMin2
    resultado.forteMin3 = forteMin3
    resultado.forteMaximo = forteMax
    resultado.forteMedia = forteMedia

    const fracoMin1 = Math.min(refrigeranteFraco, runFraco, _gelo)
    const fracoMin2 = Math.min(refrigeranteFraco, runSuave, _gelo)
    const fracoMin3 = Math.min(refrigeranteSuave, runFraco, _gelo)
    const fracoMax = Math.max(fracoMin1, fracoMin2, fracoMin3)
    const fracoMedia = getMedia(fracoMin1, fracoMin2, fracoMin3)
    resultado.fracoMin1 = fracoMin1
    resultado.fracoMin2 = fracoMin2
    resultado.fracoMin3 = fracoMin3
    resultado.fracoMaximo = fracoMax
    resultado.fracoMedia = fracoMedia

    const maximo = Math.max(fracoMax, suaveMax, forteMax)
    const empate = count([fracoMax, suaveMax, forteMax], maximo) > 1 && maximo !== 0
    const maximoDasMedias = Math.max(fracoMedia, suaveMedia, forteMedia)

    resultado.maximo = maximo
    resultado.empate = empate
    resultado.maximoDasMedias = maximoDasMedias

    let paladar = ''
    if (empate) {
        paladar = getPaladar([fracoMedia, suaveMedia, forteMedia], maximoDasMedias)
    }else {
        paladar = getPaladar([fracoMax, suaveMax, forteMax], maximo)
    }

    resultado.paladar = paladar
    resultado.preco = getPreco(paladar)

    return resultado
}