from django.db import models


class ConteudoModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    conteudo = models.TextField()

    def __str__(self):
        return self.conteudo
