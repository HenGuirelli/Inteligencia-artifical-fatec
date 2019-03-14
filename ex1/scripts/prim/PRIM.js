class PRIM {
    constructor({ arestas, vertices }){
        this.arestas = arestas.map(aresta => new ArestaPRIM(aresta))
        this.vertices = vertices.map(vertice => new VerticePRIM(vertice))
    }

    pegarPontoInicial(){
        return pegarItemPorKey('tipoVertice', this.vertices, tipoVertice.INICIO)
    }
}