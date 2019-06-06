const $refrigerante = document.getElementById('refrigerante')
const $run = document.getElementById('run')
const $gelo = document.getElementById('gelo')
const $nomeRefrigerante = document.getElementById('nome-refrigerante')

const $fracoLinha = document.querySelectorAll('.fraco-linha')
const $suaveLinha = document.querySelectorAll('.suave-linha')
const $forteLinha = document.querySelectorAll('.forte-linha')

const $expressao = document.querySelectorAll('.expressao')
const $calculos = document.querySelectorAll('.calculos')
const $minimo = document.querySelectorAll('.minimo')
const $maximo = document.querySelectorAll('.maximo')
const $media = document.querySelectorAll('.media')

const $expressao3 = document.querySelector('.expressao3')

const $maximos = document.querySelectorAll('.maximos')
const $medias = document.querySelectorAll('.medias')
const $empate = document.querySelector('.empate')

const $resposta = document.querySelector('.resposta')


const iniciar = () => {    
    validar0ate100($refrigerante, 'Refrigerante')
    validar0ate100($run, 'Run')
    validar0ate100($gelo, 'Gelo')

    const resultado = calcular()

    // ---SUAVE--- linha 1
    $expressao[0].innerHTML = `{ cocaForte(${resultado.refrigerante}); runFraco(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[0].innerHTML = `{ ${resultado.refrigeranteForte}, ${resultado.runFraco}, ${resultado._gelo} }`
    $minimo[0].innerHTML = `${resultado.suaveMin1}`

    // ---SUAVE--- linha 2
    $expressao[1].innerHTML = `{ cocaSuave(${resultado.refrigerante}); runSuave(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[1].innerHTML = `{ ${resultado.refrigeranteSuave}, ${resultado.runSuave}, ${resultado._gelo} }`
    $minimo[1].innerHTML = `${resultado.suaveMin2}`

    // ---SUAVE--- linha 3
    $expressao[2].innerHTML = `{ cocaFraco(${resultado.refrigerante}); runForte(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[2].innerHTML = `{ ${resultado.refrigeranteForte}, ${resultado.runForte}, ${resultado._gelo} }`
    $minimo[2].innerHTML = `${resultado.suaveMin3}`

    
    $maximos[0].innerHTML = `<strong> Máximo: </strong>${resultado.suaveMaximo}`
    $medias[0].innerHTML = `<strong> Média: </strong>${resultado.suaveMedia}`


    // ---FORTE--- linha 1
    $expressao[3].innerHTML = `{ cocaForte(${resultado.refrigerante}); runSuave(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[3].innerHTML = `{ ${resultado.refrigeranteForte}, ${resultado.runSuave}, ${resultado._gelo} }`
    $minimo[3].innerHTML = `${resultado.forteMin3}`

    // ---FORTE--- linha 2
    $expressao[4].innerHTML = `{ cocaForte(${resultado.refrigerante}); runForte(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[4].innerHTML = `{ ${resultado.refrigeranteForte}, ${resultado.runForte}, ${resultado._gelo} }`
    $minimo[4].innerHTML = `${resultado.forteMin3}`

    // ---FORTE--- linha 3
    $expressao[5].innerHTML = `{ cocaSuave(${resultado.refrigerante}); runForte(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[5].innerHTML = `{ ${resultado.refrigeranteSuave}, ${resultado.runForte}, ${resultado._gelo} }`
    $minimo[5].innerHTML = `${resultado.forteMin3}`

    
    $maximos[1].innerHTML = `<strong> Máximo: </strong>${resultado.forteMaximo}`
    $medias[1].innerHTML = `<strong> Média: </strong>${resultado.forteMedia}`


    // ---FRACO--- linha 1
    $expressao[6].innerHTML = `{ cocaFraco(${resultado.refrigerante}); runFraco(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[6].innerHTML = `{ ${resultado.refrigeranteFraco}, ${resultado.runFraco}, ${resultado._gelo} }`
    $minimo[6].innerHTML = `${resultado.fracoMin3}`

    // ---FRACO--- linha 2
    $expressao[7].innerHTML = `{ cocaFraco(${resultado.refrigerante}); runsuave(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[7].innerHTML = `{ ${resultado.refrigeranteFraco}, ${resultado.runSuave}, ${resultado._gelo} }`
    $minimo[7].innerHTML = `${resultado.fracoMin3}`

    // ---FRACO--- linha 3
    $expressao[8].innerHTML = `{ cocaSuave(${resultado.refrigerante}); runFraco(${resultado.run}); gelo(${resultado.gelo}) }`
    $calculos[8].innerHTML = `{ ${resultado.refrigeranteSuave}, ${resultado.runFraco}, ${resultado._gelo} }`
    $minimo[8].innerHTML = `${resultado.fracoMin3}`

    $maximos[2].innerHTML = `<strong> Máximo: </strong>${resultado.fracoMaximo}`
    $medias[2].innerHTML = `<strong> Média: </strong>${resultado.fracoMedia}`

    //$expressao3.innerHTML = `máximo{${}}`
    $expressao3.innerHTML = `maximo{${resultado.suaveMaximo}, ${resultado.forteMaximo}, ${resultado.fracoMaximo}} = ${resultado.maximo}`
    if (resultado.empate)
        $empate.innerHTML = `<strong>Deu Empate!</strong> <br> máximo das médias: maximo{${resultado.suaveMedia}, ${resultado.forteMedia}, ${resultado.fracoMedia}} = ${resultado.maximoDasMedias}`
    else 
        $empate.innerHTML = ''
        
    $resposta.innerHTML = `Paladar: ${resultado.paladar} <br> R$ ${resultado.preco}`
}