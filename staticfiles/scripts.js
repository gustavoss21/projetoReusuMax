let teste = document.querySelector('.block')
let folha = document.querySelector('.ql-editor')
let bloco_center = document.querySelector('#bloco-center')
let btn_leitura = document.querySelector('#btn-leitura')
let barra_edicao = document.querySelector('.ql-toolbar.ql-snow')
let btn_save = document.querySelector('.ql-delete')
let icon = document.createElement('i')
let body = document.querySelector('body')
icon.setAttribute('class', 'fa-regular fa-floppy-disk')
btn_save.appendChild(icon)
const a = folha.innerText

function ajustaTamanhoFolha() {
    largura = window.getComputedStyle(folha).width.slice(0, -2)
    altura_conteudo = largura / 0.7069555302166477
    console.log(folha.style.height)
    console.log(folha)
    folha.style.height = altura_conteudo + 'px' + ' !important'

}

// define o modo somente leitura
btn_leitura.onclick = function () {
    if (folha.getAttribute('contenteditable') === 'true') {
        folha.setAttribute('contenteditable', false)
        this.innerHTML = 'Editar'
        barra_edicao.style.display = 'none'
    } else {
        folha.setAttribute('contenteditable', true)
        this.innerHTML = 'Somente leitura'
        barra_edicao.style.display = 'block'
    }


}
btn_save.onclick = () => validSalvar()
body.onresize = () => ajustaTamanhoFolha
ajustaTamanhoFolha()
console.log(body)
