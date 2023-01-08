let btn_leitura = document.querySelector('#btn-leitura')
let body = document.getElementsByTagName('body')
let input_range = document.querySelector('#customRange1')
let barra_edicao = document.querySelector('.ql-toolbar.ql-snow')
let icon = document.createElement('i')
let elemento_vazio = document.createElement('div')
let bloco_center = document.createElement('div')
let folha_edite = document.createElement('div')
let conteudo_central = document.querySelector('#conteudo-central')
let btn_save = document.querySelector('.ql-delete')
let alturaFolha
var marker = '{|}';
let altura_folha
let tamanho_font
let nova_folha
let clone_conteudo
var conta_folha = 0
var modo_leitura = false
var interador_folha = 0
let value_temporario = document.getElementById('temporario-dados')
if (value_temporario) {
   value_temporario = JSON.parse(document.getElementById('temporario-dados').textContent);
}
const value_texto = JSON.parse(document.getElementById('artigo-dados').textContent) || value_temporario;
let div_conteudo_texto = document.createElement('div')
div_conteudo_texto.innerHTML = value_texto
let lista_conteudo = [...div_conteudo_texto.children]


//faz com que o dropdown nao suma ao clicar no item
$("#bloco-right").on('click', '.dropdown-item', function (event) { event.stopPropagation(); });
{/* <div id="bloco-center">
    <div class="editor">
    </div>
</div> */}
function criaElementoFolha() {
    conteudo_central.appendChild(bloco_center)
    bloco_center.appendChild(folha_edite)
    folha_edite.setAttribute('class','editor')
    bloco_center.setAttribute('id', 'bloco-center')
   
}

function rangeFolha() {
    // console.log('rangeFolha')

    // btn_save = document.querySelector('.ql-delete')
    // icon.setAttribute('class', 'fa-regular fa-floppy-disk')
    // btn_save.appendChild(icon)// tem que descomenta-lo
    let folha = document.querySelector('.ql-editor')
    modo_leitura ? false : defineTamanhoFolha(folha)
    
    setTextoFolha(folha)
    // console.log(folhas)
    // for (let folha of folhas) {
    //     // console.log(contador)
    //     defineTamanhoFolha(folha)
    //     if (!(modo_leitura || input_range_booleno)) {
    //         /**essa quebra nao deve esta no rangeFolha porque essa funcao
    //            esta sendo acionado pelo input_range*/
    //         console.log('range folha')
    //         setTextoFolha(folha.firstChild)
    //     }


    // }
}
/**
 * ajusta a largura das folhas de acordo com o input range
 * execulta as funcoes ajustaTamanhoFont e ajustaAlturaFolha
 * @param {*} folha 
 */
function defineTamanhoFolha(folha) {
    let folhas = document.querySelectorAll('.editor')
    let inputRange = document.querySelector('#customRange1')
    let largura = window.getComputedStyle(bloco_center.parentNode).width.slice(0, -2)
    largura = largura * (inputRange.value / 100)
    bloco_center.style.width = largura + 'px'


    if (!modo_leitura) {

        ajustaTamanhoFont(folha)
        folhas.forEach(function (elemeno) { ajustaAlturaFolha(elemeno) })
    }

}
/**
 * ajusta a altura da folha de acordo com a largura da pagina
 * @param {*} folha 
 */
function ajustaAlturaFolha(folha) {
    let largura_folha = window.getComputedStyle(bloco_center).width.slice(0, -2)//tirar
    altura_folha = largura_folha / 0.7069555302166477
    folha.style.height = altura_folha + 'px'
}
function ajustaTamanhoFont(folha) {
    let checked_filter = document.querySelector("#bloco-right #filtro")

    if (checked_filter) {
        if (checked_filter.checked) {
            tamanho_font = window.getComputedStyle(bloco_center).width.slice(0, -2) * 0.1
            bloco_center.style.fontSize = tamanho_font + '%'
            return
        }
    }

    tamanho_font = window.getComputedStyle(folha).width.slice(0, -2) * 0.1
    bloco_center.style.fontSize = tamanho_font + '%'
}

// define o modo leitura
function modoLeitura() {
    let checked_filter = document.querySelector("#bloco-right #filtro")
    let container_filter = document.querySelector('.conteinar-tex-funcao')
    // remove container filtro-texto 
    if (checked_filter) {
        checked_filter.checked = false
        definicoesFilter()
    }

    if (!modo_leitura) {
        ativaModoLeitura()

    } else {
        desativaModoLeitura()
    }
    console.log(modo_leitura)

}

function ativaModoLeitura() {
    console.log('ativaModoLeitura')
    let editor = document.querySelectorAll('.editor')
    const folha_leitura = editor[0].cloneNode(true)

    btn_leitura.innerText = 'Editar'
    btn_leitura.style.background = '#94cfe3'
    modo_leitura = true

    folha_leitura.firstChild.setAttribute('contenteditable', false)
    folha_leitura.style.height = 'auto'
    folha_leitura.setAttribute('id', 'folha-leitura')
   
    bloco_center.appendChild(folha_leitura)
    editor.forEach(function (folha, index) {
        if (index > 0) {
            folha_leitura.firstChild.innerHTML += folha.firstChild.innerHTML

        }
           
        editor[index].setAttribute('hidden', 'hidden')

    })
    console.log(folha_leitura.innerHTML)
    salvarNoStorage('modoLeitura', true)

  
}

function desativaModoLeitura() {
    let folha_leitura = document.querySelector('#folha-leitura')
    let editor = document.querySelectorAll('.editor')
    let checked_filter = document.querySelector("#bloco-right #filtro")

    modo_leitura = false
    btn_leitura.innerText = 'Somente leitura'
    btn_leitura.style.background = '#f2de78d4'
    salvarNoStorage('modoLeitura', false)
    // console.log(folha_leitura)
    //apaga folha-modo-leitura
    if (folha_leitura) {
        folha_leitura.remove()
    }

    //folha editável fica invisivel
    if(checked_filter.checked){
        for (let folha of editor) {
            if (!folha.hasAttribute('hidden')) {
                folha.setAttribute('hidden','hidden')
            }
        }
        return
    }

    //folha editável fica visivel
    for (let folha of editor) {
        if (!folha.hasAttribute('hidden')) {
            folha.removeAttribute('hidden')
        }
    }
    
    
    
}

function setTextoFolha(folha, inicio_interador = 0,nova_folha) {
    let altura_scroll
    let ultimoConteudoIndice
    let quebra_pagina = false
    let folha_altura = folha.offsetHeight + folha.offsetTop
    console.log('setTextoFolha')
    // folha.firstChild.remove() 
    for (inicio_interador; inicio_interador < lista_conteudo.length;) {
        let posicao_p = lista_conteudo[inicio_interador].offsetTop
        let altura_p = lista_conteudo[inicio_interador].offsetHeight
        let posicao_final = posicao_p + altura_p

        if (lista_conteudo[inicio_interador].hasAttribute('class')) {
            let class_p = lista_conteudo[inicio_interador].getAttribute('class')

            if (class_p === 'primeiro-p' && !nova_folha) {

                ultimoConteudoIndice = inicio_interador
                quebra_pagina = true
                const t = lista_conteudo[inicio_interador]
                return novaFolha(inicio_interador)
            }
        }
        nova_folha = false
        altura_scroll = folha.scrollHeight
        if (posicao_final + 20 > folha_altura) {

            ultimoConteudoIndice = inicio_interador
            quebra_pagina = true
            return novaFolha(ultimoConteudoIndice)
        }
        folha.appendChild(lista_conteudo[inicio_interador])
        lista_conteudo.shift()
    }    
}

function limitaParagrafos(folha) {
    const lista = folha.children
    let folha_altura = folha.offsetHeight + folha.offsetTop
    let elementos_passou = ''
    let ultimo_indice_passou 
    let elementos
    let primeiro_passou

    for (let indece = 0; indece < lista.length; indece++){
        const elemento = lista[lista.length - indece]
        // console.log(elemento)
        if(!elemento)continue
        // console.log(elemento.in)
        let posicao_p = elemento.offsetTop
        let altura_p = elemento.offsetHeight
        let posicao_final = posicao_p + altura_p

        if (posicao_final +10 > folha_altura) {
            primeiro_passou = elemento
        }
        else {
            if (indece <= 1) {
                return false
            }
            break
        } 

    }

    ultimo_indice_passou = [...lista].indexOf(primeiro_passou)
    // obtem todos os elementos que passaram a folha exceto primeiro_passou
    elementos = [...lista].slice(ultimo_indice_passou + 1,)
    elementos.forEach(function (elemeno) {
        elementos_passou += elemeno.innerHTML
        elemeno.remove()
    }
    )
    return { 'ultimos': elementos_passou, 'primeiro': primeiro_passou }
    
//     
}
function desceTextoFolha(folha,folha2=false) {
    let elementos_passou = limitaParagrafos(folha)//(ultimos,primeiro)
    let elemento = elementos_passou['primeiro']
    let conteudo_quebra
    let height_folha = folha.offsetHeight
    let contador = 0
    let indice_fim
    let texto = (elemento.innerText).split(' ')
    let for_texto
    let novo_elemento
    let scroll_height_folha = folha.scrollHeight
    

    if (texto[0] == "\n") {
        return 'vazio_elemento'
        // elemento = folha.lastElementChild
        // texto = (elemento.innerText).split(' ')
    }
    for (let palavra of texto) {
        contador--
        scroll_height_folha = folha.scrollHeight
        
        if (scroll_height_folha > height_folha) {

            for_texto = texto.slice(0, contador)
            for_texto = (for_texto.join(' ')).toString()
            let texto_node = document.createTextNode(for_texto)
            if (contador === -1) {
                novo_elemento = document.createElement('p')
                novo_elemento.setAttribute('class', 'teste')
                novo_elemento.appendChild(texto_node)
                elemento.remove()
                elemento = false

            } else {
                novo_elemento.remove()
                novo_elemento = document.createElement('p')
                novo_elemento.setAttribute('class', 'teste')
                novo_elemento.appendChild(texto_node)

            }
            folha.appendChild(novo_elemento)
            indice_fim = contador
        } 
    }

    /**
     * if elemento, quer dizer que o elemento nao foi apagar,
     * que quer dizer que o elemento se encaixa completamente no
     * final da folha
     */
    if (elemento) {
        return false
    }

    conteudo_quebra = (texto.slice(indice_fim,)).join(' ')

    return conteudo_quebra + elementos_passou['ultimos']
}

function sobeTextoFolha(folha, folha2) {
    //preenche espaco vazio de uma folha com texto da folha seguite.

    let padi = parseFloat(window.getComputedStyle(folha.parentNode).paddingTop.slice(0, -2))
    let elemento = folha2.firstChild
    let conteudo_quebra
    let height_folha = folha.offsetHeight
    let contador = 0
    let indice_fim
    let texto = (elemento.innerText).split(' ')
    let for_texto
    let posicao_ultimo_paragrafo = folha.lastChild.offsetTop + folha.lastChild.offsetHeight - padi
    let novo_elemento
    // verificar se é util
    if (texto[0] == "\n") {
        elemento.remove()

        return 'vazio_elemento'

    }
    // console.log(folha.scrollHeight === folha.offsetHeight)
    //vai dar um for com o primeiro paragrafo da 2º folha
    for (let indice = 0; indice < texto.length; indice++) {
        contador++
        //cada palavra do paragrafo e adiciona na 1º folha ate sua altura maxima
        if (folha.scrollHeight === folha.offsetHeight) {
            indice_fim = contador
            for_texto = texto.slice(0, contador)
            // console.log(for_texto)
            for_texto = (for_texto.join(' ')).toString()
            let texto_node = document.createTextNode(for_texto)
            // console.log(folha.lastChild)
            // folha.lastChild.innerText += 'texto_node'
            // console.log(folha.lastChild.innerText)
            // folha.lastElementChild.innerHTML += for_texto 
            if (contador === 1) {
                novo_elemento = document.createElement('p')
                novo_elemento.setAttribute('class', 'teste')
                novo_elemento.appendChild(texto_node)

            } else {
                novo_elemento.remove()
                novo_elemento = document.createElement('p')
                novo_elemento.setAttribute('class', 'teste')
                novo_elemento.appendChild(texto_node)

            }
            folha.appendChild(novo_elemento)

        } else {//acerta a altura caso tenha passado.
            posicao_ultimo_paragrafo = folha.lastChild.offsetTop + folha.lastChild.offsetHeight - padi
            if (posicao_ultimo_paragrafo > folha.offsetHeight) {
                var teste = desceTextoFolha(folha)
    
            }


            break
        }

    }


    if (contador === texto.length && contador > 1 | !teste) {//se adicionol o texto todo, return false
        return false
    }
   

    conteudo_quebra = (texto.slice(indice_fim,)).join(' ')

    return teste + ' ' + conteudo_quebra
}

function verificarParagrafo(paragrafos) {
    let p_boolean = false

    if (paragrafos) {
        for (let paragrafo of paragrafos) {
            if (paragrafo) {
                if (!(paragrafo === 'vazio_elemento')) {
                    p_boolean = true
                } else {
                    paragrafos.indexOf(paragrafos.indexOf(paragrafo),1)
                }
            }
        }
        if (p_boolean) {
            return paragrafos.join('<br>')
        }
        return
    }
}

function novaFolha(indice = false, p_texto = false, folha_braca = false) {
    let encerra_fucao = true
    let f = document.querySelector('.ql-editor')
    let p_topo = document.createElement('p')
    const nova_folha = document.createElement('div')
    nova_folha.setAttribute('class', 'editor')
    // console.log(paragrafo_topo)

    if (!folha_braca) {//encerra a fucao caso nao receba o paramentos necessarios
        if (indice === false) {
            if (!p_texto) {
                    return
            }
        }       

        
    }

    bloco_center.appendChild(nova_folha) //#### teste(descomentar)
    const quill = new Quill(nova_folha, {
        modules: {
            toolbar: {
                nova_folha: toolbarOptions,
                handlers: {
                    image: urlImage
                }
            }
        },
        theme: 'bubble'
    })
    lista_Quill.push(quill)

    if (p_texto) {
        p_topo.innerHTML = p_texto
        

        nova_folha.firstChild.appendChild(p_topo)
    } else if (indice === false) {
        let new_p = document.createElement('p')
        new_p.setAttribute('class', 'primeiro-p')
        nova_folha.firstChild.appendChild(new_p)
    }
    // primeiroParagrafoFolha()//define os primeiros paragafos de cada folha
    ajustaAlturaFolha(nova_folha)
    adicionaFucaoTextoToolbar()//adiciona os filtros na toolbar
    definicoesSelecaoTexto()

    // if (indice < 1) {//pode tirar ?
    //     return
    // }
    return setTextoFolha(nova_folha.firstChild, indice,true)
 
}

function distrubuirTextoQuebra(folha1, folha2) {
    let padi = parseFloat(window.getComputedStyle(folha1.parentNode).paddingTop.slice(0, -2))
    let ultimo_elemento = folha1.lastChild
    let posicao_ultimo_paragrafo = ultimo_elemento.offsetTop + ultimo_elemento.offsetHeight - padi
    if (posicao_ultimo_paragrafo + 10 < folha1.offsetHeight) {
        //preencherá o espaço da 1º folha e retorna o que nao couber mais
        let texto_resto_quebra = sobeTextoFolha(folha1, folha2)
        // console.log(texto_resto_quebra)
        //significa que coube tudo na 1° folha
        if (!texto_resto_quebra) {
            folha2.firstChild.remove()
        } else {//define o restante que sobrou
            
            folha2.firstChild.innerText = texto_resto_quebra
        }
    }
    posicao_ultimo_paragrafo = ultimo_elemento.offsetTop + ultimo_elemento.offsetHeight - padi

}

function SeMudanca(delta, oldDelta, source, cont) {
    let folhas = document.querySelectorAll('.ql-editor')
    let alturaMax = folhas[cont].offsetHeight
    let altura_scroll = folhas[cont].scrollHeight
    let contador = 0
    let paragrafo_passou = []
    let texto

    /**
        destribui o texto que couber ate o limite da folha, o restante para a
        proxima folha
    */
    if (source == 'user') {

        
        // primeiroParagrafoFolha()
        if (clicked_tecla) {
            return
        }
        console.log(1111111111111111)
        if (alturaMax < altura_scroll) {//desce texto que nao couber

            while (alturaMax < altura_scroll) {
                //adiciona paragrafo à lista
                texto = desceTextoFolha(folhas[cont])
                console.log(texto)

                if (!(texto === 'vazio_elemento')) {
                    paragrafo_passou.push(texto)

                } else {
                    folhas[cont].lastElementChild.remove()
                }

                if (contador > 500) {
                    return Error('conteudo da folha ultrapassou do limete permitido')
                }
                contador++
                alturaMax = folhas[cont].offsetHeight
                altura_scroll = folhas[cont].scrollHeight

            }

            console.log('paragrafo_passou')
            let p_texto = verificarParagrafo(paragrafo_passou)

            if (!p_texto) {
                if (folhas[cont + 1]) { 
                    // lista_Quill[cont].setSelection(0,5)
                    let selecao = document.getSelection()
                
                    if (selecao) {
                      
                        if (selecao.anchorNode === folhas[cont].lastElementChild) {
                            return
                        } 
                        //caso o cursor nao esteja na ultima posicao
                        let p_quebra = document.createElement('p')
                        p_quebra.innerHTML = '<br>'

                        folhas[cont + 1].insertBefore(p_quebra, folhas[cont + 1].children[0])
                    }                  
                }
            }else {
                if (folhas[cont + 1]) {
                    let p_quebra = document.createElement('p')
                    p_quebra.innerText = p_texto
                    folhas[cont + 1].insertBefore(p_quebra, folhas[cont + 1].children[0])

                } else {
                    novaFolha(cont, p_texto)
                    return
                }
            } 

        } else {
            /*
            * se no final da 1° folha ter espaço para mais conteudo, entao
            * os paragrafos da 2° folha seram usados para preencher o espaço
            */
            if (folhas[cont + 1]) {
                for (let elementos of folhas[cont+1].children) {
                    if (elementos.innerText.length > 1) {
                        return distrubuirTextoQuebra(folhas[cont], folhas[cont + 1])
                
                    }

                }
            }
        }

    }

}

function inicializa() {
    document.addEventListener('keydown', pegaTecla);
}

function pegaTecla() {
    var tecla = event.keyCode;
    alert(tecla);
}


function apagaEQuebra(evt,indece) {
    let folhas = document.querySelectorAll('.ql-editor')
    let texto_resto_quebra

    // folhas[indece - 1].lastChild.remove()
    texto_resto_quebra = sobeTextoFolha(folhas[indece - 1], folhas[indece])

    if (!(texto_resto_quebra === 'vazio_elemento')) {
       
        folhas[indece].firstChild.innerText = texto_resto_quebra
    }

            
            
        
        

    
}
//https://pt.stackoverflow.com/questions/1003/como-definir-a-posi%C3%A7%C3%A3o-do-cursor-em-um-elemento-edit%C3%A1vel

function seCursor(node, posicao) {
    console.clear()

    console.log(posicao)
    if (!(node && posicao)) {
        console.log('node ou posicao nao foi passado!')
        return
    }
    node.focus()
    var range = document.createRange();
    range.setStart(posicao, 1)

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

}

function primeiroParagrafoFolha() {
    let class_p 
    let ql_editor = document.querySelectorAll('.ql-editor')

    console.log('primeiroParagrafoFolha')
    for (const folha of [...ql_editor].slice(1,)) {
        let primeiro_p = folha.querySelector('.primeiro-p')

        console.log(primeiro_p)
        if (primeiro_p) {
            if (folha.firstChild === primeiro_p) {
                continue
            } else {
                class_p = primeiro_p.getAttribute('class')
                let class_list = class_p.split(' ')
                if (class_list.length > 1) {
                    let new_p = class_list.indexOf('primeiro-p')
                    new_p = class_list.splice(new_p, 1)
                    primeiro_p.removeAttribute('class')
                    primeiro_p.setAttribute('class', new_p[0])
                    folha.firstChild.setAttribute('class', 'primeiro-p')
                    continue

                }
                primeiro_p.removeAttribute('class')
                folha.firstChild.setAttribute('class', 'primeiro-p')

            }
        } else {
            if (folha.firstChild.hasAttribute('class')) {
                class_p = folha.firstChild.getAttribute('class')
                folha.firstChild.setAttribute('class', 'primeiro-p '+class_p)
                return
            }
            folha.firstChild.setAttribute('class','primeiro-p')
        }
    }
}


body.onresize = () => rangeFolha()//recarega folha com folhas com novas definiçoes
input_range.addEventListener('click', function () { rangeFolha() })//definirar novas dimençoes da folha
btn_leitura.addEventListener('click', modoLeitura)//define se a folha é editavel