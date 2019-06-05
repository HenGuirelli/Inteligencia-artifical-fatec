const $refrigerante = document.getElementById('refrigerante')
const $run = document.getElementById('run')
const $gelo = document.getElementById('gelo')
const $nomeRefrigerante = document.getElementById('nome-refrigerante')

const $fracoLinha = document.querySelectorAll('.fraco-linha')
const $suaveLinha = document.querySelectorAll('.suave-linha')
const $forteLinha = document.querySelectorAll('.forte-linha')

const $resposta = document.querySelector('.resposta')

const iniciar = () => {    
    validar0ate100($refrigerante, 'Refrigerante')
    validar0ate100($run, 'Run')
    validar0ate100($gelo, 'Gelo')

    const resultado = calcular()

    $fracoLinha[0].innerHTML = resultado.fraco1
    $fracoLinha[1].innerHTML = resultado.fraco2
    $fracoLinha[2].innerHTML = resultado.fraco3

    $suaveLinha[0].innerHTML = resultado.suave1
    $suaveLinha[1].innerHTML = resultado.suave2
    $suaveLinha[2].innerHTML = resultado.suave3

    $forteLinha[0].innerHTML = resultado.forte1
    $forteLinha[1].innerHTML = resultado.forte2
    $forteLinha[2].innerHTML = resultado.forte3

    $resposta.innerHTML = `Paladar: ${resultado.paladar} <br> R$ ${resultado.preco}`
}