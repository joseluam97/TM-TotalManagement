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
import StepLabel from '@mui/material/StepLabel';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Divider from '@mui/material/Divider';
import store from "app/store/index"
import List from '@mui/material/List';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TaskAlt from '@mui/icons-material/TaskAlt';
import * as moment from 'moment';

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
        cambiarVisibilidadModalInsertarAPI,
        postActionImprovementProposalsAPIAction,
        updateActionImprovementProposalsAction
} from '../store/actions'


import { mostrarContratoServicioAPIAction } from '../../../../Gestion/ContratoServicio/store/actions'
import { mostrarMisionPaquetesAPIAction } from '../../../../Gestion/PaqueteTrabajo/store/actions'

import {
        getSesionActualAPIAction
} from '../../../../Managment/Users/store/actions'

import {
        mostrarMisionAPIAction,
        mostrarMisionIncluyendoMisionesHeredadasAPIAction
} from '../../../../Gestion/Mision/store/actions'



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

        const [tituloActual, setTituloActual] = useState('')
        const [fechaPlanificadaActual, setFechaPlanificadaActual] = useState('')
        const [fechaEjecucionActual, setFechaEjecucionActual] = useState('')
        const [managerActual, setManagerActual] = useState('')
        const [miembroActual, setMiembroActual] = useState([])
        const [observacionesActual, setObservacionesActual] = useState('')
        const [completadaActual, setCompletadaActual] = useState(false)

        const [guardarCambios, setGuardarCambios] = useState(false)
        const [accionCerrada, setAccionCerrada] = useState(false)
        const [botonControl, setBotonControl] = useState(true)
        const [recordatorioClose, setRecordatorioClose] = useState(false)

        const filaSeleccionadaGridImprovement = useSelector(state => state.fuse.improvementProposalsComponent.filaSeleccionadaGrid)
        const visibilidadModalInsertar = useSelector(state => state.fuse.actionImprovementProposalsComponent.visibilidadModalInsertar)
        const modoActionImprovement = useSelector(state => state.fuse.actionImprovementProposalsComponent.modo)
        const filaSeleccionadaGridActionsImprovement = useSelector(state => state.fuse.actionImprovementProposalsComponent.filaSeleccionadaGridActionsImprovement)
        const personLogin = useSelector(state => state.fuse.userComponente.person)
        const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
        const actionImprovementProposalsListAPI = useSelector(state => state.fuse.actionImprovementProposalsComponent.actionImprovementProposalsListAPI)
        const accionAlterada = useSelector(state => state.fuse.actionImprovementProposalsComponent.accionAlterada)

        //Creamos funciones para hacer uso de Actions Redux
        const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPI(valor, modo))
        const mostrarMisionIncluyendoMisionesHeredadasAPI = (idPersona) => dispatch(mostrarMisionIncluyendoMisionesHeredadasAPIAction(idPersona))
        const postActionImprovementProposalsAPI = (datos, idMejora) => dispatch(postActionImprovementProposalsAPIAction(datos, idMejora))
        const updateActionImprovementProposals = (idAction, datos, idMejora) => dispatch(updateActionImprovementProposalsAction(idAction, datos, idMejora))

        function crearAction() {

                //FORMATEAR miembroActual PARA GUARDAR
                let vectIDMiembros = []
                for (let aux in miembroActual) {
                        //let userSelect = usersListAPI.filter(item => item.id == miembroActual[aux]['id'])[0]
                        vectIDMiembros.push(miembroActual[aux].id)
                }

                if (modoActionImprovement == 'editar') {

                        if(completadaActual == true){
                                let fechaHoy = new Date(fechaEjecucionActual)
                                let fechaseleccionada = fechaHoy.toISOString()
                                let arrayFecha = fechaseleccionada.split("T")

                                updateActionImprovementProposals(filaSeleccionadaGridActionsImprovement, {

                                        id_improvement: filaSeleccionadaGridImprovement,
                                        titulo: tituloActual,
                                        fecha_prevista: fechaPlanificadaActual,
                                        fecha_ejecucion: arrayFecha[0],
                                        responsable_accion: managerActual.id,
                                        user_ayundantes: vectIDMiembros,
                                        observations: observacionesActual,
                                        completed: completadaActual
        
                                }, filaSeleccionadaGridImprovement)
                        }       
                        else{
                                updateActionImprovementProposals(filaSeleccionadaGridActionsImprovement, {

                                        id_improvement: filaSeleccionadaGridImprovement,
                                        titulo: tituloActual,
                                        fecha_prevista: fechaPlanificadaActual,
                                        responsable_accion: managerActual.id,
                                        user_ayundantes: vectIDMiembros,
                                        observations: observacionesActual,
                                        completed: completadaActual
        
                                }, filaSeleccionadaGridImprovement)
                        }
                        

                        //dispatch(cambiarEstadoRiskManagementAction('visibilidadModalInsertar', false))



                } else {
                        postActionImprovementProposalsAPI({

                                id_improvement: filaSeleccionadaGridImprovement,
                                titulo: tituloActual,
                                fecha_prevista: fechaPlanificadaActual,
                                responsable_accion: managerActual.id,
                                user_ayundantes: vectIDMiembros,
                                observations: observacionesActual

                        }, filaSeleccionadaGridImprovement)
                }


                resetDialog()
                cambiarVisibilidadModalInsertar(false, '')
                

        }

        function resetDialog() {
                setTituloActual('')
                setFechaPlanificadaActual('')
                setFechaEjecucionActual('')
                setManagerActual('')
                setMiembroActual([])
                setObservacionesActual('')
                setGuardarCambios(false)
                setAccionCerrada(false)
                setBotonControl(true)
                setCompletadaActual(false)
                setRecordatorioClose(false)
        }

        useEffect(() => {
                //mostrarContratosAPI()

                //mostrarMisionAPI()

                //GET USER
                /*store.dispatch(getSesionActualAPIAction({

                        token: getCookie('token')

                }))*/
                //FIN GET USER
        }, [])

        useEffect(() => {
                mostrarMisionIncluyendoMisionesHeredadasAPI(personLogin.id)
                setManagerActual(personLogin)
        }, [personLogin])

        useEffect(() => {
                //USE EFFECT QUE SE EJECUTA CUANDO SE MARCA COMO COMPLETADA UNA ACCION, PARA AUTOASIGNARLE LA FECHA DE HOY
                if(completadaActual == true && modoActionImprovement == "editar"){
                        let actionSelect = actionImprovementProposalsListAPI.filter(elemento => elemento.id == filaSeleccionadaGridActionsImprovement)[0]
                        if (actionSelect != undefined) {
                                if(actionSelect.completed == false){
                                        setFechaEjecucionActual(new Date());
                                }
                        }
                }

        }, [completadaActual])


        useEffect(() => {
                if(visibilidadModalInsertar == true){
                        if (modoActionImprovement != '' && filaSeleccionadaGridActionsImprovement != '') {
                                if (modoActionImprovement == 'nuevo') {
                                        setTituloActual('')
                                        setFechaPlanificadaActual('')
                                        setFechaEjecucionActual('')
                                        setManagerActual(personLogin)
                                        setMiembroActual([])
                                        setObservacionesActual('')
                                        setGuardarCambios(false)
                                        setAccionCerrada(false)
                                        setBotonControl(true)
                                        setCompletadaActual(false)
                                        setRecordatorioClose(false)
                                }
                                if (modoActionImprovement == 'editar') {

                                        let actionSelect = actionImprovementProposalsListAPI.filter(elemento => elemento.id == filaSeleccionadaGridActionsImprovement)[0]


                                        if (actionSelect != undefined) {
                                                setTituloActual(actionSelect.titulo)
                                                setFechaPlanificadaActual(actionSelect.fecha_prevista)

                                                let userSelect = usersListAPI.filter(elemento => elemento.id == actionSelect.responsable_accion)[0]
                                                if (userSelect != undefined) {
                                                        setManagerActual(userSelect)
                                                }
                                                else {
                                                        setManagerActual('')
                                                }

                                                let vectMembers = []
                                                for (let elementoUser in actionSelect.user_ayundantes) {
                                                        let members = usersListAPI.filter(elemento => elemento.id == actionSelect.user_ayundantes[elementoUser])[0]
                                                        if (members != undefined) {
                                                                vectMembers.push(members)
                                                        }

                                                }
                                                setMiembroActual(vectMembers)

                                                setCompletadaActual(actionSelect.completed)

                                                if (actionSelect.completed == true) {
                                                        setFechaEjecucionActual(actionSelect.fecha_ejecucion)
                                                }

                                                setAccionCerrada(actionSelect.completed)

                                                setObservacionesActual(actionSelect.observations)

                                                setGuardarCambios(false)
                                                setBotonControl(true)
                                                setRecordatorioClose(false)
                                        }
                                }
                        }
                }

        }, [modoActionImprovement, filaSeleccionadaGridActionsImprovement, visibilidadModalInsertar])


        /* Comprobar si ha rellenado todos los campos */

        useEffect(() => {
                let resultdateEjecutada
                let resultdatePlanificada = moment(fechaPlanificadaActual, 'YYYY-MM-DD').isValid()

                if (completadaActual == true) {
                        resultdateEjecutada = moment(fechaEjecucionActual, 'YYYY-MM-DD').isValid()
                }

                if (tituloActual.trim() != '' &&
                        resultdatePlanificada &&
                        managerActual != '' &&
                        miembroActual != '' &&
                        observacionesActual.trim() != '') {

                        if (completadaActual == false || (fechaEjecucionActual != '' && resultdateEjecutada)) {
                                setBotonControl(false)
                        }
                        else {
                                setBotonControl(true)
                        }


                } else {
                        setBotonControl(true)

                }


                //Close without save


                if (tituloActual.trim() != '' ||
                        managerActual != '' ||
                        miembroActual != '') {

                        setGuardarCambios(true)

                } else {
                        setGuardarCambios(false)

                }

        })


        function colorDinamic(estado) {

                if (!estado) {
                        return "gray"

                } else {
                        return "green"

                }

        }

        function completaIncompleta() {

                let opcionesCompletada

                if (accionCerrada) {
                        opcionesCompletada = "COMPLETED"

                } else if (completadaActual) {

                        opcionesCompletada = "MARK AS INCOMPLETE"

                } else {

                        opcionesCompletada = "MARK AS COMPLETE"

                }

                return opcionesCompletada

        }


        return (
                <>

                        <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar(false, '')} fullWidth maxWidth='md'>

                                <DialogTitle classes={{ root: classes.customDialogTitle }} >

                                        {modoActionImprovement == 'editar' ? 'Edit Action' : 'Create Action'}
                                </DialogTitle>
                                <DialogContent>

                                        <Grid container spacing={2} columns={16}>

                                                <Grid item xs={16}>
                                                        <Button style={{ display: modoActionImprovement == 'editar' && accionCerrada == false ? 'block' : 'none' }} className="ml-8" disabled={accionCerrada} >

                                                                <span className="mx-8">
                                                                        <Button onClick={() => {completadaActual ? setCompletadaActual(false) : setCompletadaActual(true), setFechaEjecucionActual(null)}}>

                                                                                <TaskAlt style={{ color: colorDinamic(completadaActual) }} /> {completaIncompleta()}

                                                                        </Button>
                                                                </span>
                                                        </Button>
                                                </Grid>


                                                <Grid item xs={8}>

                                                        <TextField
                                                                label="Title"
                                                                id="titulo"
                                                                value={tituloActual}
                                                                disabled={accionCerrada}
                                                                size="small"
                                                                sx={{ m: 1, width: '37ch' }}
                                                                onChange={e => setTituloActual(e.target.value)}
                                                        />

                                                </Grid>

                                                <Grid item xs={8}>
                                                        <FormControl variant="standard" fullWidth>
                                                                <Autocomplete
                                                                        id="managerRisk"
                                                                        options={usersListAPI}
                                                                        getOptionLabel={(option) =>
                                                                                option.first_name != null ? option.IDidentification + " - " + option.first_name + " " + option.last_name : ''
                                                                        }
                                                                        onChange={(event, value1) => setManagerActual(value1)}
                                                                        fullWidth
                                                                        filterSelectedOptions
                                                                        disabled
                                                                        value={managerActual != undefined ? managerActual : ''}
                                                                        renderInput={(params) => (
                                                                                <TextField
                                                                                        {...params}
                                                                                        label="Manager"
                                                                                        placeholder="Manager"
                                                                                        size="small"
                                                                                        sx={{ m: 1, width: '37ch' }}
                                                                                />
                                                                        )}
                                                                />
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8}>

                                                        <FormControl sx={{ m: 1, width: '37ch' }} size="small">
                                                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns} style={{ marginLeft: '8px' }}>
                                                                        <DatePicker
                                                                                label="Planned date"
                                                                                disabled={accionCerrada}
                                                                                id="fechaPlanificada"
                                                                                inputFormat="yyyy-MM-dd"
                                                                                format="yyyy-MM-dd"
                                                                                value={fechaPlanificadaActual}
                                                                                onChange={(newValue) => {
                                                                                        if (newValue == "Invalid Date" || newValue == null) {
                                                                                                setFechaPlanificadaActual(newValue)
                                                                                        } else {
                                                                                                let fechaseleccionada = newValue.toISOString()
                                                                                                let arrayFecha = fechaseleccionada.split("T")
                                                                                                setFechaPlanificadaActual(arrayFecha[0]);
                                                                                        }
                                                                                }}
                                                                                renderInput={(params) => <TextField {...params} />}


                                                                        />
                                                                </LocalizationProvider>
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8}>
                                                        <Autocomplete
                                                                multiple
                                                                limitTags={accionCerrada == true ? 10 : 2}
                                                                id="tags-outlined"
                                                                disabled={accionCerrada}
                                                                options={usersListAPI}
                                                                getOptionLabel={(option) =>
                                                                        option.first_name != null ? option.IDidentification + " - " + option.first_name + " " + option.last_name : ''
                                                                }
                                                                value={miembroActual}
                                                                onChange={(event, value) => setMiembroActual(value)}
                                                                filterSelectedOptions
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="Members"
                                                                                placeholder="Members"
                                                                                size="small"
                                                                                sx={{ m: 1, width: '37ch' }}
                                                                        />
                                                                )}
                                                        />
                                                </Grid>

                                                <Grid item xs={8} style={completadaActual == true ? { display: 'block' } : { display: 'none' }}>

                                                        <FormControl sx={{ m: 1, width: '37ch' }} size="small">
                                                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns} style={{ marginLeft: '8px' }}>
                                                                        <DatePicker
                                                                                label="Execute date"
                                                                                disabled={accionCerrada}

                                                                                id="fechaPlanificada"
                                                                                inputFormat="yyyy-MM-dd"
                                                                                format="yyyy-MM-dd"
                                                                                value={fechaEjecucionActual}
                                                                                onChange={(newValue) => {
                                                                                        if (newValue == "Invalid Date" || newValue == null) {
                                                                                                setFechaEjecucionActual(newValue)
                                                                                        } else {
                                                                                                let fechaseleccionada = newValue.toISOString()
                                                                                                let arrayFecha = fechaseleccionada.split("T")
                                                                                                setFechaEjecucionActual(arrayFecha[0]);
                                                                                        }
                                                                                }}
                                                                                renderInput={(params) => <TextField {...params} />}


                                                                        />
                                                                </LocalizationProvider>
                                                        </FormControl>
                                                </Grid>

                                                <Grid item xs={8}>


                                                        <TextField
                                                                id="observaciones"
                                                                label="Remarks"
                                                                multiline
                                                                rows={2}
                                                                disabled={accionCerrada}
                                                                value={observacionesActual}
                                                                size="small"
                                                                sx={{ m: 1, width: '37ch' }}
                                                                onChange={e => setObservacionesActual(e.target.value)}
                                                        />

                                                </Grid>
                                        </Grid>



                                </DialogContent>
                                <DialogActions>

                                        <Button variant="outlined" onClick={() => accionCerrada == false ? setRecordatorioClose(true): cambiarVisibilidadModalInsertar(false, '')}>{accionCerrada == false ? 'Close without saving' : 'Close'}</Button>
                                        <Button variant="outlined" style={accionCerrada == true ? {display: 'none'} : {display: 'inline'}} disabled={botonControl} onClick={() => {crearAction(), cambiarVisibilidadModalInsertar(false, '')}}> {modoActionImprovement == 'editar' ? 'Edit' : 'Save'}</Button>

                                </DialogActions>

                                <Dialog open={recordatorioClose} onClose={() => setRecordatorioClose(false)} fullWidth maxWidth="xs" >
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>
                                                Changes will not be saved, are you sure to close?

                                        </List>
                                        <DialogActions>
                                                <Button variant="outlined" onClick={() => { setRecordatorioClose(false); cambiarVisibilidadModalInsertar(false, ''); resetDialog() }}>Yes</Button>
                                                <Button variant="outlined" onClick={() => setRecordatorioClose(false)}>No</Button>
                                        </DialogActions>
                                </Dialog>

                        </Dialog>
                </>
        )
}

