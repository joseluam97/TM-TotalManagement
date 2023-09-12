from tm import varGlobal
from tm.views import vistasGlobales
from tm.models import *
from tm.serializers import *
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from tm.views.gestionAccesoApi import funcion_gestion_accesos

import datetime
import calendar
from .authenticationToken import ExpiringTokenAuthentication
from rest_framework.decorators import authentication_classes

@authentication_classes([ExpiringTokenAuthentication])
class kpiList(APIView):
    """
    Lista todos los kpis o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        kpi_var = kpi.objects.all().filter(active = True)
        serializer_var = kpiSerializer(kpi_var, many=True)
        return Response(serializer_var.data)

    def post(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        serializer_var = kpiPostSerializer(data=request.data)
        if serializer_var.is_valid():
            serializer_var.save()
            return Response(serializer_var.data, status=status.HTTP_201_CREATED)
        return Response(serializer_var.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([ExpiringTokenAuthentication])
class kpiListDetail(APIView):  
    """
    Elimina o edita kpis específicos
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return kpi.objects.get(pk=pk)
        except kpi.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        kpi = self.get_object(pk)
        serializer = kpiSerializer(kpi)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        kpi = self.get_object(pk)
        serializer = kpiPostSerializer(kpi, data=request.data)
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
        
        kpi = self.get_object(pk)
        kpi.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@authentication_classes([ExpiringTokenAuthentication])
class kpiAllList(APIView):
    """
    Lista todos los kpis o crea nuevos
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        
        #BLOQUE PARA CONTROLAR LOS ACCESOS MEDIANTE HERRAMIENTAS COMO POSTMAN
        resultadoEjecucion = funcion_gestion_accesos(request)
        if resultadoEjecucion == False:
            return Response("Access denied", status=status.HTTP_401_UNAUTHORIZED)
        #FIN GESTION DE CONTROL DE ACCESOS
        
        kpi_var = kpi.objects.all()
        serializer_var = kpiSerializer(kpi_var, many=True)
        return Response(serializer_var.data)

@authentication_classes([ExpiringTokenAuthentication])
class kpiListByContract(APIView):  
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
        
        valorFilter = []

        kpi_var = kpi.objects.all().filter(active= True)
        kpi_serializer_var = kpiSerializer(kpi_var, many=True)

        vectorContract = vistasGlobales.getMyMisionID(pk)

        valorFilter = list(filter(lambda x: x['mision'] in vectorContract, kpi_serializer_var.data))

        return Response(valorFilter)

@authentication_classes([ExpiringTokenAuthentication])
class kpiListTablaSummary(APIView):  
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
        
        vectorKpiReturn = []

        currentDateTime = datetime.datetime.now()
        date = currentDateTime.date()
        mesActual = currentDateTime.month
        yearActual = date.strftime("%Y")
        year = request.data['anoSelect']
        misionSelect = request.data['misionSelect']

        string_dia = '31/12/'+str(year)[2:4]
        fechaUltimoDiaAno = datetime.datetime.strptime(string_dia, "%d/%m/%y")

        yearUltimoDia,week_numUltimoDia,day_of_weekUltimoDia = fechaUltimoDiaAno.isocalendar()

        valorFilter = []
        if misionSelect == '':
            #OBTENER LOS KPIS PERTENECIENTES A LA PERSONA SELECCIONADA

            contractuser_var = contractuser.objects.all().filter(user_id = pk)
            serializer_contract_user_var = contractuserContractSerializer(contractuser_var, many=True)
            
            kpi_var = kpi.objects.all().filter(active= True)
            kpi_serializer_var = kpiSerializer(kpi_var, many=True)

            vectorContract = vistasGlobales.getMyMisionID(pk)

            valorFilter = list(filter(lambda x: x['mision'] in vectorContract, kpi_serializer_var.data))

            #FIN OBTENER LISTA DE KPIS

        if misionSelect != '':
            kpi_var = kpi.objects.all().filter(active= True, mision = misionSelect)
            kpi_serializer_var = kpiSerializer(kpi_var, many=True)
            valorFilter = kpi_serializer_var.data

        '''
        1. Entregas totales
        2. Entregas realizadas
        3. Entregas on time y en objetivo
        4. Entregas on time y no en objetivo
        5. Entregas no on time y en objetivo
        6. Entregas no on time y no en objetivo
        7. Entregas totales
        '''
        vectorKPI = []
        for itemKpi in valorFilter:

            dataKPI_2 = dataKPI.objects.all().filter(id_kpi = itemKpi['id'], ano = year)
            dataKPI_2_serializer_var = dataKPISerializer(dataKPI_2, many=True)
            
            dataKPI_3 = dataKPI.objects.all().filter(id_kpi = itemKpi['id'], ano = year, objetivoCumplido = True, objetivoTiempoCumplido = True)
            dataKPI_3_serializer_var = dataKPISerializer(dataKPI_3, many=True)

            dataKPI_4 = dataKPI.objects.all().filter(id_kpi = itemKpi['id'], ano = year, objetivoCumplido = False, objetivoTiempoCumplido = True)
            dataKPI_4_serializer_var = dataKPISerializer(dataKPI_4, many=True)

            dataKPI_5 = dataKPI.objects.all().filter(id_kpi = itemKpi['id'], ano = year, objetivoCumplido = True, objetivoTiempoCumplido = False)
            dataKPI_5_serializer_var = dataKPISerializer(dataKPI_5, many=True)

            dataKPI_6 = dataKPI.objects.all().filter(id_kpi = itemKpi['id'], ano = year, objetivoCumplido = False, objetivoTiempoCumplido = False)
            dataKPI_6_serializer_var = dataKPISerializer(dataKPI_6, many=True)

            nEntregasTotales = 0
            if itemKpi['tipoFrecuencia'] == "weekly":
                nEntregasTotales = week_numUltimoDia - 1
            if itemKpi['tipoFrecuencia'] != "weekly":
                nEntregasTotales = itemKpi['frecuencia']

            misionKPI = mision.objects.get(id = itemKpi['mision'])

            jsonKPI = {
                "titulo": itemKpi['titulo'],
                "mision": misionKPI.name, 
                "code": itemKpi['codigo'],
                "tipo": itemKpi['tipoFrecuencia'], 
                "entregasRealizadas": len(dataKPI_2_serializer_var.data), 
                "entregasTotales": nEntregasTotales,
                "onTimeYobjetivo": len(dataKPI_3_serializer_var.data),
                "onTimeYNoobjetivo": len(dataKPI_4_serializer_var.data),
                "nonTimeYobjetivo": len(dataKPI_5_serializer_var.data),
                "nonTimeYNoobjetivo": len(dataKPI_6_serializer_var.data)
            }

            vectorKPI.append(jsonKPI)



        return Response(vectorKPI)

@authentication_classes([ExpiringTokenAuthentication])
class kpiListTablaSummaryGannt(APIView):  
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
        
        vectorKpiReturn = []

        currentDateTime = datetime.datetime.now()
        date = currentDateTime.date()
        mesActual = currentDateTime.month
        yearActual = date.strftime("%Y")
        year = request.data['anoSelect']
        misionSelect = request.data['misionSelect']

        numeroFilterSelected = 0
        if int(year) < int(yearActual):
            numeroFilterSelected = 12
        else:
            numeroFilterSelected = mesActual

        valorFilter = []
        vectorPosibles = ["monthly", "bi-weekly", "half-yearly", "quarterly", "every-two-months", "custom"]
        if misionSelect == '':
        #OBTENER LOS KPIS PERTENECIENTES A LA PERSONA SELECCIONADA
            contractuser_var = contractuser.objects.all().filter(user_id = pk)
            serializer_contract_user_var = contractuserContractSerializer(contractuser_var, many=True)
            
            kpi_var = kpi.objects.all().filter(active= True)
            kpi_serializer_var = kpiSerializer(kpi_var, many=True)
            
            valorFilterPrev = list(filter(lambda x: x['tipoFrecuencia'] in vectorPosibles, kpi_serializer_var.data))

            vectorContract = vistasGlobales.getMyMision(pk)

            #valorFilter = list(filter(lambda x: x['mision'] in vectorContract, kpi_serializer_var.data))
            valorFilter = list(filter(lambda x: x['mision'] in vectorContract, valorFilterPrev))
            #FIN OBTENER LISTA DE KPIS


        if misionSelect != '':
            kpi_var = kpi.objects.all().filter(active= True, mision = misionSelect)
            kpi_serializer_var = kpiSerializer(kpi_var, many=True)
            #valorFilter = kpi_serializer_var.data

            valorFilter = list(filter(lambda x: x['tipoFrecuencia'] in vectorPosibles, kpi_serializer_var.data))

        meses = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        
        vectorDataGrafico = []
        #FOR DE KPIS
        for itemKpi in valorFilter:
            indice = 1
            cadOrden = ""
            jsonVacio = {}
            kpiSelect = {**itemKpi, **jsonVacio}
            vectorEntregablesKPI = []
            #FOR QUE VA RECORRIENDO LOS MESES
            for mesBusqueda in meses:
                vectorEntregablesKPIMes = ""
                #COMPROBAR QUE EL MES NO SOBREPASA PARA NO AÑADIR MAS
                if numeroFilterSelected - 1 >= meses.index(mesBusqueda):
                    #ESTE MES SI APLICA A ESTE KPI
                    if mesBusqueda in itemKpi['meses_afectados']:
                        #WHILE QUE VA RECORRIENDO LA FRECUENCIA MENSUAL
                        indiceFrecuencia = 1
                        while indiceFrecuencia <= itemKpi['frecuenciaMensual']:
                            dataKPI_var = dataKPI.objects.all().filter(id_kpi = itemKpi['id'], ano = year, ordenMensual = indiceFrecuencia, mes_tratado = mesBusqueda)
                            data_kpi_serializer_var = dataKPISerializer(dataKPI_var, many=True)

                            if len(data_kpi_serializer_var.data) == 0:
                                vectorEntregablesKPIMes = vectorEntregablesKPIMes + "NO-"
                            else:
                                vectorEntregablesKPIMes = vectorEntregablesKPIMes + "SI-"
                            
                            mesSeleccionado = meses.index(mesBusqueda)+1
                            dataFinal = calendar.monthrange(int(year), mesSeleccionado)

                            #AÑADIR LOS NUEVOS PARAMETROS
                            
                            #TIPOS DE TIPOLOGIAS
                            #vectorPosibles = ["monthly", "bi-weekly", "half-yearly", "quarterly", "every-two-months", "custom"]
                            #cuando sea custom no se trata
                            exitoBusqueda = False
                            if itemKpi['tipoFrecuencia'] == "monthly" or itemKpi['tipoFrecuencia'] == "bi-weekly" or itemKpi['tipoFrecuencia'] == "custom":
                                if itemKpi['frecuenciaMensual'] == 1:
                                    newDateComienzo = datetime.date(int(year), mesSeleccionado, 1)
                                    newDateFinal = datetime.date(int(year), mesSeleccionado, dataFinal[1])
                                    exitoBusqueda = True

                                if itemKpi['frecuenciaMensual'] == 2:
                                    if indiceFrecuencia == 1:
                                        newDateComienzo = datetime.date(int(year), mesSeleccionado, 1)
                                        newDateFinal = datetime.date(int(year), mesSeleccionado, 15)
                                        exitoBusqueda = True
                                    if indiceFrecuencia == 2:
                                        newDateComienzo = datetime.date(int(year), mesSeleccionado, 16)
                                        newDateFinal = datetime.date(int(year), mesSeleccionado, dataFinal[1])
                                        exitoBusqueda = True

                            if itemKpi['tipoFrecuencia'] == "half-yearly":
                                #SEMESTRAL
                                dataSemestral = calendar.monthrange(int(year), mesSeleccionado+5)
                                newDateComienzo = datetime.date(int(year), mesSeleccionado, 1)
                                newDateFinal = datetime.date(int(year), mesSeleccionado+5, dataSemestral[1])
                                exitoBusqueda = True


                            if itemKpi['tipoFrecuencia'] == "quarterly":
                                #TRIMESTRAL
                                dataSemestral = calendar.monthrange(int(year), mesSeleccionado+2)
                                newDateComienzo = datetime.date(int(year), mesSeleccionado, 1)
                                newDateFinal = datetime.date(int(year), mesSeleccionado+2, dataSemestral[1])
                                exitoBusqueda = True

                            if itemKpi['tipoFrecuencia'] == "every-two-months":
                                #CADA 2 MESES
                                dataSemestral = calendar.monthrange(int(year), mesSeleccionado+1)
                                newDateComienzo = datetime.date(int(year), mesSeleccionado, 1)
                                newDateFinal = datetime.date(int(year), mesSeleccionado+1, dataSemestral[1])
                                exitoBusqueda = True

                            if exitoBusqueda == True:
                                vectIntroducir = []
                                vectIntroducir.append(itemKpi['titulo'])
                                vectIntroducir.append(mesSeleccionado)
                                vectIntroducir.append(datetime.datetime.strftime(newDateComienzo,'%Y, %m, %d'))
                                vectIntroducir.append(datetime.datetime.strftime(newDateFinal,'%Y, %m, %d'))
                                if len(data_kpi_serializer_var.data) != 0:
                                    vectIntroducir.append("DATA")
                                    vectIntroducir.append(data_kpi_serializer_var.data[0])
                                else:
                                    vectIntroducir.append("NO DATA")
                                    vectIntroducir.append({})

                                vectorDataGrafico.append(vectIntroducir)
                            

                            indiceFrecuencia = indiceFrecuencia + 1

        return Response(vectorDataGrafico)

@authentication_classes([ExpiringTokenAuthentication])
class kpiListTablaSummarySemanalesGannt(APIView):  
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
        
        vectorKpiReturn = []

        currentDateTime = datetime.datetime.now()
        date = currentDateTime.date()
        mesActual = currentDateTime.month
        year1,week_num,day_of_week = currentDateTime.isocalendar()
        yearActual = date.strftime("%Y")
        year = request.data['anoSelect']
        misionSelect = request.data['misionSelect']

        string_dia = '31/12/'+str(year)[2:4]
        fechaUltimoDiaAno = datetime.datetime.strptime(string_dia, "%d/%m/%y")

        yearUltimoDia,week_numUltimoDia,day_of_weekUltimoDia = fechaUltimoDiaAno.isocalendar()

        if int(year) < int(yearActual):
            numeroSemanasSelected = week_numUltimoDia - 1
        else:
            numeroSemanasSelected = week_num


        valorFilter = []
        if misionSelect == '':
            #OBTENER LOS KPIS PERTENECIENTES A LA PERSONA SELECCIONADA

            contractuser_var = contractuser.objects.all().filter(user_id = pk)
            serializer_contract_user_var = contractuserContractSerializer(contractuser_var, many=True)

            kpi_var = kpi.objects.all().filter(active= True, tipoFrecuencia = "weekly")
            kpi_serializer_var = kpiSerializer(kpi_var, many=True)

            vectorContract = vistasGlobales.getMyMision(pk)

            valorFilter = list(filter(lambda x: x['mision'] in vectorContract, kpi_serializer_var.data))
            #FIN OBTENER LISTA DE KPIS

        if misionSelect != '':
            kpi_var = kpi.objects.all().filter(active= True, mision = misionSelect, tipoFrecuencia = "weekly")
            kpi_serializer_var = kpiSerializer(kpi_var, many=True)
            valorFilter = kpi_serializer_var.data
        
        vectorDataGrafico = []
        #FOR DE KPIS
        for itemKpi in valorFilter:
            #FOR QUE VA RECORRIENDO LOS MESES
            #dataKPI_var = dataKPI.objects.all().filter(id_kpi = itemKpi['id'], ano = year).order_by('week')
            #data_kpi_serializer_var = dataKPISerializer(dataKPI_var, many=True)

            vectorResultado = []
            contador = 1
            while contador <= numeroSemanasSelected + 1:
                dataKPI_var = dataKPI.objects.all().filter(id_kpi = itemKpi['id'], ano = year, week = contador)
                data_kpi_serializer_var = dataKPISerializer(dataKPI_var, many=True)

                #vectorResultado.append(data_kpi_serializer_var.data[0])
                #d = "2013-W26"
                origenWeek = str(year) + "-W" + str(contador)
                fechaInicio = datetime.datetime.strptime(origenWeek + '-1', "%Y-W%W-%w")
                fechaFin = fechaInicio + datetime.timedelta(days=7)
                #vectorResultado.append(data_kpi_serializer_var.data[0])
                vectorResultado.append({itemKpi['titulo'], "Week", fechaInicio, fechaFin})
                vectIntroducir = []
                vectIntroducir.append(itemKpi['titulo'])
                vectIntroducir.append(str(contador))
                vectIntroducir.append(datetime.datetime.strftime(fechaInicio,'%Y, %m, %d'))
                vectIntroducir.append(datetime.datetime.strftime(fechaFin,'%Y, %m, %d'))
                if len(data_kpi_serializer_var.data) != 0:
                    vectIntroducir.append("DATA")
                    vectIntroducir.append(data_kpi_serializer_var.data[0])
                else:
                    vectIntroducir.append("NO DATA")
                    vectIntroducir.append({})

                vectorDataGrafico.append(vectIntroducir)

                contador = contador + 1


            jsonNRisk = {"dataByWeek": vectorResultado}
            kpiSelect = {**itemKpi, **jsonNRisk}

            vectorKpiReturn.append(kpiSelect)


        return Response(vectorDataGrafico)
