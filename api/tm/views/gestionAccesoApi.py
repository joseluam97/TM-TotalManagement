from tm.serializers import customUserSerializer
from tm.models import customUser
from rest_framework.authtoken.models import Token
from os import environ
from django.contrib.auth.models import Permission
from django.contrib.auth.models import Group
import json

FRONT_REACT_HOME = environ.get("FRONT_REACT_HOME")

def funcion_gestion_accesos(request):
    
    ejecutaGestionPermisos = False
    if "Origin" in request.headers:
        if request.headers["Origin"]+"/" == FRONT_REACT_HOME:
            ejecutaGestionPermisos = False
        else:
            ejecutaGestionPermisos = True
    else:
        ejecutaGestionPermisos = True

    if ejecutaGestionPermisos == True:
        codigoAutorizacion = request.headers["Authorization"]
        tokenSelect = codigoAutorizacion.split(" ")[1]
        token = Token.objects.get(key=tokenSelect)

        usuarioSelected = customUser.objects.get(id=token.user_id)
        serializer_contract_user_var = customUserSerializer(usuarioSelected)

        if serializer_contract_user_var.data['is_superuser']:
            permisosAsociados = Permission.objects.all().values("name")
        else:
            permisosAsociados = Permission.objects.filter(user=token.user_id).values("name")

        #GET GRUPS OF USER
        if len(serializer_contract_user_var.data['groups']) != 0:
            for idGrupoUser in serializer_contract_user_var.data['groups']:
                grupoUser = Group.objects.get(id=idGrupoUser)
                permissions = grupoUser.permissions.all().values("name")
        else:
            permissions = []

        #ADICION DE GRUPOS DE PERMISOS A PERMISOS INDIVIDUALES
        permisosFinal = list(permisosAsociados) + list(permissions)

        list_permisos = list(map(lambda obj: obj.get('name'), permisosFinal))

        if "Can view token" in list_permisos:
            return True
        else:
            return False
    else:
        return True