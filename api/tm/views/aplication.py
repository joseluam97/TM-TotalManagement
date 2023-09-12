from tm import varGlobal
from tm.models import aplication
from tm.serializers import aplicationSerializer
from tm.serializers import aplicationPostSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

from tm.models import *
from tm.serializers import *
import datetime
from datetime import date

@authentication_classes([ExpiringTokenAuthentication])
class aplicationList(APIView):
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
        
        division_var = aplication.objects.all().order_by('type')
        serializer_var = aplicationSerializer(division_var, many=True)
        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = aplicationPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)

@authentication_classes([ExpiringTokenAuthentication])
class aplicationListDetail(APIView):  
    """
    Elimina o edita divisiones específicas
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return aplication.objects.get(pk=pk)
        except aplication.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        aplication = self.get_object(pk)
        serializer = aplicationSerializer(aplication)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        aplication = self.get_object(pk)
        serializer = aplicationPostSerializer(aplication, data=request.data)
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
        
        aplication = self.get_object(pk)
        aplication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class aplicationListCategories(APIView):
    """
    Lista todos los categorizacions o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    #OBTENER TODAS LAS CATEGORIAS UNICAS DE LAS CATEGORIAS
    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        categorizacion_var = aplication.objects.all().order_by('type')
        serializer_var = aplicationSerializer(categorizacion_var, many=True)

        vectorCategoriasUnicas = []

        for numero in serializer_var.data:
            vectorCategoriasUnicas.append(numero['type']) 

        valores_unicos = []
        for valor in vectorCategoriasUnicas:
            if valor not in valores_unicos:
                valores_unicos.append(valor)

        valores_unicos.sort()

        return Response(valores_unicos)
    

@authentication_classes([ExpiringTokenAuthentication])
class aplicationCheckItemList(APIView):
    """
    Lista todos los categorizacions o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    #OBTENER TODAS LAS CATEGORIAS UNICAS DE LAS CATEGORIAS
    def post(self, request, pk, format=None):
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS

        nameItem = request.data['nameItem']

        #COMPROBACION SI ALGUN USUARIO LA TIENE
        user_app_var = userApp.objects.all().filter(aplication_user_id = pk, valor_asignado = nameItem)

        #COMPROBACION SI ALGUN CONTRACT APP(SUB MISION) LA TIENE
        contract_app_var = contractApp.objects.all().filter(aplication_app_id = pk, valor_asignado = nameItem)

        #COMPROBACION SI ALGUNA MISION LA TIENE
        mision_app_var = misionApp.objects.all().filter(aplication_app_id = pk, valor_asignado = nameItem)

        #COMPROBACION SI ALGUNA WP LA TIENE
        wp_app_var = wpApp.objects.all().filter(aplication_app_id = pk, valor_asignado = nameItem)

        #COMPROBACION SI ALGUN DEPARTAMENTO LA TIENE
        departamento_app_var = departamentoApp.objects.all().filter(aplication_app_id = pk, valor_asignado = nameItem)

        #COMPROBACION SI ALGUNA DIRECCION DEPARTAMENTAL LA TIENE
        direccion_departamental_app_var = direccionDepartamentalApp.objects.all().filter(aplication_app_id = pk, valor_asignado = nameItem)

        if len(user_app_var) != 0 or len(contract_app_var) != 0 or len(mision_app_var) != 0 or len(wp_app_var) != 0 or len(departamento_app_var) != 0 or len(direccion_departamental_app_var) != 0:
            return Response("false")
        else:
            return Response("true")

@authentication_classes([ExpiringTokenAuthentication])
class usuariosByRequeriments(APIView):
    """
    Lista todos los categorizacions o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    #OBTENER TODAS LAS CATEGORIAS UNICAS DE LAS CATEGORIAS
    def post(self, request, format=None):
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS

        vectorResultado = []
        listRequeriments = request.data['listRequeriments']

        totalRequerimientosSolicitados = len(listRequeriments)


        customUser_var = customUser.objects.all().filter(is_active = True)
        serializer_var = customUserSerializer(customUser_var, many=True)

        for itemUser in customUser_var:
            itemUser_serializer = customUserSerializer(itemUser)
            contadorCoincidencias = 0
            for itemRequeriment in listRequeriments:
                user_requeriments = userApp.objects.all().filter(user_id = itemUser.id, aplication_user_id = itemRequeriment['id'])
                user_requeriments_serializer = userAppSerializer(user_requeriments, many=True)

                if len(user_requeriments_serializer.data) != 0:
                    requerimiento_user_select = user_requeriments[0]
                    #SI TIENE EL REQUERIMIENTO COMPROBAMOS DE QUE TIPO ES
                    if itemRequeriment['tipo_valor'] == "" or itemRequeriment['tipo_valor'] == None:
                        contadorCoincidencias = contadorCoincidencias + 1
                    else:
                        #TIPO LISTA
                        if itemRequeriment['tipo_valor'] == "List":
                            elementosList = itemRequeriment['listado_opciones'].split(',')
                            indiceUsuario = elementosList.index(requerimiento_user_select.valor_asignado)
                            indiceSolicitado = elementosList.index(itemRequeriment['valor_asignado'])

                            resultado = comparacionValores(itemRequeriment['operacion_logica'], indiceUsuario, indiceSolicitado)

                            if resultado == True:
                                contadorCoincidencias = contadorCoincidencias + 1

                        #TIPO DATE
                        if itemRequeriment['tipo_valor'] == "Date":
                            nDias = int(itemRequeriment['diferencia_fecha'])
                            fechaHoy = date.today()
                            fecha_valida = fechaHoy - datetime.timedelta(days=nDias)

                            if fecha_valida >= requerimiento_user_select.valor_asignado_fecha:
                                contadorCoincidencias = contadorCoincidencias + 1

                        #TIPO NUMBER
                        if itemRequeriment['tipo_valor'] == "Number":
                            valor_usuario = requerimiento_user_select.valor_comparacion
                            valor_solicitado = itemRequeriment['valor_comparacion']
                            resultado = comparacionValores(itemRequeriment['operacion_logica'], valor_usuario, valor_solicitado)

                            if resultado == True:
                                contadorCoincidencias = contadorCoincidencias + 1
            
            porcentaje = contadorCoincidencias/totalRequerimientosSolicitados*100

            nameUser = itemUser_serializer.data['first_name'] + " " + itemUser_serializer.data['last_name']
            idUser = itemUser_serializer.data['id']
            IDResUser = itemUser_serializer.data['IDidentification']
            jsonNRisk = {"id": idUser, "IDidentification": IDResUser, "name": nameUser, "porcentaje": porcentaje, "coincidencias": contadorCoincidencias}
            #merged = {**itemUser_serializer.data, **jsonNRisk}

            vectorResultado.append(jsonNRisk)

        listItems = list(vectorResultado)
        listItems.sort(key=lambda x: x["coincidencias"], reverse=True)
        #listItems.sort(key=lambda x: x["porcentaje"])

        return Response(listItems)
    

def comparacionValores(comparador, item1, item2):
    if comparador == 1:
        if item1 < item2:
            return True
        else:
            return False
        
    if comparador == 2:
        if item1 <= item2:
            return True
        else:
            return False
    
    if comparador == 3:
        if item1 == item2:
            return True
        else:
            return False
        
    if comparador == 4:
        if item1 >= item2:
            return True
        else:
            return False
    
    if comparador == 5:
        if item1 > item2:
            return True
        else:
            return False
        
    if comparador == 6:
        if item1 != item2:
            return True
        else:
            return False