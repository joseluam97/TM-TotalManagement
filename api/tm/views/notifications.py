from tm import varGlobal
from tm.models import notifications
from tm.serializers import notificationsSerializer
from tm.serializers import notificationsPostSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import Permission
from django.core import serializers
from django.contrib.contenttypes.models import ContentType
import pyodbc
import pandas as pd
from django.http import HttpResponse
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from django.conf import settings
import os
import base64

@authentication_classes([ExpiringTokenAuthentication])
class notificationsList(APIView):
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
        
        customUser_var = notifications.objects.all()
        serializer_var = notificationsSerializer(customUser_var, many=True)

        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = notificationsPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class notificationsListDetail(APIView):  
    """
    Elimina o edita customUser específicos
    """
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        try:
            return notifications.objects.get(pk=pk)
        except notifications.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

         #GET USER
        usuarioSelected = notifications.objects.get(id=pk)
        serializer_contract_user_var = notificationsSerializer(usuarioSelected)
        #FIN GET USER
        return Response(serializer_contract_user_var.data)    

        """ 
        Ejemplo para salida de varios serializers
        permisosActuales = Permission.objects.filter(user=pk)   
        context = {'permission_name': permisosActuales}
        return HttpResponse((permisosActuales, serializer.data), content_type="application/json") 
        """

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS

        notificacion = self.get_object(pk)
        
        #DELETE ARCHIVO DE LA INSTANCIA NOTIFICACION
        notificacion.archivo.delete()

        serializer = notificationsPostSerializer(notificacion, data=request.data)
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
        
        notifications = self.get_object(pk)
        notifications.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class misNotificaciones(APIView):  
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        usuarioSelected = notifications.objects.all().filter(destino_notification_id=pk, active = True)
        serializer_contract_user_var = notificationsSerializer(usuarioSelected, many=True)
        
        return Response(serializer_contract_user_var.data)
    
@authentication_classes([ExpiringTokenAuthentication])
class descargarArchivo(APIView):
    def get(self, request, pk, format=None):

        doc = get_object_or_404(notifications, id=pk)
        filename = doc.archivo.name

        archivo_base64 = base64.b64encode(doc.archivo.read()).decode('utf-8')

        response = HttpResponse(archivo_base64, content_type='application/base64')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response

        '''
        file_path = os.path.join(settings.MEDIA_ROOT, filename)
        if os.path.exists(file_path):
            with open(file_path, 'rb') as excel:
                response = HttpResponse(excel.read(), content_type='application/base64')
                response['Content-Disposition'] = 'attachment; filename=' + filename
                return response
        else:
            return HttpResponse("El archivo no existe")'''


        '''doc = get_object_or_404(notifications, id=pk)
        response = FileResponse(doc.archivo)
        response['Content-Disposition'] = f'attachment; filename="newArchivo.xlsx"'
        return response'''