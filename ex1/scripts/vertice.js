
class Vertice {
    constructor($root, { x, y }){
        this.proximoNome = geradorNomes()
        this.$root = $root
        this.$vertice = this.criarVertice({ x, y })
        this.$ponto = this.$vertice.firstChild
    }

    criarVertice({ x, y }) {
        const $grade = document.createElement('div')
        const $vertice = document.createElement('div')
    
        $grade.classList.add('grade')
        $vertice.classList.add('vertice')
    
        $vertice.x = x
        $vertice.y = y
        $vertice.nome = this.proximoNome()
    
        $vertice.addEventListener('click', (event, callback) => {
            console.log('clicad - x: ', x, ' y: ', y)
            console.log(event, callback)
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