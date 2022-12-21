from django.urls import path
from .views import (HomeView, SalvarConteudo, SalvarDestaque,
                    SalvarImportante, SalvarSubtema, SalvarTopico,
                    apagadorTextoFucao, BaixarPdf)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('salvarConteudo/', SalvarConteudo.as_view(), name='salvarConteudo'),
    path('salvarDestaque/', SalvarDestaque.as_view(), name='salvarDestaque'),
    path('salvarImportante/', SalvarImportante.as_view(), name='salvarImportante'),
    path('salvarSubtema/', SalvarSubtema.as_view(), name='salvarSubtema'),
    path('salvarTopico/', SalvarTopico.as_view(), name='salvarTopico'),
    path('apagadorTextoFucao/', apagadorTextoFucao, name='apagadorTextoFucao'),
    path('baixar-pdf/', BaixarPdf.as_view(), name='baixar-pdf'),
    
]

