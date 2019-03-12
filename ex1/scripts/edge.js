'use strict'
const classEdge = 'edge'
const $grafo = document.querySelector('#grafo')

const setWidth = ($element, width) => $element.style.width = width
const setHeight = ($element, height) => $element.style.height = height
const setAngle = ($element, rad) => $element.style.transform = `rotate(${rad}rad)`

class Edge {
    constructor($root){
        this.$edge = this.createEdge()
        this.$root = $root
    }

    createEdge(){
        const $edge = document.createElement('div')
        $edge.classList.add(classEdge)
        $edge.style.transformOrigin = 'top left'
        return $edge
    }

    calcDistance({ x1, x2, y1, y2 }) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2- y1, 2))
    }

    calcAngle({ x1, x2, y1, y2 }) {
        return Math.atan2((y2-y1), (x2-x1))
    }

    place({ x1, x2, y1, y2 }){        
        const distance = this.calcDistance({ x1, x2, y1, y2 })

        setWidth(this.$edge, distance)
        setHeight(this.$edge, 5)

        setAngle(this.$edge, this.calcAngle({ x1, x2, y1, y2 }))
        this.$root.appendChild(this.$edge)
    }
}

// --- Test ---
const edge = new Edge($grafo)
edge.place({ x1: 0, x2: 200, y1: 10, y2: 10 })