

var toolbarOptions = [
    [
        'delete', 'bold', 'italic', 'underline', 'strike'
    ],
    ['blockquote', 'code-block', 'link'
    ],
    [
        {
            'header': 1
        },
        {
            'header': 2
        },
        {
            'header': 3
        }
    ], [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [
        {
            'indent': '-1'
        },
        {
            'indent': '+1'
        }
    ],
    [{ 'direction': 'rtl' }],

    [
        {
            'size': ['small',
                true, 'large', 'huge'
            ]
        }
    ],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [
        {
            'align': []
        }
    ]
    ['image'],

    ['clean']
]

var quill = new Quill('#editor', {
    modules: {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: urlImage
            }
        }
    },
    theme: 'snow',//bubble
    // placeholder: 'teste'
})


function urlImage() {
    let selection = this.quill.getSelection() //pegara a instancia de imagem definido acima
    let prompt = window.prompt('URL da imagem')
    if (prompt === null || prompt == '') { return }
    this.quill.insertEmbed(selection.index, 'image', prompt)//vai inserir a imagem aonde foi selecionado
}
// function retorna_html() {
//     console.log(quill.root.innerHTML)
//     return quill.root.innerHTML
// }
function retorna_html() {
    let folhas = document.querySelectorAll('.ql-editor')
    // folhas = document.querySelectorAll('#editor.ql-container.ql-snow')
    let conteudo = ''
    for (pagina of folhas) {
        conteudo += pagina.innerHTML
    }
    return conteudo
}


function salvar() {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    artigo = retorna_html()
    fetch("/salvar/", {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrf_token
        },
        body: JSON.stringify({ 'conteudo': artigo })
    }).then(function (data) {
        return data.json()
    }).then(function (data) {
        location.reload(true)
    })

}