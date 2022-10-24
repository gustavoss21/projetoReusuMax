from this import d
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views.generic.base import TemplateView
from django.views.generic.edit import UpdateView
import json
from .models import ConteudoModel, SubtemaModel, TopicoModel, DestaqueModel, ImportanteModel

# Create your views here.

# atençao a parada forçada na renderizaçao da folha


class HomeView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['artigo'] = ConteudoModel.objects.all()
        return context


def salvarConteudo(request):
    dados = json.loads(request.body)

    artigo = ConteudoModel.objects.all()
    resultado = artigo.get_or_create(id=1)
    if resultado[1] == False:
        artigo.update(conteudo=dados.get('conteudo'))
    return HttpResponse('1')


def salvarTopico(request):
    dados = json.loads(request.body)
    print(111111111111, dados.get('topico'))
    TopicoModel.objects.create(conteudo_id=1, topico=dados.get('topico'))

    return HttpResponse('1')


def salvarSubtema(request):
    dados = json.loads(request.body)

    SubtemaModel.objects.create(conteudo_id=1, subtema=dados.get('subtema'))

    return HttpResponse('1')


def salvarDestaque(request):
    dados = json.loads(request.body)

    DestaqueModel.objects.create(conteudo_id=1, destaque=dados.get('destaque'))

    return HttpResponse('1')


def salvarImportante(request):
    dados = json.loads(request.body)

    ImportanteModel.objects.create(
        conteudo_id=1, importate=dados.get('importate'))

    return HttpResponse('1')


""" python manage.py runserver
 cd venv/scripts"""
