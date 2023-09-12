from tm import varGlobal
from tm.models import contractuser
from tm import varGlobal
from tm.models import customUser
from tm import varGlobal
from tm.models import jobInSubMision
from tm.serializers import contractuserSerializer
from tm.serializers import customUserSerializer
from tm.serializers import contractuserPostSerializer
from tm.serializers import jobInSubMisionSerializer
from tm.serializers import contractuserExtraSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from tm import varGlobal
from tm.models import subMision
from tm.serializers import subMisionSerializer
from tm.serializers import subMisionPostSerializer
from tm import varGlobal
from tm.models import mision
from tm.serializers import misionSerializer
from tm.serializers import misionPostSerializer
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class contractuserList(APIView):
    """
    Lista todos los customUsers o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        customUser_var = contractuser.objects.all()
        serializer_var = contractuserPostSerializer(customUser_var, many=True)
        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = contractuserPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class contractuserDetail(APIView):  
    """
    Elimina o edita contractuser específicos
    """
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        try:
            return contractuser.objects.get(pk=pk)
        except contractuser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        contractuser = self.get_object(pk)
        serializer = contractuserSerializer(contractuser)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        try:
            request_data = JSONParser().parse(request) 
            contractuser.objects.filter(id=pk).update(**request_data)
            userConsulta = self.get_object(pk)
            serializer = contractuserPostSerializer(userConsulta)
            return Response(serializer.data)
        except contractuser.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        contractuser = self.get_object(pk)
        contractuser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class contractuserExtra(APIView):

    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        try:
            return contractuser.objects.get(pk=pk)
        except contractuser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        contractuser2 = contractuser.objects.all().filter(user_id = pk)
        serializer = contractuserExtraSerializer(contractuser2, many=True)

        vectSubMision = []
        for elemento in serializer.data:
            subMision_var = subMision.objects.all().filter(id = elemento['subMision_id'])
            serializer_var = subMisionSerializer(subMision_var, many=True)

            #SABER SI ES DEPARTAMENTO O NO SU PADRE
            mision_var = mision.objects.all().filter(id = serializer_var.data[0]['id_mision'])
            mision_serializer_var = misionSerializer(mision_var, many=True)

            if len(mision_serializer_var.data) != 0:

                jobInSubMisionSelected = jobInSubMision.objects.get(id = elemento['job'])

                jsonNRisk = {"job_name": jobInSubMisionSelected.name, "job_id": elemento['job'], "contract_user_id": elemento['id'], "rol_employee": elemento['rol_employee'], "esDepartamento": mision_serializer_var.data[0]['esDepartamento']}
                
                merged = {**serializer_var.data[0], **jsonNRisk}

                vectSubMision.append(merged)
        
        vectSubMision.sort(key=lambda x: x["name"])

        return Response(vectSubMision)