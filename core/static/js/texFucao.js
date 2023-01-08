let btn_topico
let btn_destaque
let btn_importante
let btn_subtema
let text
let range
let box
let folha_index
let btn_save = document.querySelector('.ql-delete')


function retorna_html() {
    primeiroParagrafoFolha()
    let folhas = document.querySelectorAll('.ql-editor')
    let elemento_vazio
    let conteudo = ''
    for (let pagina of folhas) {
        elemento_vazio = pagina.firstElementChild
        // for (let elemento of pagina.children) {
        //     if (elemento.innerText.length == 1) {
        //         elemento.remove()
        //     } else {
        //         break
        //     }
        // }
        conteudo += pagina.innerHTML
    }
    return conteudo
}

function salvarConteudo() {
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    let artigo = retorna_html()
    console.log(artigo)
    fetch("/salvarConteudo/", {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrf_token
        },
        body: JSON.stringify({ 'conteudo': artigo })
    }).then(function (data) {
        return data.json()
    }).then(function (data) {
        if (data.redirect) {
            location.assign('usuario/login');
        } else {
            location.reload(true)

        }
    })
}
function salvarTopico() {
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    if (text) {
        fetch("/salvarTopico/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ 'topico': text, 'index': range.index, 'tamanho': range.length, 'folha_index': folha_index })
        }).then(function (data) {
            return data.json()
        }).then(function (data) {
            tiraSelecao(folha_index, range.index)
        })
    }


}
function salvarSubtema() {
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    if (text) {
        fetch("/salvarSubtema/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ 'subtema': text, 'index': range.index, 'tamanho': range.length, 'folha_index': folha_index })
        }).then(function (data) {
            return data.json()
        }).then(function (data) {
            tiraSelecao(folha_index, range.index)
        })

    }

}
function salvarDestaque() {
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    if (text) {
        fetch("/salvarDestaque/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ 'destaque': text, 'index': range.index, 'tamanho': range.length, 'folha_index': folha_index })
        }).then(function (data) {
            return data.json()
        }).then(function (data) {
            tiraSelecao(folha_index, range.index)
        })

    }

}
function salvarImportante() {
    let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    if (text) {
        fetch("/salvarImportante/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ 'importante': text, 'index': range.index, 'tamanho': range.length, 'folha_index': folha_index })
        }).then(function (data) {
            return data.json()
        }).then(function (data) {
            tiraSelecao(folha_index,range.index)
        })
    }


}

/**
     * - cria uma caixa de opçoes, que darao funcionalidades, como, definir um topico, ao texto.
     * - fucionalidades[topico,destaque,destaque,subtema]
     * - return caixa_selecao(div com todas funcionalidades)
    */
function criaSeletor() {

    let caixa_selecao = document.createElement('div')
    caixa_selecao.setAttribute('class', 'selecao')

    let title = document.createElement('span')
    title.setAttribute('class', 'title-selecao')
    title.innerText = 'definir como:'
    caixa_selecao.appendChild(title)

    let div_opcoes_selecao = document.createElement('div')
    div_opcoes_selecao.setAttribute('class', 'conteudo-selecao')
    caixa_selecao.appendChild(div_opcoes_selecao)

    btn_destaque = document.createElement('div')
    btn_destaque.setAttribute('class', 'btn-destaque')
    btn_destaque.innerText = 'destaque'
    div_opcoes_selecao.appendChild(btn_destaque)

    btn_subtema = document.createElement('div')
    btn_subtema.setAttribute('class', 'btn-subtema')
    btn_subtema.innerText = 'subtema'
    div_opcoes_selecao.appendChild(btn_subtema)

    btn_topico = document.createElement('div')
    btn_topico.setAttribute('class', 'btn-topico')
    div_opcoes_selecao.appendChild(btn_topico)
    btn_topico.innerText = 'topico'

    btn_importante = document.createElement('div')
    btn_importante.setAttribute('class', 'btn-importante')
    btn_importante.innerText = 'importante'
    div_opcoes_selecao.appendChild(btn_importante)

    // toolbxx.appendChild(caixa_selecao)
    return caixa_selecao
}
//adiciona caixa_seletor na toolbar
function adicionaFucaoTextoToolbar() {
    let toolbxx = document.querySelectorAll(".ql-toolbar")

    for (let box of toolbxx) {
        let seltor_existe = box.querySelector('.selecao')
        if (!seltor_existe) {
            box.appendChild(criaSeletor())

        }

    }   
}



function definicoesSelecaoTexto() {
    /**
     * se tiver algum texto selecionado, sera difinido o range, folha e o texto
     
     * se tiver mundaça no texto da folha ativará a funcao seMudanca,
       responvel pela quebra de pagina.
    */

    let folhas = document.querySelectorAll(".ql-editor")

    folhas.forEach(function (value, indece) {
        const folha = value
        folha.addEventListener('click', function () {
            if (lista_Quill[indece].getSelection()) {
                range = lista_Quill[indece].getSelection();
                text = lista_Quill[indece].getText(range.index, range.length);
                folha_index = indece
                lista_Quill[indece].on('text-change', function (delta, oldDelta, source) {
                    SeMudanca(delta, oldDelta, source, indece)
                    // apagaEQuebra(indece)
                });

            }

        }
            // console.log(value)
        )
    })
}

// adiciona o evento click nos botoes do caixa_seletor
function setBotao() {
    let toolbxx = document.querySelectorAll(".ql-toolbar")

    for (let botoes of toolbxx) {
        let opcoes_selecao = botoes.lastChild.lastChild
        for (let btn of opcoes_selecao.children) {
            btn.addEventListener('click',function () {
                // console.log(this)
                switch (this.innerText) {
                    case 'destaque':
                        salvarDestaque()
                        break
                    case 'importante':
                        salvarImportante()
                        break
                    case 'subtema':
                        salvarSubtema()
                        break
                    case 'topico':
                        salvarTopico()
                        break
                }
            }
            )
        }
    }
}


function tiraSelecao(index_quill,index) {
    lista_Quill[index_quill].setSelection(index, 0, "silent")
}



