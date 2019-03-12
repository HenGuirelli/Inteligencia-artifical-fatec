const verticeClicadoClass = 'vertice-clicado'
const classEdge = 'edge'
const classVerticeTravado = 'vertice-travado'
const classVertice = 'vertice'


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