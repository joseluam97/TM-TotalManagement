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
from tm.serializers import contractuserContractSerializer
import json
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class rmRiskOpportunityList(APIView):
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
        
        
        risk_management_get = request.GET.get('id_risk_management')
        if risk_management_get is None:
                rmRiskOpportunity_var = rmRiskOpportunity.objects.all().filter(active = True)
        else:
                rmRiskOpportunity_var = rmRiskOpportunity.objects.filter(id_risk_management=risk_management_get, active = True)

        serializer_var = rmRiskOpportunitySerializer(rmRiskOpportunity_var, many=True)

        #AÑADIR NUMERO DE OPORTUNIDADES DE LOS RIESGOS
        vectJson = []
        for elemento in serializer_var.data:
            consultaActions = rmAction.objects.all().filter(id_record = elemento['id'])
            serializer_varOportunity = rmActionSerializer(consultaActions, many=True)
        
            jsonNRisk = {"nActions": len(serializer_varOportunity.data)}

            merged = {**elemento, **jsonNRisk}

            vectJson.append(merged)

        return Response(vectJson)

        #return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = rmRiskOpportunityPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class rmRiskOpportunityListDetail(APIView):  
    """
    Elimina o edita paquetes de trabajo específicos
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return rmRiskOpportunity.objects.get(pk=pk)
        except rmRiskOpportunity.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        rmRiskOpportunity = self.get_object(pk)
        serializer = rmRiskOpportunitySerializer(rmRiskOpportunity)

        consultaActions = rmAction.objects.all().filter(id_record = pk)
        serializer_varOportunity = rmActionSerializer(consultaActions, many=True)
        
        jsonNRisk = {"nActions": len(serializer_varOportunity.data)}

        merged = {**serializer.data, **jsonNRisk}

        return Response(merged)

        #return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        rmRiskOpportunity = self.get_object(pk)
        rmRiskOpportunity_serializer = rmRiskOpportunityPostSerializer(rmRiskOpportunity, data=request.data)
        if rmRiskOpportunity_serializer.is_valid():
            rmRiskOpportunity_serializer.save()
            return Response(rmRiskOpportunity_serializer.data)
        return Response(rmRiskOpportunity_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        '''try:
            request_data = JSONParser().parse(request) 
            riskManagement.objects.filter(id=pk).update(**request_data)
            riskManagementConsulta = self.get_object(pk)
            serializer = riskManagementPostSerializer(riskManagementConsulta)
            return Response(serializer.data)
        except riskManagement.DoesNotExist:
            raise Http404'''

    def delete(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        rmRiskOpportunity = self.get_object(pk)
        rmRiskOpportunity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class rmRiskOpportunityOperations(APIView):
    """
    Lista todos los paquetes de trabajo o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        
        rmRiskOpportunity_var = rmRiskOpportunity.objects.filter(id_risk_management=pk, active = True, padreRiskOpportunity = None)

        serializer_var = rmRiskOpportunitySerializer(rmRiskOpportunity_var, many=True)

        #AÑADIR NUMERO DE OPORTUNIDADES DE LOS RIESGOS
        vectJson = []
        for elemento in serializer_var.data:
            consultaActions = rmAction.objects.all().filter(id_record = elemento['id'])
            serializer_varOportunity = rmActionSerializer(consultaActions, many=True)
        
            jsonNRisk = {"nActions": len(serializer_varOportunity.data)}

            merged = {**elemento, **jsonNRisk}

            vectJson.append(merged)

        return Response(vectJson)

        #return Response(serializer_var.data)

@authentication_classes([ExpiringTokenAuthentication])
class rmRiskOpportunityOrganigrama(APIView):
    """
    Lista todos los paquetes de trabajo o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        
        rmRiskOpportunity_var = rmRiskOpportunity.objects.filter(id=pk)
        serializer_var = rmRiskOpportunitySerializer(rmRiskOpportunity_var, many=True)

        existePadre = True
        vectorOrganigrama = []
        idPadre = serializer_var.data[0]['id']
        while existePadre == True:
            riskPadre = rmRiskOpportunity.objects.filter(padreRiskOpportunity=idPadre)
            serializer_var_padre = rmRiskOpportunitySerializer(riskPadre, many=True)

            if len(serializer_var_padre.data) != 0:
                vectorOrganigrama.append(serializer_var_padre.data[0])
                idPadre = serializer_var_padre.data[0]['id']
            if len(serializer_var_padre.data) == 0:
                existePadre = False

        #AÑADIR NUMERO DE OPORTUNIDADES DE LOS RIESGOS
        vectJson = []
        for elemento in vectorOrganigrama:
            consultaActions = rmAction.objects.all().filter(id_record = elemento['id'])
            serializer_varOportunity = rmActionSerializer(consultaActions, many=True)
        
            jsonNRisk = {"nActions": len(serializer_varOportunity.data)}

            merged = {**elemento, **jsonNRisk}

            vectJson.append(merged)

        return Response(vectJson)

@authentication_classes([ExpiringTokenAuthentication])
class rmRiskOpportunityLocalizacionesByMision(APIView):
    """
    Lista todos los paquetes de trabajo o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        #pk => id de la mision
        vectorUbicaciones = []
        riskManagement_var = riskManagement.objects.all().filter(mision = pk)

        rmRiskOpportunity_var = rmRiskOpportunity.objects.filter(id_risk_management__in=riskManagement_var)

        for itemRO in rmRiskOpportunity_var:
            all_site_ro = itemRO.site.all()
            list_id_all_site_ro = list(map(lambda obj: obj.id, all_site_ro))
            vectorUbicaciones = vectorUbicaciones + list_id_all_site_ro
        
        unique_site = list(set(vectorUbicaciones))

        return Response(unique_site)
    
@authentication_classes([ExpiringTokenAuthentication])
class rmRYOListHomeDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        riskManagement_var = riskManagement.objects.all().filter(active= True)

        rmRiskOpportunity_var = rmRiskOpportunity.objects.filter(id_risk_management__in = riskManagement_var)

        #AÑADIR NUMERO DE OPORTUNIDADES DE LOS RIESGOS
        vectJson = []
        for elementoRO in rmRiskOpportunity_var:
            consultaActions = rmAction.objects.all().filter(id_record = elementoRO.id)
            serializer_varOportunity = rmActionSerializer(consultaActions, many=True)
        
            jsonNRisk = {"nActions": len(serializer_varOportunity.data)}

            elementoRO_serializer = rmRiskOpportunitySerializer(elementoRO)

            merged = {**elementoRO_serializer.data, **jsonNRisk}

            vectJson.append(merged)

        return Response(vectJson)

@authentication_classes([ExpiringTokenAuthentication])
class rmRYOListByPersonDetail(APIView):  
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
        list_rmRiskOpportunity_filter_serializer = rmRiskOpportunitySerializer(list_rmRiskOpportunity_filter, many=True)

        return Response(list_rmRiskOpportunity_filter_serializer.data)