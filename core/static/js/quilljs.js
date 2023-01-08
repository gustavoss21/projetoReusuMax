var lista_Quill = []

var toolbarOptions = [
    [
        'bold', 'italic', 'underline', 'strike'
    ],
    ['blockquote', 'code-block', 'link'
    ],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
                'normal', 'large', 'huge'
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

function criarQuill() {
    const quill = new Quill('.editor', {
        modules: {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: urlImage
                }
            }
        },
        theme: 'bubble',//bubble
        // placeholder: 'teste'

    })

    lista_Quill.push(quill)

}
//possivel causa de erro


function urlImage() {
    let selection = this.quill.getSelection() //pegara a instancia de imagem definido acima
    let prompt = window.prompt('URL da imagem')
    if (prompt === null || prompt == '') { return }
    this.quill.insertEmbed(selection.index, 'image', prompt)//vai inserir a imagem aonde foi selecionado
}
