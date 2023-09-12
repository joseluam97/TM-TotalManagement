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
class workPackageList(APIView):
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
        
        workPackage_var = workPackage.objects.all().filter(active = True)
        serializer_var = workPackageSerializer(workPackage_var, many=True)
        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = workPackagePostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class workPackageListDetail(APIView):  
    """
    Elimina o edita paquetes de trabajo específicos
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return workPackage.objects.get(pk=pk)
        except workPackage.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        workPackage = self.get_object(pk)
        serializer = workPackageSerializer(workPackage)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        workPackage = self.get_object(pk)
        serializer = workPackagePostSerializer(workPackage, data=request.data)
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
        
        workPackage = self.get_object(pk)
        workPackage.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class workPackageListUbications(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        workPackage_var = workPackage.objects.get(id = pk)

        service_var = service.objects.get(id = workPackage_var.id_service.id)

        list_locations = service_var.locations.all()
        list_locations_serializer = locationCustomerSerializer(list_locations, many=True)

        listItems = list(list_locations_serializer.data)
        listItems.sort(key=lambda x: x["name"])

        return Response(listItems)
    

@authentication_classes([ExpiringTokenAuthentication])
class getUserResponsablesWP(APIView):
    #Devuelve el personal que se le puede solicitar personas, es decir responsables de WP

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        vectorPersonas = []

        workPackage_var = workPackage.objects.all().filter(active = True)

        for itemWP in workPackage_var:
            allMembers = itemWP.responsableWP.all()
            customUser_serializer_var = customUserSerializer(allMembers, many=True)
            vectorPersonas = vectorPersonas + customUser_serializer_var.data
        
        valorFilterUnique = { each['id'] : each for each in vectorPersonas }.values()

        listItems = list(valorFilterUnique)
        listItems.sort(key=lambda x: x["first_name"])
        
        return Response(listItems)  


@authentication_classes([ExpiringTokenAuthentication])
class getMyWp(APIView):
    #Devuelve el personal que se le puede solicitar personas, es decir responsables de WP

    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        workPackage_var = workPackage.objects.all().filter(responsableWP = pk)
        serializer_workPackage = workPackageSerializer(workPackage_var, many=True)
        
        return Response(serializer_workPackage.data)  