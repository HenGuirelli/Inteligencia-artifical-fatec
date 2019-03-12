'use strict'

class Aresta {
    constructor($root, { vertice1, vertice2 }){
        this.$root = $root
        this.$aresta = this.criarAresta()
        this.$btnExcluir = this.criarBotaoExcluir()
        this.$aresta.appendChild(this.$btnExcluir)

        this.vertice1 = vertice1
        this.vertice2 = vertice2

        const posicaoVertice1 = vertice1.pegarPosicao() 
        const posicaoVertice2 = vertice2.pegarPosicao()

        this.posicao = { 
            x1: posicaoVertice1.x, 
            x2: posicaoVertice2.x,
            y1: posicaoVertice1.y, 
            y2: posicaoVertice2.y
        }
        
        this.indexes = {
            x1: vertice1.x, 
            x2: vertice2.x,
            y1: vertice1.y, 
            y2: vertice2.y
        }

        this.tipoPosicao = this._pegarTipoPosicao(this.indexes)
        this.pega = this._pegarPeso()
    }
    _pegarPeso(){
        return this.tipoPosicao === posicaoAresta.DIAGONAL ? Math.sqrt(2) : 1
    }

    _pegarTipoPosicao(indexes) {
        if (indexes.y1 === indexes.y2)
            return posicaoAresta.HORIZONTAL
        else if (indexes.x1 === indexes.x2)
            return posicaoAresta.VERTICAL
        else
            return posicaoAresta.DIAGONAL
    }

    criarBotaoExcluir() {
        const $btn = document.createElement('button')
        $btn.innerText = 'x'
        $btn.classList.add('btn-excluir')

        $btn.addEventListener('click', event => {
            event.stopPropagation()
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

    place(){

        const distance = this.calcDistance({ ...this.posicao })

        setWidth(this.$aresta, distance)
        setHeight(this.$aresta, 5)

        setAngle(this.$aresta, this.calcAngle({ ...this.posicao }))
        setPosition(this.$aresta, { x: this.posicao.x1, y: this.posicao.y1 })
        this.$root.appendChild(this.$aresta)
    }
}

// // --- Test ---
// const edge = new Edge($grafo)
// edge.place({ x1: 250, x2: 200, y1: 250, y2: 100 })