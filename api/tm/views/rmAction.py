from tm import varGlobal
from tm.views import vistasGlobales
from tm.models import *
from tm.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser 
from datetime import datetime
import json
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class rmActionList(APIView):
    """
    Lista todos los paquetes de trabajo o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        vectorAccionProcesado = []
        
        id_record_get = request.GET.get('id_record')
        if id_record_get is None:
                rmAction_var = rmAction.objects.all().order_by('id')
        else:
                rmAction_var = rmAction.objects.filter(id_record=id_record_get).order_by('id')

        for itemAction in rmAction_var:
            itemAction_serializer = rmActionSerializer(itemAction)

            allMembers = itemAction.manager.all()
            allMembers_serializer = customUserSerializer(allMembers, many=True)

            # Obtener la propiedad "key3" de cada objeto en el vector
            member_list = list(map(lambda obj: obj.get('first_name') + " " + obj.get('last_name'), allMembers_serializer.data))
            member_string = ", ".join(member_list)

            jsonName = {"responsablesName": member_string}

            merged = {**itemAction_serializer.data, **jsonName}

            vectorAccionProcesado.append(merged)

        return Response(vectorAccionProcesado)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = rmActionPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([ExpiringTokenAuthentication])
class rmActionListDetail(APIView):  
    """
    Elimina o edita paquetes de trabajo específicos
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return rmAction.objects.get(pk=pk)
        except rmAction.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        rmAction = self.get_object(pk)
        serializer = rmActionSerializer(rmAction)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        rmAction = self.get_object(pk)
        rmAction_serializer = rmActionPostSerializer(rmAction, data=request.data)
        if rmAction_serializer.is_valid():
            rmAction_serializer.save()
            return Response(rmAction_serializer.data)
        return Response(rmAction_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        '''try:
            request_data = JSONParser().parse(request) 
            rmAction.objects.filter(id=pk).update(**request_data)
            if request_data['completed']:
                rmAction.objects.filter(id=pk).update(d_closed = datetime.today().strftime('%Y-%m-%d') )

            rmActionConsulta = self.get_object(pk)
            serializer = rmActionSerializer(rmActionConsulta)
            return Response(serializer.data)
        except rmAction.DoesNotExist:
            raise Http404'''


    def delete(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        rmAction = self.get_object(pk)
        rmAction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class rmActionListByPersonDetail(APIView):  
    """
    Elimina o edita paquetes de trabajo específicos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        valorFilter = []

        riskManagement_query = riskManagement.objects.all().filter(active= True)

        vectorContract = vistasGlobales.getMyMisionID(pk)

        #FILTRAR LOS RISK POR LAS MISIONES QUE HEMOS AÑADIDO
        valorFilter = list(filter(lambda x: x.mision.id in vectorContract, riskManagement_query))

        #GET RO DE LOS AMFES RESULTANTES
        list_rmRiskOpportunity_filter = rmRiskOpportunity.objects.filter(id_risk_management__in=valorFilter)
        list_rmAction_filter = rmAction.objects.filter(id_record__in=list_rmRiskOpportunity_filter)

        vectorAccionProcesado = []
        for itemAction in list_rmAction_filter:
            itemAction_serializer = rmActionSerializer(itemAction)

            allMembers = itemAction.manager.all()
            allMembers_serializer = customUserSerializer(allMembers, many=True)

            # Obtener la propiedad "key3" de cada objeto en el vector
            member_list = list(map(lambda obj: obj.get('first_name') + " " + obj.get('last_name'), allMembers_serializer.data))
            member_string = ", ".join(member_list)

            jsonName = {"responsablesName": member_string}

            merged = {**itemAction_serializer.data, **jsonName}

            vectorAccionProcesado.append(merged)

        return Response(vectorAccionProcesado)

@authentication_classes([ExpiringTokenAuthentication])
class rmActionListMyActions(APIView):  
    """
    Elimina o edita paquetes de trabajo específicos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        rmAction_var = rmAction.objects.filter(manager=pk)

        vectorAccionProcesado = []
        for itemAction in rmAction_var:
            itemAction_serializer = rmActionSerializer(itemAction)

            allMembers = itemAction.manager.all()
            allMembers_serializer = customUserSerializer(allMembers, many=True)

            # Obtener la propiedad "key3" de cada objeto en el vector
            member_list = list(map(lambda obj: obj.get('first_name') + " " + obj.get('last_name'), allMembers_serializer.data))
            member_string = ", ".join(member_list)

            jsonName = {"responsablesName": member_string}

            merged = {**itemAction_serializer.data, **jsonName}

            vectorAccionProcesado.append(merged)

        return Response(vectorAccionProcesado)