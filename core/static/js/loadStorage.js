let clicked_tecla = false
let ultimo_elemento_Folha
let btn_salvar_conteudo = document.querySelector('#btn-salvar-conteudo')

function salvarNoStorage(chave, valor) {
    localStorage.setItem(chave, valor)
}

function loadFilter() {
    let filtro = localStorage.getItem('filtro')
    let filtro_destaque = localStorage.getItem('filter-destaque')
    let filtro_importante = localStorage.getItem('filter-importante')
    let filtro_subtema = localStorage.getItem('filter-subtema')
    let filtro_topico = localStorage.getItem('filter-topico')
    let lista_filter = [filtro_destaque, filtro_importante, filtro_subtema, filtro_topico]
    let checked_item = document.querySelectorAll("#bloco-right .dropdown-item")
    let checked_filter = document.querySelector("#bloco-right #filtro")
    let lista_funcoes_texto = [
        { 'topico': topico, 'elemento': checked_item[1] },
        { 'destaque': destaque, 'elemento': checked_item[3] },
        { 'importante': importante, 'elemento': checked_item[2] },
        { 'subtema': subtema, 'elemento': checked_item[0] }
    ]

    if (filtro === 'true') {
        checked_filter.checked = true
        definicoesFilter()
        for (let filter_item of lista_filter) {
            filter_item = filter_item.split(',')
            if (filter_item[0] === 'true') {
                document.getElementById(filter_item[1]).checked = true
            } else {
                document.getElementById(filter_item[1]).checked = false

            }
        }
        defineCheckItemVazio(lista_funcoes_texto)
        setTextCheckBox()
    }
    for (let filter_item of lista_filter) {
        filter_item = filter_item.split(',')
        let elemeno = document.getElementById(filter_item[1])
        elemeno.disabled = true
        if (filter_item[0] === 'true') {
            elemeno.checked = true
        } else {
            elemeno.checked = false

        }
    }
}

function loadFolhaModo() {
    let modo_leitura = localStorage.getItem('modoLeitura')
    // load modo leitura do Storage
    // console.clear()
    if (modo_leitura === 'true') {
        ativaModoLeitura()
       
    } else {
        desativaModoLeitura()

    } 
}

criaElementoFolha()
criarQuill()
rangeFolha()
loadFilter()
loadFolhaModo()//carrega atribuiçoes de modo de folha do Storage
adicionaFucaoTextoToolbar()
setBotao()//salva os tipos de texto
execultaApagaTexto()//apaga textos definidos,exe:destaque,
document.addEventListener('keydown', function (btn) { clickedTecla(btn) })
definicoesSelecaoTexto();//faz atribuiçoes de selecao,para salvar.
btn_salvar_conteudo.addEventListener('click', salvarConteudo)//salva conteudo

