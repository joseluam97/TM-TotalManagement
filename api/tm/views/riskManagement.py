from tm import varGlobal
from tm.models import *
from tm.serializers import *
from tm.views import vistasGlobales
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
import json
from rest_framework import serializers
from django.core import serializers
from django.forms.models import model_to_dict
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class riskManagementList(APIView):
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
        
        if request.user.has_perm('tm.can_see_all_risk'):

            riskManagement_var = riskManagement.objects.all().filter(active= True)
            serializer_var = riskManagementSerializer(riskManagement_var, many=True)

            #AÑADIR NUMERO DE OPORTUNIDADES DE LOS RIESGOS
            vectJson = []
            for itemRisk in riskManagement_var:
                consultaOportunity = rmRiskOpportunity.objects.all().filter(id_risk_management = itemRisk.id, padreRiskOpportunity = None, active = True)
                serializer_varOportunity = rmRiskOpportunitySerializer(consultaOportunity, many=True)

                userManager = customUser.objects.get(id = itemRisk.manager.id)

                #GET MIEMBROS DEL RIESGO
                allMembers = itemRisk.member.all()
                allMembers_serializer = customUserSerializer(allMembers, many=True)

                # Obtener la propiedad "key3" de cada objeto en el vector
                member_list = list(map(lambda obj: obj.get('first_name') + " " + obj.get('last_name'), allMembers_serializer.data))
                member_string = ", ".join(member_list)
                
                jsonNRisk = {"fullNameMiembros": member_string, "nRisk": len(serializer_varOportunity.data), "fullNameManager": userManager.first_name + " " + userManager.last_name}

                #SERIALIZAR itemRisk
                itemRisk_serializer = riskManagementSerializer(itemRisk)

                merged = {**itemRisk_serializer.data, **jsonNRisk}

                vectJson.append(merged)

            return Response(vectJson)
        else:
            print("NO TENGO PERMISOS")

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = riskManagementPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class riskManagementListDetail(APIView):  
    """
    Elimina o edita paquetes de trabajo específicos
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return riskManagement.objects.get(pk=pk)
        except riskManagement.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        profile = riskManagement.objects.get(id = pk)
        serializer = riskManagementSerializer(profile)

        consultaOportunity = rmRiskOpportunity.objects.all().filter(id_risk_management = pk)
        serializer_var = rmRiskOpportunitySerializer(consultaOportunity, many=True)
        
        jsonNRisk = {"nRisk": len(serializer_var.data)}

        merged = {**serializer.data, **jsonNRisk}

        return Response(merged)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        riskManagement = self.get_object(pk)
        riskManagement_serializer = riskManagementPostSerializer(riskManagement, data=request.data)
        if riskManagement_serializer.is_valid():
            riskManagement_serializer.save()
            return Response(riskManagement_serializer.data)
        return Response(riskManagement_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        riskManagement = self.get_object(pk)
        riskManagement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class riskManagementListOperation(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return riskManagement.objects.get(pk=pk)
        except riskManagement.DoesNotExist:
            raise Http404

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

        #AÑADIR NUMERO DE OPORTUNIDADES DE LOS RIESGOS
        vectJson = []
        for itemRisk in valorFilter:
            consultaOportunity = rmRiskOpportunity.objects.all().filter(id_risk_management = itemRisk.id)
            serializer_varOportunity = rmRiskOpportunitySerializer(consultaOportunity, many=True)

            userManager = customUser.objects.get(id = itemRisk.manager.id)

            #GET MIEMBROS DEL RIESGO
            allMembers = itemRisk.member.all()
            allMembers_serializer = customUserSerializer(allMembers, many=True)

            # Obtener la propiedad "key3" de cada objeto en el vector
            member_list = list(map(lambda obj: obj.get('first_name') + " " + obj.get('last_name'), allMembers_serializer.data))
            member_string = ", ".join(member_list)
            
            jsonNRisk = {"fullNameMiembros": member_string, "nRisk": len(serializer_varOportunity.data), "fullNameManager": userManager.first_name + " " + userManager.last_name}

            #SERIALIZAR itemRisk
            itemRisk_serializer = riskManagementSerializer(itemRisk)

            merged = {**itemRisk_serializer.data, **jsonNRisk}

            vectJson.append(merged)


        return Response(vectJson)


'''

POST NEW PERMISISIO SEE ALL RISK

ct = ContentType.objects.get_for_model(riskManagement) 
permission = Permission.objects.create(codename='can_see_all_risk', name='Can See All Risk', content_type=ct)

'''