const setWidth = ($element, width) => $element.style.width = width
const setHeight = ($element, height) => $element.style.height = height
const setAngle = ($element, rad) => $element.style.transform = `rotate(${rad}rad)`

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
