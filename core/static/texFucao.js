
function retorna_html() {
    let folhas = document.querySelectorAll('.ql-editor')
    // folhas = document.querySelectorAll('#editor.ql-container.ql-snow')
    let conteudo = ''
    for (pagina of folhas) {
        conteudo += pagina.innerHTML
    }
    return conteudo
}

function salvarConteudo() {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    artigo = retorna_html()
    fetch("/salvarConteudo/", {
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
function salvarTopico() {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    console.log(text)
    if (text) {
        fetch("/salvarTopico/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ 'topico': text })
        }).then(function (data) {
            return data.json()
        })
    }


}

function salvarSubtema() {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    if (text) {
        fetch("/salvarSubtema/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ 'subtema': text })
        }).then(function (data) {
            return data.json()
        })

    }

}
function salvarDestaque() {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    if (text) {
        fetch("/salvarDestaque/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ 'destaque': text })
        }).then(function (data) {
            return data.json()
        })

    }

}
function salvarImportante() {
    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
    if (text) {
        fetch("/salvarImportante/", {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrf_token
            },
            body: JSON.stringify({ 'importate': text })
        }).then(function (data) {
            return data.json()
        })
    }


}


btn_destaque.onclick = () => salvarDestaque()
btn_importante.onclick = () => salvarImportante()
btn_subtema.onclick = () => salvarSubtema()
btn_topico.onclick = () => salvarTopico()