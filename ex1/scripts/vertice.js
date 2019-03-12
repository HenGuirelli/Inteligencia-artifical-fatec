'use strict'

class Vertice extends Subject {
    constructor($root, { x, y, nome }){
        super()
        this.nome = nome
        this.$root = $root
        this.$vertice = this.criarVertice({ x, y })
        this.$ponto = this.$vertice.firstChild
        this.filhos = []

        this.x = x
        this.y = y
        
        this.estado = estadoVertice.VAZIO
        super.attach(grafo)
    }

    pegarEstado(){
        return this.estado
    }

    _toggleEstado(){
        this.$ponto.classList.toggle(verticeClicadoClass)

        // altera estado
        this.estado = this.estado === estadoVertice.VAZIO ? estadoVertice.CLICADO : estadoVertice.VAZIO

        // notify all
        super.notify({ obj: this, expedidor: expedidor.VERTICE })        
    }

    estadoPadrao(){
        this.$ponto.className = ''
        this.$ponto.classList.add(classVertice)
        this.estado = estadoVertice.VAZIO
    }

    criarVertice({ x, y }) {
        const $grade = document.createElement('div')
        const $vertice = document.createElement('div')
        const $nome = document.createElement('span')
        $nome.classList.add('nome-vertice')
        $nome.innerText = this.nome
    
        $grade.classList.add('grade')
        $vertice.classList.add('vertice')
    
        $vertice.x = x
        $vertice.y = y
    
        $vertice.addEventListener('click', event => {
            this._toggleEstado()
        })
    
        $grade.appendChild($vertice)
        $vertice.appendChild($nome)
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