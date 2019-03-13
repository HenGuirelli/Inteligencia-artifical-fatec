class PRIM {
    static calcDistancia(vertice1, vertice2){
        return Math.abs(vertice1.x - vertice2.x) + Math.abs(vertice1.y - vertice2.y)
    }
}