from tm import varGlobal
from tm.models import dataKPI
from tm.serializers import dataKPISerializer
from tm.serializers import dataKPIPostSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm.models import mision
from tm.serializers import misionSerializer
from tm.serializers import misionPostSerializer
from tm.models import kpi
from tm.serializers import kpiSerializer
from tm.serializers import kpiPostSerializer
from datetime import datetime
from tm.views.gestionAccesoApi import funcion_gestion_accesos
from .authenticationToken import ExpiringTokenAuthentication
from tm.models import categorizacion
from tm.serializers import categorizacionSerializer
from tm.models import *
from rest_framework.decorators import authentication_classes
from tm.models import customUser
from tm.serializers import customUserSerializer

import io
from openpyxl import Workbook
from django.core.files.base import ContentFile
import json

@authentication_classes([ExpiringTokenAuthentication])
class dataKPIList(APIView):
    """
    Lista todos los dataKPIs o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        dataKPI_var = dataKPI.objects.all()
        serializer_var = dataKPISerializer(dataKPI_var, many=True)
        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = dataKPIPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([ExpiringTokenAuthentication])
class dataKPIListDetail(APIView):  
    """
    Elimina o edita dataKPIs específicos
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return dataKPI.objects.get(pk=pk)
        except dataKPI.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        dataKPI = self.get_object(pk)
        serializer = dataKPISerializer(dataKPI)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        dataKPI = self.get_object(pk)
        serializer = dataKPIPostSerializer(dataKPI, data=request.data)
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
        
        dataKPI = self.get_object(pk)
        dataKPI.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@authentication_classes([ExpiringTokenAuthentication])
class dataKPIListByYear(APIView):  
    """
    Obtiene los kpis de las misiones habilitados por persona
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        dataKPI_var = dataKPI.objects.all().filter(ano = pk)
        serializer_var = dataKPISerializer(dataKPI_var, many=True)

        vectJson = []
        #list(map(lambda x: {**x, "key4": categorizacion.objects.get(id=x.categorizacionNOTD).titulo}, serializer_var.data))
        
        for itemKPI in dataKPI_var:
            kpi_serializer = dataKPISerializer(itemKPI)
            jsonNew = {}

            if itemKPI.objetivoTiempoCumplido == False:
                if itemKPI.categorizacionNOTD != None:
                    jsonNew = {**jsonNew, **{"textoNOTD": str(itemKPI.categorizacionNOTD.titulo) + ": " + itemKPI.razon_atraso}}
                else:
                    jsonNew = {**jsonNew, **{"textoNOTD": "None" + ": " + itemKPI.razon_atraso}}
            else:
                jsonNew = {**jsonNew, **{"textoNOTD": ""}}
            
            if itemKPI.objetivoCumplido == False:
                if itemKPI.categorizacionNOQD != None:
                    jsonNew = {**jsonNew, **{"textoNOQD": str(itemKPI.categorizacionNOQD.titulo) + ": " + itemKPI.razon_calidad}}
                else:
                    jsonNew = {**jsonNew, **{"textoNOQD": "None" + ": " + itemKPI.razon_calidad}}
            else:
                jsonNew = {**jsonNew, **{"textoNOQD": ""}}

            vectJson.append({**kpi_serializer.data, **jsonNew})

        return Response(vectJson)

@authentication_classes([ExpiringTokenAuthentication])
class dataKPIGraficoBykpiOQD(APIView):  
    """
    Obtiene los kpis de las misiones habilitados por persona
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        vectorResultado = []
        year = request.data['anoSelect']

        kpi_var = kpi.objects.get(id=pk, active = True)

        vectorMesesEntregas = kpi_var.meses_afectados.split(',')

        vectorTitulo = []
        vectorTitulo.append("Performance")
        vectorTitulo.append("Data")
        vectorTitulo.append("Target")

        vectorEntregas = []
        
        vectorResultado.append(vectorTitulo)
        
        #if kpi_var.tipoFrecuencia != "weekly" and kpi_var.tipoFrecuencia != "custom":
        for itemNumEntrega in range(kpi_var.frecuencia):
            dataKPI_var = dataKPI.objects.all().filter(id_kpi= kpi_var.id,ordenGlobalDato = itemNumEntrega+1, ano = year)

            #vectorEntregas.append("Entrega " + str(itemNumEntrega+1))
            indice = itemNumEntrega/kpi_var.frecuenciaMensual

            if kpi_var.tipoFrecuencia != "weekly":
                if kpi_var.frecuenciaMensual != 1:
                    if itemNumEntrega % 2 == 0:
                        indiceMensual = "1"
                    else:
                        indiceMensual = "2"

                    vectorEntregas.append(vectorMesesEntregas[int(indice)] + " - " + indiceMensual)
                else:
                    vectorEntregas.append(vectorMesesEntregas[int(indice)])
            else:
                vectorEntregas.append("Week " + str(itemNumEntrega+1))

            if len(dataKPI_var) != 0:
                vectorEntregas.append(dataKPI_var[0].resultado)
                vectorEntregas.append(dataKPI_var[0].objetivoData)
            else:
                vectorEntregas.append(0)
                vectorEntregas.append(kpi_var.objetivo)
            
            vectorResultado.append(vectorEntregas)
            vectorEntregas = []

            

        return Response(vectorResultado)
    
@authentication_classes([ExpiringTokenAuthentication])
class dataKPIGraficoBykpiOTD(APIView):  
    """
    Obtiene los kpis de las misiones habilitados por persona
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        vectorResultado = []
        year = request.data['anoSelect']

        kpi_var = kpi.objects.get(id=pk, active = True)

        vectorMesesEntregas = kpi_var.meses_afectados.split(',')

        vectorTitulo = []
        vectorTitulo.append("Performance")
        vectorTitulo.append("Data")

        vectorEntregas = []
        
        vectorResultado.append(vectorTitulo)

        #if kpi_var.tipoFrecuencia != "weekly" and kpi_var.tipoFrecuencia != "custom":
        for itemNumEntrega in range(kpi_var.frecuencia):
            dataKPI_var = dataKPI.objects.all().filter(id_kpi= kpi_var.id,ordenGlobalDato = itemNumEntrega+1, ano = year)

            #vectorEntregas.append("Entrega " + str(itemNumEntrega+1))
            indice = itemNumEntrega/kpi_var.frecuenciaMensual

            if kpi_var.tipoFrecuencia != "weekly":
                if kpi_var.frecuenciaMensual != 1:
                    if itemNumEntrega % 2 == 0:
                        indiceMensual = "1"
                    else:
                        indiceMensual = "2"

                    vectorEntregas.append(vectorMesesEntregas[int(indice)] + " - " + indiceMensual)
                else:
                    vectorEntregas.append(vectorMesesEntregas[int(indice)])
            else:
                vectorEntregas.append("Week " + str(itemNumEntrega+1))

            if len(dataKPI_var) != 0:
                fechaTeorica = dataKPI_var[0].fechaTeoricaRegistro
                fechaRegistro = dataKPI_var[0].fechaRegistro
                diferencia = fechaTeorica-fechaRegistro

                vectorEntregas.append(diferencia.days)
            else:
                vectorEntregas.append(0)
            
            vectorResultado.append(vectorEntregas)
            vectorEntregas = []

            

        return Response(vectorResultado)

@authentication_classes([ExpiringTokenAuthentication])
class dataKPIGraficosOQD(APIView):  
    """
    Obtiene los kpis de las misiones habilitados por persona
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        vectorAllKPI = []
        year = request.data['anoSelect']
        kpi_var = kpi.objects.all().filter(mision = pk, active= True)

        for itemKPI in kpi_var:
            vectorResultado = []

            vectorMesesEntregas = itemKPI.meses_afectados.split(',')

            vectorTitulo = []
            vectorTitulo.append("Performance")
            vectorTitulo.append("Data")
            vectorTitulo.append("Target")

            vectorEntregas = []
            
            vectorResultado.append(vectorTitulo)

            #if kpi_var.tipoFrecuencia != "weekly" and kpi_var.tipoFrecuencia != "custom":
            for itemNumEntrega in range(itemKPI.frecuencia):
                dataKPI_var = dataKPI.objects.all().filter(id_kpi= itemKPI.id,ordenGlobalDato = itemNumEntrega+1, ano = year)

                #vectorEntregas.append("Entrega " + str(itemNumEntrega+1))
                indice = itemNumEntrega/itemKPI.frecuenciaMensual

                if itemKPI.tipoFrecuencia != "weekly":
                    if itemKPI.frecuenciaMensual != 1:
                        if itemNumEntrega % 2 == 0:
                            indiceMensual = "1"
                        else:
                            indiceMensual = "2"

                        vectorEntregas.append(vectorMesesEntregas[int(indice)] + " - " + indiceMensual)
                    else:
                        vectorEntregas.append(vectorMesesEntregas[int(indice)])
                else:
                    vectorEntregas.append("Week " + str(itemNumEntrega+1))

                if len(dataKPI_var) != 0:
                    vectorEntregas.append(dataKPI_var[0].resultado)
                    vectorEntregas.append(dataKPI_var[0].objetivoData)
                else:
                    vectorEntregas.append(0)
                    vectorEntregas.append(itemKPI.objetivo)
                
                vectorResultado.append(vectorEntregas)
                
                vectorEntregas = []

            vectorAllKPI.append({"titulo": itemKPI.titulo, "codigo": itemKPI.codigo, "data": vectorResultado})

        return Response(vectorAllKPI)
    
@authentication_classes([ExpiringTokenAuthentication])
class dataKPIGraficosOTD(APIView):  
    """
    Obtiene los kpis de las misiones habilitados por persona
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        vectorAllKPI = []
        year = request.data['anoSelect']
        kpi_var = kpi.objects.all().filter(mision = pk, active= True)

        for itemKPI in kpi_var:
            vectorResultado = []

            vectorMesesEntregas = itemKPI.meses_afectados.split(',')

            vectorTitulo = []
            vectorTitulo.append("Performance")
            vectorTitulo.append("Data")

            vectorEntregas = []
            
            vectorResultado.append(vectorTitulo)

            for itemNumEntrega in range(itemKPI.frecuencia):
                dataKPI_var = dataKPI.objects.all().filter(id_kpi= itemKPI.id,ordenGlobalDato = itemNumEntrega+1, ano = year)

                #vectorEntregas.append("Entrega " + str(itemNumEntrega+1))
                indice = itemNumEntrega/itemKPI.frecuenciaMensual

                if itemKPI.tipoFrecuencia != "weekly":
                    if itemKPI.frecuenciaMensual != 1:
                        if itemNumEntrega % 2 == 0:
                            indiceMensual = "1"
                        else:
                            indiceMensual = "2"

                        vectorEntregas.append(vectorMesesEntregas[int(indice)] + " - " + indiceMensual)
                    else:
                        vectorEntregas.append(vectorMesesEntregas[int(indice)])

                else:
                    vectorEntregas.append("Week " + str(itemNumEntrega+1))

                if len(dataKPI_var) != 0:
                    fechaTeorica = dataKPI_var[0].fechaTeoricaRegistro
                    fechaRegistro = dataKPI_var[0].fechaRegistro
                    diferencia = fechaTeorica-fechaRegistro

                    vectorEntregas.append(diferencia.days)
                else:
                    vectorEntregas.append(0)
                
                vectorResultado.append(vectorEntregas)

                vectorEntregas = []
            
            vectorAllKPI.append({"titulo": itemKPI.titulo, "codigo": itemKPI.codigo, "data": vectorResultado})

        return Response(vectorAllKPI)

@authentication_classes([ExpiringTokenAuthentication])
class dataKPIExportData(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        vectorAllKPI = []
        userSolicita = request.data['userSolicita']
        misionSelect = request.data['misionSelect']
        kpiSelect = request.data['kpiSelect']
        anoSelect = request.data['anoSelect']

        if kpiSelect == "":
            kpi_var = kpi.objects.all().filter(mision = misionSelect, active= True)

            wb = Workbook()
            ws = wb.active

            for itemKPI in kpi_var:

                if itemKPI.tipoFrecuencia != "weekly":
                    dataKPI_var = dataKPI.objects.all().filter(id_kpi = itemKPI.id, ano = anoSelect).values("id", "mes_tratado", "ordenMensual", "objetivoData", "resultado", "objetivoCumplido", "razon_calidad", "fechaRegistro", "objetivoTiempoCumplido", "razon_atraso", "observations")                                
                else:
                    dataKPI_var = dataKPI.objects.all().filter(id_kpi = itemKPI.id, ano = anoSelect).values("id", "week", "objetivoData", "resultado", "objetivoCumplido", "razon_calidad", "fechaRegistro", "objetivoTiempoCumplido", "razon_atraso", "observations")
                
                if len(dataKPI_var) != 0:
                    
                    ws.append([])
                    ws.append([itemKPI.codigo, itemKPI.titulo])

                    if itemKPI.tipoFrecuencia != "weekly":
                        ws.append(['ID', 'MONTH', 'DELIVERY NUMBER OF THE MONTH', 'GOAL', 'RESULT', 'GOAL ACCOMPLISHED', 'RAZON NOQD', 'DELIVERY DATE', 'DELIVERY ON DATE', 'RAZON NOTD', 'COMMENTS'])
                    else:
                        ws.append(['ID', 'WEEK', 'GOAL', 'RESULT', 'GOAL ACCOMPLISHED', 'RAZON NOQD', 'DELIVERY DATE', 'DELIVERY ON DATE', 'RAZON NOTD', 'COMMENTS'])

                    for row in dataKPI_var:
                        vector = list(row.values())
                        ws.append(vector)
        
        #SE HA SELECCIONADO UN KPI ESPECIFICO
        else:

            kpi_var = kpi.objects.get(id = kpiSelect)

            if kpi_var.tipoFrecuencia != "weekly":
                dataKPI_var = dataKPI.objects.all().filter(id_kpi = kpi_var.id, ano = anoSelect).values("id", "mes_tratado", "ordenMensual", "objetivoData", "resultado", "objetivoCumplido", "razon_calidad", "fechaRegistro", "objetivoTiempoCumplido", "razon_atraso", "observations")                                
            else:
                dataKPI_var = dataKPI.objects.all().filter(id_kpi = kpi_var.id, ano = anoSelect).values("id", "week", "objetivoData", "resultado", "objetivoCumplido", "razon_calidad", "fechaRegistro", "objetivoTiempoCumplido", "razon_atraso", "observations")
                
            wb = Workbook()
            ws = wb.active

            ws.append([kpi_var.codigo, kpi_var.titulo])

            if kpi_var.tipoFrecuencia != "weekly":
                ws.append(['ID', 'MONTH', 'DELIVERY NUMBER OF THE MONTH', 'GOAL', 'RESULT', 'GOAL ACCOMPLISHED', 'RAZON NOQD', 'DELIVERY DATE', 'DELIVERY ON DATE', 'RAZON NOTD', 'COMMENTS'])
            else:
                ws.append(['ID', 'WEEK', 'GOAL', 'RESULT', 'GOAL ACCOMPLISHED', 'RAZON NOQD', 'DELIVERY DATE', 'DELIVERY ON DATE', 'RAZON NOTD', 'COMMENTS'])

            for row in dataKPI_var:
                vector = list(row.values())
                ws.append(vector)

        buffer = io.BytesIO()
        wb.save(buffer)

        content_file = ContentFile(buffer.getvalue())

        customUser_var = customUser.objects.get(id = userSolicita)
            
        notification = notifications(
            origen_notification_id = customUser_var,
            destino_notification_id = customUser_var,
            fecha = datetime.now(),
            typeNotification = "document",
            #Exportacion exitosa
            observations = "",
            active = True
        )

        notification.archivo.save('nombre_archivo.xlsx', content_file, save=True)

        notification.save()


        return Response(vectorAllKPI)