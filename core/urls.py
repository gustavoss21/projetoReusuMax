from django.urls import path
from .views import HomeView, salvar

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('salvar/', salvar, name='salvar'),
]
