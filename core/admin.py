import site
from django.contrib import admin
from .models import ConteudoModel


@admin.register(ConteudoModel)
class ConteudoAdmin(admin.ModelAdmin):
    list_display = ('conteudo',)
