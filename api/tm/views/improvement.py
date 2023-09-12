from tm import varGlobal
from tm.views import vistasGlobales
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
class improvementList(APIView):
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
        
        improvement_var = improvement.objects.all()
        improvement_serializer_var = improvementSerializer(improvement_var, many=True)
        return Response(improvement_serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        improvement_serializer_var = improvementPostSerializer(data=request.data)
        if improvement_serializer_var.is_valid():
            improvement_serializer_var.save()
            return Response(improvement_serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(improvement_serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([ExpiringTokenAuthentication])
class improvementListDetail(APIView):  
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
        
        improvement = self.get_object(pk)
        serializer = improvementSerializer(improvement)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        improvement = self.get_object(pk)
        serializer = improvementPostSerializer(improvement, data=request.data)
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
        
        improvement = self.get_object(pk)
        improvement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class improvementListOperation(APIView):
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

        improvement_query = improvement.objects.all()

        vectorContract = vistasGlobales.getMySubMisionID(pk)

        #FILTRAR LOS RISK POR LAS MISIONES QUE HEMOS AÑADIDO
        valorFilter = list(filter(lambda x: x.subMision.id in vectorContract, improvement_query))

        vectImprovement = []
        for mejoraSelect in valorFilter:
            mejoraSelect_serializer = improvementSerializer(mejoraSelect)
            accionesImprovement_var = accionesImprovement.objects.all().filter(id_improvement = mejoraSelect.id)

            accionesImprovement_completed_var = accionesImprovement.objects.all().filter(id_improvement = mejoraSelect.id, completed = True)

            jsonNRisk = {"mix_actions": str(len(accionesImprovement_completed_var)) + '/' + str(len(accionesImprovement_var)), "num_actions": len(accionesImprovement_var), "num_actions_completed": len(accionesImprovement_completed_var)}
            merged = {**mejoraSelect_serializer.data, **jsonNRisk}

            vectImprovement.append(merged)

        return Response(vectImprovement)
