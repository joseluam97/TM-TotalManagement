from tm import varGlobal
from tm.models import groupsRequeriment
from tm.serializers import groupsRequerimentSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tm.models import aplication
from tm.serializers import aplicationSerializer
from tm.models import aplicationWithRequeriments
from tm.serializers import aplicationWithRequerimentsSerializer
from rest_framework.permissions import IsAuthenticated
from tm.views.gestionAccesoApi import funcion_gestion_accesos

from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class groupsRequerimentList(APIView):
    """
    Lista todas las groupsRequerimentes o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
            
        groupsRequeriment_var = groupsRequeriment.objects.all()

        vectJson = []
        for itemGroup in groupsRequeriment_var:

            itemGroup_serializer = groupsRequerimentSerializer(itemGroup)

            #GET MIEMBROS DEL RIESGO
            allRequeriments = itemGroup.aplicaciones.all()
            allRequeriments_serializer = aplicationWithRequerimentsSerializer(allRequeriments, many=True)

            jsonNRisk = {"aplicaciones_all": allRequeriments_serializer.data}

            merged = {**itemGroup_serializer.data, **jsonNRisk}

            vectJson.append(merged)
            
        return Response(vectJson)
        

    def post(self, request, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = groupsRequerimentSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class groupsRequerimentListDetail(APIView):  
    """
    Elimina o edita groupsRequerimentes específicas
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return groupsRequeriment.objects.get(pk=pk)
        except groupsRequeriment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):

        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        groupsRequeriment = self.get_object(pk)
        serializer = groupsRequerimentSerializer(groupsRequeriment)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        groupsRequeriment = self.get_object(pk)
        serializer = groupsRequerimentSerializer(groupsRequeriment, data=request.data)
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
         
        #GET GRUPO
        groupsRequeriment = self.get_object(pk)
        groupsRequeriment_serializer = groupsRequerimentSerializer(groupsRequeriment)

        #ELIMINAR TODOS LOS APLICATIONWITHREQUERIMENTS DEL GRUPO
        for itemAWR in groupsRequeriment_serializer.data['aplicaciones']:
            aplicationWithRequeriments_var = aplicationWithRequeriments.objects.all().filter(id = itemAWR)
            aplicationWithRequeriments_var.delete()

        #ELIMINACION DEL GRUPO
        groupsRequeriment.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)