const $refrigerante = document.getElementById('refrigerante')
const $run = document.getElementById('run')
const $gelo = document.getElementById('gelo')
const $nomeRefrigerante = document.getElementById('nome-refrigerante')

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

const iniciar = () => {
    console.clear()
    validar0ate100($refrigerante, 'Refrigerante')
    validar0ate100($run, 'Run')
    validar0ate100($gelo, 'Gelo')

    // valores digitado pelo usuario
    const refrigerante = parseFloat($refrigerante.value)
    const run = parseFloat($run.value)
    const gelo = parseFloat($gelo.value)

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

    const suaveMin1 = Math.min(refrigeranteForte, runFraco, _gelo)
    const suaveMin2 = Math.min(refrigeranteSuave, runSuave, _gelo)
    const suaveMin3 = Math.min(refrigeranteFraco, runForte, _gelo)
    const suaveMax = Math.max(suaveMin1, suaveMin2, suaveMin3)
    const suaveMedia = getMedia(suaveMin1, suaveMin2, suaveMin3)
    console.log('\nSuave:')
    console.log(`{cocaforte(${refrigerante}); runFraco(${run}); gelo(${gelo})} --- {${ refrigeranteForte }; ${ runFraco }; ${ _gelo }} | min > ${ suaveMin1 }`)
    console.log(`{cocasuave(${refrigerante}); runsuave(${run}); gelo(${gelo})} --- {${ refrigeranteSuave }; ${ runSuave }; ${ _gelo }} | min > ${ suaveMin2 } | max > ${ suaveMax }`)
    console.log(`{cocafraco(${refrigerante}); runForte(${run}); gelo(${gelo})} --- {${ refrigeranteFraco }; ${ runForte }; ${ _gelo }} | min > ${ suaveMin3 }`)

    const forteMin1 = Math.min(refrigeranteForte, runSuave, _gelo)
    const forteMin2 = Math.min(refrigeranteForte, runForte, _gelo)
    const forteMin3 = Math.min(refrigeranteSuave, runForte, _gelo)
    const forteMax = Math.max(forteMin1, forteMin2, forteMin3)
    const forteMedia = getMedia(forteMin1, forteMin2, forteMin3)
    console.log('\nForte:')
    console.log(`{cocaforte(${refrigerante}); runsuave(${run}); gelo(${gelo})} --- {${ refrigeranteForte }; ${ runSuave }; ${ _gelo }} | min > ${ forteMin1 }`)
    console.log(`{cocaforte(${refrigerante}); runForte(${run}); gelo(${gelo})} --- {${ refrigeranteForte }; ${ runForte }; ${ _gelo }} | min > ${ forteMin2 } | max > ${ forteMax }`)
    console.log(`{cocasuave(${refrigerante}); runForte(${run}); gelo(${gelo})} --- {${ refrigeranteSuave }; ${ runForte }; ${ _gelo }} | min > ${ forteMin3 }`)

    const fracoMin1 = Math.min(refrigeranteFraco, runFraco, _gelo)
    const fracoMin2 = Math.min(refrigeranteFraco, runSuave, _gelo)
    const fracoMin3 = Math.min(refrigeranteSuave, runFraco, _gelo)
    const fracoMax = Math.max(fracoMin1, fracoMin2, fracoMin3)
    const fracoMedia = getMedia(fracoMin1, fracoMin2, fracoMin3)
    console.log('\nFraco:')
    console.log(`{cocafraco(${refrigerante}); runFraco(${run}); gelo(${gelo})} --- {${ refrigeranteFraco }; ${ runFraco }; ${ _gelo }} | min > ${ fracoMin1 }`)
    console.log(`{cocafraco(${refrigerante}); runsuave(${run}); gelo(${gelo})} --- {${ refrigeranteFraco }; ${ runSuave }; ${ _gelo }} | min > ${ fracoMin2 } | max > ${ fracoMax }`)
    console.log(`{cocasuave(${refrigerante}); runFraco(${run}); gelo(${gelo})} --- {${ refrigeranteSuave }; ${ runFraco }; ${ _gelo }} | min > ${ fracoMin3 }`)

    const maximo = Math.max(fracoMax, suaveMax, forteMax)
    const empate = count([fracoMax, suaveMax, forteMax], maximo) > 0

    let paladar = ''
    if (empate) {
        paladar = getPaladar([fracoMedia, suaveMedia, forteMedia], Math.max(fracoMedia, suaveMedia, forteMedia))
    }else {
        paladar = getPaladar([fracoMax, suaveMax, forteMax], maximo)
    }

    console.log(`Paladar: ${paladar}; R$: ${getPreco(paladar)}`)
}