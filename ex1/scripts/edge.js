'use strict'

class Edge {
    constructor($root, { vertice1, vertice2 }){
        this.$root = $root
        this.$aresta = this.criarAresta()
        this.$btnExcluir = this.criarBotaoExcluir()
        this.$aresta.appendChild(this.$btnExcluir)

        this.vertice1 = vertice1
        this.vertice2 = vertice2
    }

    criarBotaoExcluir() {
        const $btn = document.createElement('button')
        $btn.innerText = 'x'
        $btn.classList.add('btn-excluir')

        $btn.addEventListener('click', event => {
            this.excluir()
        })
        return $btn
    }

    excluir(){
        this.$aresta.remove()
    }

    criarAresta(){
        const $aresta = document.createElement('div')
        $aresta.classList.add(classEdge)
        $aresta.style.transformOrigin = 'top left'

        $aresta.addEventListener('mouseover', () => {
            this.$btnExcluir.classList.add('btn-excluir-visivel')
        })
        $aresta.addEventListener('mouseout', () => {
            this.$btnExcluir.classList.remove('btn-excluir-visivel')
        })
        

        return $aresta
    }

    calcDistance({ x1, x2, y1, y2 }) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2- y1, 2))
    }

    calcAngle({ x1, x2, y1, y2 }) {
        return Math.atan2((y2-y1), (x2-x1))
    }

    place({ x1, x2, y1, y2 }){
        const distance = this.calcDistance({ x1, x2, y1, y2 })

        setWidth(this.$aresta, distance)
        setHeight(this.$aresta, 5)

        setAngle(this.$aresta, this.calcAngle({ x1, x2, y1, y2 }))
        setPosition(this.$aresta, { x: x1, y: y1 })
        this.$root.appendChild(this.$aresta)
    }
}

// // --- Test ---
// const edge = new Edge($grafo)
// edge.place({ x1: 250, x2: 200, y1: 250, y2: 100 })