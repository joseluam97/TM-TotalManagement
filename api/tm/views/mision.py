from tm import varGlobal
from tm.models import *
from tm.serializers import *
from tm.views import vistasGlobales
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class misionList(APIView):
    """
    Lista todos los misions o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        list_mision = []
        mision_var = mision.objects.all().filter(active = True)

        for itemMision in mision_var:
            itemMision_serializer = misionSerializer(itemMision)

            allMembers = itemMision.responsables.all()
            allMembers_serializer = customUserSerializer(allMembers, many=True)

            member_list = list(map(lambda obj: obj.get('first_name') + " " + obj.get('last_name'), allMembers_serializer.data))
            member_string = ", ".join(member_list)

            jsonNRisk = {"manager_name": member_string}
            merged = {**itemMision_serializer.data, **jsonNRisk}

            list_mision.append(merged)

        return Response(list_mision)


    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = misionPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class misionListDetail(APIView):  
    """
    Elimina o edita misions específicos
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return mision.objects.get(pk=pk)
        except mision.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        mision = self.get_object(pk)
        serializer = misionSerializer(mision)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        mision = self.get_object(pk)
        serializer = misionPostSerializer(mision, data=request.data)
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
        
        mision = self.get_object(pk)
        mision.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class misionListMyMision(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS

        vectorContract = vistasGlobales.getMyMision(pk)

        valorFilterUnique = { each['name'] : each for each in vectorContract }.values()

        listItems = list(valorFilterUnique)
        listItems.sort(key=lambda x: x["name"])

        return Response(listItems)

@authentication_classes([ExpiringTokenAuthentication])
class misionListUbicationsContract(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        mision_var = mision.objects.get(id = pk)

        workPackage_var = workPackage.objects.get(id = mision_var.id_workPackage.id)

        service_var = service.objects.get(id = workPackage_var.id_service.id)

        list_locations = service_var.locations.all()
        list_locations_serializer = locationCustomerSerializer(list_locations, many=True)

        listItems = list(list_locations_serializer.data)
        listItems.sort(key=lambda x: x["name"])

        return Response(listItems)