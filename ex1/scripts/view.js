const $grafo = document.querySelector('#grafo')
const $txtColunas = document.querySelector('#txtColunas')

const criarVertice = () => {
    const $vertice = document.createElement('div')
    $vertice.classList.add('vertice')
    return $vertice
}

const iniciar = () => {
    for (let i = 0; i < $txtColunas.value; i++){
        $grafo.appendChild(criarVertice())
    }
}