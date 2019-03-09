'use strict'

const GrafoTest = [
    [0, 1, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1, 0]
]

const $grafo = document.querySelector('#grafo')
const $txtColunas = document.querySelector('#txtColunas')
const $svg = document.querySelector('#svg')

const $vertices = []

const criarLinha = () => {
    const $linha = document.createElement('div')
    $linha.classList.add('linha')
    return $linha
}

const pegarPosicao = $elemento => {
    var rect = $elemento.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { y: rect.top + scrollTop, x: rect.left + scrollLeft + 20}
}

const criarVertice = (x, y, nome) => {
    const $grade = document.createElement('div')
    const $vertice = document.createElement('div')

    $grade.classList.add('grade')
    $vertice.classList.add('vertice')

    $vertice.x = x
    $vertice.y = y
    $vertice.nome = nome

    $vertice.addEventListener('click', () => {
        // $verticesClicadas.push($vertice)
        // alterarEstadoVertice($vertice)
        // console.log('clicad - x: ', x, ' y: ', y)
    })

    $grade.appendChild($vertice)
    return $grade
}

const criarNomeVertice = () => {
    let letra = [65]
    return () => {
    	let resultado = ''
    	for (let i = 0; i < letra.length; i++){
        	resultado += String.fromCharCode(letra[i])
        }
        letra[letra.length - 1] = letra[letra.length - 1] + 1
        if (letra[letra.length - 1] >= 90) {
            letra[letra.length - 1] = 65
        	letra.push(65)
        }

        return resultado
    }
}

const limparTela = () => {
    while ($grafo.firstChild) {
        $grafo.removeChild($grafo.firstChild);
    }
}

const iniciar = () => {
    limparTela()

    let proximoNome = criarNomeVertice()
    let $linha = criarLinha()
    for (let i = 0; i < $txtColunas.value; i++){
        let $vertice = criarVertice(i, 0, proximoNome())
        $linha.appendChild($vertice)
        $vertices.push($vertice)
    }
    $grafo.appendChild($linha)

    $linha = criarLinha()
    for (let i = 0; i < $txtColunas.value; i++){
        let $vertice = criarVertice(i, 1, proximoNome())
        $linha.appendChild($vertice)
        $vertices.push($vertice)
    }
    $grafo.appendChild($linha)

    gerarAresta(GrafoTest)()
}

const pegarNomesPorIndex = (i, j) => {
    return {
        A: String.fromCharCode(i + 65),
        B: String.fromCharCode(j + 65)
    }
}

const pegarVerticePorNome = nome => {
    return $vertices.filter($vertice => $vertice.firstChild.nome === nome)[0]
}

const gerarAresta = matriz => () => {
    // console.log(matriz)
    // console.log($vertices)
    matriz.forEach((linha, i) => {
        linha.forEach((vertice, j) => {
            const $aresta = document.createElementNS('http://www.w3.org/2000/svg','line')

            if (vertice > 0){
                const nomes = pegarNomesPorIndex(i, j)
                const $vertice1 = pegarVerticePorNome(nomes.A)
                const $vertice2 = pegarVerticePorNome(nomes.B)

                console.log('pegando posição')
                console.log('nomes:', nomes)
                console.log('vertices: \n', $vertice1, $vertice2)

                const posicao1 = pegarPosicao($vertice1.firstChild)
                const posicao2 = pegarPosicao($vertice2.firstChild)
                
                $aresta.setAttribute('stroke', 'black')
                $aresta.setAttribute('x1', posicao1.x)
                $aresta.setAttribute('y1', posicao1.y)
                $aresta.setAttribute('x2', posicao2.x)
                $aresta.setAttribute('y2', posicao2.y)
                $svg.appendChild($aresta)                

                //console.log(pegarVerticePorNome(nome))
            }
            
            // console.log(linha)
        })
    });
}