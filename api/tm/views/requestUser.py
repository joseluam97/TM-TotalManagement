from tm import varGlobal
from tm.models import *
from tm.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm.views.gestionAccesoApi import funcion_gestion_accesos

from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class requestUserList(APIView):
    """
    Lista todas las requestUseres o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
            
        requestUser_var = requestUser.objects.all()
        serializer_var = requestUserSerializer(requestUser_var, many=True)
        return Response(serializer_var.data)
        

    def post(self, request, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = requestUserPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class requestUserListDetail(APIView):  
    """
    Elimina o edita requestUseres específicas
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return requestUser.objects.get(pk=pk)
        except requestUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        requestUser = self.get_object(pk)
        serializer = requestUserSerializer(requestUser)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        requestUser = self.get_object(pk)
        serializer = requestUserPostSerializer(requestUser, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        requestUser = self.get_object(pk)
        requestUser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@authentication_classes([ExpiringTokenAuthentication])
class requestByUser(APIView):
    """
    Lista todas las requestUseres o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS

        customUser_var = customUser.objects.get(id = pk)
            
        requestUser_var = requestUser.objects.all().filter(user_destino_solicitud = customUser_var)

        vectActions = []
        for accion in requestUser_var:
            accion_serializer = requestUserSerializer(accion)

            name_user_origen_solicitud = accion.user_origen_solicitud.first_name + " " + accion.user_origen_solicitud.last_name
            name_user_solicitado = accion.user_solicitado.first_name + " " + accion.user_solicitado.last_name

            jsonNRisk = {"name_user_solicitado": name_user_solicitado, "name_user_origen_solicitud": name_user_origen_solicitud}
            merged = {**accion_serializer.data, **jsonNRisk}

            vectActions.append(merged)

        return Response(vectActions)
        