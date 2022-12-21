from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views.generic.base import TemplateView, View
import json
from .utils import utils
from random import randint


# Create your views here.

# atençao a parada forçada na renderizaçao da folha

class HomeView(TemplateView):
    template_name = 'index.html'
    # adicionar um filtro para os botoes retornando uma lista com objetos

    def get_context_data(self, **kwargs):
        pdf = utils.temArquivo(self.request.user.username)


        if str(self.request.user) == 'AnonymousUser':
            return
        if not (self.request.user.username in self.request.session):
            self.request.session[self.request.user.username] = {}
        context = super(HomeView, self).get_context_data(**kwargs)
        if 'subtema_dados' in self.request.session:
            if not (self.request.session['subtema_dados'] == []):
                context['subtema'] = self.dados(
                    self.request.session.get('subtema_dados'))
        if 'topico_dados' in self.request.session:
            print(self.request.session['topico_dados'])
            if not (self.request.session['topico_dados'] == []):

                context['topico'] = self.dados(
                    self.request.session.get('topico_dados'))
        if 'destaque_dados' in self.request.session:
            if not (self.request.session['destaque_dados'] == []):

                context['destaque'] = self.dados(
                    self.request.session.get('destaque_dados'))
        if 'importante_dados' in self.request.session:
            if not (self.request.session['importante_dados'] == []):

                context['importante'] = self.dados(
                    self.request.session.get('importante_dados'))
        if 'folha_dados' in self.request.session:
            if not (self.request.session['folha_dados'] == []):

                context['artigo'] = self.dados(
                    self.request.session.get('folha_dados'))[0]
        else:
            if 'temporario' in self.request.session:

                if not (self.request.session['temporario'] == None):
                    body = self.request.session['temporario']
                    SalvarConteudo.post(self, self.request, body)
                    context['artigo'] = self.request.session['folha_dados'].get(
                        'texto')
        if pdf is not None:
            context['pdf'] = str(pdf)
        print(11111111111, self.request.session.get_expiry_date())
        return context
      
    def dados(self, model):
        lista = []
        for value in model.values():
            lista.append(value)

        return lista


def apagadorTextoFucao(request):

    dados = json.loads(request.body)
    tipo_texto = dados.get('tipo_texto_fucao')
    texto_id = dados.get('id')

    if tipo_texto == 'topico':
        del request.session['topico_dados'][str(texto_id)]

    elif tipo_texto == 'importante':
        del request.session['importante_dados'][str(texto_id)]

    elif tipo_texto == 'destaque':
        del request.session['destaque_dados'][str(texto_id)]

    elif tipo_texto == 'subtema':
        del request.session['subtema_dados'][str(texto_id)]
    request.session.save()
    return HttpResponse('1')


class SalvarConteudo(View):
    def post(self, request, *args, **kwargs):
        # se a requisiçao nao ter o body, a class foi chamada dentro de outra
        if request.body:
            dados = json.loads(request.body)
        else:
            dados = {'conteudo': args[0]}
        usuario = request.user.is_authenticated
        if usuario:
            request.session['folha_dados'] = {
                'texto': dados.get('conteudo'),
                'usuario': request.user.username
            }
            
            # apaga a sessao que tem os dados
            # temporario(texto digitado antes de fazer login)
            if request.session.get('temporario'):
                del request.session['temporario']
            request.session.save()
            htmlParaPdf(dados.get('conteudo'), request.user.username)

            return HttpResponse(1)

        messages.warning(request, 'faça login, para salvar dados!')
        request.session['temporario'] = dados.get('conteudo')
        request.session.save()
        return HttpResponse(json.dumps({'redirect': 'usuario/login'}))


class SalvarTopico(View):
    def post(self, request, *args, **kwargs):
        dados = json.loads(request.body)
        usuario = request.user
        id = randint(1, 1000000)
        if usuario.is_authenticated:
            if not 'topico_dados' in request.session:
                request.session['topico_dados'] = {}
                request.session.save()

            request.session['topico_dados'][id] = {
                'folha_index': dados.get('folha_index'),
                'index': dados.get('index'),
                'topico': dados.get('topico'),
                'tamanho': dados.get('tamanho'),
                'id': id,
                'usuario': request.user.username
            }
            request.session.save()

        else:

            messages.warning(request, 'faça login, para salvar dados!')
        return HttpResponse(1)


class SalvarSubtema(View):
    def post(self, request, *args, **kwargs):
        dados = json.loads(request.body)
        usuario = request.user
        id = randint(1, 1000000)

        if usuario.is_authenticated:

            if not 'subtema_dados' in request.session:
                request.session['subtema_dados'] = {}
                request.session.save()

            request.session['subtema_dados'][id] = {
                'folha_index': dados.get('folha_index'),
                'index': dados.get('index'),
                'subtema': dados.get('subtema'),
                'tamanho': dados.get('tamanho'),
                'id': id,
                'usuario': request.user.username
            }
            request.session.save()

        else:

            messages.warning(request, 'faça login, para salvar dados!')
        return HttpResponse(1)


class SalvarDestaque(View):
    def post(self, request, *args, **kwargs):
        dados = json.loads(request.body)
        usuario = request.user
        id = randint(1, 1000000)

        if usuario.is_authenticated:

            if not 'destaque_dados' in request.session:
                request.session['destaque_dados'] = {}
                request.session.save()
            request.session['destaque_dados'][id] = {
                'folha_index': dados.get('folha_index'),
                'index': dados.get('index'),
                'destaque': dados.get('destaque'),
                'tamanho': dados.get('tamanho'),
                'id': id,
                'usuario': request.user.username
            }
            request.session.save()

        else:

            messages.warning(request, 'faça login, para salvar dados!')
        return HttpResponse(1)


class SalvarImportante(View):
    def post(self, request, *args, **kwargs):
        dados = json.loads(request.body)
        usuario = request.user
        id = randint(1, 1000000)

        if usuario.is_authenticated:

            if not 'importante_dados' in request.session:
                request.session['importante_dados'] = {}
                request.session.save()
            request.session['importante_dados'][id] = {
                'folha_index': dados.get('folha_index'),
                'index': dados.get('index'),
                'importante': dados.get('importante'),
                'tamanho': dados.get('tamanho'),
                'id': id,
                'usuario': request.user.username
            }
            request.session.save()

        else:

            messages.warning(request, 'faça login, para salvar dados!')
        return HttpResponse(1)


def htmlParaPdf(html_string,nome_pdf):
    
        # html_string = html_string.decode("utf-8")
        html_string = f'<div style="padding: 113.4px 94.5px;">{html_string}</div>'
        utils.salvarPdf(html_string, nome_pdf)
        

class BaixarPdf(View):
    def post(self, request, *args, **kwargs):
        nome_arquivo = utils.temArquivo(request.user.username)
        if not nome_arquivo:
            messages.warning(request,'salve primeiro para baixar pdf ')
            return HttpResponse(1)
        print(111111111111,'baixa pdf')

        utils.apagarPdf(nome_arquivo)
        return HttpResponse(1)


# python manage.py runserver
#  cd venv/scripts
