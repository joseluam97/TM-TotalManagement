from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from tm import varGlobal
from tm.models import customUser
from rest_framework.response import Response
from django.contrib.auth.models import Permission
from django.contrib.auth.models import Group
from tm.serializers import customUserSerializer
from tm import varGlobal
from rest_framework.parsers import JSONParser
from django.utils import timezone
from time import gmtime, strftime
import datetime
from rest_framework import status
import pytz
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from os import environ
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

DAYS_TOKEN_DELETE = environ.get("DAYS_TOKEN_DELETE")
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes


class tokenInternal(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS

        #DELETE TOKEN CADUCADOS
        utc_now = datetime.datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)

        #FIN DELETE TOKEN CADUCADOS
        
        response = super(tokenInternal, self).post(request, *args, **kwargs)

        #COMPROBACION FECHA DEL TOKEN

        tokenSelected = Token.objects.get(key = response.data['token'])

        if tokenSelected.created < utc_now - datetime.timedelta(days=int(DAYS_TOKEN_DELETE)):
            tokenSelected.delete()
            response = super(tokenInternal, self).post(request, *args, **kwargs)

        #FIN COMPROBACION FECHA DEL TOKEN

        token = Token.objects.get(key=response.data['token'])
        usuario = customUser.objects.get(id=token.user_id)

        #ACTUALIZAR HORA ULTIMA CONEXION
        now = datetime.datetime.now()
        customUser.objects.filter(id=token.user_id).update(last_login = now) 

        #COMPROBAR SI EL USUARIO TIENE ALGUN PERMISO
        serializer_contract_user_var = customUserSerializer(usuario)
        
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

        if len(permisosFinal) == 0:
            return Response({'token': '', 'name': '', 'email': ''})
        #FIN COMPROBAR SI EL USUARIO TIENE ALGUN PERMISO
        else:
            return Response({'token': token.key, 'name': usuario.first_name, 'email': usuario.email})
        
@authentication_classes([ExpiringTokenAuthentication])
class getPermisosByUser(ObtainAuthToken):
    #OBTENER INFORMACION PERSONA LOGEADA
    def post(self, request):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        tokenString = request.data['token']
        token = Token.objects.get(key=tokenString)
        
        #GET USER
        usuarioSelected = customUser.objects.get(id=token.user_id)
        serializer_contract_user_var = customUserSerializer(usuarioSelected)
        #FIN GET USER

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

        return Response(permisosFinal)


class tokenInternalSegunda(ObtainAuthToken):
    #OBTENER INFORMACION PERSONA LOGEADA
    def post(self, request):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        tokenString = request.data['token']
        token = Token.objects.get(key=tokenString)
        usuario = customUser.objects.get(id=token.user_id)
        serializer = customUserSerializer(usuario)
        return Response(serializer.data)