//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import * as moment from 'moment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import IconButton from "@mui/material/IconButton";
import ReactSpeedometer from "react-d3-speedometer"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import ListSubheader from '@mui/material/ListSubheader';

//Grid importaciones

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
        cambiarVisibilidadModalPrincipalAction,
        cambiarVisibilidadModalInsertarRmRiskOpportunityAction,
        cambiarEstadoRmRegistroAction,
        insertarRmRegistroModalInsertarAction,
        updateRmRegistroAction,
        mostrarRmRegistroAPIAction
} from '../store/actions'
import { cambiarEstadoRmTasksAction, mostrarRmAccionAPIAction } from '../../tasks/store/actions'
import store from "app/store/index"

import {
        mostrarCategoryDesactivateAPIAction,
        mostrarCategoryAPIAction
} from '../../../../../Managment/Category/store/actions'

import {
        mostrarTiposUnicosAPIAction
} from '../../../../../Managment/Category/store/actions'


import {
        getAllLocationCustomerByWPAPIAction,
        getLocationCustomerByMisionAPIAction
} from '../../../../../Managment/Customers/store/actions'

import {
        insertarLogRiskAPIAction
} from '../../../../../Managment/LogRisk/store/actions'

import Chart from 'react-apexcharts';
import './estilos.css';
import { showMessage } from 'app/store/fuse/messageSlice'

import {
        insertarNewNotificationAPIAction,
} from '../../../../../Managment/Notifications/store/actions'

import {
        mostrarRiskManagementAPIAction,
        mostrarRiskManagementByContractAPIAction
} from '../../../store/actions'

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


const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
                '& .MuiSwitch-thumb': {
                        width: 15,
                },
                '& .MuiSwitch-switchBase.Mui-checked': {
                        transform: 'translateX(9px)',
                },
        },
        '& .MuiSwitch-switchBase': {
                padding: 2,
                '&.Mui-checked': {
                        transform: 'translateX(12px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                                opacity: 1,
                                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                        },
                },
        },
        '& .MuiSwitch-thumb': {
                boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
                width: 12,
                height: 12,
                borderRadius: 6,
                transition: theme.transitions.create(['width'], {
                        duration: 200,
                }),
        },
        '& .MuiSwitch-track': {
                borderRadius: 16 / 2,
                opacity: 1,
                backgroundColor:
                        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
                boxSizing: 'border-box',
        },
}));


//Tabla de Ayuda Severity




//Variables de las tablas HELP

function createDataHelp(severity, criteria, value) {
        return { severity, criteria, value };
}



const rowsSeverity = [
        createDataHelp('Very low', 'This is a minor flaw. It would probably not affect the customer.', '1'),
        createDataHelp('Low', 'The failure would cause a minor inconvenience to the customer. It is easily rectifiable.', '2-3'),
        createDataHelp('Moderate', 'The failure causes some customer dissatisfaction. The customer will observe deterioration in performance.', '4-6'),
        createDataHelp('High', 'The failure may be critical to the system. It produces a high degree of dissatisfaction.', '7-8'),
        createDataHelp('Very High', 'Highly critical failure that affects the safety of the product or process. Serious non-compliance with regulatory standards.', '9-10'),
];

const rowsFrequency = [
        createDataHelp('Very low', 'Failures are not associated with nearly identical processes.', '1'),
        createDataHelp('Low', 'Isolated failures in similar or almost identical processes. They are expected in the system but unlikely to occur.', '2-3'),
        createDataHelp('Moderate', 'Occasional defect. These defects are likely to appear a few times in the life of the system.', '4-6'),
        createDataHelp('High', 'The failure has occurred with some frequency in the past in similar or previous processes.', '7-8'),
        createDataHelp('Very High', 'Almost inevitable failure. Failure is certain to occur frequently.', '9-10'),
];


const rowsDetection = [
        createDataHelp('Very low', 'The defect is obvious. It is highly unlikely to go undetected by existing controls.', '1'),
        createDataHelp('Low', 'The defect might not be detected in a first control, although it would certainly be detected later.', '2-3'),
        createDataHelp('Moderate', 'The defect is detectable and may not reach the customer. It is likely to be detected in the later stages of production.', '4-6'),
        createDataHelp('High', 'The defect is difficult to detect with current procedures.', '7-8'),
        createDataHelp('Very High', 'The defect cannot be detected. It is very likely to reach the end customer.', '9-10'),
];


//End variables tablas HELP


export default function ModalInsertar() {

        const classes = useStyles();
        const dispatch = useDispatch()

        //estados locales del formulario

        const [riskManagementActual, setRiskManagementActual] = useState('')
        const [riesgoActual, setRiesgoActual] = useState('')
        const [fechaDeteccionActual, setFechaDeteccionActual] = useState('')
        const [efectoFalloActual, setEfectoFalloActual] = useState('')
        const [causaFalloActual, setCausaFalloActual] = useState('')
        const [controlesActual, setControlesActual] = useState('')
        const [gravedadActual, setGravedadActual] = useState('')
        const [ocurrenciaActual, setOcurrenciaActual] = useState('')
        const [deteccionActual, setDeteccionActual] = useState('')
        const [nprActual, setNprActual] = useState('Severity, frequency and detection are required')
        const [priorizacionActual, setPriorizacionActual] = useState('NPR is necessary')
        const [observacionesActual, setObservacionesActual] = useState('')
        const [categoriaActual, setCategoriaActual] = useState('')
        const [tomarAccion, setTomarAccion] = useState('No action necessary')
        const [dinamicButton, setDinamicButton] = useState('')
        const [revalorando, setRevalorando] = useState(false)
        const [locationActual, setLocationActual] = useState('')
        let crearOaccion = ''
        const [porcentajeNPR, setPorcentajeNPR] = useState([0])
        const [hiddenGrafico, setHiddenGrafico] = useState(true)
        const [alertaTipo, setAlertaTipo] = useState('info')
        const [guardarCambios, setGuardarCambios] = useState(false)

        const [botonControl, setBotonControl] = useState(true)
        const [deslizaRO, setDeslizaRO] = useState('')
        const [deshabilitadaDeslizaRO, setDeshabilitadaDeslizaRO] = useState(false)

        const [vectorAcciones, setVectorAcciones] = useState([])

        //Diálogos de ayuda
        const [ayudaNPR, setAyudaNPR] = useState(false)
        const [ayudaSeverity, setAyudaSeverity] = useState(false)
        const [ayudaFrequency, setAyudaFrequency] = useState(false)
        const [ayudaDetection, setAyudaDetection] = useState(false)
        const [ayudaAMFE, setAyudaAMFE] = useState(false)
        const [ayudaAction, setAyudaAction] = useState(false)

        //end_locales_formularios
        const [recordatorioClose, setRecordatorioClose] = useState(false)

        // Obtener los states de Redux
        const visibilidadModalInsertar = useSelector(state => state.fuse.rmRegistroComponente.visibilidadModalInsertar)
        const filaSeleccionadaGridRiskManagement = useSelector(state => state.fuse.riskManagementComponente.filaSeleccionadaGrid)
        const ultimoIdCreadoRiskManagement = useSelector(state => state.fuse.riskManagementComponente.ultimoIdCreado)
        const revRO = useSelector(state => state.fuse.rmRegistroComponente.rev)
        const modoRO = useSelector(state => state.fuse.rmRegistroComponente.modo)
        const roList = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListAPI)
        const AMFEList = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI)
        const roFilaSeleccionada = useSelector(state => state.fuse.rmRegistroComponente.filaSeleccionadaGrid)
        const categoriaListAPI = useSelector(state => state.fuse.categoriaComponent.categoriaListAPI)
        const tipoCategoriasAPI = useSelector(state => state.fuse.categoriaComponent.tipoCategoriasAPI)
        const locationCustomerListAPI = useSelector(state => state.fuse.customerComponent.locationCustomerListAPI)
        const ultimoIdCreadoRO = useSelector(state => state.fuse.rmRegistroComponente.ultimoIdCreado)
        const personLogin = useSelector(state => state.fuse.userComponente.person)
        const rmRegistrosListLastVersionAPI = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListLastVersionAPI)
        const rmAccionesListAPI = useSelector(state => state.fuse.tasksAccionesComponente.rmAccionesListAPI)
        const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

        //Creamos funciones para hacer uso de Actions Redux
        const cambiarVisibilidadModalInsertar = (valor) => dispatch(cambiarVisibilidadModalInsertarRmRiskOpportunityAction(valor))
        const insertarRmRegistroModalInsertar = (riskManagement) => dispatch(insertarRmRegistroModalInsertarAction(riskManagement))
        const mostrarCategoryAPI = () => dispatch(mostrarCategoryAPIAction())
        const mostrarTiposUnicosAPI = () => dispatch(mostrarTiposUnicosAPIAction())
        const getLocationCustomerByMisionAPI = (idMision) => dispatch(getLocationCustomerByMisionAPIAction(idMision))
        const insertarLogRiskAPI = (json) => dispatch(insertarLogRiskAPIAction(json))

        const mostrarRiskManagementAPI = () => dispatch(mostrarRiskManagementAPIAction())
        const mostrarRiskManagementByContractAPI = (idPersona) => dispatch(mostrarRiskManagementByContractAPIAction(idPersona))

        useEffect(() => {

                if (rmAccionesListAPI.length != 0) {
                        setVectorAcciones(rmAccionesListAPI)
                }

        }, [rmAccionesListAPI])

        useEffect(() => {

                if (revalorando == true) {
                        //COMPROBAR QUE TIENE PERMISOS PARA REEVALUAR
                        if (personLoginPermisos.find((item) => item['name'] == "Can add rm risk opportunity") == undefined) {
                                dispatch(
                                        showMessage({
                                                message: "You are not allowed to re-evaluate the R&O, the FMEA managers have been notified to take this action.",
                                                variant: "error"
                                        })
                                )

                                //AÑADIR NOTIFICACION A LOS MIEMBROS
                                let rmRegistroRellenar = store.getState().fuse.rmRegistroComponente.rellenarCamposReevaluar
                                let rmAmfeActual = AMFEList.filter(registro => registro.id == rmRegistroRellenar['id_risk_management'])[0]
                                if (rmAmfeActual != undefined) {
                                        for (let aux in rmAmfeActual['member']) {
                                                dispatch(insertarNewNotificationAPIAction({
                                                        origen_notification_id: personLogin.id,
                                                        destino_notification_id: rmAmfeActual['member'][aux],
                                                        fecha: new Date().toISOString().split("T")[0],
                                                        observations: "The R&O with name " + rmRegistroRellenar.risk + ", is pending to be re-evaluated.",
                                                        typeNotification: "informacion",
                                                        active: true
                                                }))
                                        }
                                }

                                cambiarVisibilidadModalInsertar(false)
                        }
                }

        }, [revalorando])

        //Comprueba si hay que revalorar nuevo RO
        const steps = [
                'Create FMEA',
                'Create R & O',
                tomarAccion,
        ];

        useEffect(() => {

                if (ultimoIdCreadoRO != '' && ultimoIdCreadoRO['id'] != "" && ultimoIdCreadoRO != undefined) {
                        //AÑADIR REGISTRO DE EDICION
                        if (ultimoIdCreadoRO.rev == 1) {
                                //CREACION DE UNO NUEVO
                                insertarLogRiskAPI({
                                        persona: personLogin.id,
                                        fecha_accion: new Date().toISOString().split("T")[0],
                                        hora_accion: new Date().toLocaleTimeString(),
                                        accion: "Creation",
                                        ro_relacionado: ultimoIdCreadoRO['id'],
                                        descripcion: "R&O creation with id: " + ultimoIdCreadoRO['id']
                                })

                                //AÑADIR NOTIFICACION A LOS MIEMBROS
                                let rmAmfeActual = AMFEList.filter(registro => registro.id == ultimoIdCreadoRO.id_risk_management)[0]
                                if (rmAmfeActual != undefined) {
                                        for (let aux in rmAmfeActual['member']) {
                                                dispatch(insertarNewNotificationAPIAction({
                                                        origen_notification_id: personLogin.id,
                                                        destino_notification_id: rmAmfeActual['member'][aux],
                                                        fecha: new Date().toISOString().split("T")[0],
                                                        observations: "User " + personLogin.first_name + " " + personLogin.last_name + " has created the R&O: " + ultimoIdCreadoRO.risk,
                                                        typeNotification: "informacion",
                                                        active: true
                                                }))
                                        }
                                }
                        }
                        else {
                                //CREACION DE UN RO PERO POR REEVALUADO
                                insertarLogRiskAPI({
                                        persona: personLogin.id,
                                        fecha_accion: new Date().toISOString().split("T")[0],
                                        hora_accion: new Date().toLocaleTimeString(),
                                        accion: "Creation",
                                        ro_relacionado: ultimoIdCreadoRO['id'],
                                        descripcion: "R&O created from a reassessment with id: " + ultimoIdCreadoRO['id']
                                })

                                //AÑADIR NOTIFICACION A LOS MIEMBROS
                                let rmAmfeActual = AMFEList.filter(registro => registro.id == ultimoIdCreadoRO['id_risk_management'])[0]
                                if (rmAmfeActual != undefined) {
                                        for (let aux in rmAmfeActual['member']) {
                                                dispatch(insertarNewNotificationAPIAction({
                                                        origen_notification_id: personLogin.id,
                                                        destino_notification_id: rmAmfeActual['member'][aux],
                                                        fecha: new Date().toISOString().split("T")[0],
                                                        observations: "User " + personLogin.first_name + " " + personLogin.last_name + " has created the R&O: " + ultimoIdCreadoRO['risk'] + ", because the R&O has been re-evaluated.",
                                                        typeNotification: "informacion",
                                                        active: true
                                                }))
                                        }
                                }
                        }

                        //RELOAD DE RISK
                        if (personLoginPermisos.find((item) => item['name'] == "Can See All Risk") != undefined) {
                                mostrarRiskManagementAPI()
                        }
                        else {
                                mostrarRiskManagementByContractAPI(personLogin.id)
                        }

                        //RESET VALUE DE ULTIMO ID CREADO
                        //dispatch(cambiarEstadoRmRegistroAction('ultimoIdCreado', ''))
                }

        }, [ultimoIdCreadoRO])



        function crearRmRegistro() {

                let idRiskManagement

                let vectorIDSite = []
                for (let elemento in locationActual) {
                        vectorIDSite.push(locationActual[elemento].id)
                }

                if (modoRO == 'editar') {  //Si el modo es editar

                        let revActual = store.getState().fuse.rmRegistroComponente.rev

                        dispatch(updateRmRegistroAction(roFilaSeleccionada, {
                                id_risk_management: filaSeleccionadaGridRiskManagement,
                                risk: riesgoActual,
                                d_detection: fechaDeteccionActual,
                                glitch_effect: efectoFalloActual,
                                cause_failure: causaFalloActual,
                                current_controls: controlesActual,
                                gravity: gravedadActual,
                                idea: ocurrenciaActual,
                                detection: deteccionActual,
                                npr: nprActual,
                                priorization: priorizacionActual,
                                observations: observacionesActual,
                                categorizacion: categoriaActual,
                                type: deslizaRO,
                                site: vectorIDSite,
                                rev: revActual == '' ? 1 : revActual,


                        }))

                        //AÑADIR REGISTRO DE EDICION
                        insertarLogRiskAPI({
                                persona: personLogin.id,
                                fecha_accion: new Date().toISOString().split("T")[0],
                                hora_accion: new Date().toLocaleTimeString(),
                                accion: "Edit",
                                ro_relacionado: roFilaSeleccionada,
                                descripcion: "R&O edition with id: " + filaSeleccionadaGridRiskManagement
                        })

                        //AÑADIR NOTIFICACION A LOS MIEMBROS

                        let rmROActual = roList.filter(registro => registro.id == roFilaSeleccionada)[0]
                        let rmAmfeActual = AMFEList.filter(registro => registro.id == rmROActual['id_risk_management'])[0]
                        if (rmAmfeActual != undefined) {
                                for (let aux in rmAmfeActual['member']) {
                                        dispatch(insertarNewNotificationAPIAction({
                                                origen_notification_id: personLogin.id,
                                                destino_notification_id: rmAmfeActual['member'][aux],
                                                fecha: new Date().toISOString().split("T")[0],
                                                observations: "User " + personLogin.first_name + " " + personLogin.last_name + " has edited the R&O: " + rmROActual.risk,
                                                typeNotification: "informacion",
                                                active: true
                                        }))
                                }
                        }


                } else {   //Si el modo es crear

                        if (ultimoIdCreadoRiskManagement != '') {
                                idRiskManagement = ultimoIdCreadoRiskManagement.id

                        } else {
                                idRiskManagement = filaSeleccionadaGridRiskManagement

                        }

                        let revActual = store.getState().fuse.rmRegistroComponente.rev

                        insertarRmRegistroModalInsertar({

                                id_risk_management: idRiskManagement,
                                risk: riesgoActual,
                                d_detection: fechaDeteccionActual,
                                glitch_effect: efectoFalloActual,
                                cause_failure: causaFalloActual,
                                current_controls: controlesActual,
                                gravity: gravedadActual,
                                idea: ocurrenciaActual,
                                detection: deteccionActual,
                                npr: nprActual,
                                priorization: priorizacionActual,
                                observations: observacionesActual,
                                type: deslizaRO,
                                categorizacion: categoriaActual,
                                rev: revActual == '' ? 1 : revActual,
                                site: vectorIDSite
                        })



                        if (alertaTipo == "error") {

                                dispatch(cambiarEstadoRmTasksAction('visibilidad', true))
                                dispatch(cambiarEstadoRmTasksAction('visibilidadNuevaAccion', true))

                        } else {

                                dispatch(cambiarVisibilidadModalPrincipalAction(false))
                        }

                }

                cambiarVisibilidadModalInsertar(false)

                dispatch(cambiarEstadoRmRegistroAction('modo', ''))

        }

        function checkRevaluar() {

                if (revRO != '') {
                        steps.push('Re-evaluate')

                }

        }

        function encabezadoTitulo() {
                let titulo


                if (modoRO == 'editar') {
                        titulo = 'Edit R & O'

                } else {

                        revRO == '' ? titulo = 'Create R & O' : titulo = 'Re-evaluate'
                }

                return titulo


        }

        function labelBotonCreate() {
                let label


                if (modoRO == 'editar') {
                        label = 'Edit'
                } 
                else {
                        label = alertaTipo == 'error' ? 'and create actions' : ''
                        label = "Save " + label
                }

                return label


        }

        function formatearValorGrafica(valorGrafica) {
                let newValue = 0

                if (valorGrafica > 100 && valorGrafica < 150) { newValue = 105; }
                if (valorGrafica >= 150 && valorGrafica < 200) { newValue = 110; }
                if (valorGrafica >= 200 && valorGrafica < 300) { newValue = 115; }
                if (valorGrafica >= 300 && valorGrafica < 400) { newValue = 120; }
                if (valorGrafica >= 400 && valorGrafica < 500) { newValue = 125; }
                if (valorGrafica >= 500 && valorGrafica < 600) { newValue = 130; }
                if (valorGrafica >= 600 && valorGrafica < 700) { newValue = 135; }
                if (valorGrafica >= 700 && valorGrafica < 800) { newValue = 140; }
                if (valorGrafica >= 800 && valorGrafica < 900) { newValue = 145; }
                if (valorGrafica >= 900 && valorGrafica <= 1000) { newValue = 150; }

                return newValue
        }

        useEffect(() => {

                mostrarCategoryAPI()
                mostrarTiposUnicosAPI()

                if (modoRO == 'editar') {

                        let rmROActual = roList.filter(registro => registro.id == roFilaSeleccionada)[0]

                        if (rmROActual != null) {

                                setDeslizaRO(rmROActual.type)
                                setRiesgoActual(rmROActual.risk)
                                setFechaDeteccionActual(rmROActual.d_detection)
                                setEfectoFalloActual(rmROActual.glitch_effect)
                                setCausaFalloActual(rmROActual.cause_failure)
                                setControlesActual(rmROActual.current_controls)
                                setGravedadActual(rmROActual.gravity)
                                setOcurrenciaActual(rmROActual.idea)
                                setDeteccionActual(rmROActual.detection)
                                setObservacionesActual(rmROActual.observations)
                                setCategoriaActual(rmROActual.categorizacion)


                        }
                }
                else {

                        setRevalorando(false)

                        setDeslizaRO('')
                        setRiesgoActual('')
                        setFechaDeteccionActual('')
                        setEfectoFalloActual('')
                        setCausaFalloActual('')
                        setControlesActual('')
                        setGravedadActual('')
                        setOcurrenciaActual('')
                        setDeteccionActual('')
                        setNprActual('Gravity,idea and detection are required')
                        setPriorizacionActual('NPR is necessary')
                        setObservacionesActual('')
                        setTomarAccion('No action necessary')
                        setDinamicButton('')
                        setCategoriaActual('')
                        setLocationActual([])

                }


        }, [modoRO])


        /*      Siempre que se cierre visibilidad de insertar R&O cambiar visibilidad de principal RO
         */
        useEffect(() => {

                if (store.getState().fuse.tasksAccionesComponente.visibilidad == true) {
                        let filaSeleccionadaRiskManagement = store.getState().fuse.riskManagementComponente.filaSeleccionadaGrid
                        let ultimoIdCreado = store.getState().fuse.riskManagementComponente.ultimoIdCreado

                        if (filaSeleccionadaRiskManagement != "") {
                                dispatch(mostrarRmRegistroAPIAction(filaSeleccionadaRiskManagement));

                        } else {
                                dispatch(mostrarRmRegistroAPIAction(ultimoIdCreado['id']));


                        }

                }



        }, [store.getState().fuse.tasksAccionesComponente.visibilidad])

        useEffect(() => {

                if (modoRO == 'editar' && roFilaSeleccionada != undefined) {
                        let rmROActual = roList.filter(registro => registro.id == roFilaSeleccionada)[0]

                        let vectLocations = []
                        for (let elemento in rmROActual.site) {
                                let locationSelect = locationCustomerListAPI.filter(registro => registro.id == rmROActual.site[elemento])[0]
                                vectLocations.push(locationSelect)
                        }
                        setLocationActual(vectLocations)
                }

        }, [locationCustomerListAPI])

        useEffect(() => {
                if (visibilidadModalInsertar == true) {
                        let amfeSelect = AMFEList.filter(registro => registro.id == (filaSeleccionadaGridRiskManagement == '' ? ultimoIdCreadoRiskManagement : filaSeleccionadaGridRiskManagement))[0]
                        if (amfeSelect != undefined) {
                                getLocationCustomerByMisionAPI(amfeSelect.mision)
                        }

                }
                else if (visibilidadModalInsertar == false) {
                        resetValues()
                }

        }, [visibilidadModalInsertar])

        function resetValues() {
                setRevalorando(false)

                setDeslizaRO('')
                setRiesgoActual('')
                setFechaDeteccionActual('')
                setEfectoFalloActual('')
                setCausaFalloActual('')
                setControlesActual('')
                setGravedadActual('')
                setOcurrenciaActual('')
                setDeteccionActual('')
                setNprActual('Gravity,idea and detection are required')
                setPriorizacionActual('NPR is necessary')
                setObservacionesActual('')
                setTomarAccion('No action necessary')
                setDinamicButton('')
                setCategoriaActual('')
                setLocationActual([])
        }

        useEffect(() => {

                let rmRegistroRellenar = store.getState().fuse.rmRegistroComponente.rellenarCamposReevaluar
                let revisionAcumulada = store.getState().fuse.rmRegistroComponente.rev

                if (rmRegistroRellenar != '') {
                        //dispatch(mostrarRmAccionAPIAction(rmRegistroRellenar.id))
                        setRevalorando(true)
                        setDeslizaRO(rmRegistroRellenar.type)
                        setRiesgoActual(rmRegistroRellenar.risk)
                        setFechaDeteccionActual(rmRegistroRellenar.d_detection)
                        setEfectoFalloActual(rmRegistroRellenar.glitch_effect)
                        setCausaFalloActual(rmRegistroRellenar.cause_failure)
                        setControlesActual(rmRegistroRellenar.current_controls)
                        setGravedadActual(rmRegistroRellenar.gravity)
                        setOcurrenciaActual(rmRegistroRellenar.idea)
                        setDeteccionActual(rmRegistroRellenar.detection)
                        setNprActual('Gravity,idea and detection are required')
                        setPriorizacionActual(rmRegistroRellenar.priorization)
                        setObservacionesActual(rmRegistroRellenar.observations)
                        setTomarAccion('No action necessary')
                        setCategoriaActual(rmRegistroRellenar.categorizacion)

                        /*let categoriaSelect = categoriaListAPI.filter(elemento => elemento.id == rmRegistroRellenar.categorizacion)[0]
                        if (categoriaSelect != null) {
                                setCategoriaActual(rmRegistroRellenar.categorizacion)
                        }*/

                        setDeshabilitadaDeslizaRO(true)

                } else if (revisionAcumulada > 1) {
                        setRevalorando(true)
                        setDeshabilitadaDeslizaRO(true)
                } else {
                        setRevalorando(false)

                        setDeslizaRO('')
                        setRiesgoActual('')
                        setFechaDeteccionActual('')
                        setEfectoFalloActual('')
                        setCausaFalloActual('')
                        setControlesActual('')
                        setGravedadActual('')
                        setOcurrenciaActual('')
                        setDeteccionActual('')
                        setNprActual('Gravity,idea and detection are required')
                        setPriorizacionActual('NPR is necessary')
                        setObservacionesActual('')
                        setTomarAccion('No action necessary')
                        setDinamicButton('')
                        setCategoriaActual('')

                }


        }, [store.getState().fuse.rmRegistroComponente.rellenarCamposReevaluar, store.getState().fuse.rmRegistroComponente.rev]);


        //Calcula el NPR
        useEffect(() => {
                if (gravedadActual == '' || ocurrenciaActual == '' || deteccionActual == '') {

                        setNprActual('Severity, frequency and detection are required')

                } else {

                        setNprActual(gravedadActual * ocurrenciaActual * deteccionActual)

                }

        }, [gravedadActual, ocurrenciaActual, deteccionActual, store.getState().fuse.rmRegistroComponente.rellenarCamposReevaluar]);



        /* Comprobar si ha rellenado todos los campos */

        useEffect(() => {

                let resultdate = moment(fechaDeteccionActual, 'YYYY-MM-DD').isValid()

                if (riesgoActual.trim() != '' &&
                        efectoFalloActual.trim() != '' &&
                        causaFalloActual.trim() != '' &&
                        controlesActual.trim() != '' &&
                        gravedadActual != '' &&
                        ocurrenciaActual != '' &&
                        deteccionActual != '' &&
                        deslizaRO != '' &&
                        resultdate &&
                        categoriaActual != '') {


                        setBotonControl(false)

                } else {
                        setBotonControl(true)

                }

                //Comprobar Close without saving


                if (riesgoActual.trim() != '' ||
                        efectoFalloActual.trim() != '' ||
                        causaFalloActual.trim() != '' ||
                        controlesActual.trim() != '' ||
                        gravedadActual != '' ||
                        ocurrenciaActual != '' ||
                        deteccionActual != '' ||
                        deslizaRO != '' ||
                        fechaDeteccionActual != null ||
                        categoriaActual != '') {

                        setGuardarCambios(true)

                } else {
                        setGuardarCambios(false)

                }

        })

        //Funcion Set value
        function establecerValorRadioBoton(valor) {
                if (!revalorando) {
                        setDeslizaRO(valor)
                }
        }


        //Calcula Priorization
        useEffect(() => {


                setDinamicButton()
                crearOaccion = "save"

                if (nprActual > 100) {
                        setPriorizacionActual("It is necessary to evaluate and take action")
                        setTomarAccion('Create actions')

                        crearOaccion = "create"
                        setAlertaTipo("error")


                } else if (nprActual > 80) {
                        setPriorizacionActual("The risk will be monitored. The manager will decide whether to take action")
                        setAlertaTipo("warning")

                } else {
                        setTomarAccion('No action required')
                        setPriorizacionActual("No action required")
                        setAlertaTipo("info")
                }

                if (nprActual != 'Severity, frequency and detection are required') {
                        setPorcentajeNPR([(parseInt(nprActual) * 100) / 1000])


                        setHiddenGrafico(false)

                } else {

                        setHiddenGrafico(true)
                }


        }, [nprActual]);


        return (

                <Dialog open={visibilidadModalInsertar} disableScrollLock={false} onClose={() => { cambiarVisibilidadModalInsertar(false); dispatch(cambiarVisibilidadModalPrincipalAction(false)) }} fullWidth maxWidth='lg'>

                        <Box sx={{ width: '100%' }} style={{ marginTop: "20px", marginBottom: "20px", display: modoRO == 'editar' ? 'none' : 'block' }}>

                                {/* Comprobar si es para revaluar */}

                                {checkRevaluar()}

                                <Stepper activeStep={revRO == '' ? 1 : 3} alternativeLabel>
                                        {steps.map((label) => (
                                                <Step key={label}>
                                                        <StepLabel>{label} {label == 'Create FMEA' ?
                                                                <IconButton style={{ margin: '-9px' }} onClick={() => setAyudaAMFE(true)}><InfoOutlined /></IconButton>
                                                                : ''}
                                                                {label == 'No action necessary' && revalorando == true ?
                                                                        <IconButton style={{ margin: '-9px' }} onClick={() => setAyudaAction(true)}><InfoOutlined /></IconButton>
                                                                        :
                                                                        ''
                                                                }
                                                                {label == 'Create actions' && revalorando == true ?
                                                                        <IconButton style={{ margin: '-9px' }} onClick={() => setAyudaAction(true)}><InfoOutlined /></IconButton>
                                                                        :
                                                                        ''
                                                                }

                                                        </StepLabel>
                                                </Step>
                                        ))}
                                </Stepper>


                                {/*   Dialog datos AMFE*/}

                                <Dialog open={ayudaAMFE} onClose={() => setAyudaAMFE(false)} fullWidth maxWidth="xl" >
                                        <DialogTitle>Associated FMEA</DialogTitle>
                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


                                                <TableContainer component={Paper}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                                                <TableBody>
                                                                        {AMFEList.filter(registro => registro.id == (filaSeleccionadaGridRiskManagement == '' ? ultimoIdCreadoRiskManagement : filaSeleccionadaGridRiskManagement)).map(filtered =>
                                                                        (
                                                                                <>
                                                                                        <TableRow
                                                                                                key={filtered.title}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Title:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.title}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.code}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Code:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.code}</TableCell>

                                                                                        </TableRow>

                                                                                        <TableRow
                                                                                                key={filtered.fullNameManager}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Manager:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.fullNameManager}</TableCell>

                                                                                        </TableRow>
                                                                                        <TableRow
                                                                                                key={filtered.fullNameMiembros}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Members:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.fullNameMiembros}</TableCell>

                                                                                        </TableRow>
                                                                                        {/*<TableRow
                                                        key={filtered.customer}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                <TableCell component="th" scope="row"><b>Customer:</b></TableCell>
                                                <TableCell align="left">{filtered.customer}</TableCell>

                                                </TableRow>*/}

                                                                                        <TableRow
                                                                                                key={filtered.mision}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell component="th" scope="row"><b>Mission:</b></TableCell>
                                                                                                <TableCell align="left">{filtered.mision_name}</TableCell>

                                                                                        </TableRow>

                                                                                </>
                                                                        ))
                                                                        }

                                                                </TableBody>
                                                        </Table>
                                                </TableContainer>

                                        </List>
                                </Dialog>

                                <Dialog open={ayudaAction} onClose={() => setAyudaAction(false)} fullWidth maxWidth="xl" >
                                        <DialogTitle>Associated Actions</DialogTitle>
                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


                                                <TableContainer component={Paper}>
                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                <TableHead>

                                                                        <TableRow>
                                                                                <TableCell ><b>Title</b></TableCell>
                                                                                <TableCell align="left"><b>Manager</b></TableCell>
                                                                                <TableCell align="left"><b>Date planned</b></TableCell>
                                                                                <TableCell align="left"><b>Date closed</b></TableCell>
                                                                                <TableCell align="left"><b>Observations</b></TableCell>

                                                                        </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                        {vectorAcciones.map(itemAccion =>
                                                                        (
                                                                                <>
                                                                                        <TableRow key={itemAccion.id}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                                <TableCell align="left">{itemAccion.proposal}</TableCell>
                                                                                                <TableCell align="left">{itemAccion.responsablesName}</TableCell>
                                                                                                <TableCell align="left">{itemAccion.d_planned}</TableCell>
                                                                                                <TableCell align="left">{itemAccion.d_closed}</TableCell>
                                                                                                <TableCell align="left">{itemAccion.observations}</TableCell>
                                                                                        </TableRow>
                                                                                </>
                                                                        ))}
                                                                </TableBody>
                                                        </Table>
                                                </TableContainer>

                                        </List>
                                </Dialog>


                        </Box>

                        <DialogTitle classes={{ root: classes.customDialogTitle }} >

                                {encabezadoTitulo()}

                                <FormGroup>

                                        <Stack direction="row" spacing={1} alignItems="center" style={{ display: 'none' }}>
                                                <Typography>Risk</Typography>
                                                <AntSwitch defaultChecked={deslizaRO == 'o' ? true : false} value={deslizaRO} onClick={() => deslizaRO == "o" ? setDeslizaRO("r") : setDeslizaRO("o")} inputProps={{ 'aria-label': 'ant design' }} />
                                                <Typography>Opportunity</Typography>
                                        </Stack>
                                </FormGroup>


                        </DialogTitle>
                        <DialogContent>
                                <div className="radialbar" style={revalorando == true ? { display: 'block', marginBottom: "10px" } : { display: 'none' }}>
                                        <Alert severity="info">
                                                <AlertTitle>You are reevaluating the R&O as all actions created have been completed.</AlertTitle>
                                                {/*<strong>hola</strong>  <IconButton><InfoOutlined /></IconButton>*/}
                                        </Alert>
                                </div>

                                <Grid container spacing={1} columns={24} style={{ marginTop: "10px" }}>

                                        <Grid item xs={16} >

                                                <TextField
                                                        disabled={revalorando}
                                                        multiline
                                                        label="Description"
                                                        id="riesgo"
                                                        value={riesgoActual}
                                                        size="small"
                                                        fullWidth
                                                        rows={2}
                                                        onChange={e => setRiesgoActual(e.target.value)}
                                                />

                                        </Grid>

                                        <Grid item xs={8}>
                                                <FormControl variant="standard" fullWidth size="small">
                                                        <Autocomplete
                                                                id="tags-outlined"
                                                                disabled={revalorando}
                                                                multiple
                                                                limitTags={2}
                                                                options={locationCustomerListAPI}
                                                                value={locationActual != undefined ? locationActual : ''}
                                                                inputValue={locationActual != null ? locationActual.name : ''}
                                                                onChange={(event, value) => setLocationActual(value)}
                                                                getOptionLabel={(option) =>
                                                                        option != undefined && option != null ? option.name : ''
                                                                }
                                                                filterSelectedOptions
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="Location (optional)"
                                                                                placeholder="Location"
                                                                                size="small"
                                                                        />
                                                                )}
                                                        />
                                                </FormControl>
                                        </Grid>

                                        <Grid item xs={8} fullWidth size="small">

                                                <FormControl>
                                                        <FormLabel id="demo-row-radio-buttons-group-label">Type:</FormLabel>
                                                        <RadioGroup
                                                                row
                                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                                name="row-radio-buttons-group"
                                                                disabled={deshabilitadaDeslizaRO}
                                                        >

                                                                <FormControlLabel onClick={() => establecerValorRadioBoton('r')} value="r" checked={deslizaRO == 'r' ? true : false} control={<Radio />} label="Risk" />
                                                                <FormControlLabel onClick={() => establecerValorRadioBoton('o')} value="o" checked={deslizaRO == 'o' ? true : false} control={<Radio />} label="Opportunity" />

                                                        </RadioGroup>
                                                </FormControl>

                                        </Grid>

                                        <Grid item xs={8}>

                                                <FormControl variant="outlined" fullWidth>
                                                        <InputLabel htmlFor="grouped-select">Category</InputLabel>
                                                        <Select
                                                                id="division"
                                                                disabled={revalorando}
                                                                fullWidth
                                                                native
                                                                label="division"
                                                                onChange={e => setCategoriaActual(e.target.value)}
                                                                value={categoriaActual != undefined ? categoriaActual : ''}
                                                        >

                                                                {/*{tipoCategoriasAPI.map((elemento) => (
                                                                        <ListSubheader>{elemento}</ListSubheader>
                                                                        {categoriaListAPI.filter(item => item.tipo == elemento).map((subCategory) => (
                                                                                <MenuItem value={subCategory.id}>{subCategory.titulo}</MenuItem>
                                                                        ))}
                                                                        
                                                                ))}*/}

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

                                        <Grid item xs={8}>
                                                <FormControl variant="outlined" fullWidth>
                                                        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                                <DatePicker
                                                                        disabled={revalorando}
                                                                        label="Detection date"
                                                                        fullWidth
                                                                        id="fechaDeteccion"
                                                                        inputFormat="yyyy-MM-dd"
                                                                        format="yyyy-MM-dd"
                                                                        value={fechaDeteccionActual}
                                                                        onChange={(newValue) => {
                                                                                if (newValue == "Invalid Date" || newValue == null) {
                                                                                        setFechaDeteccionActual(newValue)
                                                                                } else {
                                                                                        let fechaseleccionada = newValue.toISOString()
                                                                                        let arrayFecha = fechaseleccionada.split("T")
                                                                                        setFechaDeteccionActual(arrayFecha[0]);
                                                                                }
                                                                        }}
                                                                        renderInput={(params) =>
                                                                                <TextField
                                                                                        {...params}
                                                                                />
                                                                        }


                                                                />
                                                        </LocalizationProvider>

                                                </FormControl>

                                        </Grid>



                                        <Box sx={{ p: 2, border: '1px dashed grey', width: '100%', marginTop: '20px', marginBottom: '20px' }}>

                                                <Grid container spacing={2} columns={25}>
                                                        <Grid item xs={8}>


                                                                <TextField
                                                                        disabled={revalorando}
                                                                        label="Effect"
                                                                        multiline
                                                                        rows={3}
                                                                        id="efectoFallo"
                                                                        value={efectoFalloActual}
                                                                        size="small"
                                                                        sx={{ m: 1, width: '37ch' }}
                                                                        onChange={e => setEfectoFalloActual(e.target.value)}
                                                                />

                                                        </Grid>

                                                        <Grid item xs={8}>

                                                                <TextField
                                                                        disabled={revalorando}
                                                                        label="Cause"
                                                                        multiline
                                                                        rows={3}
                                                                        id="causaFallo"
                                                                        value={causaFalloActual}
                                                                        size="small"
                                                                        sx={{ m: 1, width: '37ch' }}
                                                                        onChange={e => setCausaFalloActual(e.target.value)}
                                                                />

                                                        </Grid>

                                                        <Grid item xs={8}>

                                                                <TextField
                                                                        disabled={revalorando}
                                                                        label="Current controls"
                                                                        id="controlesActuales"
                                                                        multiline
                                                                        rows={3}
                                                                        value={controlesActual}
                                                                        size="small"
                                                                        sx={{ m: 1, width: '37ch' }}
                                                                        onChange={e => setControlesActual(e.target.value)}
                                                                />

                                                        </Grid>

                                                        <Grid item xs={8}>

                                                                <IconButton onClick={() => setAyudaSeverity(true)}><InfoOutlined /></IconButton>
                                                                <FormControl variant="standard" sx={{ m: 1, width: '34ch' }} size="small">

                                                                        <InputLabel id="label-select-risk-management">Severity</InputLabel>
                                                                        <Select
                                                                                labelId="label-select-risk-management"
                                                                                id="gravedad"
                                                                                label="Severity"
                                                                                onChange={e => { setGravedadActual(e.target.value); }}
                                                                                value={gravedadActual}

                                                                        >

                                                                                <MenuItem value={1}>1</MenuItem>
                                                                                <MenuItem value={2}>2</MenuItem>
                                                                                <MenuItem value={3}>3</MenuItem>
                                                                                <MenuItem value={4}>4</MenuItem>
                                                                                <MenuItem value={5}>5</MenuItem>
                                                                                <MenuItem value={6}>6</MenuItem>
                                                                                <MenuItem value={7}>7</MenuItem>
                                                                                <MenuItem value={8}>8</MenuItem>
                                                                                <MenuItem value={9}>9</MenuItem>
                                                                                <MenuItem value={10}>10</MenuItem>

                                                                        </Select>
                                                                </FormControl>


                                                                <Dialog open={ayudaSeverity} onClose={() => setAyudaSeverity(false)} fullWidth maxWidth="md" >
                                                                        <DialogTitle>Severity</DialogTitle>
                                                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


                                                                                <TableContainer component={Paper}>
                                                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                                                <TableHead>
                                                                                                        <TableRow>
                                                                                                                <TableCell>Severity</TableCell>
                                                                                                                <TableCell align="left">Criteria</TableCell>
                                                                                                                <TableCell align="left">Value</TableCell>
                                                                                                        </TableRow>
                                                                                                </TableHead>
                                                                                                <TableBody>
                                                                                                        {rowsSeverity.map((row) => (
                                                                                                                <TableRow
                                                                                                                        key={row.severity}
                                                                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                                                >
                                                                                                                        <TableCell component="th" scope="row">
                                                                                                                                {row.severity}
                                                                                                                        </TableCell>
                                                                                                                        <TableCell align="left">{row.criteria}</TableCell>
                                                                                                                        <TableCell align="left">{row.value}</TableCell>

                                                                                                                </TableRow>
                                                                                                        ))}

                                                                                                </TableBody>
                                                                                        </Table>
                                                                                </TableContainer>

                                                                        </List>
                                                                </Dialog>

                                                        </Grid>

                                                        <Grid item xs={8}>

                                                                <IconButton onClick={() => setAyudaFrequency(true)}><InfoOutlined /></IconButton>
                                                                <FormControl variant="standard" sx={{ m: 1, width: '34ch' }} size="small">
                                                                        <InputLabel id="label-select-risk-management">Frequency</InputLabel>
                                                                        <Select
                                                                                labelId="label-select-idea"
                                                                                id="ocurrencia"
                                                                                label="Frequency"
                                                                                onChange={e => { setOcurrenciaActual(e.target.value); }}
                                                                                value={ocurrenciaActual}

                                                                        >

                                                                                <MenuItem value={1}>1</MenuItem>
                                                                                <MenuItem value={2}>2</MenuItem>
                                                                                <MenuItem value={3}>3</MenuItem>
                                                                                <MenuItem value={4}>4</MenuItem>
                                                                                <MenuItem value={5}>5</MenuItem>
                                                                                <MenuItem value={6}>6</MenuItem>
                                                                                <MenuItem value={7}>7</MenuItem>
                                                                                <MenuItem value={8}>8</MenuItem>
                                                                                <MenuItem value={9}>9</MenuItem>
                                                                                <MenuItem value={10}>10</MenuItem>

                                                                        </Select>
                                                                </FormControl>


                                                                <Dialog open={ayudaFrequency} onClose={() => setAyudaFrequency(false)} fullWidth maxWidth="md" >
                                                                        <DialogTitle>Frequency</DialogTitle>
                                                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>
                                                                                <TableContainer component={Paper}>
                                                                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                                                <TableHead>
                                                                                                        <TableRow>
                                                                                                                <TableCell>Frequency</TableCell>
                                                                                                                <TableCell align="left">Criteria</TableCell>
                                                                                                                <TableCell align="left">Value</TableCell>
                                                                                                        </TableRow>
                                                                                                </TableHead>
                                                                                                <TableBody>
                                                                                                        {rowsFrequency.map((row) => (
                                                                                                                <TableRow
                                                                                                                        key={row.severity}
                                                                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                                                >
                                                                                                                        <TableCell component="th" scope="row">
                                                                                                                                {row.severity}
                                                                                                                        </TableCell>
                                                                                                                        <TableCell align="left">{row.criteria}</TableCell>
                                                                                                                        <TableCell align="left">{row.value}</TableCell>

                                                                                                                </TableRow>
                                                                                                        ))}

                                                                                                </TableBody>
                                                                                        </Table>
                                                                                </TableContainer>
                                                                        </List>
                                                                </Dialog>

                                                        </Grid>


                                                        <Grid item xs={8}>
                                                                <IconButton onClick={() => setAyudaDetection(true)}><InfoOutlined /></IconButton>
                                                                <FormControl variant="standard" sx={{ m: 1, width: '34ch' }} size="small">
                                                                        <InputLabel id="label-select-risk-management">Detection</InputLabel>
                                                                        <Select
                                                                                labelId="label-select-detection"
                                                                                id="deteccion"
                                                                                label="Detection"
                                                                                onChange={e => { setDeteccionActual(e.target.value); }}
                                                                                value={deteccionActual}

                                                                        >

                                                                                <MenuItem value={1}>1</MenuItem>
                                                                                <MenuItem value={2}>2</MenuItem>
                                                                                <MenuItem value={3}>3</MenuItem>
                                                                                <MenuItem value={4}>4</MenuItem>
                                                                                <MenuItem value={5}>5</MenuItem>
                                                                                <MenuItem value={6}>6</MenuItem>
                                                                                <MenuItem value={7}>7</MenuItem>
                                                                                <MenuItem value={8}>8</MenuItem>
                                                                                <MenuItem value={9}>9</MenuItem>
                                                                                <MenuItem value={10}>10</MenuItem>

                                                                        </Select>
                                                                </FormControl>


                                                                <Dialog open={ayudaDetection} onClose={() => setAyudaDetection(false)} fullWidth maxWidth="md" >
                                                                        <DialogTitle>Detection</DialogTitle>
                                                                        <TableContainer component={Paper}>
                                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                                        <TableHead>
                                                                                                <TableRow>
                                                                                                        <TableCell>Detection</TableCell>
                                                                                                        <TableCell align="left">Criteria</TableCell>
                                                                                                        <TableCell align="left">Value</TableCell>
                                                                                                </TableRow>
                                                                                        </TableHead>
                                                                                        <TableBody>
                                                                                                {rowsDetection.map((row) => (
                                                                                                        <TableRow
                                                                                                                key={row.severity}
                                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                                        >
                                                                                                                <TableCell component="th" scope="row">
                                                                                                                        {row.severity}
                                                                                                                </TableCell>
                                                                                                                <TableCell align="left">{row.criteria}</TableCell>
                                                                                                                <TableCell align="left">{row.value}</TableCell>

                                                                                                        </TableRow>
                                                                                                ))}

                                                                                        </TableBody>
                                                                                </Table>
                                                                        </TableContainer>
                                                                </Dialog>

                                                        </Grid>
                                                </Grid>
                                        </Box>

                                        {/*<Grid item xs={8} style={{ display: 'none' }}>

                                                <TextField

                                                        disabled
                                                        label="NPR"
                                                        id="npr"
                                                        value={nprActual}
                                                        size="small"
                                                        sx={{ m: 1, width: '37ch' }}
                                                        onChange={e => setNprActual(e.target.value)}
                                                />

                                        </Grid>*/}


                                        <Grid item xs={12}>


                                                <TextField
                                                        id="observaciones"
                                                        label="Remarks"
                                                        multiline
                                                        rows={6}
                                                        value={observacionesActual}
                                                        size="small"
                                                        fullWidth
                                                        sx={{ m: 1 }}
                                                        onChange={e => setObservacionesActual(e.target.value)}
                                                />

                                        </Grid>

                                        <Grid item xs={1}>

                                        </Grid>

                                        <Grid item xs={8} style={{ marginLeft: '-50px', marginTop: '-15px', display: 'none' }}>

                                                <TextField
                                                        style={{ display: 'none' }}
                                                        disabled
                                                        label="Prioritization"
                                                        multiline
                                                        rows={5}
                                                        id="priorizacion"
                                                        value={priorizacionActual}
                                                        size="small"
                                                        sx={{ m: 1, width: '37ch' }}
                                                        onChange={e => setPriorizacionActual(e.target.value)}
                                                />
                                        </Grid>

                                        <Grid item xs={6}>
                                                <div className="radialbar">

                                                        <Alert severity={alertaTipo}>
                                                                {nprActual == 'Severity, frequency and detection are required' ? <AlertTitle>{nprActual} </AlertTitle> : <AlertTitle>NPR: {nprActual} </AlertTitle>}


                                                                <strong>{priorizacionActual}</strong>  <IconButton onClick={() => setAyudaNPR(true)}><InfoOutlined /></IconButton>
                                                        </Alert>



                                                        <Dialog open={ayudaNPR} onClose={() => setAyudaNPR(false)} >
                                                                <DialogTitle>Score</DialogTitle>
                                                                <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


                                                                        <ListItemText primary="NPR>100 - It is necessary to evaluate and take action" />
                                                                        <ListItemText primary="NPR>80  - The risk will be monitored. The manager will decide whether to take action" />
                                                                        <ListItemText primary="NPR≤80  - No action required" />

                                                                </List>
                                                        </Dialog>
                                                </div>

                                        </Grid>

                                        <Grid item xs={5}>
                                                <FormLabel id="demo-row-radio-buttons-group-label">R & O Level:</FormLabel>

                                                <ReactSpeedometer
                                                        width={250}
                                                        //fullWidth
                                                        needleHeightRatio={0.7}
                                                        value={nprActual > 100 ? formatearValorGrafica(parseInt(nprActual)) : parseInt(nprActual)}
                                                        customSegmentStops={[1, 80, 100, 150]}
                                                        segmentColors={['#afff94', '#fde2a9', '#ff94b2']}
                                                        currentValueText={nprActual == 'Severity, frequency and detection are required' ? 'Waiting...' : nprActual.toString()}
                                                        minValue={1}
                                                        maxValue={150}
                                                        customSegmentLabels={[
                                                                {
                                                                        text: 'Low',
                                                                        position: 'OUTSIDE',
                                                                        color: '#000000',
                                                                },
                                                                {
                                                                        text: 'Medium',
                                                                        position: 'OUTSIDE',
                                                                        color: '#000000',
                                                                },
                                                                {
                                                                        text: 'High',
                                                                        position: 'OUTSIDE',
                                                                        color: '#000000',
                                                                },
                                                        ]}
                                                        ringWidth={47}
                                                        needleTransitionDuration={3333}
                                                        needleTransition="easeElastic"
                                                        needleColor={'#a7ff83'}
                                                        textColor={'#000000'}
                                                />

                                        </Grid>

                                </Grid>

                        </DialogContent>
                        <DialogActions>
                                <Button variant="outlined" onClick={() => guardarCambios ? setRecordatorioClose(true) : cambiarVisibilidadModalInsertar(false)}>{guardarCambios ? 'Close without saving' : 'Close'}</Button>

                                <Button variant="outlined" disabled={botonControl} onClick={() => crearRmRegistro()}>{labelBotonCreate()} </Button>


                        </DialogActions>


                        <Dialog open={recordatorioClose} onClose={() => setRecordatorioClose(false)} fullWidth maxWidth="xs" >
                                <DialogTitle>Are you sure?</DialogTitle>
                                <List sx={{ pt: 0 }} style={{ margin: '20px' }}>
                                        Changes will not be saved, are you sure to close?

                                </List>
                                <DialogActions>
                                        <Button variant="outlined" onClick={() => { setRecordatorioClose(false); cambiarVisibilidadModalInsertar(false); dispatch(cambiarVisibilidadModalPrincipalAction(false)); dispatch(cambiarEstadoRmRegistroAction('modo', '')) }}>Yes</Button>
                                        <Button variant="outlined" onClick={() => setRecordatorioClose(false)}>No</Button>
                                </DialogActions>
                        </Dialog>
                </Dialog>
        )
}

