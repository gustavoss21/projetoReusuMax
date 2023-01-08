import requests # pip install requests
import pdfkit
import os
import requests

# define o caminho raiz do programa
dire = os.path.dirname(os.path.dirname((os.path.abspath(__file__))))
dire = os.path.abspath(fr'{dire}\static')


def temArquivo(nome_arquivo):
    nome_arquivo = nome_arquivo+'-arquivo.pdf'
    print(nome_arquivo)
    print(fr"{dire}\arquivos\{nome_arquivo}")
    if os.path.exists(fr"{dire}\arquivos\{nome_arquivo}"):
        return nome_arquivo
    print('Arquivo Nao Encontrado')
    return None

def salvarPdf(html,nome_arquivo):
    if not (html and nome_arquivo):
        print('falha ao criar arquivo, nome e conteudo do arquivo deve ser fornecido')
        return 
    options = {
        'encoding': 'UTF-8',
        'enable-local-file-access': True
    }  
    nome_arquivo = nome_arquivo+'-arquivo.pdf'
    # define o caminho completo, inclusive o nome do arquivo
    caminho_completo = os.path.abspath(fr'{dire}\arquivos\{nome_arquivo}')
    # cria o arquivo pdf
    pdfkit.from_string(html, caminho_completo, options)
    return


def apagarPdf(nome_arquivo):
    if nome_arquivo is not None:
        os.remove(fr"{dire}\arquivos\{nome_arquivo}")
    return


Pages = ""
Password = ""


# The authentication key (API Key).
# Get your own by registering at https://app.pdf.co
API_KEY = "santos.gs708@gmail.com_d50707d9fd24e70cfde176e4b3121d05a1c03ce1c2e89eb861c5047e2626eb63895213d9"

# Base URL for PDF.co Web API requests
BASE_URL = "https://api.pdf.co/v1"

# Source PDF file
SourceFile = os.path.abspath(fr'{dire}\arquivos\teste.pdf')
# Comma-separated list of page indices (or ranges) to process. Leave empty for all pages. Example: '0,2-5,7-'.
Pages = ""
# PDF document password. Leave empty for unprotected documents.
Password = ""
# Destination Html file name
DestinationFile = os.path.abspath(fr'{dire}\arquivos\resultado.html')
# Set to $true to get simplified HTML without CSS. Default is the rich HTML keeping the document design.
PlainHtml = False
# Set to $true if your document has the column layout like a newspaper.
ColumnLayout = False
# print(SourceFile)
temArquivo('santo')
print()
def main(args=None):
    uploadedFileUrl = uploadFile(SourceFile)
    if (uploadedFileUrl != None):
        convertPdfToHtml(uploadedFileUrl, DestinationFile)


def convertPdfToHtml(uploadedFileUrl, destinationFile):
    """Converts PDF To Html using PDF.co Web API"""

    # Prepare requests params as JSON
    # See documentation: https://apidocs.pdf.co
    parameters = {}
    parameters["name"] = os.path.basename(destinationFile)
    parameters["password"] = Password
    parameters["pages"] = Pages
    parameters["simple"] = PlainHtml
    parameters["columns"] = ColumnLayout
    parameters["url"] = uploadedFileUrl

    # Prepare URL for 'PDF To Html' API request
    url = "{}/pdf/convert/to/html".format(BASE_URL)

    # Execute request and get response as JSON
    response = requests.post(url, data=parameters, headers={
                             "x-api-key": API_KEY})
    if (response.status_code == 200):
        json = response.json()

        if json["error"] == False:
            #  Get URL of result file
            resultFileUrl = json["url"]
            # Download result file
            r = requests.get(resultFileUrl, stream=True)
            if (r.status_code == 200):
                with open(destinationFile, 'wb') as file:
                    for chunk in r:
                        file.write(chunk)
                print(f"Result file saved as \"{destinationFile}\" file.")
            else:
                print(
                    f"Request error: {response.status_code} {response.reason}")
        else:
            # Show service reported error
            print(json["message"])
    else:

        print(f"Request error: {response.status_code} {response.reason}")


def uploadFile(fileName):
    """Uploads file to the cloud"""

    # 1. RETRIEVE PRESIGNED URL TO UPLOAD FILE.

    # Prepare URL for 'Get Presigned URL' API request
    url = "{}/file/upload/get-presigned-url?contenttype=application/octet-stream&name={}".format(
        BASE_URL, os.path.basename(fileName))

    # Execute request and get response as JSON
    response = requests.get(url, headers={"x-api-key": API_KEY})
    if (response.status_code == 200):
        json = response.json()

        if json["error"] == False:
            # URL to use for file upload
            uploadUrl = json["presignedUrl"]
            # URL for future reference
            uploadedFileUrl = json["url"]

            # 2. UPLOAD FILE TO CLOUD.
            with open(fileName, 'rb') as file:
                requests.put(uploadUrl, data=file, headers={
                             "x-api-key": API_KEY, "content-type": "application/octet-stream"})

            return uploadedFileUrl
        else:
            # Show service reported error
            print(json["message"])
    else:
        print('111111111111')

        print(f"Request error: {response.status_code} {response.reason}")

    return None


if __name__ == '__main__':
    main()


