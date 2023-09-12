from tm import varGlobal
from tm.models import accionesImprovement
from tm.serializers import accionesImprovementSerializer
from tm.serializers import accionesImprovementPostSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm import varGlobal
from tm.models import customUser
from tm.serializers import customUserSerializer
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class accionesImprovementList(APIView):
    """
    Lista todos los accionesImprovements o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        accionesImprovement_var = accionesImprovement.objects.all()
        serializer_var = accionesImprovementSerializer(accionesImprovement_var, many=True)
        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = accionesImprovementPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class accionesImprovementListDetail(APIView):  
    """
    Elimina o edita accionesImprovements específicos
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return accionesImprovement.objects.get(pk=pk)
        except accionesImprovement.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        accionesImprovement = self.get_object(pk)
        serializer = accionesImprovementSerializer(accionesImprovement)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        accionesImprovement = self.get_object(pk)
        serializer = accionesImprovementPostSerializer(accionesImprovement, data=request.data)
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
        
        accionesImprovement = self.get_object(pk)
        accionesImprovement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class accionesImprovementByImprovement(APIView):  
    """
    Elimina o edita accionesImprovements específicos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        accionesImprovement_var = accionesImprovement.objects.all().filter(id_improvement = pk)

        vectActions = []
        for accion in accionesImprovement_var:
            accion_serializer = accionesImprovementSerializer(accion)

            name_manager = accion.responsable_accion.first_name + " " + accion.responsable_accion.last_name

            allMembers = accion.user_ayundantes.all()
            allMembers_serializer = customUserSerializer(allMembers, many=True)

            member_list = list(map(lambda obj: obj.get('first_name') + " " + obj.get('last_name'), allMembers_serializer.data))
            member_string = ", ".join(member_list)

            jsonNRisk = {"helpers_name": member_string, "manager_name": name_manager}
            merged = {**accion_serializer.data, **jsonNRisk}

            vectActions.append(merged)

        return Response(vectActions)