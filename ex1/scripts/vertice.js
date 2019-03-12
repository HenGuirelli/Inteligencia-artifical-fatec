'use strict'

class Vertice extends Subject {
    constructor($root, { x, y }){
        super()
        this.proximoNome = geradorNomes()
        this.$root = $root
        this.$vertice = this.criarVertice({ x, y })
        this.$ponto = this.$vertice.firstChild

        this.x = x
        this.y = y
        
        this.estado = estadoVertice.VAZIO
        super.attach(grafo)
    }

    pegarEstado(){
        return this.estado
    }

    _toggleEstado(){
        if (this.estado.TRAVADO) return

        this.$ponto.classList.toggle(verticeClicadoClass)

        // altera estado
        this.estado = this.estado === estadoVertice.VAZIO ? estadoVertice.CLICADO : estadoVertice.VAZIO

        // notify all
        super.notify(this)        
    }

    travar(){
        this.$ponto.className = ''
        this.$ponto.classList.add(classVerticeTravado)
        this.$ponto.classList.add(classVertice)
        console.log(this.$ponto.classList)
        this.estado = estadoVertice.TRAVADO
    }

    destravar(){
        this.$ponto.className = ''
        this.$ponto.classList.add('vertice')
        this.estado = estadoVertice.VAZIO
    }

    criarVertice({ x, y }) {
        const $grade = document.createElement('div')
        const $vertice = document.createElement('div')
    
        $grade.classList.add('grade')
        $vertice.classList.add('vertice')
    
        $vertice.x = x
        $vertice.y = y
        $vertice.nome = this.proximoNome()
    
        $vertice.addEventListener('click', () => {
            this._toggleEstado()
        })
    
        $grade.appendChild($vertice)
        return $grade
    }

    place(){
        this.$root.appendChild(this.$vertice)
    }

    pegarPosicao(){
        var rect = this.$vertice.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { y: rect.top + scrollTop, x: rect.left + scrollLeft + 20}
    }
}