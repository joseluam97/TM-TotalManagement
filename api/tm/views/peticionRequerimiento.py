from tm import varGlobal
from tm.models import peticionRequerimiento
from tm.serializers import peticionRequerimientoSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm.views.gestionAccesoApi import funcion_gestion_accesos

from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class peticionRequerimientoList(APIView):
    """
    Lista todas las peticionRequerimientoes o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
            
        peticionRequerimiento_var = peticionRequerimiento.objects.all()
        serializer_var = peticionRequerimientoSerializer(peticionRequerimiento_var, many=True)
        return Response(serializer_var.data)
        

    def post(self, request, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = peticionRequerimientoSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class peticionRequerimientoListDetail(APIView):  
    """
    Elimina o edita peticionRequerimientoes específicas
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return peticionRequerimiento.objects.get(pk=pk)
        except peticionRequerimiento.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        peticionRequerimiento = self.get_object(pk)
        serializer = peticionRequerimientoSerializer(peticionRequerimiento)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        peticionRequerimiento = self.get_object(pk)
        serializer = peticionRequerimientoSerializer(peticionRequerimiento, data=request.data)
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
        
        peticionRequerimiento = self.get_object(pk)
        peticionRequerimiento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)