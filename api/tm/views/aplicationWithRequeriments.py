from tm import varGlobal
from tm.models import aplicationWithRequeriments
from tm.serializers import aplicationWithRequerimentsSerializer
from tm.serializers import aplicationWithRequerimentsPostSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm.views.gestionAccesoApi import funcion_gestion_accesos

from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class aplicationWithRequerimentsList(APIView):
    """
    Lista todas las aplicationWithRequerimentses o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
            
        aplicationWithRequeriments_var = aplicationWithRequeriments.objects.all()
        serializer_var = aplicationWithRequerimentsSerializer(aplicationWithRequeriments_var, many=True)
        return Response(serializer_var.data)
        

    def post(self, request, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = aplicationWithRequerimentsPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()

            #OBTENER EL ELEMENTO CON TODOS SUS ITEMS EXTRAS
            aplicationWithRequeriments_var = aplicationWithRequeriments.objects.get(id = serializer_var.data['id'])
            aplicationWithRequeriments_serializer = aplicationWithRequerimentsSerializer(aplicationWithRequeriments_var)

            return Response(aplicationWithRequeriments_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class aplicationWithRequerimentsListDetail(APIView):  
    """
    Elimina o edita aplicationWithRequerimentses específicas
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return aplicationWithRequeriments.objects.get(pk=pk)
        except aplicationWithRequeriments.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        aplicationWithRequeriments = self.get_object(pk)
        serializer = aplicationWithRequerimentsSerializer(aplicationWithRequeriments)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        aplicationWithRequeriments = self.get_object(pk)
        serializer = aplicationWithRequerimentsPostSerializer(aplicationWithRequeriments, data=request.data)
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
        
        aplicationWithRequeriments = self.get_object(pk)
        aplicationWithRequeriments.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)