import site
from django.contrib import admin
from .models import ConteudoModel, SubtemaModel, TopicoModel, DestaqueModel, ImportanteModel


@admin.register(ConteudoModel)
class ConteudoAdmin(admin.ModelAdmin):
    list_display = ('conteudo', 'tema',)


@admin.register(SubtemaModel)
class SubtemaAdmin(admin.ModelAdmin):
    list_display = ('folha_index', 'subtema', 'index', 'tamanho',)


@admin.register(TopicoModel)
class TopicoAdmin(admin.ModelAdmin):
    list_display = ('folha_index', 'topico', 'index', 'tamanho',)


@admin.register(DestaqueModel)
class DestaqueAdmin(admin.ModelAdmin):
    list_display = ('folha_index', 'destaque', 'index', 'tamanho',)


@admin.register(ImportanteModel)
class ImportateAdmin(admin.ModelAdmin):
    list_display = ('folha_index', 'importante', 'index', 'tamanho',)
