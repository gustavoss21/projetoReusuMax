from this import d
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views.generic.base import TemplateView
from django.views.generic.edit import UpdateView
import json
from .models import ConteudoModel
# Create your views here.

# atençao a parada forçada na renderizaçao da folha


class HomeView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['artigo'] = ConteudoModel.objects.all()
        return context


def salvar(request):
    dados = json.loads(request.body)

    artigo = ConteudoModel.objects.all()
    resultado = artigo.get_or_create(id=1)

    if resultado[1] == False:

        artigo.update(conteudo=dados.get('conteudo'))
    return HttpResponse('1')


""" python manage.py runserver
 cd venv/scripts"""
