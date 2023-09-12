//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import IconButton from "@mui/material/IconButton";
import Autocomplete from '@mui/material/Autocomplete';
import StepLabel from '@mui/material/StepLabel';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Divider from '@mui/material/Divider';
import store from "app/store/index"
import List from '@mui/material/List';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import Help from '@mui/icons-material/Help';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'

import {
        cambiarVisibilidadModalInsertarAction,
        insertarDataKpiModalInsertarAction,
        updateDataKpiAction
} from '../items/store/actions'

import {
        mostrarMisionAPIAction,
        mostrarMisionIncluyendoMisionesHeredadasAPIAction
} from '../../../Gestion/Mision/store/actions'

import {
        mostrarTiposUnicosAPIAction,
        mostrarCategoryAPIAction
} from '../../../Managment/Category/store/actions'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

        customDialogTitle: {
                backgroundColor: 'rgb(0, 0, 0)',
                marginLeft: '3px',
                marginRight: '3px',
                color: 'rgb(255, 255, 255)',
                marginBottom: '0.5em'
        }

});

const arrayMeses = [
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

const dias_plazo_mensual = 10
const dias_plazo_cada_dos_semana = 7
const dias_plazo_semanal = 3

export default function ModalInsertar(props) {

        const classes = useStyles();
        const dispatch = useDispatch();

        const [fechaTeoricaEntrega, setFechaTeoricaEntrega] = useState('')

        const [iteracionYaAnadida, setIteracionYaAnadida] = useState(false)
        const [misionSelect, setMisionSelect] = useState('')
        const [kpiForm, setKpiForm] = useState('')
        const [ordenMensualActual, setOrdenMensualActual] = useState('')
        const [mesActual, setMesActual] = useState('')
        const [yearActual, setYearActual] = useState('')
        const [formaCalculo, setFormaCalculo] = useState('')
        const [warningCalculo, setWarningCalculo] = useState('')
        const [objetivoActual, setObjetivoActual] = useState('')
        const [warningData, setWarningData] = useState('')
        const [resultadoActual, setResultadoActual] = useState('')
        const [verDetallesKpi, setVerDetallesKpi] = useState(false)
        const [observacionesActual, setObservacionesActual] = useState('')
        const [weekActual, setWeekActual] = useState('')
        const [esSemanal, setEsSemanal] = useState('')
        const [razonRetrasoActual, setRazonRetrasoActual] = useState('')
        const [razonNoCumpleObjetivo, setRazonNoCumpleObjetivo] = useState('')
        const [existeRetraso, setExisteRetraso] = useState(false)
        const [kpiFuturo, setKpiFuturo] = useState(false)

        const [categoriaCalidad, setCategoriaCalidad] = useState('')
        const [categoriaTiempo, setCategoriaTiempo] = useState('')

        const [noCumpleObjetivo, setNoCumpleObjetivo] = useState(true)

        const [vectorOrdenMensual, setVectorOrdenMensual] = useState([])
        const [vectorAnoPosible, setVectorAnoPosible] = useState([])
        const [vectorMeses, setVectorMeses] = useState([])
        const [listKpiValidos, setListKpiValidos] = useState([])
        const [completeKpi, setCompleteKpi] = useState(false)

        const [botonGuardarDataKpi, setBotonGuardarDataKpi] = useState(true);

        const [valorWarning, setValorWarning] = useState(false);

        const modo = useSelector(state => state.fuse.dataKpiComponent.modo)
        const filaSeleccionadaGrid = useSelector(state => state.fuse.dataKpiComponent.filaSeleccionadaGrid)
        const visibilidadModalInsertar = useSelector(state => state.fuse.dataKpiComponent.visibilidadModalInsertar)
        const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
        const personLogin = useSelector(state => state.fuse.userComponente.person)
        const dataKpiListAPI = useSelector(state => state.fuse.dataKpiComponent.dataKpiListAPI)
        const kpiListAPI = useSelector(state => state.fuse.kpiComponent.kpiListAPI)
        const categoriaListAPI = useSelector(state => state.fuse.categoriaComponent.categoriaListAPI)
        const tipoCategoriasAPI = useSelector(state => state.fuse.categoriaComponent.tipoCategoriasAPI)
        const kpiSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.kpiSeleccionado)
        const misionSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.misionSeleccionado)

        const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAction(valor, modo))
        const insertarKpiModalInsertar = (valor, idPerson) => dispatch(insertarDataKpiModalInsertarAction(valor, idPerson))
        const mostrarMisionIncluyendoMisionesHeredadasAPI = (idPersona) => dispatch(mostrarMisionIncluyendoMisionesHeredadasAPIAction(idPersona))
        const updateKpi = (id, json, idPerson) => dispatch(updateDataKpiAction(id, json, idPerson))
        const mostrarTiposUnicosAPI = () => dispatch(mostrarTiposUnicosAPIAction())
        const mostrarCategoryAPI = () => dispatch(mostrarCategoryAPIAction())

        function resetValue() {

                setMisionSelect('')
                setWeekActual('')
                setKpiForm('')
                setFormaCalculo('')
                setWarningCalculo('')
                setObjetivoActual('')
                setWarningData('')
                setResultadoActual('')
                setOrdenMensualActual('')
                setMesActual([])
                setObservacionesActual('')
                setFechaTeoricaEntrega('')
                setExisteRetraso(false)
                setKpiFuturo(false)
                setIteracionYaAnadida(false)
                setVerDetallesKpi(false)
                setNoCumpleObjetivo(true)
        }

        useEffect(() => {
                if (visibilidadModalInsertar == false) {
                        resetValue();
                }
        }, [visibilidadModalInsertar])

        useEffect(() => {
                if (iteracionYaAnadida == false && misionSelect != '' && kpiForm != '' && kpiForm != null && kpiForm != undefined && resultadoActual != '' && ((mesActual != '' && ordenMensualActual != '') || weekActual != '')) {

                        //COMPROBACION SI VA A CUMPLIR EL OBJETIVO PARA VER SI OBLIGAR A AÑADIR COMENTARIOS
                        let cumplidoSINO = false
                        switch (kpiForm.modoCalculo) {
                                case 1:
                                        if (resultadoActual < objetivoActual) { cumplidoSINO = true }
                                        break
                                case 2:
                                        if (resultadoActual <= objetivoActual) { cumplidoSINO = true }
                                        break
                                case 3:
                                        if (resultadoActual == objetivoActual) { cumplidoSINO = true }
                                        break
                                case 4:
                                        if (resultadoActual >= objetivoActual) { cumplidoSINO = true }
                                        break
                                case 5:
                                        if (resultadoActual > objetivoActual) { cumplidoSINO = true }
                                        break
                        }

                        if (resultadoActual != '') {
                                setNoCumpleObjetivo(cumplidoSINO)
                        }

                        if (cumplidoSINO == true) {
                                setCategoriaCalidad('')
                                setRazonNoCumpleObjetivo('')

                                //SI CUMPLE OBJETIVO, TENGO QUE VER SI ESTA EN VALORES WARNING
                                //COMPROBACION SI ESTA EN VALORES DE WARNING PARA MOSTRAR EL MENSAJE
                                let valorWarning = false
                                switch (kpiForm.modoCalculo) {
                                        case 1:
                                                if (resultadoActual > warningData) { valorWarning = true }
                                                break
                                        case 2:
                                                if (resultadoActual > warningData) { valorWarning = true }
                                                break
                                        case 3:
                                                valorWarning = true
                                                break
                                        case 4:
                                                if (resultadoActual < warningData) { valorWarning = true }
                                                break
                                        case 5:
                                                if (resultadoActual < warningData) { valorWarning = true }
                                                break
                                }

                                if (resultadoActual != '') {
                                        setValorWarning(valorWarning)
                                }
                        }
                        else{
                                setValorWarning(false)
                        }

                        //COMPROBAR SI ES UN KPI FUTURO
                        let esKpiFuturo = false
                        if ((kpiForm.tipoFrecuencia != "weekly" && mesActual != '' && ordenMensualActual != '') || (kpiForm.tipoFrecuencia == "weekly" && weekActual != '')) {
                                let fechaHoy = new Date()
                                //COMPROBAR EL AÑO ACTUAL
                                if (fechaHoy.getFullYear() == yearActual) {
                                        //SI ES SEMANAL
                                        if (kpiForm.tipoFrecuencia == "weekly") {
                                                let numeroDeSemanaHoy = getWeekNumber(fechaHoy);
                                                if (numeroDeSemanaHoy < weekActual) {
                                                        //ES KPI FUTURO
                                                        esKpiFuturo = true
                                                }
                                                else {
                                                        //ES PASADO
                                                        esKpiFuturo = false
                                                }
                                        }
                                        //SI NO ES SEMANAL
                                        if (kpiForm.tipoFrecuencia != "weekly") {
                                                let mesSeleccionado = arrayMeses.indexOf(mesActual)
                                                let mesHoy = fechaHoy.getMonth()
                                                if (mesHoy < mesSeleccionado) {
                                                        //ES KPI FUTURO
                                                        esKpiFuturo = true
                                                }
                                                else {
                                                        if (mesHoy > mesSeleccionado) {
                                                                //ES PASADO
                                                                esKpiFuturo = false
                                                        }
                                                        else if (mesHoy == mesSeleccionado) {
                                                                //ES PASADO
                                                                esKpiFuturo = false
                                                        }
                                                }
                                        }
                                }
                                else {
                                        if (fechaHoy.getFullYear() > yearActual) {
                                                //ES PASADO
                                                esKpiFuturo = false
                                        }
                                        else {
                                                //ES KPI FUTURO
                                                esKpiFuturo = true
                                        }
                                }

                        }

                        setKpiFuturo(esKpiFuturo)

                        //OBTENER FECHA PREVISTA DE ENTREGA
                        let fechaEntrega

                        if (kpiForm.tipoFrecuencia != "custom") {
                                if (kpiForm.frecuenciaMensual == 1) {
                                        let sumaMeses = 12 / kpiForm.frecuencia

                                        let mesSelected = arrayMeses.indexOf(mesActual)
                                        fechaEntrega = new Date(yearActual, mesSelected + sumaMeses, 1);
                                }
                                else {
                                        //FRECUENCIA DE ENTREGA ES 2 o 4 MENSUALES
                                        //SEMANAL
                                        if (kpiForm.tipoFrecuencia == "weekly") {
                                                fechaEntrega = getDateOfISOWeek(weekActual + 1, yearActual)
                                        }
                                        //CADA 2 SEMANAS
                                        if (kpiForm.tipoFrecuencia == "bi-weekly") {
                                                let mesSelected = arrayMeses.indexOf(mesActual)
                                                if (ordenMensualActual == 1) {
                                                        fechaEntrega = new Date(yearActual, mesSelected, 15);
                                                }
                                                else {
                                                        if (mesSelected == 11) {
                                                                fechaEntrega = new Date(yearActual + 1, 1, 1);
                                                        }
                                                        else {
                                                                fechaEntrega = new Date(yearActual, mesSelected + 1, 1);
                                                        }
                                                }
                                        }
                                }
                        }
                        else {
                                //TIPOLOGIA CUSTOM

                                let vectorMesesAfectados = kpiForm.meses_afectados.split(',')
                                let indiceMisMeses = vectorMesesAfectados.indexOf(mesActual)

                                //PASA DE MES O NO
                                let indiceMesProximo
                                if (ordenMensualActual == 1 && kpiForm.frecuenciaMensual == 2) {
                                        indiceMesProximo = arrayMeses.indexOf(vectorMesesAfectados[indiceMisMeses])
                                }
                                else {
                                        indiceMesProximo = arrayMeses.indexOf(vectorMesesAfectados[indiceMisMeses + 1])
                                }

                                if (ordenMensualActual == 1) {
                                        if (kpiForm.frecuenciaMensual == 1) {
                                                fechaEntrega = new Date(yearActual, indiceMesProximo, 1);
                                        }
                                        if (kpiForm.frecuenciaMensual == 2) {
                                                fechaEntrega = new Date(yearActual, indiceMesProximo, 15);
                                        }

                                }
                                else {
                                        if (indiceMesProximo == 11) {
                                                fechaEntrega = new Date(yearActual + 1, 1, 1);
                                        }
                                        else {
                                                fechaEntrega = new Date(yearActual, indiceMesProximo, 1);
                                        }
                                }

                        }

                        //SUMA DE PLAZO EXTRA
                        if (kpiForm.frecuenciaMensual == 1) {
                                fechaEntrega.setDate(fechaEntrega.getDate() + dias_plazo_mensual)
                        }
                        if (kpiForm.frecuenciaMensual == 2) {
                                fechaEntrega.setDate(fechaEntrega.getDate() + dias_plazo_cada_dos_semana)
                        }
                        if (kpiForm.frecuenciaMensual == 4) {
                                fechaEntrega.setDate(fechaEntrega.getDate() + dias_plazo_semanal)
                        }

                        if (fechaEntrega != "" && fechaEntrega != undefined && fechaEntrega != null) {
                                let arrayFecha = fechaEntrega.toISOString().split("T")
                                setFechaTeoricaEntrega(arrayFecha[0])
                        }
                        else {
                                setFechaTeoricaEntrega("Error")
                        }

                        //FIN OBTENER FECHA PREVISTA DE ENTREGA

                        let entregaConRetraso = false
                        if (esKpiFuturo == false) {
                                let fechaHoy = new Date()
                                var day_as_milliseconds = 86400000;
                                var diff_in_millisenconds = fechaEntrega - fechaHoy;
                                var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

                                if (diff_in_days >= 0) {
                                        setExisteRetraso(false)
                                        entregaConRetraso = false

                                        //RESET VALUES DE JUSTIFICACIONES DE RETRASO DE FECHA
                                        setCategoriaTiempo('')
                                        setRazonRetrasoActual('')
                                }
                                else {
                                        setExisteRetraso(true)
                                        entregaConRetraso = true
                                }
                        }
                        else {
                                setExisteRetraso(false)
                                setIteracionYaAnadida(false)
                                setNoCumpleObjetivo(true)
                                setBotonGuardarDataKpi(true)
                        }

                        //HABILITAR O NO EL BOTON DE GUARDAR
                        if (esKpiFuturo == false && cumplidoSINO == true && entregaConRetraso == false) {
                                setBotonGuardarDataKpi(false)
                        }
                        else {
                                if (esKpiFuturo == false && (cumplidoSINO == false && razonNoCumpleObjetivo != '' && categoriaCalidad != '' && categoriaCalidad != undefined && categoriaCalidad != null || cumplidoSINO == true) && (entregaConRetraso == true && razonRetrasoActual != '' && categoriaTiempo != null && categoriaTiempo != undefined && categoriaTiempo != '' || entregaConRetraso == false)) {
                                        setBotonGuardarDataKpi(false)
                                }
                                else {
                                        setBotonGuardarDataKpi(true)
                                }
                        }
                }
                else {
                        setBotonGuardarDataKpi(true)
                }
        })

        useEffect(() => {
                //GET CATEGORIAS
                mostrarTiposUnicosAPI()
                mostrarCategoryAPI()

                let vectorAnoPosibleFun = []
                let anoInicio = 2022
                let fechaHoy = new Date()
                let anoActualBucle = fechaHoy.getFullYear()
                while (anoInicio <= anoActualBucle) {
                        vectorAnoPosibleFun.push(anoInicio)
                        anoInicio = anoInicio + 1
                }
                setVectorAnoPosible(vectorAnoPosibleFun)
        }, [])

        useEffect(() => {
                if (existeRetraso == false) {
                        setRazonRetrasoActual('')
                }
        }, [existeRetraso])

        function getWeekNumber(dt) {
                var tdt = new Date(dt.valueOf());
                var dayn = (dt.getDay() + 6) % 7;
                tdt.setDate(tdt.getDate() - dayn + 3);
                var firstThursday = tdt.valueOf();
                tdt.setMonth(0, 1);
                if (tdt.getDay() !== 4) {
                        tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
                }
                return 1 + Math.ceil((firstThursday - tdt) / 604800000);
        }

        function getDateOfISOWeek(week, year) {
                var simple = new Date(year, 0, 1 + (week - 1) * 7);
                var dow = simple.getDay();
                var ISOweekStart = simple;
                if (dow <= 4)
                        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
                else
                        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
                return ISOweekStart;
        }

        function nuevoKpi() {
                let cumplidoSINO = false
                switch (kpiForm.modoCalculo) {
                        case 1:
                                if (resultadoActual < objetivoActual) { cumplidoSINO = true }
                                break
                        case 2:
                                if (resultadoActual <= objetivoActual) { cumplidoSINO = true }
                                break
                        case 3:
                                if (resultadoActual == objetivoActual) { cumplidoSINO = true }
                                break
                        case 4:
                                if (resultadoActual >= objetivoActual) { cumplidoSINO = true }
                                break
                        case 5:
                                if (resultadoActual > objetivoActual) { cumplidoSINO = true }
                                break
                }
                let fechaHoy = new Date();
                let arrayFecha = fechaHoy.toISOString().split("T")

                /*console.log("-------fechaTeoricaEntrega-------")
                console.log(fechaTeoricaEntrega)
                

                let cumpleObjetivoFecha
                var day_as_milliseconds = 86400000;
                var diff_in_millisenconds = fechaTeoricaEntrega - arrayFecha[0];
                console.log("-------diff_in_millisenconds-------")
                console.log(diff_in_millisenconds)
                var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

                cumpleObjetivoFecha = diff_in_days >= 0 ? false : true
                */

                let cumpleObjetivoFecha

                const fechaInicio = new Date(fechaTeoricaEntrega);
                const fechaFin = new Date();

                fechaInicio.setHours(0, 0, 0, 0);
                fechaFin.setHours(0, 0, 0, 0);

                console.log("-------fechaInicio-------")
                console.log(fechaInicio)

                // Calcular la diferencia en milisegundos
                const diferenciaEnMilisegundos = fechaInicio - fechaFin;

                // Convertir la diferencia de milisegundos a días
                const unDiaEnMilisegundos = 24 * 60 * 60 * 1000; // 1 día = 24 horas * 60 minutos * 60 segundos * 1000 milisegundos
                const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / unDiaEnMilisegundos);
                console.log("-------diferenciaEnDias-------")
                console.log(diferenciaEnDias)

                //cumpleObjetivoFecha = diferenciaEnDias >= 0 ? false : true

                if(diferenciaEnDias >= 0){
                        cumpleObjetivoFecha = true
                }
                else{
                        cumpleObjetivoFecha = false
                }

                console.log("-------cumpleObjetivoFecha-------")
                console.log(cumpleObjetivoFecha)

                if (modo == "nuevo") {
                        //ES KPI SEMANAL
                        if (kpiForm.tipoFrecuencia == "weekly") {
                                insertarKpiModalInsertar({
                                        id_kpi: kpiForm.id,
                                        week: weekActual,
                                        resultado: resultadoActual,
                                        objetivoData: objetivoActual,
                                        warningData: warningData,
                                        objetivoCumplido: cumplidoSINO,
                                        objetivoTiempoCumplido: cumpleObjetivoFecha,
                                        ano: yearActual,
                                        observations: observacionesActual,

                                        fechaTeoricaRegistro: fechaTeoricaEntrega,
                                        fechaRegistro: arrayFecha[0],

                                        razon_atraso: razonRetrasoActual,
                                        razon_calidad: razonNoCumpleObjetivo,

                                        categorizacionNOTD: categoriaTiempo,
                                        categorizacionNOQD: categoriaCalidad,

                                        ordenGlobalDato: weekActual
                                }, personLogin.id)
                        }
                        else {
                                let vectorEntregas = kpiForm.meses_afectados.split(",")
                                let indiceGlobal = vectorEntregas.indexOf(mesActual)
                                indiceGlobal = (indiceGlobal * kpiForm.frecuenciaMensual) + ordenMensualActual - 1
                                insertarKpiModalInsertar({
                                        id_kpi: kpiForm.id,
                                        resultado: resultadoActual,
                                        objetivoData: objetivoActual,
                                        warningData: warningData,
                                        objetivoCumplido: cumplidoSINO,
                                        objetivoTiempoCumplido: cumpleObjetivoFecha,
                                        ano: yearActual,
                                        mes_tratado: mesActual,
                                        ordenMensual: ordenMensualActual,
                                        observations: observacionesActual,

                                        fechaTeoricaRegistro: fechaTeoricaEntrega,
                                        fechaRegistro: arrayFecha[0],

                                        razon_atraso: razonRetrasoActual,
                                        razon_calidad: razonNoCumpleObjetivo,

                                        categorizacionNOTD: categoriaTiempo,
                                        categorizacionNOQD: categoriaCalidad,

                                        ordenGlobalDato: indiceGlobal + 1
                                }, personLogin.id)
                        }

                }
                if (modo == "editar") {
                        let dataKPIEdit = dataKpiListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]
                        if (dataKPIEdit != undefined) {
                                let vectorEntregas = kpiForm.meses_afectados.split(",")
                                let indiceGlobal = vectorEntregas.indexOf(mesActual)
                                indiceGlobal = (indiceGlobal * kpiForm.frecuenciaMensual) + dataKPIEdit.ordenMensual - 1
                                updateKpi(filaSeleccionadaGrid, {
                                        id_kpi: kpiForm.id,
                                        week: weekActual,
                                        resultado: resultadoActual,
                                        objetivoData: objetivoActual,
                                        warningData: warningData,
                                        objetivoCumplido: cumplidoSINO,
                                        objetivoTiempoCumplido: cumpleObjetivoFecha,
                                        ano: yearActual,
                                        mes_tratado: mesActual,
                                        ordenMensual: ordenMensualActual,
                                        observations: observacionesActual,

                                        fechaTeoricaRegistro: dataKPIEdit.fechaTeoricaRegistro,
                                        fechaRegistro: dataKPIEdit.fechaRegistro,

                                        razon_atraso: razonRetrasoActual,
                                        razon_calidad: razonNoCumpleObjetivo,

                                        categorizacionNOTD: categoriaTiempo,
                                        categorizacionNOQD: categoriaCalidad,

                                        ordenGlobalDato: indiceGlobal + 1

                                }, personLogin.id)
                        }
                }

                resetValue()

        }




        useEffect(() => {
                mostrarMisionIncluyendoMisionesHeredadasAPI(personLogin.id)
        }, [personLogin])

        //DETECTAR SI LA ITERACCION QUE SE PRETENDE AÑADIR YA ESTA AÑADIDA
        useEffect(() => {
                if (modo != '') {
                        if (modo != "editar" && kpiForm != '' && kpiForm != undefined && kpiForm != null) {
                                if (kpiForm.tipoFrecuencia != "weekly" && mesActual != '' && ordenMensualActual != '') {
                                        if (kpiSeleccionado != '') {
                                                let resultadoBusqueda = dataKpiListAPI.filter(item => item.id_kpi == kpiSeleccionado.id && item.mes_tratado == mesActual && item.ordenMensual == ordenMensualActual && item.ano == yearActual)[0]
                                                if (resultadoBusqueda != undefined) {
                                                        setIteracionYaAnadida(true)
                                                }
                                                else {
                                                        setIteracionYaAnadida(false)
                                                }
                                        }
                                        else {
                                                //kpiForm
                                                let resultadoBusqueda = dataKpiListAPI.filter(item => item.id_kpi == kpiForm.id && item.mes_tratado == mesActual && item.ordenMensual == ordenMensualActual && item.ano == yearActual)[0]
                                                if (resultadoBusqueda != undefined) {
                                                        setIteracionYaAnadida(true)
                                                }
                                                else {
                                                        setIteracionYaAnadida(false)
                                                }
                                        }

                                }
                                else if (weekActual != '') {
                                        if (kpiSeleccionado != '') {
                                                let resultadoBusqueda2 = dataKpiListAPI.filter(item => item.id_kpi == kpiSeleccionado.id && item.week == weekActual && item.ano == yearActual)[0]
                                                if (resultadoBusqueda2 != undefined) {
                                                        setIteracionYaAnadida(true)
                                                }
                                                else {
                                                        setIteracionYaAnadida(false)
                                                }
                                        }
                                        else {
                                                let resultadoBusqueda2 = dataKpiListAPI.filter(item => item.id_kpi == kpiForm.id && item.week == weekActual && item.ano == yearActual)[0]
                                                if (resultadoBusqueda2 != undefined) {
                                                        setIteracionYaAnadida(true)
                                                }
                                                else {
                                                        setIteracionYaAnadida(false)
                                                }
                                        }


                                }
                        }
                }

        }, [mesActual, ordenMensualActual, weekActual, yearActual, modo, kpiForm])


        useEffect(() => {

                if (modo == "nuevo") {
                        setResultadoActual('')
                        setWeekActual('')
                        setCategoriaTiempo('')
                        setCategoriaTiempo('')
                        setRazonRetrasoActual('')
                        setRazonNoCumpleObjetivo('')

                        //SET YEAR ACTUAL
                        let fechaHoy = new Date()
                        let anoActualBucle = fechaHoy.getFullYear()
                        setYearActual(anoActualBucle)

                        if (misionSeleccionado != '') {
                                setMisionSelect(misionSeleccionado)
                        }

                        if (kpiSeleccionado != '') {
                                setKpiForm(kpiSeleccionado)

                                //SELECT PARAMETROS DEL KPI SELECT

                                //CONFIGURAR ORDEN MENSUAL DEL KPI
                                let vectorOrdenMensual = []
                                for (let cont = 0; cont < kpiSeleccionado.frecuenciaMensual; cont++) {
                                        vectorOrdenMensual.push(cont + 1)
                                }
                                if (vectorOrdenMensual.length == 1) {
                                        setOrdenMensualActual(vectorOrdenMensual[0])
                                }

                                setVectorOrdenMensual(vectorOrdenMensual)

                                //CONFIGURAR MESES SELECCIONABLES PARA INSERTAR DATOS
                                let vectorMesesKPI = kpiSeleccionado.meses_afectados.split(",")
                                setVectorMeses(vectorMesesKPI)


                                setObjetivoActual(kpiSeleccionado.objetivo)
                                setWarningData(kpiSeleccionado.valor_aviso)
                        }

                }
                if ((modo == "consultar" || modo == "editar") && filaSeleccionadaGrid != "") {
                        let dataKpiSelect = dataKpiListAPI.filter(item => item.id == filaSeleccionadaGrid)[0]

                        if (dataKpiSelect != undefined) {

                                setResultadoActual(dataKpiSelect.resultado)
                                setObjetivoActual(dataKpiSelect.objetivoData)
                                setWarningData(dataKpiSelect.warningData)
                                setObservacionesActual(dataKpiSelect.observations)
                                setYearActual(dataKpiSelect.ano)
                                setWeekActual(dataKpiSelect.week)
                                setRazonRetrasoActual(dataKpiSelect.razon_atraso)
                                setRazonNoCumpleObjetivo(dataKpiSelect.razon_calidad)
                                setCategoriaTiempo(dataKpiSelect.categorizacionNOTD)
                                setCategoriaCalidad(dataKpiSelect.categorizacionNOQD)

                                let kpiSeleccionadoEdit = kpiListAPI.filter(item => item.id == dataKpiSelect.id_kpi)[0]
                                if (kpiSeleccionadoEdit != undefined) {
                                        let misionSeleccionadoEdit = listMisionAPI.filter(item => item.id == kpiSeleccionadoEdit.mision)[0]
                                        if (misionSeleccionadoEdit != undefined) {
                                                setMisionSelect(misionSeleccionadoEdit)
                                        }

                                        setKpiForm(kpiSeleccionadoEdit)

                                        //SELECT PARAMETROS DEL KPI SELECT

                                        //CONFIGURAR ORDEN MENSUAL DEL KPI
                                        let vectorOrdenMensual = []
                                        for (let cont = 0; cont < kpiSeleccionadoEdit.frecuenciaMensual; cont++) {
                                                vectorOrdenMensual.push(cont + 1)
                                        }
                                        setVectorOrdenMensual(vectorOrdenMensual)
                                        setOrdenMensualActual(dataKpiSelect.ordenMensual)

                                        //CONFIGURAR MESES SELECCIONABLES PARA INSERTAR DATOS
                                        let vectorMesesKPI = kpiSeleccionadoEdit.meses_afectados.split(",")
                                        setVectorMeses(vectorMesesKPI)
                                        setMesActual(dataKpiSelect.mes_tratado)

                                }


                        }
                }

                if (modo != '') {
                        let modoDeCalculo = ""
                        switch (kpiForm.modoCalculo) {
                                case 1:
                                        modoDeCalculo = "<" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                                case 2:
                                        modoDeCalculo = "≤" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                                case 3:
                                        modoDeCalculo = "=" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                                case 4:
                                        modoDeCalculo = "≥" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                                case 5:
                                        modoDeCalculo = ">" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                        }

                        setFormaCalculo(modoDeCalculo)


                        let cadenaWarning = ""
                        switch (kpiForm.modoCalculo) {
                                case 1:
                                        cadenaWarning = ">" + kpiForm.valor_aviso + " " + kpiForm.unidad
                                        break
                                case 2:
                                        cadenaWarning = ">" + kpiForm.valor_aviso + " " + kpiForm.unidad
                                        break
                                case 3:
                                        cadenaWarning = ""
                                        break
                                case 4:
                                        cadenaWarning = "<" + kpiForm.valor_aviso + " " + kpiForm.unidad
                                        break
                                case 5:
                                        cadenaWarning = "<" + kpiForm.valor_aviso + " " + kpiForm.unidad
                                        break
                        }

                        setWarningCalculo(cadenaWarning)
                }


        }, [modo, filaSeleccionadaGrid, visibilidadModalInsertar])

        //SE SELECCIONA LA MISION
        useEffect(() => {

                if (misionSelect != '' && misionSelect != null && misionSelect != undefined) {
                        //desbloqueo el campo kpi
                        setCompleteKpi(true)
                        //filtro los kpi de esta mision
                        let kpiValidos = []
                        for (let kpi in kpiListAPI) {
                                if (kpiListAPI[kpi].mision == misionSelect.id) {
                                        kpiValidos.push(kpiListAPI[kpi])
                                }
                        }
                        setListKpiValidos(kpiValidos)
                }
                else {
                        //bloqueo y vacio el campo kpi
                        setCompleteKpi(false)
                        setKpiForm('')
                }

        }, [misionSelect])

        //SE ACTUALIZA EL KPI SELECCIONADO
        useEffect(() => {
                //Cuando se modifica el kpiForm se debe resetear todo el contenido relleno anteriormente

                if (modo == "nuevo") {
                        setMesActual('')
                        setOrdenMensualActual('')
                        setResultadoActual('')
                        setObservacionesActual('')

                        setCategoriaCalidad('')
                        setCategoriaTiempo('')
                        setRazonNoCumpleObjetivo('')
                        setRazonRetrasoActual('')

                        setNoCumpleObjetivo(true)
                        setExisteRetraso(false)
                }

                //Gestion
                if (kpiForm != '' && kpiForm != undefined && kpiForm != null) {
                        if (modo != 'editar') {

                                //SET ORDENES DE KPI

                                //CONFIGURAR ORDEN MENSUAL DEL KPI
                                let vectorOrdenMensual = []
                                for (let cont = 0; cont < kpiForm.frecuenciaMensual; cont++) {
                                        vectorOrdenMensual.push(cont + 1)
                                }
                                if (vectorOrdenMensual.length == 1) {
                                        setOrdenMensualActual(vectorOrdenMensual[0])
                                }

                                setVectorOrdenMensual(vectorOrdenMensual)

                                //CONFIGURAR MESES SELECCIONABLES PARA INSERTAR DATOS
                                let vectorMesesKPI = kpiForm.meses_afectados.split(",")
                                setVectorMeses(vectorMesesKPI)
                        }

                        //ocultar si es semanal los items oportunos
                        if (kpiForm.tipoFrecuencia == "weekly") {
                                setEsSemanal(true)
                        }
                        else {
                                setEsSemanal(false)
                        }

                        setObjetivoActual(kpiForm.objetivo)
                        setWarningData(kpiForm.valor_aviso)

                        let modoDeCalculo = ""
                        switch (kpiForm.modoCalculo) {
                                case 1:
                                        modoDeCalculo = "<" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                                case 2:
                                        modoDeCalculo = "≤" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                                case 3:
                                        modoDeCalculo = "=" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                                case 4:
                                        modoDeCalculo = "≥" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                                case 5:
                                        modoDeCalculo = ">" + kpiForm.objetivo + " " + kpiForm.unidad
                                        break
                        }

                        setFormaCalculo(modoDeCalculo)

                        let cadenaWarning = ""
                        switch (kpiForm.modoCalculo) {
                                case 1:
                                        cadenaWarning = ">" + kpiForm.valor_aviso + " " + kpiForm.unidad
                                        break
                                case 2:
                                        cadenaWarning = ">" + kpiForm.valor_aviso + " " + kpiForm.unidad
                                        break
                                case 3:
                                        cadenaWarning = ""
                                        break
                                case 4:
                                        cadenaWarning = "<" + kpiForm.valor_aviso + " " + kpiForm.unidad
                                        break
                                case 5:
                                        cadenaWarning = "<" + kpiForm.valor_aviso + " " + kpiForm.unidad
                                        break
                        }

                        setWarningCalculo(cadenaWarning)
                }
                else {
                        setObjetivoActual('')
                        setWarningData('')
                        setFormaCalculo('')
                        setWarningCalculo('')
                }

        }, [kpiForm])




        return (
                <>

                        <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar(false, '')} fullWidth maxWidth='lg'>

                                <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                        {modo == "nuevo" ? "New data KPI" : "Edit data KPI"}
                                        {kpiForm != '' && kpiForm != undefined && kpiForm != null ?
                                                <IconButton onClick={() => setVerDetallesKpi(true)}><Help sx={{ color: 'background.paper' }} /></IconButton>
                                                : ''}
                                </DialogTitle>
                                <DialogContent>
                                        {/*INFORMACION DE LA EDICION */}
                                        <div className="radialbar" style={(valorWarning == true || existeRetraso == true || (existeRetraso == false && fechaTeoricaEntrega != "")) && modo != "editar" && modo != "consultar" ? { display: "block" } : { display: "none" }}>
                                                <Alert severity="warning">
                                                        <AlertTitle style={existeRetraso == true ? { display: "block" } : { display: "none" }}>Because you are submitting this record late, after creation you will be given 3 days to edit the record if necessary.</AlertTitle>
                                                        <AlertTitle style={existeRetraso == false && fechaTeoricaEntrega != "" ? { display: "block" } : { display: "none" }}>Please note that the editing period for this data will end on: {fechaTeoricaEntrega}, after this date it will not be possible to edit the record.</AlertTitle>
                                                        <AlertTitle style={valorWarning == true ? { display: "block" } : { display: "none" }}>The kpi result is within the target but is in warning values.</AlertTitle>
                                                </Alert>
                                        </div>

                                        {/*DEFINITIVO */}
                                        <div className="radialbar" style={(noCumpleObjetivo == false || iteracionYaAnadida == true || existeRetraso == true || kpiFuturo == true) && modo != "editar" && modo != "consultar" ? { display: "block" } : { display: "none" }}>
                                                <Alert severity="error">
                                                        <AlertTitle style={noCumpleObjetivo == false ? { display: "block" } : { display: "none" }}>As the target will not be met, you must fill in the field "Reason for non-target".</AlertTitle>
                                                        <AlertTitle style={iteracionYaAnadida == true ? { display: "block" } : { display: "none" }}>The result with this month and order you are trying to add is already registered.</AlertTitle>
                                                        <AlertTitle style={existeRetraso == true ? { display: "block" } : { display: "none" }}>You are delivering the kpi out of date, therefore you must specify the reason for the delay.</AlertTitle>
                                                        <AlertTitle style={kpiFuturo == true ? { display: "block" } : { display: "none" }}>The kpi you are trying to complete is a kpi that you cannot yet complete as it is a future date.</AlertTitle>
                                                </Alert>
                                        </div>
                                        {/*FIN DEFINITIVO */}

                                        <Grid container spacing={2} columns={16} style={{ marginTop: "5px" }}>

                                                <Grid item xs={8}>
                                                        <FormControl variant="standard" fullWidth>
                                                                <Autocomplete
                                                                        id="tags-outlined"
                                                                        value={misionSelect}
                                                                        options={listMisionAPI}
                                                                        onChange={(event, value) => setMisionSelect(value)}
                                                                        inputValue={misionSelect != '' && misionSelect != null && misionSelect != undefined ? misionSelect.code + " - " + misionSelect.name : ''}
                                                                        getOptionLabel={(option) => option.code + " - " + option.name}
                                                                        filterSelectedOptions
                                                                        fullWidth
                                                                        disabled={misionSeleccionado != '' || modo == "editar" || modo == "consultar" ? true : false}
                                                                        renderInput={(params) => (
                                                                                <TextField
                                                                                        {...params}
                                                                                        label="Mission"
                                                                                        placeholder="Mission"
                                                                                        size="small"
                                                                                        fullWidth

                                                                                />
                                                                        )}
                                                                />
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8}>
                                                        <FormControl variant="standard" fullWidth>
                                                                <Autocomplete
                                                                        id="tags-outlined"
                                                                        value={kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm : ''}
                                                                        options={listKpiValidos}
                                                                        onChange={(event, value) => setKpiForm(value)}
                                                                        getOptionLabel={(option) => option != '' && option != null && option != undefined ? option.codigo + " - " + option.titulo : ''}
                                                                        filterSelectedOptions
                                                                        fullWidth
                                                                        disabled={(kpiSeleccionado != '' && completeKpi) || modo == "editar" || modo == "consultar" ? true : false}
                                                                        renderInput={(params) => (
                                                                                <TextField
                                                                                        {...params}
                                                                                        label="KPI"
                                                                                        placeholder="KPI"
                                                                                        size="small"
                                                                                        fullWidth
                                                                                />
                                                                        )}
                                                                />
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8} style={{ display: esSemanal == true ? 'none' : 'block' }}>
                                                        <FormControl variant="outlined" fullWidth>
                                                                <InputLabel size="small" id="demo-simple-select-label">Month</InputLabel>
                                                                <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="rol"
                                                                        label="Month"
                                                                        size="small"
                                                                        disabled={modo == "editar" || modo == "consultar" ? true : false}
                                                                        onChange={e => { setMesActual(e.target.value); }}
                                                                        value={mesActual}
                                                                >

                                                                        {vectorMeses.map((elemento) => (
                                                                                <MenuItem value={elemento}> {elemento} </MenuItem>
                                                                        ))}

                                                                </Select>
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8} style={{ display: esSemanal == true || vectorOrdenMensual.length == 1 ? 'none' : 'block' }}>
                                                        <FormControl variant="outlined" fullWidth>
                                                                <InputLabel size="small" id="demo-simple-select-label">Delivery number of the month</InputLabel>
                                                                <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="rol"
                                                                        label="Delivery number of the month"
                                                                        size="small"
                                                                        disabled={modo == "editar" || modo == "consultar" ? true : false}
                                                                        onChange={e => { setOrdenMensualActual(e.target.value); }}
                                                                        value={ordenMensualActual}
                                                                >

                                                                        {vectorOrdenMensual.map((elemento) => (
                                                                                <MenuItem value={elemento}> {elemento} </MenuItem>
                                                                        ))}

                                                                </Select>
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8} style={{ display: esSemanal == false ? 'none' : 'block' }}>
                                                        <FormControl variant="outlined" fullWidth>
                                                                <InputLabel size="small" id="demo-simple-select-label">Week</InputLabel>
                                                                <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="rol"
                                                                        label="Week"
                                                                        size="small"
                                                                        disabled={modo == "editar" || modo == "consultar" ? true : false}
                                                                        onChange={e => { setWeekActual(e.target.value); }}
                                                                        value={weekActual}
                                                                >

                                                                        {[...Array(52).keys()].map((elemento) => (
                                                                                <MenuItem value={elemento + 1}> {elemento + 1} </MenuItem>
                                                                        ))}

                                                                </Select>
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8}>
                                                        <FormControl variant="outlined" fullWidth>
                                                                <InputLabel size="small" id="demo-simple-select-label">Year</InputLabel>
                                                                <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="rol"
                                                                        label="Year"
                                                                        size="small"
                                                                        disabled={modo == "editar" || modo == "consultar" ? true : false}
                                                                        onChange={e => { setYearActual(e.target.value); }}
                                                                        value={yearActual}
                                                                >

                                                                        {vectorAnoPosible.map((elemento) => (
                                                                                <MenuItem value={elemento}> {elemento} </MenuItem>
                                                                        ))}

                                                                </Select>
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8}>

                                                        <TextField
                                                                type="number"
                                                                shrink
                                                                label="Result"
                                                                id="result"
                                                                placeholder="Examples: 95.5"
                                                                disabled={modo == "consultar" ? true : false}
                                                                value={resultadoActual}
                                                                size="small"
                                                                fullWidth
                                                                onChange={e => setResultadoActual(e.target.value)}
                                                        />

                                                </Grid>

                                                <Grid item xs={16}>

                                                        <TextField
                                                                id="observaciones"
                                                                label="Observations"
                                                                multiline
                                                                rows={2}
                                                                disabled={modo == "consultar" ? true : false}
                                                                value={observacionesActual}
                                                                size="small"
                                                                fullWidth
                                                                onChange={e => setObservacionesActual(e.target.value)}
                                                        />

                                                </Grid>

                                                <Box style={{ display: existeRetraso == true ? 'block' : 'none' }} sx={{ p: 2, border: '1px dashed grey', width: '100%', marginTop: '20px', marginBottom: '20px' }}>
                                                        <div style={{ width: '100%', textAlign: 'center', marginBottom: '5px', display: 'block' }}>
                                                                <span className="font-semibold">
                                                                        Out of target OTD reason
                                                                </span>
                                                        </div>
                                                        <Grid container spacing={2} columns={16}>
                                                                <Grid item xs={4}>

                                                                        <FormControl variant="outlined" size="small" fullWidth>
                                                                                <InputLabel htmlFor="grouped-select">Delay category by time</InputLabel>
                                                                                <Select
                                                                                        id="division"
                                                                                        fullWidth
                                                                                        size="small"
                                                                                        native
                                                                                        label="Delay category by time"
                                                                                        onChange={e => setCategoriaTiempo(e.target.value)}
                                                                                        value={categoriaTiempo != undefined ? categoriaTiempo : ''}
                                                                                        disabled={modo == "consultar" ? true : false}
                                                                                >
                                                                                        <option value=""></option>
                                                                                        {tipoCategoriasAPI.map((elemento) => (
                                                                                                <optgroup label={elemento}>
                                                                                                        {categoriaListAPI.filter(item => item.tipo == elemento).map((subCategory) => (
                                                                                                                <option value={subCategory.id}>{subCategory.titulo}</option>
                                                                                                        ))}
                                                                                                </optgroup>

                                                                                        ))}
                                                                                </Select>
                                                                        </FormControl>
                                                                </Grid>

                                                                <Grid item xs={12}>

                                                                        <TextField
                                                                                id="reason_delay"
                                                                                label="Reason for delay"
                                                                                multiline
                                                                                rows={1}
                                                                                disabled={modo == "consultar" ? true : false}
                                                                                value={razonRetrasoActual}
                                                                                size="small"
                                                                                fullWidth
                                                                                onChange={e => setRazonRetrasoActual(e.target.value)}
                                                                        />

                                                                </Grid>
                                                        </Grid>
                                                        <h5><b>Deadline for delivery:</b> {fechaTeoricaEntrega}</h5>
                                                </Box>
                                                <Box style={{ display: noCumpleObjetivo == false ? 'block' : 'none' }} sx={{ p: 2, border: '1px dashed grey', width: '100%', marginTop: '20px', marginBottom: '20px' }}>
                                                        <div style={{ width: '100%', textAlign: 'center', marginBottom: '5px', display: 'block' }}>
                                                                <span className="font-semibold">
                                                                        Out of target OQD reason
                                                                </span>
                                                        </div>
                                                        <Grid container spacing={2} columns={16}>
                                                                <Grid item xs={4}>

                                                                        <FormControl variant="outlined" size="small" fullWidth>
                                                                                <InputLabel htmlFor="grouped-select">Delay category by quality</InputLabel>
                                                                                <Select
                                                                                        id="division"
                                                                                        size="small"
                                                                                        fullWidth
                                                                                        native
                                                                                        label="Delay category by quality"
                                                                                        onChange={e => setCategoriaCalidad(e.target.value)}
                                                                                        value={categoriaCalidad != undefined ? categoriaCalidad : ''}
                                                                                        disabled={modo == "consultar" ? true : false}
                                                                                >
                                                                                        <option value=""></option>
                                                                                        {tipoCategoriasAPI.map((elemento) => (
                                                                                                <optgroup label={elemento}>
                                                                                                        {categoriaListAPI.filter(item => item.tipo == elemento).map((subCategory) => (
                                                                                                                <option value={subCategory.id}>{subCategory.titulo}</option>
                                                                                                        ))}
                                                                                                </optgroup>

                                                                                        ))}
                                                                                </Select>
                                                                        </FormControl>
                                                                </Grid>

                                                                <Grid item xs={12}>

                                                                        <TextField
                                                                                id="reason_delay"
                                                                                label="Reason for non-target"
                                                                                multiline
                                                                                rows={1}
                                                                                disabled={modo == "consultar" ? true : false}
                                                                                value={razonNoCumpleObjetivo}
                                                                                size="small"
                                                                                fullWidth
                                                                                onChange={e => setRazonNoCumpleObjetivo(e.target.value)}
                                                                        />

                                                                </Grid>
                                                        </Grid>
                                                </Box>

                                        </Grid>

                                        <Dialog open={verDetallesKpi} onClose={() => setVerDetallesKpi(false)} fullWidth maxWidth="md" >
                                                <DialogTitle>Associated KPI</DialogTitle>
                                                <List sx={{ pt: 0 }} style={{ margin: '20px' }}>

                                                        <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                                                        <TableBody>
                                                                                <>
                                                                                        <TableRow
                                                                                                key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.titulo : ''}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Title:</b></TableCell>
                                                                                                <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.titulo : ''}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.codigo : ''}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Code:</b></TableCell>
                                                                                                <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.codigo : ''}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.tipo : ''}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Type:</b></TableCell>
                                                                                                <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.tipo : ''}</TableCell>

                                                                                        </TableRow>
                                                                                        <TableRow
                                                                                                key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.descripcion : ''}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Description:</b></TableCell>
                                                                                                <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.descripcion : ''}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.datos_usados : ''}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Data used:</b></TableCell>
                                                                                                <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.datos_usados : ''}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.tipoFrecuencia : ''}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Type of delivery:</b></TableCell>
                                                                                                <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.tipoFrecuencia : ''}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.frecuencia : ''}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Annual deliveries:</b></TableCell>
                                                                                                <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.frecuencia : ''}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={formaCalculo}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Calculation mode:</b></TableCell>
                                                                                                <TableCell align="left">{formaCalculo}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={warningCalculo}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Notification of a warning:</b></TableCell>
                                                                                                <TableCell align="left">{warningCalculo}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={kpiForm != null && kpiForm != undefined && kpiForm != '' ? kpiForm.mision_name : ''}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Mission:</b></TableCell>
                                                                                                <TableCell align="left">{kpiForm != '' && kpiForm != null && kpiForm != undefined ? kpiForm.mision_name : ''}</TableCell>

                                                                                        </TableRow>

                                                                                </>

                                                                        </TableBody>
                                                                </Table>
                                                        </TableContainer>

                                                </List>
                                                <DialogActions>

                                                        <Button onClick={() => setVerDetallesKpi(false)}>Close</Button>

                                                </DialogActions>
                                        </Dialog>
                                </DialogContent>
                                <DialogActions>

                                        <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertar(false, ''), resetValue() }}>Close</Button>
                                        <Button variant="outlined" disabled={botonGuardarDataKpi} style={{ display: modo == 'consultar' ? 'none' : 'inline' }} onClick={() => { nuevoKpi(), cambiarVisibilidadModalInsertar(false, '') }}> Save</Button>

                                </DialogActions>

                        </Dialog>
                </>
        )
}

