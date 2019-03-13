class PRIM {
    constructor({ arestas, vertices }){
        this.arestas = arestas
        this.vertices = vertices
    }

    pegarPontoInicial(){
        return pegarItemPorKey('tipoVertice', this.vertices, tipoVertice.INICIO)
    }
}