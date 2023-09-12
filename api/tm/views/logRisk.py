from tm import varGlobal
from tm.models import logRisk
from tm.serializers import logRiskSerializer
from tm.serializers import logRiskPostSerializer
from tm.serializers import logRiskROByActionSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm import varGlobal
from tm.models import rmAction
from tm.serializers import rmActionSerializer
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class logRiskList(APIView):
    """
    Lista todas las logRiskes o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        logRisk_var = logRisk.objects.all()
        serializer_var = logRiskSerializer(logRisk_var, many=True)
        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = logRiskPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class logRiskListDetail(APIView):  
    """
    Elimina o edita logRiskes específicas
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return logRisk.objects.get(pk=pk)
        except logRisk.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        logRisk = self.get_object(pk)
        serializer = logRiskSerializer(logRisk)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        logRisk = self.get_object(pk)
        serializer = logRiskPostSerializer(logRisk, data=request.data)
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
        
        logRisk = self.get_object(pk)
        logRisk.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class logRiskAmfeList(APIView):
    """
    Lista todas las logRiskes o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        logRisk_var = logRisk.objects.all().filter(amfe_relacionado = pk)
        serializer_var = logRiskSerializer(logRisk_var, many=True)
        return Response(serializer_var.data)

@authentication_classes([ExpiringTokenAuthentication])
class logRiskRoList(APIView):
    """
    Lista todas las logRiskes o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        logRisk_var = logRisk.objects.all().filter(ro_relacionado = pk)
        serializer_var = logRiskSerializer(logRisk_var, many=True)
        return Response(serializer_var.data)
    
@authentication_classes([ExpiringTokenAuthentication])
class logRiskAccionByRoList(APIView):
    """
    Lista todas las logRiskes o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        #pk es un id de un ro
        rmAction_var = rmAction.objects.all().filter(id_record = pk)
        accion_inicial_serializer_var = rmActionSerializer(rmAction_var, many=True)

        vectorHistorico = []
        for item in accion_inicial_serializer_var.data:
            logRisk_var = logRisk.objects.all().filter(accion_relacionado = item['id'])
            serializer_var = logRiskROByActionSerializer(logRisk_var, many=True)
            if len(serializer_var.data) != 0:
                vectorHistorico = vectorHistorico + serializer_var.data
            
        return Response(vectorHistorico)
    
@authentication_classes([ExpiringTokenAuthentication])
class logRiskAccionList(APIView):
    """
    Lista todas las logRiskes o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        logRisk_var = logRisk.objects.all().filter(accion_relacionado = pk)
        serializer_var = logRiskSerializer(logRisk_var, many=True)
        return Response(serializer_var.data)