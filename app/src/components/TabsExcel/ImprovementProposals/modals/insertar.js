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

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'


//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
        mostrarImprovementProposalsAction,
        cambiarVisibilidadModalInsertarAction,
        cambiarValorSeleccionAction,
        cambiarEstadoImprovementProposalsAction,
        mostrarImprovementProposalsByContractAPIAction,
        insertarImprovementProposalsModalInsertarAction,
        updateImprovementProposalsAction
} from '../store/actions'

import {
        getSesionActualAPIAction,
        getPermisosSesionActualAPIAction

} from '../../../Managment/Users/store/actions'

import {
        mostrarUserAPIAction
} from '../../../Managment/Users/store/actions'

import {
        mostrarCategoryAPIAction,
        mostrarTiposUnicosAPIAction
} from '../../../Managment/Category/store/actions'

import { getSubMisionAPIAction } from '../../../Gestion/SubMision/store/actions'
import { 
        mostrarAllDepartamentosAPIAction
} from '../../../Gestion/Departamentos/store/actions'

import {
        mostrarMisionAPIAction,
} from '../../../Gestion/Mision/store/actions'

import {
        insertarNewNotificationAPIAction,
} from '../../../Managment/Notifications/store/actions'

import {
        getMyManagersAPIAction
} from '../../PeopleManagement/store/actions'

import { showMessage } from 'app/store/fuse/messageSlice'

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

export default function ModalInsertar(props) {

        const classes = useStyles();
        const dispatch = useDispatch()

        //estados locales del formulario
        const [tituloActual, setTituloActual] = useState('')
        const [subMisionActual, setSubMisionActual] = useState('')
        const [userPrimeroActual, setUserPrimeroActual] = useState('')
        const [userSegundoActual, setUserSegundoActual] = useState([])
        const [observacionesActual, setObservacionesActual] = useState('')
        const [situacionActual, setSituacionActual] = useState('')
        const [situacionFutura, setSituacionFutura] = useState('')
        const [costesActual, setCostesActual] = useState('')
        const [beneficiosActual, setBeneficiosActual] = useState('')
        const [procesosAfectados, setProcesosAfectados] = useState([])
        const [fechaImplementacionActual, setFechaImplementacionActual] = useState('')
        const [categoriaActual, setCategoriaActual] = useState('')
        const [departamentoAsociado, setDepartamentoAsociado] = useState([])
        const [completarMejora, setCompletarMejora] = useState(false)
        const [aceptarMejora, setAceptarMejora] = useState(false)
        const [equipoMFT, setEquipoMFT] = useState([])
        const [botonSolicitar, setBotonSolicitar] = useState(true);

        const improvementProposalsList = useSelector(state => state.fuse.improvementProposalsComponent.improvementProposalsListAPI)
        const filaSeleccionadaGrid = useSelector(state => state.fuse.improvementProposalsComponent.filaSeleccionadaGrid)
        const modo = useSelector(state => state.fuse.improvementProposalsComponent.modo)
        const visibilidadModalInsertar = useSelector(state => state.fuse.improvementProposalsComponent.visibilidadModalInsertar)
        const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
        const listSubMisionAPI = useSelector(state => state.fuse.subMisionComponent.listSubMisiones)
        const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
        const personLogin = useSelector(state => state.fuse.userComponente.person)
        const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
        const tipoCategoriasAPI = useSelector(state => state.fuse.categoriaComponent.tipoCategoriasAPI)
        const categoriaListAPI = useSelector(state => state.fuse.categoriaComponent.categoriaListAPI)
        const contractUserListAPI = useSelector(state => state.fuse.userComponente.contractUserListAPI)
        const listAllDepartamentAPI = useSelector(state => state.fuse.departamentoViewComponente.listAllDepartamentAPI)
        const listMyManager = useSelector(state => state.fuse.peopleManagementComponente.listMyManager)

        //Creamos funciones para hacer uso de Actions Redux
        const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAction(valor, modo))
        const mostrarImprovementProposals = () => dispatch(mostrarImprovementProposalsAction())
        const mostrarImprovementProposalsByContractAPI = (idPersona) => dispatch(mostrarImprovementProposalsByContractAPIAction(idPersona))
        const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
        const mostrarMisionAPI = () => dispatch(mostrarMisionAPIAction())
        const getSubMisionAPI = () => dispatch(getSubMisionAPIAction())
        const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
        const insertarImprovementProposalsModalInsertar = (mejora, idPerson) => dispatch(insertarImprovementProposalsModalInsertarAction(mejora, idPerson))
        const updateImprovementProposals = (id, json, idPerson) => dispatch(updateImprovementProposalsAction(id, json, idPerson))
        const mostrarCategoryAPI = () => dispatch(mostrarCategoryAPIAction())
        const mostrarTiposUnicosAPI = () => dispatch(mostrarTiposUnicosAPIAction())
        const insertarNewNotificationAPI = (notificacion) => dispatch(insertarNewNotificationAPIAction(notificacion))

        const mostrarAllDepartamentosAPI = () => dispatch(mostrarAllDepartamentosAPIAction())
        const getMyManagersAPI = (idMember) => dispatch(getMyManagersAPIAction(idMember))

        useEffect(() => {

                //getSubMisionAPI()
                //mostrarMisionAPI()
                //mostrarUserAPI()
                mostrarCategoryAPI()
                mostrarTiposUnicosAPI()
                mostrarAllDepartamentosAPI()

        }, [])

        useEffect(() => {
                if (modo == "completarMejora" || modo == "aceptarMejora") {
                        if (modo == "completarMejora") {
                                if (departamentoAsociado != '' && departamentoAsociado != undefined && categoriaActual != '' && costesActual.trim() != '' && beneficiosActual.trim() != '' && procesosAfectados != '') {
                                        setBotonSolicitar(false)

                                } else {
                                        setBotonSolicitar(true)

                                }
                        }

                        if (modo == "aceptarMejora") {
                                if (equipoMFT != '' && fechaImplementacionActual != '') {
                                        setBotonSolicitar(false)

                                } else {
                                        setBotonSolicitar(true)

                                }
                        }
                }
                if (modo != "completarMejora" && modo != "aceptarMejora") {
                        if (tituloActual.trim() != '' && subMisionActual != '' && observacionesActual.trim() != '' && situacionActual.trim() != '' && situacionFutura.trim() != '') {
                                setBotonSolicitar(false)

                        } else {
                                setBotonSolicitar(true)

                        }
                }
        })

        useEffect(() => {

                if (visibilidadModalInsertar == true) {
                        if (modo == "aceptarMejora") {
                                setCompletarMejora(false)
                                setAceptarMejora(true)

                                let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]

                                let userApp1 = usersListAPI.filter(registro => registro.id == mejoraSelected.user_id_principal)[0]

                                let subMisionSelected = listSubMisionAPI.filter(registro => registro.id == mejoraSelected.subMision)[0]
                                let misionSelect = listMisionAPI.filter(registro => registro.id == subMisionSelected.id_mision)[0]

                                let vectorUserSecundarios = []
                                for (let elemento in mejoraSelected.user_id_secundario) {
                                        let userApp2 = usersListAPI.filter(registro => registro.id == mejoraSelected.user_id_secundario[elemento])[0]
                                        if (userApp2 != undefined) {
                                                vectorUserSecundarios.push(userApp2)
                                        }
                                }

                                let vectorEquipoMFT = []
                                for (let elemento in mejoraSelected.equipoMFT) {
                                        let userMFT = usersListAPI.filter(registro => registro.id == mejoraSelected.equipoMFT[elemento])[0]
                                        if (userMFT != undefined) {
                                                vectorEquipoMFT.push(userMFT)
                                        }
                                }

                                let vectorDepartamentos = []
                                //listAllDepartamentAPI
                                for (let elemento in mejoraSelected.departamentoImprovement) {
                                        let departamentosItem = listAllDepartamentAPI.filter(registro => registro.id == mejoraSelected.departamentoImprovement[elemento])[0]
                                        if (departamentosItem != undefined) {
                                                vectorDepartamentos.push(departamentosItem)
                                        }
                                }

                                setTituloActual(mejoraSelected.titulo)
                                setSubMisionActual(subMisionSelected.id)
                                setUserPrimeroActual(userApp1)
                                getMyManagersAPI(userApp1.id)
                                setUserSegundoActual(vectorUserSecundarios)
                                setObservacionesActual(mejoraSelected.observations)
                                setSituacionActual(mejoraSelected.situacion_actual)
                                setSituacionFutura(mejoraSelected.situacion_futura)
                                setEquipoMFT(vectorEquipoMFT)

                                setCategoriaActual(mejoraSelected.categorizacion)
                                setDepartamentoAsociado(vectorDepartamentos)
                                setCostesActual(mejoraSelected.costes)
                                setBeneficiosActual(mejoraSelected.beneficios)

                                /*if (misionSelect.responsables.indexOf(personLogin.id) == -1) {
                                        cambiarVisibilidadModalInsertar(false, '')
                                        dispatch(
                                                showMessage({
                                                        message: "You are not responsible for managing this improvement",
                                                        variant: "error"
                                                })
                                        )
                                }*/
                        }
                        if (modo == "completarMejora") {

                                setCompletarMejora(true)
                                setAceptarMejora(false)

                                let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]

                                let userApp1 = usersListAPI.filter(registro => registro.id == mejoraSelected.user_id_principal)[0]

                                let subMisionSelected = listSubMisionAPI.filter(registro => registro.id == mejoraSelected.subMision)[0]
                                let misionSelect = listMisionAPI.filter(registro => registro.id == subMisionSelected.id_mision)[0]

                                let vectorUserSecundarios = []
                                for (let elemento in mejoraSelected.user_id_secundario) {
                                        let userApp2 = usersListAPI.filter(registro => registro.id == mejoraSelected.user_id_secundario[elemento])[0]
                                        if (userApp2 != undefined) {
                                                vectorUserSecundarios.push(userApp2)
                                        }
                                }

                                let vectorEquipoMFT = []
                                for (let elemento in mejoraSelected.equipoMFT) {
                                        let userMFT = usersListAPI.filter(registro => registro.id == mejoraSelected.equipoMFT[elemento])[0]
                                        if (userMFT != undefined) {
                                                vectorEquipoMFT.push(userMFT)
                                        }
                                }

                                setTituloActual(mejoraSelected.titulo)
                                setSubMisionActual(subMisionSelected.id)
                                setUserPrimeroActual(userApp1)
                                getMyManagersAPI(userApp1.id)
                                setUserSegundoActual(vectorUserSecundarios)
                                setObservacionesActual(mejoraSelected.observations)
                                setSituacionActual(mejoraSelected.situacion_actual)
                                setSituacionFutura(mejoraSelected.situacion_futura)
                                setCategoriaActual(mejoraSelected.categorizacion)
                                setEquipoMFT(vectorEquipoMFT)

                                /*if (misionSelect.responsables.indexOf(personLogin.id) == -1) {
                                        cambiarVisibilidadModalInsertar(false, '')
                                        dispatch(
                                                showMessage({
                                                        message: "You are not responsible for managing this improvement",
                                                        variant: "error"
                                                })
                                        )
                                }*/
                        }

                        if (modo == "nuevo") {
                                setCompletarMejora(false)
                                setAceptarMejora(false)
                                setTituloActual('')
                                setSubMisionActual('')
                                setUserPrimeroActual(personLogin)
                                getMyManagersAPI(personLogin.id)
                                setUserSegundoActual([])
                                setObservacionesActual('')
                                setSituacionActual('')
                                setSituacionFutura('')
                                setCostesActual('')
                                setBeneficiosActual('')
                                setProcesosAfectados([])
                                setFechaImplementacionActual('')
                                setCategoriaActual('')
                                setEquipoMFT([])
                                setDepartamentoAsociado([])
                        }

                        if (modo == "editar" || modo == "consultar") {
                                setCompletarMejora(false)
                                setAceptarMejora(false)

                                let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]

                                let userApp1 = usersListAPI.filter(registro => registro.id == mejoraSelected.user_id_principal)[0]
                                let subMisionSelected = listSubMisionAPI.filter(registro => registro.id == mejoraSelected.subMision)[0]

                                let vectorUserSecundarios = []
                                for (let elemento in mejoraSelected.user_id_secundario) {
                                        let userApp2 = usersListAPI.filter(registro => registro.id == mejoraSelected.user_id_secundario[elemento])[0]
                                        if (userApp2 != undefined) {
                                                vectorUserSecundarios.push(userApp2)
                                        }
                                }

                                let vectorEquipoMFT = []
                                for (let elemento in mejoraSelected.equipoMFT) {
                                        let userMFT = usersListAPI.filter(registro => registro.id == mejoraSelected.equipoMFT[elemento])[0]
                                        if (userMFT != undefined) {
                                                vectorEquipoMFT.push(userMFT)
                                        }
                                }

                                setTituloActual(mejoraSelected.titulo)
                                setSubMisionActual(subMisionSelected.id)
                                setUserPrimeroActual(userApp1)
                                getMyManagersAPI(userApp1.id)
                                setUserSegundoActual(vectorUserSecundarios)
                                setObservacionesActual(mejoraSelected.observations)
                                setSituacionActual(mejoraSelected.situacion_actual)
                                setSituacionFutura(mejoraSelected.situacion_futura)
                                setCostesActual(mejoraSelected.costes)
                                setBeneficiosActual(mejoraSelected.beneficios)
                                setProcesosAfectados(mejoraSelected.procesos_afectados)
                                setFechaImplementacionActual(mejoraSelected.fecha_implementacion)
                                setCategoriaActual(mejoraSelected.categorizacion)
                                setEquipoMFT(vectorEquipoMFT)
                        }
                }



        }, [modo, filaSeleccionadaGrid, visibilidadModalInsertar])

        function resetValues() {
                setCompletarMejora(false)
                setAceptarMejora(false)
                setTituloActual('')
                setSubMisionActual('')
                setUserPrimeroActual(personLogin)
                getMyManagersAPI(personLogin.id)
                setUserSegundoActual([])
                setObservacionesActual('')
                setSituacionActual('')
                setSituacionFutura('')
                setCostesActual('')
                setBeneficiosActual('')
                setProcesosAfectados([])
                setFechaImplementacionActual('')
                setCategoriaActual('')
                setEquipoMFT([])
                setDepartamentoAsociado([])
        }

        function nuevaPropuestaMejora() {

                let vectorIDUserDos = []
                let vectorEmailUserDos = ""
                for (let elemento in userSegundoActual) {
                        vectorIDUserDos.push(userSegundoActual[elemento].id)
                        vectorEmailUserDos = vectorEmailUserDos + userSegundoActual[elemento].email + ";"
                }

                if (modo == "nuevo") {
                        let fechaHoy = new Date();
                        let fechaseleccionada = fechaHoy.toISOString()
                        let arrayFecha = fechaseleccionada.split("T")
                        insertarImprovementProposalsModalInsertar({
                                titulo: tituloActual,
                                subMision: subMisionActual,
                                user_id_principal: userPrimeroActual.id,
                                user_id_secundario: vectorIDUserDos,
                                observations: observacionesActual,
                                situacion_actual: situacionActual,
                                situacion_futura: situacionFutura,
                                //costes: costesActual,
                                //beneficios: beneficiosActual,
                                //fecha_implementacion: fechaImplementacionActual,
                                fecha_solicitud: arrayFecha[0],
                                estado: "REQUESTED",
                                categorizacion: categoriaActual
                        }, personLogin.id)

                        //ENVIO DE EMAILS
                        //let emailsEnvioCreacion = emailResponsablesMision + ";" + personLogin.email + ";" + vectorEmailUserDos
                        //let cadena = '<html><div><table><tr><th>Titulo</th><th>Sub Mission</th><th>Responsable</th><th>Remarks</th></tr><tr><td>{tituloActual}</td><td>{subMisionActual}</td><td>{userPrimeroActual.email}</td><td>{observacionesActual}</td></tr></table></div></html>'
                        //envioEmail(emailsEnvioCreacion, "NUEVA SOLICITUD DE PROPUESTA DE MEJORA", cadena)

                        //ENVIO DE EMAILS AL PERSONAL RESPONSABLE DEL USUARIO
                        let emailsManager = ""
                        for (let itemUser in listMyManager) {
                                //GET EMAILS
                                emailsManager = emailsManager + listMyManager[itemUser].email + ";"

                                //POST NOTIFICATION APP
                                insertarNewNotificationAPI({
                                        origen_notification_id: personLogin.id,
                                        destino_notification_id: listMyManager[itemUser].id,
                                        fecha: arrayFecha[0],
                                        observations: "Nueva propuesta de mejora registrada por: " + personLogin.first_name + " " + personLogin.last_name,
                                        typeNotification: "informacion",
                                        active: true
                                })
                        }

                        let cadenaTexto = "El usuario " + personLogin.first_name + " " + personLogin.last_name + " acaba de hacer una nueva solicitud de propuesta de mejora con el titulo: " + tituloActual + "."

                        //envioEmail(emailsManager, "NUEVA SOLICITUD DE PROPUESTA DE MEJORA", cadenaTexto)


                        //POST NOTIFICACION DE NUEVA PROPUESTA DE MEJORA A LOS MIEMBROS DE LA PROPUESTA DE MEJORA
                        for (let idUser in vectorIDUserDos) {
                                insertarNewNotificationAPI({
                                        origen_notification_id: personLogin.id,
                                        destino_notification_id: vectorIDUserDos[idUser],
                                        fecha: arrayFecha[0],
                                        observations: "Nueva propuesta de mejora registrada por: " + personLogin.first_name + " " + personLogin.last_name,
                                        typeNotification: "informacion",
                                        active: true
                                })
                        }

                }
                if (modo == "editar") {

                        let vectorIDEquipoMFT = []
                        for (let elemento in equipoMFT) {
                                vectorIDEquipoMFT.push(equipoMFT[elemento].id)
                        }

                        let vectorIDProcessSelect = []
                        for (let elemento in procesosAfectados) {
                                vectorIDProcessSelect.push(procesosAfectados[elemento].id)
                        }

                        let vectorIDDepartamentSelect = []
                        for (let elemento in departamentoAsociado) {
                                vectorIDDepartamentSelect.push(departamentoAsociado[elemento].id)
                        }

                        let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]

                        if (mejoraSelected != undefined) {
                                updateImprovementProposals(filaSeleccionadaGrid, {
                                        titulo: tituloActual,
                                        subMision: subMisionActual,
                                        user_id_principal: userPrimeroActual.id,
                                        user_id_secundario: vectorIDUserDos,
                                        observations: observacionesActual,
                                        situacion_actual: situacionActual,
                                        situacion_futura: situacionFutura,
                                        costes: costesActual,
                                        beneficios: beneficiosActual,
                                        procesos_afectados: vectorIDProcessSelect,
                                        fecha_implementacion: fechaImplementacionActual,
                                        fecha_solicitud: mejoraSelected.fecha_solicitud,
                                        estado: mejoraSelected.estado,
                                        categorizacion: categoriaActual,
                                        equipoMFT: vectorIDEquipoMFT,
                                        departamentoImprovement: vectorIDDepartamentSelect
                                }, personLogin.id)
                        }

                }
                if (modo == "completarMejora") {

                        let vectorIDEquipoMFT = []
                        for (let elemento in equipoMFT) {
                                vectorIDEquipoMFT.push(equipoMFT[elemento].id)
                        }

                        let vectorIDProcessSelect = []
                        for (let elemento in procesosAfectados) {
                                vectorIDProcessSelect.push(procesosAfectados[elemento].id)
                        }

                        let vectorIDDepartamentSelect = []
                        for (let elemento in departamentoAsociado) {
                                vectorIDDepartamentSelect.push(departamentoAsociado[elemento].id)
                        }

                        let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]

                        if (mejoraSelected != undefined) {
                                
                                updateImprovementProposals(filaSeleccionadaGrid, {
                                        titulo: tituloActual,
                                        subMision: subMisionActual,
                                        user_id_principal: userPrimeroActual.id,
                                        user_id_secundario: vectorIDUserDos,
                                        observations: observacionesActual,
                                        situacion_actual: situacionActual,
                                        situacion_futura: situacionFutura,
                                        costes: costesActual,
                                        beneficios: beneficiosActual,
                                        procesos_afectados: vectorIDProcessSelect,
                                        //fecha_implementacion: fechaImplementacionActual,
                                        fecha_solicitud: mejoraSelected.fecha_solicitud,
                                        estado: "PENDING",
                                        categorizacion: categoriaActual,
                                        equipoMFT: vectorIDEquipoMFT,
                                        departamentoImprovement: vectorIDDepartamentSelect
                                }, personLogin.id)


                        }

                }

                if (modo == "aceptarMejora") {

                        let vectorIDEquipoMFT = []
                        for (let elemento in equipoMFT) {
                                vectorIDEquipoMFT.push(equipoMFT[elemento].id)
                        }

                        let vectorIDProcessSelect = []
                        for (let elemento in procesosAfectados) {
                                vectorIDProcessSelect.push(procesosAfectados[elemento].id)
                        }

                        let vectorIDDepartamentSelect = []
                        for (let elemento in departamentoAsociado) {
                                vectorIDDepartamentSelect.push(departamentoAsociado[elemento].id)
                        }

                        let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]

                        if (mejoraSelected != undefined) {

                                updateImprovementProposals(filaSeleccionadaGrid, {
                                        titulo: tituloActual,
                                        subMision: subMisionActual,
                                        user_id_principal: userPrimeroActual.id,
                                        user_id_secundario: vectorIDUserDos,
                                        observations: observacionesActual,
                                        situacion_actual: situacionActual,
                                        situacion_futura: situacionFutura,
                                        costes: costesActual,
                                        beneficios: beneficiosActual,
                                        procesos_afectados: vectorIDProcessSelect,
                                        fecha_implementacion: fechaImplementacionActual,
                                        fecha_solicitud: mejoraSelected.fecha_solicitud,
                                        estado: "ACCEPTED",
                                        categorizacion: categoriaActual,
                                        equipoMFT: vectorIDEquipoMFT,
                                        departamentoImprovement: vectorIDDepartamentSelect
                                }, personLogin.id)


                        }
                }

                cambiarVisibilidadModalInsertar(false, '')
                resetValues()

        }



        return (
                <>

                        <Dialog open={visibilidadModalInsertar} onClose={() => { cambiarVisibilidadModalInsertar(false, '') }} fullWidth maxWidth='xl'>

                                <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                        {modo == 'editar' ? 'Edit Improvement Proposals' : 'Create Improvement Proposals'}
                                </DialogTitle>
                                <DialogContent>

                                        <Grid container spacing={2} columns={24}>

                                                <div style={{ width: '100%', textAlign: 'center', marginTop: '15px' }}>
                                                        <span className="font-semibold">
                                                                Applicant details
                                                                <Divider style={{ width: '100%' }} />
                                                        </span>
                                                </div>

                                                <Grid item xs={12}>

                                                        <TextField
                                                                label="Title"
                                                                id="titulo"
                                                                value={tituloActual}
                                                                fullWidth
                                                                disabled={modo == "consultar" || completarMejora == true ? true : false}
                                                                onChange={e => setTituloActual(e.target.value)}
                                                        />

                                                </Grid>

                                                <Grid item xs={12}>
                                                        <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Sub Mission</InputLabel>
                                                                <Select
                                                                        labelId="SubMision"
                                                                        id="subMision"
                                                                        value={subMisionActual}
                                                                        fullWidth
                                                                        label="Sub Mission"
                                                                        disabled={modo == "consultar" || completarMejora == true ? true : false}
                                                                        onChange={e => setSubMisionActual(e.target.value)}
                                                                >
                                                                        {listSubMisionAPI.map((elemento) => (
                                                                                <MenuItem value={elemento.id}> {elemento.name} </MenuItem>
                                                                        ))}

                                                                </Select>
                                                        </FormControl>

                                                </Grid>


                                                <Grid item xs={12}>
                                                        <Autocomplete
                                                                id="tags-outlined"
                                                                options={usersListAPI}
                                                                getOptionLabel={(option) => option.IDidentification + " - " + option.first_name + " " + option.last_name}
                                                                onChange={(event, value) => setUserPrimeroActual(value)}
                                                                filterSelectedOptions
                                                                value={userPrimeroActual != '' ? userPrimeroActual : undefined}
                                                                disabled={true}
                                                                fullWidth
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="Applicant one"
                                                                                placeholder="Applicant one"
                                                                        />
                                                                )}
                                                        />
                                                </Grid>

                                                <Grid item xs={12}>
                                                        <Autocomplete
                                                                id="tags-outlined"
                                                                multiple
                                                                limitTags={2}
                                                                options={usersListAPI}
                                                                getOptionLabel={(option) => option.IDidentification + " - " + option.first_name + " " + option.last_name}
                                                                onChange={(event, value) => setUserSegundoActual(value)}
                                                                filterSelectedOptions
                                                                value={userSegundoActual != '' && userSegundoActual != undefined && userSegundoActual != null ? userSegundoActual : []}
                                                                disabled={modo == "consultar" || completarMejora == true ? true : false}
                                                                fullWidth
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="Applicant two (optional)"
                                                                                placeholder="Applicant two"
                                                                        />
                                                                )}
                                                        />
                                                </Grid>

                                                <Grid item xs={12}>

                                                        <TextField
                                                                label="Current Situation"
                                                                id="situacionActual"
                                                                value={situacionActual}
                                                                size="xl"
                                                                fullWidth
                                                                multiline
                                                                rows={2}
                                                                disabled={modo == "consultar" || completarMejora == true ? true : false}
                                                                onChange={e => setSituacionActual(e.target.value)}
                                                        />

                                                </Grid>

                                                <Grid item xs={12}>

                                                        <TextField
                                                                label="Future Situation"
                                                                id="situacionFutura"
                                                                value={situacionFutura}
                                                                size="xl"
                                                                fullWidth
                                                                multiline
                                                                rows={2}
                                                                disabled={modo == "consultar" || completarMejora == true ? true : false}
                                                                onChange={e => setSituacionFutura(e.target.value)}
                                                        />

                                                </Grid>

                                                <Grid item xs={24}>

                                                        <TextField
                                                                label="Description"
                                                                id="observaciones"
                                                                value={observacionesActual}
                                                                size="xl"
                                                                fullWidth
                                                                //sx={{ m: 1, width: '40ch' }}
                                                                multiline
                                                                rows={1}
                                                                disabled={modo == "consultar" || completarMejora == true ? true : false}
                                                                onChange={e => setObservacionesActual(e.target.value)}
                                                        />

                                                </Grid>

                                                <div style={completarMejora == false && (modo == "nuevo" || modo == "editar") ? { display: 'none' } : { width: '100%', textAlign: 'center', marginTop: '15px', display: 'block' }}>
                                                        <span className="font-semibold">
                                                                Details after completing the proposal
                                                                <Divider style={{ width: '100%' }} />
                                                        </span>
                                                </div>

                                                <Grid item xs={12}>
                                                        <Autocomplete
                                                                id="tags-outlined"
                                                                multiple
                                                                limitTags={2}
                                                                options={listAllDepartamentAPI}
                                                                getOptionLabel={(option) => option.code + " - " + option.name}
                                                                onChange={(event, value) => setDepartamentoAsociado(value)}
                                                                filterSelectedOptions
                                                                value={departamentoAsociado}
                                                                disabled={modo == "consultar" || aceptarMejora == true ? true : false}
                                                                style={completarMejora == false && (modo == "nuevo" || modo == "editar") ? { display: 'none' } : { display: 'block' }}
                                                                fullWidth
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="Department"
                                                                                placeholder="Department"
                                                                        />
                                                                )}
                                                        />
                                                </Grid>

                                                <Grid item xs={12}>
                                                        <FormControl variant="outlined" fullWidth style={completarMejora == false && (modo == "nuevo" || modo == "editar") ? { display: 'none' } : { display: 'block' }}>
                                                                <InputLabel htmlFor="grouped-select">Category</InputLabel>
                                                                <Select
                                                                        id="division"
                                                                        disabled={modo == "consultar" || aceptarMejora == true ? true : false}
                                                                        fullWidth
                                                                        native
                                                                        label="division"
                                                                        onChange={e => setCategoriaActual(e.target.value)}
                                                                        value={categoriaActual != undefined ? categoriaActual : ''}
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
                                                                label="Cost"
                                                                id="costes"
                                                                value={costesActual}
                                                                size="xl"
                                                                fullWidth
                                                                multiline
                                                                rows={2}
                                                                disabled={modo == "consultar" || aceptarMejora == true ? true : false}
                                                                style={completarMejora == false && (modo == "nuevo" || modo == "editar") ? { display: 'none' } : { display: 'block' }}
                                                                onChange={e => setCostesActual(e.target.value)}
                                                        />

                                                </Grid>

                                                <Grid item xs={12}>

                                                        <TextField
                                                                label="Benefits"
                                                                id="beneficios"
                                                                value={beneficiosActual}
                                                                size="xl"
                                                                fullWidth
                                                                multiline
                                                                rows={2}
                                                                disabled={modo == "consultar" || aceptarMejora == true ? true : false}
                                                                style={completarMejora == false && (modo == "nuevo" || modo == "editar") ? { display: 'none' } : { display: 'block' }}
                                                                onChange={e => setBeneficiosActual(e.target.value)}
                                                        />

                                                </Grid>


                                                <div style={aceptarMejora == false || (modo == "nuevo" || modo == "editar") ? { display: 'none' } : { width: '100%', textAlign: 'center', marginTop: '15px', display: 'block' }}>
                                                        <span className="font-semibold">
                                                                Details after approval of the proposal
                                                                <Divider style={{ width: '100%' }} />
                                                        </span>
                                                </div>

                                                <Grid item xs={12}>
                                                        <Autocomplete
                                                                id="tags-outlined"
                                                                multiple
                                                                limitTags={2}
                                                                options={usersListAPI}
                                                                getOptionLabel={(option) => option.IDidentification + " - " + option.first_name + " " + option.last_name}
                                                                onChange={(event, value) => setEquipoMFT(value)}
                                                                filterSelectedOptions
                                                                disabled={modo == "consultar" ? true : false}
                                                                style={aceptarMejora == false || (modo == "nuevo" || modo == "editar") ? { display: 'none' } : { display: 'block' }}
                                                                fullWidth
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="MFT team"
                                                                                placeholder="MFT team"
                                                                        />
                                                                )}
                                                        />
                                                </Grid>

                                                <Grid item xs={12}>
                                                        <FormControl fullWidth style={aceptarMejora == false || (modo == "nuevo" || modo == "editar") ? { display: 'none' } : { display: 'block' }}>
                                                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                                        <DatePicker
                                                                                label="Implementation Date"
                                                                                id="implementationdate"
                                                                                inputFormat="dd-MM-yyyy"
                                                                                format="dd-MM-yyyy"
                                                                                fullWidth
                                                                                disabled={modo == "consultar" ? true : false}
                                                                                value={fechaImplementacionActual}
                                                                                onChange={(newValue) => {
                                                                                        if (newValue == "Invalid Date" || newValue == null) {
                                                                                                setFechaImplementacionActual(newValue)
                                                                                        } else {
                                                                                                let fechaseleccionada = newValue.toISOString()
                                                                                                let arrayFecha = fechaseleccionada.split("T")
                                                                                                setFechaImplementacionActual(arrayFecha[0]);
                                                                                        }
                                                                                }}
                                                                                renderInput={(params) => <TextField {...params} fullWidth />}

                                                                        />
                                                                </LocalizationProvider>
                                                        </FormControl>


                                                </Grid>


                                        </Grid>
                                </DialogContent>
                                <DialogActions>


                                        <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertar(false, ''), resetValues() }}>Close</Button>
                                        <Button variant="outlined" disabled={botonSolicitar} style={modo == "consultar" ? { display: "none" } : { display: "inline" }} onClick={() => { nuevaPropuestaMejora() }}> Save</Button>

                                </DialogActions>



                        </Dialog>
                </>
        )
}

