let checked_item = document.querySelectorAll("#bloco-right .dropdown-item")
let checked_filter = document.querySelector("#bloco-right #filtro")
let checked_container = document.querySelector("#bloco-right .check-container")
let btn_baixar_html = document.querySelector('#btn-baixar-pdf')
let btn_baixar_error = document.querySelector('#btn-baixar-pdf-error')
let btn_logout = document.querySelector('#btn-logout') || elemento_vazio
let btn_nova_folha = document.querySelector('#btn-nova-folha')
const topico = JSON.parse(document.getElementById('topico-dados').textContent)  || [];
const destaque = JSON.parse(document.getElementById('destaque-dados').textContent) || [];
const importante = JSON.parse(document.getElementById('importante-dados').textContent) || [];
const subtema = JSON.parse(document.getElementById('subtema-dados').textContent) || [];
let Lista_checked_true = []
let div_container = document.createElement('div')
div_container.setAttribute('class', 'conteinar-tex-funcao')
let lista_funcoes_texto = [
    { 'topico': topico ,'elemento':checked_item[1]},
    { 'destaque': destaque, 'elemento': checked_item[3] },
    { 'importante': importante, 'elemento': checked_item[2] },
    { 'subtema': subtema, 'elemento': checked_item[0] }
]
// cria uma folha em broco
btn_nova_folha.addEventListener('click', function () {
    novaFolha(false, false, true)
})

function postBaixarPdf() {
 
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    fetch("/baixar-pdf/", {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrf_token
        },
    }).then(function () { 
        // location.reload()
    })
}

function definicoesFilter(recarrega) {
    let checked_filter = document.querySelector("#bloco-right #filtro")
    let editor = document.querySelectorAll('.editor')
    // console.log(salvarNoStorage)
    salvarNoStorage('filtro', checked_filter.checked)

    if (checked_filter.checked) {
        // esconde as folhas
        for (let folha of editor) {
            folha.setAttribute('hidden', 'hidden')
        }
        // habilita o checkBox
        for (let item of checked_item) {
            item.children[0].disabled = false;
        }
        if (recarrega) {
        location.reload(true)
        }

        // definiçoes de filter-text vazio
        defineCheckItemVazio(lista_funcoes_texto)

        return setTextCheckBox()

    } else {
        // torna visivel as folhas
        for (let folha of editor) {
            folha.removeAttribute('hidden')
        }
        // desabilita os checkBox
        for (let item of checked_item) {
            item.children[0].disabled = true;

        }
        // elimina o elemento que contem o filter-text
        if (div_container) {
            div_container.remove()
        }

    }
}
function defineCheckItemVazio(lista_funcoes_texto) {
    /**
     *  verifica quais filter-text estao vazios e informa
     *  a seu respectivo filtro
    */
    for (let item_fucao of lista_funcoes_texto) {
        let item_fucao_value = Object.values(item_fucao)
        item_fucao_value = item_fucao_value.slice(0)[0]
        let item_fucao_key = Object.keys(item_fucao)[0]
        if (item_fucao_value.length === 0) {
            // verifica se o elemento já tem a msg de vazio
            let tes = document.querySelector(".item-vazio-" + item_fucao_key)
            if (!(tes)) {
                let lista_vazia = document.createElement('span')
                let texto = document.createTextNode('vazio!')
                lista_vazia.appendChild(texto)
                lista_vazia.setAttribute('class', 'item-vazio-' + item_fucao_key)
                lista_vazia.style.color = '#00000070'
                document.querySelector('#' + item_fucao_key).parentElement.appendChild(lista_vazia)
            }

        }
    }
}

function mudaCheckBox() {
    let click_checkbox = false
    // ao clicar no elemento <li> muda o valor do checkBox
    for (const value of checked_item) {
        //se foi clicado diretamente no checkBox,a funcao nao precisa ser executada
        value.children[0].addEventListener("click", function () {
            click_checkbox = true
            // se clicar no elemeno <input> salva no storage o checked
            if (value.children[0].checked) {
                ativaCheckBox(value.children[0],true)
            } else {// se clicar no elemeno <input> salva no storage o checked
                desativaCheckBox(value.children[0],false)
            }
            salvarNoStorage('filter-' + this.value, [this.checked, this.value])
        }, true)
        // fucao que muda o checkBox
        value.addEventListener("click", function () {

            let input_li = value.children[0]

            // se clicar no checkBox, fecha a fucao
            if (click_checkbox) {
                click_checkbox = false
                location.reload(true)
                return setTextCheckBox()
            }
            // se o filtro nao tiver ativado, fecha a fucao
            if (!checked_filter.checked) {
                return
            }
            // se clicar no elemeno <li> munda o checkBox para true
            if (input_li.checked) {
                ativaCheckBox(input_li,false)
            } else {// se clicar no elemeno <li> munda o checkBox para false
                desativaCheckBox(input_li,true)
            }
            location.reload(true)

            return setTextCheckBox()
        })
    }
}

function ativaCheckBox(input,boolen) {
    input.checked = boolen
    salvarNoStorage('filter-' + input.value, [boolen,input.value])
}

function desativaCheckBox(input,boolen) {
    input.checked = boolen
    salvarNoStorage('filter-' + input.value, [boolen, input.value])
}

function setTextCheckBox() {
    console.log('execultou')
    div_container.innerHTML = '' 
    Lista_checked_true = []
    for (let item_elemento of lista_funcoes_texto) {
        let input_li = item_elemento.elemento.children[0]
        let item_fucao_key = Object.keys(item_elemento)[0]
        if (input_li.checked) {
            for (let item_fucao of item_elemento[item_fucao_key]) {
                if (item_fucao[item_fucao_key]) {
                    Lista_checked_true.push(item_fucao)
                }
            }
        }
    }
    return defineOrdemText()
}

function defineOrdemText() {
    let nova_lista
    div_container.innerHTML = ''

    if (lista_funcoes_texto.length > 1) {
        nova_lista = Lista_checked_true.sort(compare)
    } else {
        nova_lista = lista_funcoes_texto
    }
    for (let texto of nova_lista) {
        let div_fucao_texto = document.createElement('div')

        if (texto.subtema) {
            div_fucao_texto.appendChild(document.createTextNode(texto.subtema))
            div_fucao_texto.setAttribute('class', 'text-fucao text-subtema')
        } else if (texto.topico) {

            div_fucao_texto.appendChild(document.createTextNode(texto.topico))
            div_fucao_texto.setAttribute('class', 'text-fucao text-topico')
        } else if (texto.importante) {
            div_fucao_texto.appendChild(document.createTextNode(texto.importante))
            div_fucao_texto.setAttribute('class', 'text-fucao text-importante')

        } else {
            div_fucao_texto.appendChild(document.createTextNode(texto.destaque))
            div_fucao_texto.setAttribute('class', 'text-fucao text-destaque')
        }
        div_fucao_texto.setAttribute('id', texto.id)
        let span_delete = document.createElement("span")
        span_delete.setAttribute('class', 'delete-tex-fucao')
        let icon = document.createTextNode('X')
        span_delete.appendChild(icon)
        div_fucao_texto.appendChild(span_delete)
        div_container.appendChild(div_fucao_texto)
        bloco_center.appendChild(div_container)

    }

    // console.log(nova_lista.sort(compare))
}

function compare(a, b) {
    if (a.folha_index < b.folha_index || (a.folha_index === b.folha_index && a.index < b.index)) {
        return -1;
    } else {
        return true
    }
}

/**
 * responsavel por apagar o text_fucao
 */
function execultaApagaTexto() {

    let btn_apaga_texto = document.querySelectorAll('.delete-tex-fucao')
    
    for (const elemeno of btn_apaga_texto) {
        // console.log(teste.parentElement.innerText)
        
        elemeno.addEventListener('click', function () {
            let div_text = this.parentElement
            let class_div = div_text.getAttribute('class').slice(11,)
            class_div = class_div.split('-')[1]
            let class_div_id = div_text.getAttribute('id')

            for (let value_lista of lista_funcoes_texto) {
                if (Object.keys(value_lista)[0] === class_div) {
                    // console.log(value_lista.i)

                    for (let dicionarios of value_lista[class_div]) {
                        if (dicionarios.id == class_div_id) {
                            apagadorTextFucao(class_div,parseInt(class_div_id))

                        }
                    }
                    
                }

            }

        })
    }
    return
}


function apagadorTextFucao(tipo, id) {
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    console.log(tipo)
    console.log(id)
    fetch("/apagadorTextoFucao/", {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrf_token
        },
        body: JSON.stringify({ 'tipo_texto_fucao': tipo, 'id': id })
    }).then(function (data) {
        return data.json()
    }).then(function (data) {
        location.reload(true)
        console.log(data)
    })


}

// logout, confirma com o usuario se realmente quer fazer logout
btn_logout.addEventListener('click', function () {
    let confirma_logout = confirm('todo o seu conteudo do documento sera perdido')
    if (confirma_logout) {
        let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
        fetch("/usuario/logout/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            }
        }).then(function (data) {
            console.log(data)
            location.assign('../');
        })

    }
})

function clickedTecla(btn) {
    let cursor = document.getSelection()
    let folhas = document.querySelectorAll('.ql-editor')

    if (!cursor.anchorNode) {
        return
    }
    let folha = cursor.anchorNode.parentElement
    let index_folha = [...folhas].indexOf(folha)
    if (index_folha === -1) {
        folha = cursor.anchorNode.parentElement.parentElement
        index_folha = [...folhas].indexOf(folha)

    }

    let index = lista_Quill[index_folha].getSelection().index
    folhas = document.querySelectorAll('.ql-editor')
    clicked_tecla = false
    // sobe o cursor e, caso necessario, textos tambem
    if (folhas[index_folha - 1]) {
                // console.clear()

        if (index === 0) {
            const elemeno = folhas[index_folha - 1].lastChild

            if (btn.key == 'ArrowUp') {
                seCursor(folhas[index_folha - 1], elemeno)
                clicked_tecla = true
                return clicked_tecla
            } else if (btn.key == 'Backspace') {
                if (!(folhas[index_folha].innerText.length > 1)) {
                    seCursor(folhas[index_folha - 1], elemeno)
                    folhas[index_folha].parentElement.remove()
                    lista_Quill.splice(index_folha,1)
                    return
                }
                apagaEQuebra(btn, index_folha)
                seCursor(folhas[index_folha - 1], elemeno)
                clicked_tecla = true
                return clicked_tecla
            }
        }
        
    }
    if (folhas[index_folha + 1]){
        folhas = document.querySelectorAll('.ql-editor')
        
        // desce o cursor e, caso necessario, textos tambem 
        if (cursor.anchorNode === folha.lastChild) {
            const elemeno = folhas[index_folha + 1].firstChild

            if (btn.key === 'ArrowDown') {
                console.clear()

                seCursor(folhas[index_folha + 1], elemeno)
                clicked_tecla = true
                return clicked_tecla

            } else if (btn.key === 'Enter') {
                let new_p = document.createElement('p')
                folhas[index_folha + 1].appendChild(new_p)
                seCursor(folhas[index_folha + 1],elemeno)
                clicked_tecla = true
                return clicked_tecla
            }
        }
    } 
    //adiciona uma nova folha
    if (btn.key === 'Enter' && cursor.anchorNode === folha.lastChild) {
        let folha_altura = folha.offsetHeight + folha.offsetTop
        let posicao_p = folha.lastElementChild.offsetTop
        let altura_p = folha.lastElementChild.offsetHeight
        let posicao_final = posicao_p+altura_p
        if (folhas[index_folha + 1]) {
            return
        }
        if (posicao_final + 20 > folha_altura) {
            console.log(posicao_final)
            console.log(folha)
            novaFolha(false, false, true)
            folhas = document.querySelectorAll('.ql-editor')
            const elemeno = folhas[index_folha + 1].firstChild
           
            seCursor(folhas[index_folha + 1], elemeno )
            clicked_tecla = true
            return clicked_tecla
        }   
    }
}

//--------> fucao baixar html
btn_baixar_html.addEventListener('click', function () {
    window.setTimeout(postBaixarPdf, 500)
})

mudaCheckBox()//define checkBox.checked como true, se clicado no seu parent
checked_filter.addEventListener('click', function () { definicoesFilter() })
