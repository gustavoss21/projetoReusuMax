let teste = document.querySelector('.block')
let folhas = document.querySelectorAll('.ql-editor')
let editor = document.querySelector('#editor.ql-container.ql-snow')
let bloco_center = document.querySelector('#bloco-center')
let btn_leitura = document.querySelector('#btn-leitura')
let barra_edicao = document.querySelector('.ql-toolbar.ql-snow')
let btn_save = document.querySelector('.ql-delete')
let icon = document.createElement('i')
let body = document.querySelector('body')
let inputRange = document.querySelector('#customRange1')
let alturaFolha
let nova_folha
let clone_conteudo
var folha
var conta_folha = 0


icon.setAttribute('class', 'fa-regular fa-floppy-disk')
btn_save.appendChild(icon)

// class Folha{
//     constructor() {
//         this.largura = window.getComputedStyle(bloco_center).width.slice(0, -2)
//         this.altura = largura / 0.7069555302166477
//         this.font_size =
//     }
// }
function rangeFolha() {
    folhas = document.querySelectorAll('.ql-editor')
    console.log(folhas)
    for (contador of folhas) {
        folha = contador
        defineTamanhoFolha()
        console.log(contador)

    }
}
// function rangeFolha() {
//     folhas = document.querySelectorAll('.ql-editor')
//     folha = folhas[conta_folha]
//     defineTamanhoFolha()
//     console.log(conta_folha)
//     console.log(folhas[conta_folha])
//     return conta_folha + 1
// }

function defineTamanhoFolha() {
    let largura = window.getComputedStyle(bloco_center).width.slice(0, -2)
    largura = largura * (inputRange.value / 100)
    editor.style.width = largura + 'px'
    ajustaTamanhoFont()
    ajustaAlturaFolha()
}


function ajustaAlturaFolha() {
    largura = window.getComputedStyle(editor).width.slice(0, -2)
    altura_conteudo = largura / 0.7069555302166477
    folha.style.height = altura_conteudo + 'px'
    console.log('largura: ' + parseInt(largura) + ' altura: ' + parseInt(altura_conteudo))
    return

}

function ajustaTamanhoFont() {
    let largura = window.getComputedStyle(folha).width.slice(0, -2) * 0.1
    folha.style.fontSize = largura + '%'
    console.log('fonte: ' + parseInt(largura))

}

// define o modo somente leitura
btn_leitura.onclick = function () {
    if (folha.getAttribute('contenteditable') === 'true') {
        folha.setAttribute('contenteditable', false)
        this.innerHTML = 'Editar'
        editor.style.height = 'auto'
        barra_edicao.style.display = 'none'
    } else {
        folha.setAttribute('contenteditable', true)
        this.innerHTML = 'Somente leitura'
        barra_edicao.style.display = 'block'
        ajustaAlturaFolha()
    }


}

function quebraPagina() {
    folhas = document.querySelectorAll('.ql-editor')
    let total_folhas = folhas.length
    folha = folhas[total_folhas - 1]
    if (total_folhas > 5) {
        console.log('parada de seguraça')
        return
    }
    // console.log(folha)
    const folha_conteudo = folha.children //////////
    let altura_conteudo = 0
    let paddingY = folha.offsetHeight * 0.164
    // let paddingY = (folha.offsetHeight * 0.12)

    // let paddingY = window.getComputedStyle(folha).paddingTop.slice(0, -2) * 2
    let ultimoConteudoIndice
    let alturaMax = folha.offsetHeight - paddingY
    // console.log(folha.offsetHeight + ' padding: ' + paddingY + ' max: ' + alturaMax)
    // console.log('padding ' + paddingY + ' altura: ' + folha.offsetHeight + ' diferença: ' + alturaMax)
    let listaPassou = Array()
    let ultimoConteudoAltura

    let linhaHeigth
    let conteudoLinhas
    let contador = 0
    let quebra_pagina = false

    //  laço que pega os textos que transpassaram a folha e define o ultimo
    //  texto da folha para analize(verificar se o final dele para a margem da folha)
    // console.log(folha_conteudo[folha_conteudo.length - 1].innerText.length)
    for (let c = 0; c < folha_conteudo.length; c++) {


        // console.log('conteudo: ' + altura_conteudo + ' folha: ' + alturaMax)
        // console.log('padding: ' + folha.offsetHeight + ' altura: ' + alturaMax)
        // console.log(altura_conteudo + ultimoConteudoAltura > alturaMax)
        // console.log(altura_conteudo + '  ' + alturaMax)

        ultimoConteudoAltura = folha_conteudo[c].offsetHeight
        // console.log('altura_conteudo ' + (altura_conteudo + ultimoConteudoAltura) + '>' + ' alturaMax ' + alturaMax + ' = ' + (altura_conteudo > alturaMax))
        altura_conteudo += folha_conteudo[c].offsetHeight

        if (altura_conteudo + ultimoConteudoAltura > alturaMax) {


            // console.log("alturaMax " + alturaMax + ' altura_c: ' + altura_conteudo)
            quebra_pagina = true
            // console.log('indice ' + c)


            if (contador == 0) {
                // console.log(folha_conteudo[c].innerText)
                ultimoConteudoIndice = c
                // ultimoConteudoAltura = folha_conteudo[c].offsetHeight
                // console.log('maximo ' + alturaMax + ' posiçao ' + ultimoConteudoPosicao)
                // console.log(folha_conteudo[c].innerText)
            } else {
                listaPassou.push(c)
            }
            contador++

        }
        // console.log(altura_conteudo)
    }



    // console.log('  conteudo ' + altura_conteudo + ' ultimo ' + ultimoConteudoAltura + ' maximo ' + alturaMax)
    // console.log(folha_conteudo[ultimoConteudoIndice].innerText)

    if (quebra_pagina) {

        // console.log(folha_conteudo[ultimoConteudoIndice])
        const conteudo_elemento = folha_conteudo[ultimoConteudoIndice]
        let tamanhoPassou = parseInt(altura_conteudo + ultimoConteudoAltura - alturaMax)
        // console.log(tamanhoPassou)

        // 
        // console.log(ultimoConteudoIndice)
        // console.log(folha_conteudo)
        if (quebra_pagina) {
            console.log('quebra pagina')
            let paragrafo_passou = quebraLinha(tamanhoPassou, conteudo_elemento) //tem que fazer a chamada da funçao com os argumentos
            return novaFolha(listaPassou, paragrafo_passou)
            // console.log('passado: ' + listaPassou)
        }
        // console.log(listaPassou)


    }
    // console.log(altura_conteudo + ultimoConteudoAltura > alturaMax)
    // console.log((altura_conteudo + ultimoConteudoAltura) + ' max: ' + alturaMax)
}

function quebraLinha(altura_passou, elemento) {

    let linhaHeigth = window.getComputedStyle(elemento).lineHeight.slice(0, -2)
    let indice = parseInt(parseFloat(altura_passou).toFixed())
    let i = parseInt(parseFloat(altura_passou).toFixed())
    linhaHeigth = parseInt(parseFloat(linhaHeigth).toFixed())
    // ultimoConteudoAltura = folha_conteudo[ultimoConteudoIndice].offsetHeight
    scrollHeights = elemento.scrollHeight
    conteudoLinhas = (scrollHeights / linhaHeigth).toFixed()
    let contador = 0
    let total_resto = elemento.innerText.length % 121
    let total = elemento.innerText.length



    // console.log(linhaHeigth)
    // console.log(elemento.innerHTML)
    // console.log(total > 121)
    if (total > 121) {
        // console.log(altura_passou)
        // elemento.innerHTML = ''
        // console.log(altura_passou)
        // while (altura_passou > contador) {
        //     contador += linhaHeigth

        // }
        contador = Math.ceil(altura_passou / linhaHeigth)

        elemento.innerText = elemento.innerText.slice(0, total - total_resto)
        // console.log('total ' + total + ' resto ' + total_resto + ' linhas ' + elemento.innerText.length / 121)
        // console.log(elemento.innerText.slice(0, total - total_resto))
        // console.log(elemento.innerText.length)
        return elemento.innerText.slice(total_resto,)
        // for (indice; indice > 0; indice--) {
        //     // console.log('linha: ' + linhaHeigth + ' conteudo: ' + scrollHeights)
        //     // console.log('passou: ' + tamanhoPassou + ' indice: ' + i + (tamanhoPassou <= i))
        //     // console.log('segundo: ' + folha_conteudo[ultimoConteudoIndice].innerHTML.slice(0, 114 * contador))//
        //     contador++
        //     console.log(indice)
        //     // folha_conteudo[ultimoConteudoIndice].innerHTML = folha_conteudo[ultimoConteudoIndice].innerHTML.slice(0, 60 * contador)
        //     i -= linhaHeigth
        //     if (i > 11) {
        //         console.log(elemento.innerText)


        //         //  elemento errado

        //         // elemento.innerHTML = elemento.innerHTML.slice(0, 30 * contador)
        //         // console.log(elemento.innerText.slice(0, 114 * contador))
        //         break
        //     }
        // }


    } else {
        return
    }


}

function novaFolha(listaConteudo, paragrafo_topo) {
    folhas = document.querySelectorAll('.ql-editor')
    let total_folhas = folhas.length
    folha = folhas[total_folhas - 1]
    // console.log('execultou novaFolha')
    // console.log("passou " + listaConteudo)
    let nova_folha = folha.cloneNode(true)
    nova_folha.innerHTML = ''
    editor.appendChild(nova_folha)

    // editor.insertBefore(nova_folha, editor.children[1])
    if (paragrafo_topo) {
        let paragrafo = document.createTextNode(paragrafo_topo)
        let p_topo = document.createElement('p').appendChild(paragrafo)
        nova_folha.appendChild(p_topo)
        // console.log(paragrafo_topo)
    }


    for (i of listaConteudo) {

        if (folha.children[i]) {
            // console.log(folha.children[i].innerText)
            clone_conteudo = folha.children[i].cloneNode(true)
            //         // console.log(clone_conteudo.innerHTML)
            // console.log(i)
            nova_folha.appendChild(clone_conteudo)

        }
    }

    for (let c = 0; c < listaConteudo.length; c++) {
        folha.lastChild.remove()
    }

    return quebraPagina()
    // folhas = document.querySelectorAll('.ql-editor')
    // let total_folhas = folhas.length
    // folha = folhas[total_folhas - 1]
    // console.log(total_folhas)
    // console.log(folha)
}
// function retorna_html() {
//     let folhas = document.querySelectorAll('.ql-editor')
//     // editor = document.querySelector('#editor.ql-container.ql-snow')
//     let conteudo
//     // for (pagina of folhas) {
//     //     for (let folha of pagina.children) {
//     //         console.log(folha)
//     //     }
//     // }
//     // console.log(editor.innerHTML.slice(119,))
//     let editor = folhas[0].innerHTML
//     console.log(editor)
//     return editor.innerHTML
// }


btn_save.onclick = () => salvar()
body.onresize = () => rangeFolha()

// em produçao
rangeFolha()
quebraPagina()
rangeFolha()


