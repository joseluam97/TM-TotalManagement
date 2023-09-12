from tm import varGlobal
from tm.models import improvement
from tm.serializers import improvementSerializer
from tm.serializers import improvementPostSerializer
from tm import varGlobal
from tm.serializers import groupSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm import varGlobal
from django.contrib.auth.models import Permission
from django.contrib.auth.models import Group
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class grupoPermisosList(APIView):
    """
    Lista todas las improvementes o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        grupoUser = Group.objects.all().values()
        list_group = list(grupoUser)
        return Response(list_group)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        grupoUser = Group.objects.create(name=request.data['name'])
        grupoUser.save()

        list_idPermission = list(map(lambda obj: obj.get('id') , request.data['permissions']))

        grupoUser.permissions.set(list_idPermission)
    
        grupoUser_serializer = groupSerializer(grupoUser)
        return Response(grupoUser_serializer.data)

@authentication_classes([ExpiringTokenAuthentication])
class grupoPermisosDetails(APIView):  
    """
    Elimina o edita improvementes específicas
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return improvement.objects.get(pk=pk)
        except improvement.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        grupoUser = Group.objects.get(id=pk)
        grupoUser_serializer = groupSerializer(grupoUser)
        return Response(grupoUser_serializer.data)

    '''def put(self, request, pk, format=None):

        grupoUser = Group.objects.get(id=pk)
        grupoUser_serializer = groupSerializer(grupoUser, data=request.data)

        if grupoUser_serializer.is_valid():
            grupoUser_serializer.save()
            return Response(grupoUser_serializer.data)
        return Response(grupoUser_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        improvement = self.get_object(pk)
        improvement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)'''

@authentication_classes([ExpiringTokenAuthentication])
class getPermisosByGroup(APIView):  
    """
    Elimina o edita improvementes específicas
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        grupoUser = Group.objects.get(id=pk)
        permissions = grupoUser.permissions.all().values()

        permisosFinal = list(permissions)

        return Response(permisosFinal)

@authentication_classes([ExpiringTokenAuthentication])
class getAllPermisos(APIView):  
    """
    Elimina o edita improvementes específicas
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        permisosAll = Permission.objects.all().values()

        permisosFinal = list(permisosAll)

        return Response(permisosFinal)
    
@authentication_classes([ExpiringTokenAuthentication])
class putPermisosByGroup(APIView):  
    """
    Elimina o edita improvementes específicas
    """
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        grupoUser = Group.objects.get(id=pk)
        grupoUser.name = request.data['name']
        grupoUser.save()

        list_idPermission = list(map(lambda obj: obj.get('id') , request.data['permissions']))

        grupoUser.permissions.set(list_idPermission)

        return Response(status=status.HTTP_204_NO_CONTENT)