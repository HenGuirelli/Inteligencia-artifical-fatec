const verticeClicadoClass = 'vertice-clicado'
const classVerticeTravado = 'vertice-travado'
const classVerticeInicial = 'ponto-inicial'
const classVerticeFinal = 'ponto-final'
const classEdge = 'edge'
const classVertice = 'vertice'

const calcDistanciaManhatan = (vertice1, vertice2) => {
    return Math.abs(vertice1.x - vertice2.x) + Math.abs(vertice1.y - vertice2.y)
}
const setWidth = ($element, width) => $element.style.width = width
const setHeight = ($element, height) => $element.style.height = height
const setAngle = ($element, rad) => $element.style.transform = `rotate(${rad}rad)`
const setPosition = ($element, { x, y }) => { 
    $element.style.left = x
    $element.style.top = y
}

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
const $txtPontoDePartida = document.querySelector('#txtPontoDePartida')
const $txtPontoFinal = document.querySelector('#txtPontoFinal')
const $matrizAdjacentes = document.querySelector('#matriz-adjacentes')
const $caminhoPercorrido = document.querySelector('#caminho-percorrido')
const $distanciaManhattan = document.querySelector('#distancia-manhattan')
const $distanciaPercorrida = document.querySelector('#distancia-percorrida')
const qtdVertice = parseInt($txtColunas.value * 2)

const geradorNomes = () => {
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

const pegarItemPorKey = (chave, vetor, valor) => {
    return vetor.filter(filho => filho[chave] === valor)[0]
}

const removerItemPorKey = (chave, vetor, valor) => {
    return vetor.filter(filho => filho[chave] !== valor)
}

const validarTipo = (obj, T) => {
    if ( !(obj instanceof T) ){
        throw `objeto incorredo esperado '${typeof T}' recebido: ${typeof obj}`
    }
}

const posicaoAresta = {
    DIAGONAL: 'DIAGONAL',
    HORIZONTAL: 'HORIZONTAL',
    VERTICAL: 'VERTICAL'
}

const estadoVertice = {
    VAZIO: 'VAZIO',
    CLICADO: 'CLICADO'
}

const expedidor = {
    VERTICE: 'VERTICE',
    ARESTA: 'ARESTA'
}

const tipoVertice = {
    INICIO: 'INICIO',
    FIM: 'FIM',
    INDEFINIDO: undefined
}