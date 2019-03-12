'use strict'

class Aresta extends Subject {
    constructor($root, { vertice1, vertice2 }){
        super()
        this.$root = $root
        this.nome = vertice1.nome + vertice2.nome
        this.$aresta = this.criarAresta()
        this.$btnExcluir = this.criarBotaoExcluir()
        this.$aresta.appendChild(this.$btnExcluir)
        this.aresta = new ArestaModel({ vertice1: vertice1.vertice, vertice2: vertice2.vertice, nome: this.nome })

        const posicaoVertice1 = vertice1.pegarPosicao() 
        const posicaoVertice2 = vertice2.pegarPosicao()

        this.posicao = { 
            x1: posicaoVertice1.x, 
            x2: posicaoVertice2.x,
            y1: posicaoVertice1.y, 
            y2: posicaoVertice2.y
        }
        super.attach(grafo)
    }  

    criarBotaoExcluir() {
        const $btn = document.createElement('button')
        $btn.innerText = 'x'
        $btn.classList.add('btn-excluir')

        $btn.addEventListener('click', event => {
            event.stopPropagation()
            this.excluir()

            // notifica alteração de estado
            super.notify({ obj: this, expedidor: expedidor.ARESTA })
        })
        return $btn
    }

    excluir(){
        this.$aresta.remove()
        //this.onExcluir({ aresta: this })
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