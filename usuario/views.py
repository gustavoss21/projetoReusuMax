from django.contrib.auth import logout
from django.shortcuts import redirect, render
from django.contrib import messages
from django.views.generic.edit import BaseFormView
from django.contrib import auth
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
# Create your views here.


class CadastroView(BaseFormView):
    def get(self, request, *args, **kargs):
        return render(request, 'cadastro.html')

    def post(self, request, *args, **kwargs):
        user_session = request.session.get('usuario')
        todos_usuarios = auth.models.User.objects.all()
        username = request.POST.get('nome').strip()
        password = request.POST.get('senha').strip()
        password2 = request.POST.get('senha2').strip()
        tem_error = False
        context = {}

        # validacao dos dados
        if not (username and password and password2):
            tem_error = True

            context['msg'] = 'usuario e senha e sua confirmação é obragatorio!'

        if not (password2 == password):
            tem_error = True

            context['senha2Invalid'] = 'senha não confere!'

        if len(str(password)) < 6:
            tem_error = True
            context['senhaInvalid'] = 'A senha é menor que 6 digitos!'

        for objeto in todos_usuarios:
            if objeto.username == request.POST.get('nome'):
                tem_error = True
                context['usuarioInvalid'] = 'usuario já existe!'

        if tem_error:
            print(context)
            return render(request, 'cadastro.html', context)
        # return HttpResponseNotModified('gustavo')
        # if not user_session:
        #     request.session['id'] = {'ultimo_id': 0}
        #     user_id_session = int(request.session.get(
        #         'id', 'ultimo_id')['ultimo_id']+1)

        #     request.session['usuario'] = {user_id_session: {
        #         'nome': request.POST.get('nome'),
        #         'senha': request.POST.get('senha')
        #     }}
        #     request.session['id']['ultimo_id'] = user_id_session
        # else:
        #     user_id_session = request.session.get(
        #         'id', 'ultimo_id')['ultimo_id']+1
        #     request.session['id']['ultimo_id'] = user_id_session
        #     request.session['usuario'][user_id_session] = {
        #         'nome': request.POST.get('nome'),
        #         'senha': request.POST.get('senha')
        #     }
        # request.session.save()

        #####deve ser descomentado#############
        todos_usuarios.create(username=username, password=password)

        messages.success(request, 'Agora é só fazer Login!')
        return redirect('login')


class LoginView(BaseFormView):

    def get(self, request, *args, **kargs):

        return render(request, 'login.html')

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:  # verifica se já esta logado
            messages.warning(
                request, f'Você já esta logado com usuario "{request.user}"')
            return redirect('home')

        user_login = request.POST.get('nome').strip()
        senha_login = request.POST.get('senha').strip()
        if not user_login:  # verifica se foi passado o nome de usuario
            return render(request, 'login.html')  # msg faltou user
        if not senha_login:  # verifica se foi passado a senha de usuario
            return render(request, 'login.html')  # msg faltou senha

        user = authenticate(
            request, username=user_login, password=senha_login)
        if user is not None:  # verifica se tem o usuario no banco de dados
            login(request, user)
            messages.success(request, f'{user_login}, Seja bem vindo!')
            messages.warning(request, 'Sua sessão expira em 7 dias, e todos seus dados seram eliminados')
            return redirect('home')
        else:
            messages.error(request, 'Usuario ou senha não conferem!')
            return render(request, 'login.html')


def logout_view(request):
    messages.success(request, f'{request.user}, volte logo!')

    logout(request)
    return HttpResponse(1)
