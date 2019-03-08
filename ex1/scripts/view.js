const $grafo = document.querySelector('#grafo')
const $txtColunas = document.querySelector('#txtColunas')

const $verticesClicadas = []

const criarLinha = () => {
    const $linha = document.createElement('div')
    $linha.classList.add('linha')
    return $linha
}

const criarAresta = ($vertice1, $vertice2) => {
    const $aresta = document.createElement('div')
    $aresta.classList.add('aresta')
    return $aresta
}

const posicionarAresta = ($aresta, $vertice1, $vertice2) => {
    const posicao1 = pegarPosicao($vertice1)
    const posicao2 = pegarPosicao($vertice2)

    if(arestaValidaParaPosicionamento($vertice1, $vertice2)) {

    }else{
        alert('aresta inválida')
    }
}

const arestaValidaParaPosicionamento = ($vertice1, $vertice2) => {
    const diff = (n1, n2) => Math.abs(n1 - n2)
    const posx = [$vertice1.x, $vertice2.x]
    const posy = [$vertice1.y, $vertice2.y]
    return diff(Math.max(...posx), Math.min(...posx)) <= 1 && diff(Math.max(...posy), Math.min(...posy)) <= 1
}

const tipoPosicionamento = ($vertice1, $vertice2) => {
    if ($vertice1.x == $vertice1.x){
        return 'LINHA'
    }else if ($vertice1.y === $vertice2.y) {
        return 'COLUNA'
    }else{
        return 'DIAGONAL'
    }
}

const pegarPosicao = $elemento => {
    return {
        x: $elemento.offsetTop,
        y: $elemento.offsetLeft
    }
}

const verticesIguais = ($vertice1, $vertice2) => {
    return $vertice1.x === $vertice2.x && $vertice1.y === $vertice2.y
}

const alterarEstadoVertice = $vertice => {
    // ignora caso tenha deselecionado
    if (!($verticesClicadas.length === 1 && $verticesClicadas.includes($vertice))){

        if($verticesClicadas.length === 2) {
            const $vertice1 = $verticesClicadas[0]
            const $vertice2 = $verticesClicadas[1]
            
            const $aresta = criarAresta($vertice1, $vertice2)
            
            posicionarAresta($aresta, $vertice1, $vertice2)

            $verticesClicadas.pop()
            $verticesClicadas.pop()
        }
    }

    $vertice.classList.toggle('vertice-clicado')
}

const criarVertice = (x, y) => {
    const $grade = document.createElement('div')
    const $vertice = document.createElement('div')

    $grade.classList.add('grade')
    $vertice.classList.add('vertice')

    $vertice.x = x
    $vertice.y = y

    $vertice.addEventListener('click', () => {
        $verticesClicadas.push($vertice)
        alterarEstadoVertice($vertice)
        console.log('clicad - x: ', x, ' y: ', y)
    })

    $grade.appendChild($vertice)
    return $grade
}

const limparTela = () => {
    while ($grafo.firstChild) {
        $grafo.removeChild($grafo.firstChild);
    }
}

const iniciar = () => {
    limparTela()

    let $linha = criarLinha()
    for (let i = 0; i < $txtColunas.value; i++){
        $linha.appendChild(criarVertice(i, 0))
    }
    $grafo.appendChild($linha)

    $linha = criarLinha()
    for (let i = 0; i < $txtColunas.value; i++){
        $linha.appendChild(criarVertice(i, 1))
    }

    $grafo.appendChild($linha)
}