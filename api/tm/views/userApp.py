from tm import varGlobal
from tm.models import userApp
from tm.serializers import userAppSerializer
from tm.serializers import userAppPostSerializer
from tm import varGlobal
from tm.models import contractuser
from tm.serializers import customUserSerializer
from tm.serializers import contractuserSerializer
from tm.serializers import contractuserExtraSerializer
from tm import varGlobal
from tm.models import customUser
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm import varGlobal
from tm.models import mision
from tm.serializers import misionSerializer
from tm.serializers import misionPostSerializer
from tm import varGlobal
from tm.models import subMision
from tm.serializers import subMisionSerializer
from tm.serializers import subMisionPostSerializer
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
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes
from tm.views import *
from tm.models import *
from tm.serializers import *
from tm.views.aplication import comparacionValores
import datetime
from datetime import date

@authentication_classes([ExpiringTokenAuthentication])
class userAppList(APIView):
    """
    Lista todas las divisiones o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        division_var = userApp.objects.all()
        serializer_var = userAppSerializer(division_var, many=True)
        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = userAppPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class userAppListDetail(APIView):  
    """
    Elimina o edita divisiones específicas
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return userApp.objects.get(pk=pk)
        except userApp.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        userApp = self.get_object(pk)
        serializer = userAppSerializer(userApp)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        userApp = self.get_object(pk)
        serializer = userAppPostSerializer(userApp, data=request.data)
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
        
        userApp = self.get_object(pk)
        userApp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class userAppByUser(APIView):
    """
    Lista todas las divisiones o crea nuevas
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        division_var = userApp.objects.all().filter(user_id = pk)#.order_by('aplication_user_type', 'aplication_user_id_code')
        serializer_var = userAppSerializer(division_var, many=True)
        serializer_var.data.sort(key=lambda x: x["aplication_user_type"])
        serializer_var.data.sort(key=lambda x: x["aplication_user_id_code"])
        return Response(serializer_var.data)

@authentication_classes([ExpiringTokenAuthentication])
class faltanUserAppByTeam(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return userApp.objects.get(pk=pk)
        except userApp.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS

        return Response([])


def FUNCION_BUSCA_LISTADO_ELEMENTOS_BLOQUE(contratos_bloque, usuario):
    vector_vuelta = []
    aplication_select = aplication.objects.get(id = contratos_bloque.aplication_app_id.id)
    userApp_var = userApp.objects.all().filter(user_id = usuario['id'], aplication_user_id = aplication_select.id)
    userApp_serializer = userAppSerializer(userApp_var, many=True)
    if len(userApp_serializer.data) != 0:
        #TIENE LA APP
        #AHORA DEBEMOS VER SI TIENE VALORES EXTRAS
        if aplication_select.tipo_valor == None:
            #NO TIENE VALORES EXTRAS
            vector_vuelta = POST_VECTOR_CUMPLIMIENTO(vector_vuelta, aplication_select, True, "")
        else:
            requerimiento_user_select = userApp_serializer.data[0]
            #TIENE VALORES EXTRAS
            cumple_condiciones = COMPROBAR_REQUISITO_CON_VALORES_EXTRAS(aplication_select, requerimiento_user_select, contratos_bloque)

            if cumple_condiciones == True:
                vector_vuelta = POST_VECTOR_CUMPLIMIENTO(vector_vuelta, aplication_select, True, "")
            else:
                vector_vuelta = POST_VECTOR_CUMPLIMIENTO(vector_vuelta, aplication_select, False, True)
    else:
        #NO TIENE LA APP
        vector_vuelta = POST_VECTOR_CUMPLIMIENTO(vector_vuelta, aplication_select, False, False)

    return vector_vuelta
            

def OBTENER_RESULTADOS_PERSONA_WITH_BLOQUE_PREDEF(list_people):

    list_result_by_person = []

    for itemUser in list_people:
        #PARA TODOS LOS USUARIOS
        contractuser_var = contractuser.objects.all().filter(user_id = itemUser['id'])

        list_detalles_user_por_contratos = []

        for itemContractUser in contractuser_var:
            list_detalles_contratos = []

            contract_app = contractApp.objects.all().filter(subMision_id = itemContractUser.subMision_id.id, job = itemContractUser.job.id)

            for itemCA in contract_app:
                resultado = FUNCION_BUSCA_LISTADO_ELEMENTOS_BLOQUE(itemCA, itemUser)
                list_detalles_contratos = list_detalles_contratos + resultado

            list_detalles_user_por_contratos.append({
                "user": itemUser['email'],
                "bloque": itemContractUser.subMision_id.name,
                "data": list_detalles_contratos,
                "correspondencia": "Sub Mision"
            })

        listItems = []
        #COORDINADOR DE EQUIPO OR COORDINADOR DE AREA
        if itemUser['rolUser'] != varGlobal.rolN7 and itemUser['rolUser'] != varGlobal.rolN8:

            #GET ALL MISION DONDE ESTAN LOS USUARIOS
            mision_responsables_var = mision.objects.all().filter(responsables=itemUser['id'])
            mision_empleados_var = mision.objects.all().filter(empleados=itemUser['id'])

            mision_responsables_var_serializer = misionSerializer(mision_responsables_var, many=True)
            mision_empleados_var_serializer = misionSerializer(mision_empleados_var, many=True)

            merged = mision_responsables_var_serializer.data + mision_empleados_var_serializer.data

            valorFilterUnique = { each['name'] : each for each in merged }.values()

            listItems = list(valorFilterUnique)
            
            #RECORRIDO DE MISIONES
            for itemMision in listItems:
                list_detalles_contratos = []
                #OBTENCION DE LAS MISION APP DE LA MISION
                mision_app = misionApp.objects.all().filter(mision_id = itemMision['id'])

                #COMPROBACION DE MISION APP CON RESPECTO AL USUARIO
                for itemCA in mision_app:
                    resultado = FUNCION_BUSCA_LISTADO_ELEMENTOS_BLOQUE(itemCA, itemUser)
                    list_detalles_contratos = list_detalles_contratos + resultado
                
                #AÑADIR ITEMS AL RESULTADO
                list_detalles_user_por_contratos.append({
                    "user": itemUser['email'],
                    "bloque": itemMision['name'],
                    "data": list_detalles_contratos,
                    "correspondencia": "Mision"
                })

        #MANAGER DE AREA
        if itemUser['rolUser'] != varGlobal.rolN5 and itemUser['rolUser'] != varGlobal.rolN6 and itemUser['rolUser'] != varGlobal.rolN7 and itemUser['rolUser'] != varGlobal.rolN8:
            #GET ALL WP DONDE ESTAN LOS USUARIOS
            workPackage_var = workPackage.objects.all().filter(responsableWP = itemUser['id'])
            
            #RECORRIDO DE MISIONES
            for itemWP in workPackage_var:
                list_detalles_contratos = []
                #OBTENCION DE LAS WORKPACKAGE APP DEL WP
                wp_app = wpApp.objects.all().filter(workPackage_id = itemWP.id)

                #COMPROBACION DE WORKPACKAGE APP CON RESPECTO AL USUARIO
                for itemCA in wp_app:
                    resultado = FUNCION_BUSCA_LISTADO_ELEMENTOS_BLOQUE(itemCA, itemUser)
                    list_detalles_contratos = list_detalles_contratos + resultado
                
                #AÑADIR ITEMS AL RESULTADO
                correspondenciaWP = "Work Package"

                list_detalles_user_por_contratos.append({
                    "user": itemUser['email'],
                    "bloque": itemWP.name,
                    "data": list_detalles_contratos,
                    "correspondencia": correspondenciaWP
                })

                

        #RESPONSABLE FUNCION DEPARTAMENTAL
        if itemUser['rolUser'] == varGlobal.rolN1 or itemUser['rolUser'] == varGlobal.rolN2 or itemUser['rolUser'] == varGlobal.rolN3:
            departamento_var = departamento.objects.all().filter(responsableDepartamento = itemUser['id'])

            #RECORRIDO DE DEPARTAMENTOS
            for itemDepartamento in departamento_var:
                list_detalles_contratos = []
                #OBTENCION DE LAS WORKPACKAGE APP DEL WP
                departament_app = departamentoApp.objects.all().filter(departamento_id = itemDepartamento.id)

                #COMPROBACION DE WORKPACKAGE APP CON RESPECTO AL USUARIO
                for itemCA in departament_app:
                    resultado = FUNCION_BUSCA_LISTADO_ELEMENTOS_BLOQUE(itemCA, itemUser)
                    list_detalles_contratos = list_detalles_contratos + resultado
                
                #AÑADIR ITEMS AL RESULTADO
                list_detalles_user_por_contratos.append({
                    "user": itemUser['email'],
                    "bloque": itemDepartamento.name,
                    "data": list_detalles_contratos,
                    "correspondencia": "Department"
                })

        #DIRECCION DEPARTAMENTAL 
        if itemUser['rolUser'] == varGlobal.rolN1 or itemUser['rolUser'] == varGlobal.rolN2:
            direccionDepartamental_var = direccionDepartamental.objects.all().filter(responsablesDD = itemUser['id'])

            #RECORRIDO DE DIRECCIONES DEPARTAMENTALES
            for itemDD in direccionDepartamental_var:
                list_detalles_contratos = []
                #OBTENCION DE LAS WORKPACKAGE APP DEL WP
                departament_app = direccionDepartamentalApp.objects.all().filter(direccionDepartamental_id = itemDD.id)

                #COMPROBACION DE WORKPACKAGE APP CON RESPECTO AL USUARIO
                for itemCA in departament_app:
                    resultado = FUNCION_BUSCA_LISTADO_ELEMENTOS_BLOQUE(itemCA, itemUser)
                    list_detalles_contratos = list_detalles_contratos + resultado
                
                #AÑADIR ITEMS AL RESULTADO
                list_detalles_user_por_contratos.append({
                    "user": itemUser['email'],
                    "bloque": itemDD.name,
                    "data": list_detalles_contratos,
                    "correspondencia": "Departmental Directorate"
                })
        
        '''list_result_by_person.append({
            "user": itemUser['email'],
            "dataUser": list_detalles_user_por_contratos
        })'''
        list_result_by_person = list_result_by_person + list_detalles_user_por_contratos

    return list_result_by_person


def COMPROBAR_REQUISITO_CON_VALORES_EXTRAS(aplicacion, requerimientos_user, requerimientos_bloque):
    cumple_condiciones = False
    #TIPO LISTA
    if aplicacion.tipo_valor == "List":
        elementosList = aplicacion.listado_opciones.split(',')
        indiceUsuario = elementosList.index(requerimientos_user['valor_asignado'])
        indiceSolicitado = elementosList.index(requerimientos_bloque.valor_asignado)
        resultado = comparacionValores(requerimientos_bloque.operacion_logica, indiceUsuario, indiceSolicitado)
        if resultado == True:
            cumple_condiciones = True
    #TIPO DATE
    if aplicacion.tipo_valor == "Date":
        nDias = int(requerimientos_bloque.diferencia_fecha)
        fechaHoy = date.today()
        fecha_valida = fechaHoy - datetime.timedelta(days=nDias)
        if fecha_valida >= requerimientos_user['valor_asignado_fecha']:
            cumple_condiciones = True
    #TIPO NUMBER
    if aplicacion.tipo_valor == "Number":
        valor_usuario = requerimientos_user['valor_comparacion']
        valor_solicitado = requerimientos_bloque.valor_comparacion
        resultado = comparacionValores(requerimientos_bloque.operacion_logica, valor_usuario, valor_solicitado)
        if resultado == True:
            cumple_condiciones = True
    
    return cumple_condiciones

def POST_VECTOR_CUMPLIMIENTO(vector, aplicacion, valor1, valor2):
    vector.append({
        "aplication_type": aplicacion.type,
        "aplication_tiene_valor": aplicacion.tiene_valor,
        "aplication_tipo_valor": aplicacion.tipo_valor,
        "aplication_name": aplicacion.name,
        "aplication_code": aplicacion.code,
        "cumplimiento": valor1,
        "cumplimientoSinValorExtra": valor2
    })

    return vector