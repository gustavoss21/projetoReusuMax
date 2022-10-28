let valor = 1
let intervalo
function inter() {
    intervalo = setInterval(contador, 500)
}

function contador() {
    console.log(valor)
    valor += 1
    if (valor == 5) {
        clearInterval(intervalo)
    }
    console.log('fim')
}
inter()
