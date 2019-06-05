const estaNoIntervalo = (valor, intervalo1, intervalo2) => {
    return valor >= intervalo1 && valor <= intervalo2
}


const ehNullOuUndefined = (obj) => {
    return obj == null || obj == undefined
}

const validar0ate100 = ($campo, nomeCampo = '') => {
    if (ehNullOuUndefined($campo)){
        alert(`${nomeCampo} é nulo`)
    }else {
        const valor = parseInt($campo.value)

        if (!estaNoIntervalo(valor, 0, 100)) {
            const texto = `${nomeCampo} Deve estar entre 0 e 100`
            
            alert(texto)
            throw texto
        }
    }
}