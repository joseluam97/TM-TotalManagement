from tm import varGlobal
from tm.models import customUser
from tm.serializers import customUserSerializer
from tm import varGlobal
from tm.models import riskManagement
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
from os import environ
from django.http import HttpResponse
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from tm import varGlobal
from tm.models import mision
from tm.serializers import misionSerializer
from tm import varGlobal
from tm.models import contractuser
from tm.serializers import contractuserSerializer
from tm import varGlobal
from tm.models import subMision
from tm.serializers import subMisionSerializer
from tm import varGlobal
from tm.models import workPackage
from tm.serializers import workPackageSerializer
from tm import varGlobal
from tm.models import direccionDepartamental
from tm.serializers import direccionDepartamentalSerializer
from tm import varGlobal
from tm.models import departamento
from tm.serializers import departamentoSerializer
from tm import varGlobal
from django.contrib.auth.models import Group
import random
import string
from django.contrib.auth.hashers import make_password
import os
from tm.views.gestionAccesoApi import funcion_gestion_accesos
import operator
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class customAllUserList(APIView):
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
        
        customUser_var = customUser.objects.all().order_by('first_name', 'last_name')
        #.order_by('last_name')
        serializer_var = customUserSerializer(customUser_var, many=True)

        return Response(serializer_var.data)

@authentication_classes([ExpiringTokenAuthentication])
class customUserList(APIView):
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
        

        customUser_var = customUser.objects.all().filter(is_active = True).order_by('first_name', 'last_name')
        serializer_var = customUserSerializer(customUser_var, many=True)

        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS

        grupoUser = Group.objects.all().filter(name=request.data['rolUser']).values("id")

        #GESTION DE CONTRASEÑA USUARIO
        MiCadena = string.ascii_letters + string.digits #+ str('*/|+$%')     
        cadenaAleatoria = "".join(random.choice(MiCadena)  for j in range(random.randint(10,15)))

        password = make_password(cadenaAleatoria)
        jsonPassword = {"password": password}

        #GESTION DE GRUPOS DE PERMISOS
        vectorIDGroup = []
        for itemGroup in list(grupoUser):
            vectorIDGroup.append(itemGroup['id'])

        jsonGroups = {"groups": vectorIDGroup}

        jsonPassword = {**request.data, **jsonPassword}
        jsonInsert = {**jsonPassword, **jsonGroups}

        serializer_var = customUserSerializer(data=jsonInsert)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class customUserListDetail(APIView):  
    """
    Elimina o edita customUser específicos
    """
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        try:
            return customUser.objects.get(pk=pk)
        except customUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

         #GET USER
        usuarioSelected = customUser.objects.get(id=pk)
        serializer_contract_user_var = customUserSerializer(usuarioSelected)
        #FIN GET USER

        if serializer_contract_user_var.data['is_superuser']:
            permisosAsociados = Permission.objects.all().values("name")
        else:
            permisosAsociados = Permission.objects.filter(user=pk).values("name")
        
        #NO SE HACE ADICCION PORQUE ESTE ES EL DIALOGO DE PERMISOS

        return Response(permisosAsociados)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        try:
            request_data = JSONParser().parse(request)
         
            '''Detecta si está asignando permisos desde el front'''
            if 'user_permissions' in request_data:
                usuarioActual = customUser.objects.get(id=pk)

                '''Elimina todos los permisos del usuario actual'''
                permisosActuales = Permission.objects.filter(user=pk)

                for permisoExistente in permisosActuales:     
                     usuarioActual.user_permissions.remove(permisoExistente)
                 
                '''Asigna los permisos al usuario por nombre permiso'''
                for permiso in request_data['user_permissions']:
                     permission = Permission.objects.get(name=permiso)
                     usuarioActual.user_permissions.add(permission)
               
            else:
                '''COMPROBAR SI EL ROL DEL USUARIO HA CAMBIADO'''
                user_change = customUser.objects.get(id=pk)
                serializer_user_change = customUserSerializer(user_change)
                if serializer_user_change.data['rolUser'] != request_data['rolUser']:
                    grupoUser = Group.objects.all().filter(name=request_data['rolUser']).values("id")

                    vectorIDGroup = []
                    for itemGroup in list(grupoUser):
                        vectorIDGroup.append(itemGroup['id'])

                    #jsonGroups = {"groups": vectorIDGroup}
                    jsonInsert = {**request_data, **{"groups": vectorIDGroup}, **{"password": serializer_user_change.data['password']}}
                    
                    serializer_save = customUserSerializer(user_change, data=jsonInsert)
                    #serializer_save.save()

                    if serializer_save.is_valid():
                        serializer_save.save()
                        #return Response(serializer_save.data)
                    else:
                        return Response(serializer_save.errors, status=status.HTTP_400_BAD_REQUEST)

                    '''FIN COMPROBACION'''
                else:
                    customUser.objects.filter(id=pk).update(**request_data) 
                
            userConsulta = self.get_object(pk)
            serializer = customUserSerializer(userConsulta)
            return Response(serializer.data)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            raise Http404

    def delete(self, request, pk, format=None):
        customUser = self.get_object(pk)
        customUser.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class customUserListPermisosByGroup(APIView):  
    """
    Elimina o edita customUser específicos
    """
    permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        try:
            return customUser.objects.get(pk=pk)
        except customUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

         #GET USER
        usuarioSelected = customUser.objects.get(id=pk)
        serializer_contract_user_var = customUserSerializer(usuarioSelected)
        #FIN GET USER
        
        #NO SE HACE ADICCION PORQUE ESTE ES EL DIALOGO DE PERMISOS

        #GET GRUPS OF USER
        if len(serializer_contract_user_var.data['groups']) != 0:
            for idGrupoUser in serializer_contract_user_var.data['groups']:
                grupoUser = Group.objects.get(id=idGrupoUser)
                permissions = grupoUser.permissions.all().values("name")
        else:
            permissions = []

        #ADICION DE GRUPOS DE PERMISOS A PERMISOS INDIVIDUALES
        permisosFinal = list(permissions)

        return Response(permisosFinal)

@authentication_classes([ExpiringTokenAuthentication])
class postPasswordUserManual(APIView):
    """
    Lista todos los customUsers o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        request_data = JSONParser().parse(request)

        customUser_var = customUser.objects.get(id=pk)
        
        newPassword = make_password(request_data['password'])
        
        customUser_var.password = newPassword
        customUser_var.save()

        customUser_var_2 = customUserSerializer(customUser_var)

        return Response(customUser_var_2.data)

@authentication_classes([ExpiringTokenAuthentication])
class postPermisosUsuarios(APIView):
    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        #ct = ContentType.objects.get_for_model(riskManagement) 
        #permission = Permission.objects.create(codename='can_see_all_risk', name='Can See All Risk', content_type=ct)

        ct_pb = ContentType.objects.get_for_model(customUser) 
        permission = Permission.objects.create(codename='can_management_power_bi', name='Can Management Power BI', content_type=ct_pb)

        return Response(status=status.HTTP_204_NO_CONTENT)


@authentication_classes([ExpiringTokenAuthentication])
class customUserDeleteRelaciones(APIView):  
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        customUser_var = customUser.objects.get(id = pk)

        #DELETE CONTRACT USER QUE EL USUARIO TENGA ASOCIADO
        contractuser_var = contractuser.objects.all().filter(user_id = pk)

        for itemCU in contractuser_var:
            itemCU.delete()

        #DELETE BLOQUE DE MISION RESPONSABLES
        mision_var = mision.objects.all().filter(responsables=pk)

        for elementoMision in mision_var:
            elementoMision.responsables.remove(customUser_var)

        #DELETE BLOQUE DE MISION EMPLEADOS
        mision_empleados = mision.objects.all().filter(empleados=pk)

        for elementoMision in mision_empleados:
            elementoMision.empleados.remove(customUser_var)

        
        #DELETE BLOQUE DE WORK PACKAGE
        workPackage_var = workPackage.objects.all().filter(responsableWP = pk)

        for elementoWP in workPackage_var:
            elementoWP.responsableWP.remove(customUser_var)


        #DELETE BLOQUE DE DEPARTAMENTO
        departamento_var = departamento.objects.all().filter(responsableDepartamento = pk)

        for elementoD in departamento_var:
            elementoD.responsableDepartamento.remove(customUser_var)


        #DELETE BLOQUE DE DIRECCION DEPARTAMENTAL
        direccionDepartamental_var = direccionDepartamental.objects.all().filter(responsablesDD = pk)

        for elementoDD in direccionDepartamental_var:
            elementoDD.responsablesDD.remove(customUser_var)

        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class userEstructuraPersonalDireccionDepartamental(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        vectorUser = []

        direccionDepartamental_var = direccionDepartamental.objects.get(id = pk)

        #AÑADIR LOS RESPONSABLES DE LA DIRECCION DEPARTAMENTAL
        list_user = direccionDepartamental_var.responsablesDD.all()
        list_userDD_serializer = customUserSerializer(list_user, many=True)

        member_list_DD = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN2}}, list_userDD_serializer.data))

        vectorUser = vectorUser + member_list_DD

        departamento_var = departamento.objects.all().filter(id_direccion_departamental = direccionDepartamental_var.id)

        #AÑADIR LOS RESPONSABLES DEL DEPARTAMENTO
        for itemD in departamento_var:
            list_userD = itemD.responsableDepartamento.all()
            list_userD_serializer = customUserSerializer(list_userD, many=True)

            member_list = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN3}}, list_userD_serializer.data))

            vectorUser = vectorUser + member_list

        
        #AÑADIR LOS RESPONSABLES DEL WP
        workPackage_var = workPackage.objects.all().filter(id_departamento__in = departamento_var)

        for itemWP in workPackage_var:
            list_userWP = itemWP.responsableWP.all()
            list_userWP_serializer = customUserSerializer(list_userWP, many=True)

            member_list_WP = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN4}}, list_userWP_serializer.data))

            vectorUser = vectorUser + member_list_WP


        #AÑADIR LOS RESPONSABLES DE LA MISION
        misiones_var = mision.objects.all().filter(id_workPackage__in = workPackage_var)

        for itemM in misiones_var:
            list_user_responsables_M = itemM.responsables.all()
            list_user_responsables_M_serializer = customUserSerializer(list_user_responsables_M, many=True)
            member_list_responsables_M = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN5}}, list_user_responsables_M_serializer.data))
            vectorUser = vectorUser + member_list_responsables_M

            list_user_empleados_M = itemM.empleados.all()
            list_user_empleados_M_serializer = customUserSerializer(list_user_empleados_M, many=True)
            member_list_empleados_M = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN6}}, list_user_empleados_M_serializer.data))
            vectorUser = vectorUser + member_list_empleados_M

            
        #AÑADIR LOS EMPLEADOS DE LA SUB MISION
        subMisionSelect = subMision.objects.all().filter(id_mision__in = misiones_var)

        for itemSubMision in subMisionSelect:
            contractuser_owner = contractuser.objects.filter(subMision_id = itemSubMision.id)

            for item in contractuser_owner:
                
                serializer_contract_user_var = customUserSerializer(item.user_id)
                if item.job != None:
                    if item.job.name == "Manager":
                        merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN7}}
                    else:
                        merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN8}}
                else:
                    merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN8}}
                
                vectorUser.append(merged)

        return Response(vectorUser)

@authentication_classes([ExpiringTokenAuthentication])
class userEstructuraPersonalWP(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        vectorUser = []

        #AÑADIR LOS RESPONSABLES DEL WP
        workPackage_var = workPackage.objects.get(id = pk)

        list_userWP = workPackage_var.responsableWP.all()
        list_userWP_serializer = customUserSerializer(list_userWP, many=True)

        member_list_WP = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN4}}, list_userWP_serializer.data))

        vectorUser = vectorUser + member_list_WP


        #AÑADIR LOS RESPONSABLES DE LA MISION
        misiones_var = mision.objects.all().filter(id_workPackage = workPackage_var.id)

        for itemM in misiones_var:
            list_user_responsables_M = itemM.responsables.all()
            list_user_responsables_M_serializer = customUserSerializer(list_user_responsables_M, many=True)
            member_list_responsables_M = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN5}}, list_user_responsables_M_serializer.data))
            vectorUser = vectorUser + member_list_responsables_M

            list_user_empleados_M = itemM.empleados.all()
            list_user_empleados_M_serializer = customUserSerializer(list_user_empleados_M, many=True)
            member_list_empleados_M = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN6}}, list_user_empleados_M_serializer.data))
            vectorUser = vectorUser + member_list_empleados_M

            
        #AÑADIR LOS EMPLEADOS DE LA SUB MISION
        subMisionSelect = subMision.objects.all().filter(id_mision__in = misiones_var)

        for itemSubMision in subMisionSelect:
            contractuser_owner = contractuser.objects.filter(subMision_id = itemSubMision.id)

            for item in contractuser_owner:
                
                serializer_contract_user_var = customUserSerializer(item.user_id)
                if item.job != None:
                    if item.job.name == "Manager":
                        merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN7}}
                    else:
                        merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN8}}
                else:
                    merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN8}}
                
                vectorUser.append(merged)

        return Response(vectorUser)

@authentication_classes([ExpiringTokenAuthentication])
class userEstructuraPersonalMision(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        vectorUser = []

        #AÑADIR LOS RESPONSABLES DE LA MISION
        misiones_var = mision.objects.get(id = pk)

        list_user_responsables_M = misiones_var.responsables.all()
        list_user_responsables_M_serializer = customUserSerializer(list_user_responsables_M, many=True)
        member_list_responsables_M = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN5}}, list_user_responsables_M_serializer.data))
        vectorUser = vectorUser + member_list_responsables_M

        list_user_empleados_M = misiones_var.empleados.all()
        list_user_empleados_M_serializer = customUserSerializer(list_user_empleados_M, many=True)
        member_list_empleados_M = list(map(lambda obj: {**obj, **{"ubicacion": varGlobal.rolN6}}, list_user_empleados_M_serializer.data))
        vectorUser = vectorUser + member_list_empleados_M

            
        #AÑADIR LOS EMPLEADOS DE LA SUB MISION
        subMisionSelect = subMision.objects.all().filter(id_mision = misiones_var.id)

        for itemSubMision in subMisionSelect:
            contractuser_owner = contractuser.objects.filter(subMision_id = itemSubMision.id)

            for item in contractuser_owner:
                
                serializer_contract_user_var = customUserSerializer(item.user_id)
                if item.job != None:
                    if item.job.name == "Manager":
                        merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN7}}
                    else:
                        merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN8}}
                else:
                    merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN8}}
                
                vectorUser.append(merged)

        return Response(vectorUser)

@authentication_classes([ExpiringTokenAuthentication])
class userEstructuraPersonalSubMision(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        vectorUser = []

        #AÑADIR LOS EMPLEADOS DE LA SUB MISION
        contractuser_owner = contractuser.objects.filter(subMision_id = pk)

        for item in contractuser_owner:
            
            serializer_contract_user_var = customUserSerializer(item.user_id)
            if item.job != None:
                if item.job.name == "Manager":
                    merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN7}}
                else:
                    merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN8}}
            else:
                merged = {**serializer_contract_user_var.data, **{"ubicacion": varGlobal.rolN8}}
            
            vectorUser.append(merged)

        return Response(vectorUser)
    
@authentication_classes([ExpiringTokenAuthentication])
class misSubMisionesDirectas(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        contractuser_owner = contractuser.objects.filter(user_id = pk)

        subMision_list = list(map(lambda obj: obj.subMision_id, contractuser_owner))

        subMision_list_serializer = subMisionSerializer(subMision_list, many=True)

        return Response(subMision_list_serializer.data)
    
@authentication_classes([ExpiringTokenAuthentication])
class misMisionesDirectas(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        mision_responsables_var = mision.objects.all().filter(responsables=pk)
        mision_empleados_var = mision.objects.all().filter(empleados=pk)

        mision_responsables_var_serializer = misionSerializer(mision_responsables_var, many=True)
        mision_empleados_var_serializer = misionSerializer(mision_empleados_var, many=True)

        merged = mision_responsables_var_serializer.data + mision_empleados_var_serializer.data

        valorFilterUnique = { each['name'] : each for each in merged }.values()

        listItems = list(valorFilterUnique)
        listItems.sort(key=lambda x: x["name"])

        return Response(listItems)

@authentication_classes([ExpiringTokenAuthentication])
class misWPDirectas(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        workPackage_var = workPackage.objects.all().filter(responsableWP = pk)
        workPackage_serializer = workPackageSerializer(workPackage_var, many=True)

        return Response(workPackage_serializer.data)

@authentication_classes([ExpiringTokenAuthentication])
class misDepartamentosDirectas(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        departamento_var = departamento.objects.all().filter(responsableDepartamento = pk)
        departamento_serializer = departamentoSerializer(departamento_var, many=True)

        return Response(departamento_serializer.data)
    
@authentication_classes([ExpiringTokenAuthentication])
class misDireccionDepartamentalDirectas(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        

        direccionDepartamental_var = direccionDepartamental.objects.all().filter(responsablesDD = pk)
        direccionDepartamental_serializer = direccionDepartamentalSerializer(direccionDepartamental_var, many=True)

        return Response(direccionDepartamental_serializer.data)
    
@authentication_classes([ExpiringTokenAuthentication])
class misBloquesDirectosYHeredados(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        vectorContract = []
        vectorMisiones = []
        vectorWp = []
        vectorDepartamento = []
        vectorDireccionDepartamental = []

        customUser_var = customUser.objects.all().filter(id = pk)
        customUser_serializer_var = customUserSerializer(customUser_var, many=True)

        if customUser_serializer_var.data[0]['rolUser'] != varGlobal.rolN1:

            contractuser_var = contractuser.objects.all().filter(user_id = pk)
            

            #ANALISIS DEL ROL DEL USUARIO PARA DEVOLVER LOS DATOS QUE DEBE VER

            #TECNICO
            #TEAM LEADER
            #COORDINADOR DE EQUIPO
            #MANAGER DE AREA
            #COORDINADOR DE AREA
            #RESPONSABLE FUNCION DEPARTAMENTAL
            #DIRECCION DEPARTAMENTAL 

            #VER LAS SUBMISIONES EN LAS CUAL ESTE ASIGNADO => TODOS
            contractUser = list(map(lambda obj: obj.subMision_id.id_mision, contractuser_var))
            listMision_serializer = misionSerializer(contractUser, many=True)
            vectorContract = vectorContract + listMision_serializer.data

            #VER LAS MISIONES AÑADIDOS COMO MANAGER Y COMO EMPLEADO => COORDINADOR DE EQUIPO Y MANAGER DE AREA
            if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN6 or customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN5:
                #AÑADIR MISIONES EN LAS QUE ESTA COMO PROPIETARIO

                mision_responsables_var = mision.objects.all().filter(responsables=pk)
                mision_empleados_var = mision.objects.all().filter(empleados=pk)

                mision_responsables_var_serializer = misionSerializer(mision_responsables_var, many=True)
                mision_empleados_var_serializer = misionSerializer(mision_empleados_var, many=True)

                vectorMisiones = vectorMisiones + mision_responsables_var_serializer.data
                vectorMisiones = vectorMisiones + mision_empleados_var_serializer.data

                subMision_r_var = subMision.objects.filter(id_mision__in=mision_responsables_var)
                subMision_r_serializer = subMisionSerializer(subMision_r_var, many=True)
                vectorContract = vectorContract + subMision_r_serializer.data

                subMision_e_var = subMision.objects.filter(id_mision__in=mision_empleados_var)
                subMision_e_serializer = subMisionSerializer(subMision_e_var, many=True)
                vectorContract = vectorContract + subMision_e_serializer.data

            # VER LOS WORKPACKAGE EN LOS QUE ESTE ASIGNADO => DE COORDINADOR DE AREA(INCLUIDO) HACIA ARRIBA
            if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN4 or customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN3 or customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN2:
                #1. WORK PACKAGE
                workPackage_var = workPackage.objects.all().filter(responsableWP = pk)
                workPackage_serializer = workPackageSerializer(workPackage_var, many=True)

                vectorWp = vectorWp + workPackage_serializer.data
                
                for elementoWP in workPackage_var:
                    misionByWP = mision.objects.all().filter(id_workPackage = elementoWP.id)
                    listMision_serializer = misionSerializer(misionByWP, many=True)
                    vectorMisiones = vectorMisiones + listMision_serializer.data
                
                #2. MISIONES
                
                mision_responsables_var = mision.objects.all().filter(responsables=pk)
                mision_empleados_var = mision.objects.all().filter(empleados=pk)

                mision_responsables_var_serializer = misionSerializer(mision_responsables_var, many=True)
                mision_empleados_var_serializer = misionSerializer(mision_empleados_var, many=True)

                vectorMisiones = vectorMisiones + mision_responsables_var_serializer.data
                vectorMisiones = vectorMisiones + mision_empleados_var_serializer.data

                #3. SUB MISIONES
                subMision_r_var = subMision.objects.filter(id_mision__in=mision_responsables_var)
                subMision_r_serializer = subMisionSerializer(subMision_r_var, many=True)
                vectorContract = vectorContract + subMision_r_serializer.data

                subMision_e_var = subMision.objects.filter(id_mision__in=mision_empleados_var)
                subMision_e_serializer = subMisionSerializer(subMision_e_var, many=True)
                vectorContract = vectorContract + subMision_e_serializer.data

            
            # VERA LOS WORKPACKAGE QUE HEREDEN DE SU DEPARTAMENTO Y ADEMAS LOS WORKPACKAGE, MISIONES Y SUBMISIONES EN LAS QUE ESTE ASIGNADO
            if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN3:
                #Filtra los departamentos en los cuales el usuario esta como responsable
                departamento_var = departamento.objects.all().filter(responsableDepartamento = pk)
                departamento_serializer = departamentoSerializer(departamento_var, many=True)

                vectorDepartamento = vectorDepartamento + departamento_serializer.data

                #Filtra los wp heredados del departamento
                listWP_filter = workPackage.objects.filter(id_departamento__in=departamento_var)
                listWP_serializer = workPackageSerializer(listWP_filter, many=True)

                vectorWp = vectorWp + listWP_serializer.data

                #Filtra las misiones heredadas de los wp
                listMisiones_filter = mision.objects.filter(id_workPackage__in=listWP_filter)
                listMision_serializer = misionSerializer(listMisiones_filter, many=True)
                vectorMisiones = vectorMisiones + listMision_serializer.data

                #Filtrar las submisiones heredadas de las misiones
                subMision_var = subMision.objects.filter(id_mision__in=listMisiones_filter)
                subMision_serializer = subMisionSerializer(subMision_var, many=True)
                vectorContract = vectorContract + subMision_serializer.data
            
            # VERA LOS WORKPACKAGE QUE HEREDEN DE SU DIRECCION DEPARTAMENTAL Y ADEMAS LOS WORKPACKAGE, MISIONES Y SUBMISIONES EN LAS QUE ESTE ASIGNADO
            if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN2:
                #Filtra las direcciones departamentales en los cuales el usuario esta como responsable
                direccionDepartamental_var = direccionDepartamental.objects.all().filter(responsablesDD = pk)
                direccionDepartamental_serializer = direccionDepartamentalSerializer(direccionDepartamental_var, many=True)

                vectorDireccionDepartamental = vectorDireccionDepartamental + direccionDepartamental_serializer.data

                #Filtra los departamentos heredados de la direccion departamental
                listDepartamento_filter = departamento.objects.filter(id_direccion_departamental__in=direccionDepartamental_var)
                departamento_serializer = departamentoSerializer(listDepartamento_filter, many=True)

                vectorDepartamento = vectorDepartamento + departamento_serializer.data

                #Filtra los wp heredados del departamento
                listWP_filter = workPackage.objects.filter(id_departamento__in=listDepartamento_filter)
                listWP_serializer = workPackageSerializer(listWP_filter, many=True)

                vectorWp = vectorWp + listWP_serializer.data

                #Filtra las misiones heredadas de los wp
                listMisiones_filter = mision.objects.filter(id_workPackage__in=listWP_filter)
                listMision_serializer = misionSerializer(listMisiones_filter, many=True)
                vectorMisiones = vectorMisiones + listMision_serializer.data
                
                #Filtrar las submisiones heredadas de las misiones
                subMision_var = subMision.objects.filter(id_mision__in=listMisiones_filter)
                subMision_serializer = subMisionSerializer(subMision_var, many=True)
                vectorContract = vectorContract + subMision_serializer.data

        
        vectorContractFilter = { each['name'] : each for each in vectorContract }.values()
        vectorMisionesFilter = { each['name'] : each for each in vectorMisiones }.values()
        vectorWpFilter = { each['name'] : each for each in vectorWp }.values()
        vectorDepartamentoFilter = { each['name'] : each for each in vectorDepartamento }.values()
        vectorDireccionDepartamentalFilter = { each['name'] : each for each in vectorDireccionDepartamental }.values()

        jsonResultado = {
            "Sub Mision": vectorContractFilter,
            "Mision": vectorMisionesFilter,
            "WP": vectorWpFilter,
            "Departamento": vectorDepartamentoFilter,
            "Direccion Departamental": vectorDireccionDepartamentalFilter,
        }

        return Response(jsonResultado)
    

def GET_PERSONAS_A_MI_CARGO(idUser):
    vectorPerson = []

    customUser_var = customUser.objects.all().filter(id = idUser)
    customUser_serializer_var = customUserSerializer(customUser_var, many=True)

    #TECNICO
    if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN8:
        vectorPerson = []

    #TEAM LEADER
    if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN7:
        contractuser2 = contractuser.objects.all().filter(user_id = idUser)
        contractuser_serializer = contractuserSerializer(contractuser2, many=True)

        contractUserOwner = list(filter(lambda x: "Manager" in x['job_all'], contractuser_serializer.data))

        for itemOwner in contractUserOwner:
            contract_user_empleados = contractuser.objects.all().filter(subMision_id = itemOwner['subMision_id'])
            contract_user_empleados_serializer = contractuserSerializer(contract_user_empleados, many=True)

            for itemPersonaContract in contract_user_empleados_serializer.data:
                customUser_contractUser_var = customUser.objects.get(id = itemPersonaContract['user_id'])
                customUser_contractUser_serializer = customUserSerializer(customUser_contractUser_var)

                vectorPerson.append(customUser_contractUser_serializer.data)


    #COORDINADOR DE EQUIPO
    if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN6:
        mision2_var = mision.objects.all().filter(empleados=idUser)

        subMisionSelect = subMision.objects.all().filter(id_mision__in = mision2_var)

        for itemSM in subMisionSelect:
            contract_user_empleados = contractuser.objects.all().filter(subMision_id = itemSM.id)

            list_user = list(map(lambda obj: obj.user_id, contract_user_empleados))
            list_user_serializer = customUserSerializer(list_user, many=True)

            vectorPerson = vectorPerson + list_user_serializer.data


    #COORDINADOR DE AREA
    if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN5:
        mision2_var = mision.objects.all().filter(responsables=idUser)

        for elementoMision in mision2_var:
            itemPersona = elementoMision.empleados.all()
            customUser_contractUser_serializer = customUserSerializer(itemPersona, many=True)

            vectorPerson = vectorPerson + customUser_contractUser_serializer.data

    #MANAGER DE AREA
    if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN4:
        workPackage_var = workPackage.objects.all().filter(responsableWP = idUser)

        mision2_var = mision.objects.all().filter(id_workPackage__in=workPackage_var)

        for elementoMision in mision2_var:
            itemPersona = elementoMision.empleados.all()
            customUser_contractUser_serializer = customUserSerializer(itemPersona, many=True)

            vectorPerson = vectorPerson + customUser_contractUser_serializer.data



    #RESPONSABLE FUNCION DEPARTAMENTAL
    if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN3:
        #CALCULO DE LA FORMA TRADICIONAL => Es decir bajando
        departamento_var = departamento.objects.all().filter(responsableDepartamento = idUser)

        workPackage_var = workPackage.objects.all().filter(id_departamento__in = departamento_var)

        for elementoWP in workPackage_var:
            itemPersona = elementoWP.responsableWP.all()
            customUser_contractUser_serializer = customUserSerializer(itemPersona, many=True)

            vectorPerson = vectorPerson + customUser_contractUser_serializer.data

        #Elimina las personas que son el mismo ya que puede haber simil de estructura
        vectorResultado = [x for x in vectorPerson if x['id'] != idUser]
        if len(vectorResultado) == 0:
            #En caso de no haber nadie bajamos un nivel para obtener ese personal
            mision2_var = mision.objects.all().filter(id_workPackage__in=workPackage_var)

            for elementoMision in mision2_var:
                itemPersona = elementoMision.empleados.all()
                customUser_contractUser_serializer = customUserSerializer(itemPersona, many=True)

                vectorPerson = vectorPerson + customUser_contractUser_serializer.data

            vectorResultado = [x for x in vectorPerson if x['id'] != idUser]
            if len(vectorResultado) == 0:
                subMisionSelect = subMision.objects.all().filter(id_mision__in = mision2_var)

                for itemSM in subMisionSelect:
                    contract_user_empleados = contractuser.objects.all().filter(subMision_id = itemSM.id)

                    list_user = list(map(lambda obj: obj.user_id, contract_user_empleados))
                    list_user_serializer = customUserSerializer(list_user, many=True)

                    vectorPerson = vectorPerson + list_user_serializer.data


    #DIRECCION DEPARTAMENTAL 
    if customUser_serializer_var.data[0]['rolUser'] == varGlobal.rolN2:
        direccionDepartamental_var = direccionDepartamental.objects.all().filter(responsablesDD = idUser)

        departamento_var = departamento.objects.all().filter(id_direccion_departamental__in = direccionDepartamental_var)

        for elementoDD in departamento_var:
            itemPersona = elementoDD.responsableDepartamento.all()
            customUser_contractUser_serializer = customUserSerializer(itemPersona, many=True)

            vectorPerson = vectorPerson + customUser_contractUser_serializer.data

    # Eliminar duplicados por la propiedad "id"
    output_dict = list({v["id"]: v for v in vectorPerson}.values())
    
    # Ordenar por la propiedad "first_name"
    vector_ordenado = sorted(output_dict, key=operator.itemgetter("first_name"))


    return vector_ordenado