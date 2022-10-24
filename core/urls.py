from django.urls import path
from .views import HomeView, salvarConteudo, salvarDestaque, salvarImportante, salvarSubtema, salvarTopico

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('salvarConteudo/', salvarConteudo, name='salvarConteudo'),
    path('salvarDestaque/', salvarDestaque, name='salvarDestaque'),
    path('salvarImportante/', salvarImportante, name='salvarImportante'),
    path('salvarSubtema/', salvarSubtema, name='salvarSubtema'),
    path('salvarTopico/', salvarTopico, name='salvarTopico'),
]
