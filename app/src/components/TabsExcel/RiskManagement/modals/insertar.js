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
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
        cambiarVisibilidadModalInsertarAction,
        insertarRiskManagementModalInsertarAction,
        mostrarRiskManagementAPIAction,
        cambiarStateInsertadoRiskManagementAction,
        cambiarEstadoRiskManagementAction,
        updateRiskManagementAction,
        mostrarRiskManagementByContractAPIAction
} from '../store/actions'

import {
        cambiarVisibilidadModalInsertarRmRiskOpportunityAction,
        cambiarVisibilidadModalPrincipalAction,
} from './RmRegistro/store/actions'

import { mostrarContratoServicioAPIAction } from '../../../Gestion/ContratoServicio/store/actions'
import { mostrarMisionPaquetesAPIAction } from '../../../Gestion/PaqueteTrabajo/store/actions'

import {
        getSesionActualAPIAction
} from '../../../Managment/Users/store/actions'

import {
        mostrarMisionAPIAction,
        mostrarMisionIncluyendoMisionesHeredadasAPIAction
} from '../../../Gestion/Mision/store/actions'

import {
        insertarLogRiskAPIAction
} from '../../../Managment/LogRisk/store/actions'

import {
        insertarNewNotificationAPIAction,
} from '../../../Managment/Notifications/store/actions'

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

        const [misionActual, setMisionActual] = useState('')
        const [tituloActual, setTituloActual] = useState('')
        const [codigoActual, setCodigoActual] = useState('')
        const [managerActual, setManagerActual] = useState('')
        const [miembroActual, setMiembroActual] = useState([])
        const [guardarCambios, setGuardarCambios] = useState(false)

        const [botonControl, setBotonControl] = useState(true)

        const [recordatorioClose, setRecordatorioClose] = useState(false)

        const insertadoRiskManagement = useSelector(state => state.fuse.riskManagementComponente.insertadoRiskManagement)
        const riskManagementListAPI = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI)
        const filaSeleccionadaGridRiskManagement = useSelector(state => state.fuse.riskManagementComponente.filaSeleccionadaGrid)
        const visibilidadModalInsertar = useSelector(state => state.fuse.riskManagementComponente.visibilidadModalInsertar)
        const modoRiskManagement = useSelector(state => state.fuse.riskManagementComponente.modo)
        const misionPaqueteListAPI = useSelector(state => state.fuse.misionPaqueteComponente.listMisionPaquetesAPI)
        const contratoListAPI = useSelector(state => state.fuse.contratoComponente.listContratoAPI)
        const personLogin = useSelector(state => state.fuse.userComponente.person)
        const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
        const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
        const contractUserList = useSelector(state => state.fuse.userComponente.contractUserListAPI)
        const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
        const locationCustomerListAPI = useSelector(state => state.fuse.customerComponent.locationCustomerListAPI)
        const ultimoIdCreado = useSelector(state => state.fuse.riskManagementComponente.ultimoIdCreado)

        //Creamos funciones para hacer uso de Actions Redux
        const cambiarVisibilidadModalInsertar = (valor) => dispatch(cambiarVisibilidadModalInsertarAction(valor))
        const cambiarVisibilidadModalInsertarRmRiskOpportunity = (valor) => dispatch(cambiarVisibilidadModalInsertarRmRiskOpportunityAction(valor))
        const cambiarVisibilidadModalPrincipalRmRiskOpportunity = (valor) => dispatch(cambiarVisibilidadModalPrincipalAction(valor))
        const cambiarStateinsertadoRiskManagement = (valor) => dispatch(cambiarStateInsertadoRiskManagementAction(valor))
        const mostrarMisionPaquetesAPI = () => dispatch(mostrarMisionPaquetesAPIAction())
        const mostrarContratosAPI = () => dispatch(mostrarContratoServicioAPIAction())
        const mostrarMisionAPI = () => dispatch(mostrarMisionAPIAction())
        const mostrarMisionIncluyendoMisionesHeredadasAPI = (idPersona) => dispatch(mostrarMisionIncluyendoMisionesHeredadasAPIAction(idPersona))

        const insertarRiskManagementModalInsertar = (riskManagement, idPersonLogin, veAllRisk) => dispatch(insertarRiskManagementModalInsertarAction(riskManagement, idPersonLogin, veAllRisk))
        const mostrarRiskManagementAPI = () => dispatch(mostrarRiskManagementAPIAction())
        const mostrarRiskManagementByContractAPI = (idPersona) => dispatch(mostrarRiskManagementByContractAPIAction(idPersona))
        const insertarLogRiskAPI = (json) => dispatch(insertarLogRiskAPIAction(json))



        const steps = [
                'Create FMEA',
                'Create R & O',
                'Create Actions',
        ];

        function crearRiskManagement() {

                //FORMATEAR miembroActual PARA GUARDAR
                let vectIDMiembros = []
                for (let aux in miembroActual) {
                        //let userSelect = usersListAPI.filter(item => item.id == miembroActual[aux]['id'])[0]
                        vectIDMiembros.push(miembroActual[aux].id)
                }

                if (modoRiskManagement == 'editar') {

                        let veAllRisk = false
                        if (personLoginPermisos.find((item) => item['name'] == "Can See All Risk") != undefined) {
                                veAllRisk = true
                        }

                        dispatch(updateRiskManagementAction(filaSeleccionadaGridRiskManagement, {

                                mision: misionActual,
                                title: tituloActual,
                                code: codigoActual,
                                manager: managerActual.id,
                                member: vectIDMiembros

                        }, personLogin.id, veAllRisk))

                        dispatch(cambiarEstadoRiskManagementAction('visibilidadModalInsertar', false))

                        //AÑADIR REGISTRO DE EDICION
                        insertarLogRiskAPI({
                                persona: personLogin.id,
                                fecha_accion: new Date().toISOString().split("T")[0],
                                hora_accion: new Date().toLocaleTimeString(),
                                accion: "Edit",
                                amfe_relacionado: filaSeleccionadaGridRiskManagement,
                                descripcion: "Risk edition with id: " + filaSeleccionadaGridRiskManagement
                        })

                        //AÑADIR NOTIFICACION DE APLICACION
                        //POST NOTIFICATION APP
                        let rmAmfeActual = riskManagementListAPI.filter(registro => registro.id == filaSeleccionadaGridRiskManagement)[0]
                        if (rmAmfeActual != undefined) {
                                for (let aux in miembroActual) {
                                        dispatch(insertarNewNotificationAPIAction({
                                                origen_notification_id: personLogin.id,
                                                destino_notification_id: miembroActual[aux].id,
                                                fecha: new Date().toISOString().split("T")[0],
                                                observations: "User " + personLogin.first_name + " " + personLogin.last_name + " has edited the AMFE: " + rmAmfeActual.title,
                                                typeNotification: "informacion",
                                                active: true
                                        }))
                                }
                        }




                } else {

                        //comprobar si tiene permisos de all risk para actualizar bien
                        let veAllRisk = false
                        if (personLoginPermisos.find((item) => item['name'] == "Can See All Risk") != undefined) {
                                veAllRisk = true
                        }

                        insertarRiskManagementModalInsertar({

                                mision: misionActual,
                                title: tituloActual,
                                code: codigoActual,
                                manager: managerActual.id,
                                member: vectIDMiembros

                        }, personLogin.id, veAllRisk)
                }


        }

        //Si inserta Risk Management, cierra modal, abre riesgos/oportunidades y modal de insertar
        useEffect(() => {

                if (insertadoRiskManagement == true) {
                        cambiarVisibilidadModalInsertar(false)
                        cambiarVisibilidadModalPrincipalRmRiskOpportunity(true)
                        cambiarVisibilidadModalInsertarRmRiskOpportunity(true)
                        cambiarStateinsertadoRiskManagement(false)

                }


        }, [insertadoRiskManagement])

        useEffect(() => {

                if (insertadoRiskManagement == true && ultimoIdCreado != '') {
                        //AÑADIR REGISTRO DE CREACION
                        insertarLogRiskAPI({
                                persona: personLogin.id,
                                fecha_accion: new Date().toISOString().split("T")[0],
                                hora_accion: new Date().toLocaleTimeString(),
                                accion: "Creation",
                                amfe_relacionado: ultimoIdCreado['id'],
                                descripcion: "Risk creation with id: " + ultimoIdCreado['id']
                        })

                        //AÑADIR NOTIFICACION A LOS MIEMBROS
                        for (let aux in ultimoIdCreado['member']) {
                                dispatch(insertarNewNotificationAPIAction({
                                        origen_notification_id: personLogin.id,
                                        destino_notification_id: ultimoIdCreado['member'][aux],
                                        fecha: new Date().toISOString().split("T")[0],
                                        observations: "User " + personLogin.first_name + " " + personLogin.last_name + " has created the AMFE: " + ultimoIdCreado['title'],
                                        typeNotification: "informacion",
                                        active: true
                                }))
                        }
                        
                }
        }, [ultimoIdCreado, insertadoRiskManagement])


        useEffect(() => {

                if (store.getState().fuse.riskManagementComponente.resetStatesLocal == true) {

                        setMisionActual('')
                        setTituloActual('')
                        setCodigoActual('')
                        setMiembroActual([])
                        dispatch(cambiarEstadoRiskManagementAction('resetStatesLocal', false))
                }


        }, [store.getState().fuse.riskManagementComponente.resetStatesLocal])

        useEffect(() => {
                if (visibilidadModalInsertar == true) {
                        mostrarMisionIncluyendoMisionesHeredadasAPI(personLogin.id)

                }

        }, [visibilidadModalInsertar])

        // Detectar modo edición

        useEffect(() => {
                if (store.getState().fuse.riskManagementComponente.modo == 'crear') {
                        setManagerActual(personLogin)
                }

                if (store.getState().fuse.riskManagementComponente.modo == 'editar') {

                        let rmAmfeActual = riskManagementListAPI.filter(registro => registro.id == filaSeleccionadaGridRiskManagement)[0]

                        if (rmAmfeActual != null) {

                                let vetPerson = []
                                for (let aux in rmAmfeActual.member) {
                                        let userSelect = usersListAPI.filter(item => item.id == rmAmfeActual.member[aux])[0]
                                        vetPerson.push(userSelect)
                                }

                                setMisionActual(rmAmfeActual.mision)
                                setTituloActual(rmAmfeActual.title)
                                setCodigoActual(rmAmfeActual.code)
                                setMiembroActual(vetPerson)

                                let userSelect = usersListAPI.filter(elemento => elemento.id == rmAmfeActual.manager)[0]
                                if (userSelect) {
                                        setManagerActual(userSelect)
                                }


                        }
                }


        }, [store.getState().fuse.riskManagementComponente.modo, filaSeleccionadaGridRiskManagement])

        /* Comprobar si ha rellenado todos los campos */

        useEffect(() => {
                if (tituloActual.trim() != '' &&
                        codigoActual.trim() != '' &&
                        managerActual != '' &&
                        misionActual != '') { // &&
                        //miembroActual != '') {

                        setBotonControl(false)

                } else {
                        setBotonControl(true)

                }


                //Close without save


                if (tituloActual.trim() != '' ||
                        codigoActual.trim() != '' ||
                        managerActual != '' ||
                        misionActual != '' ||
                        miembroActual != '') {

                        setGuardarCambios(true)

                } else {
                        setGuardarCambios(false)

                }

        })

        return (
                <>
                        <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar(false)} fullWidth maxWidth='md'>

                                <Box sx={{ width: '100%' }} style={{ marginTop: "20px", marginBottom: "20px", display: modoRiskManagement == 'editar' ? 'none' : 'block' }}>
                                        <Stepper activeStep={0} alternativeLabel>
                                                {steps.map((label) => (
                                                        <Step key={label}>
                                                                <StepLabel>{label}</StepLabel>
                                                        </Step>
                                                ))}
                                        </Stepper>
                                </Box>


                                <DialogTitle classes={{ root: classes.customDialogTitle }} >

                                        {modoRiskManagement == 'editar' ? 'Edit FMEA' : 'Create FMEA'}
                                </DialogTitle>
                                <DialogContent>

                                        <Grid container spacing={2} columns={16}>




                                                <Grid item xs={8}>

                                                        <TextField
                                                                label="Title"
                                                                id="titulo"
                                                                value={tituloActual}
                                                                size="small"
                                                                sx={{ m: 1, width: '37ch' }}
                                                                onChange={e => setTituloActual(e.target.value)}
                                                        />

                                                </Grid>


                                                <Grid item xs={8}>

                                                        <TextField
                                                                label="Code"
                                                                id="code"
                                                                value={codigoActual}
                                                                size="small"
                                                                sx={{ m: 1, width: '37ch' }}
                                                                onChange={e => setCodigoActual(e.target.value)}
                                                        />

                                                </Grid>

                                                {/*<Grid item xs={8}>

                                                        <TextField
                                                                label="Manager"
                                                                id="manager"
                                                                value={managerActual}
                                                                size="small"
                                                                sx={{ m: 1, width: '37ch' }}
                                                                onChange={e => setManagerActual(e.target.value)}
                                                        />

                                                </Grid>*/}

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


                                                {/*<Grid item xs={8}>

                                                        <TextField
                                                                label="Members"
                                                                id="member"
                                                                value={miembroActual}
                                                                size="small"
                                                                sx={{ m: 1, width: '37ch' }}
                                                                onChange={e => setMiembroActual(e.target.value)}
                                                        />


                                                </Grid>*/}

                                                <Grid item xs={8}>
                                                        <Autocomplete
                                                                multiple
                                                                limitTags={2}
                                                                id="tags-outlined"
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

                                        </Grid>
                                        <div>
                                                <Divider style={{ margin: '25px' }} />
                                        </div>
                                        <Grid container spacing={2} columns={16}>

                                                {/*locationCustomerListAPI */}

                                                <Grid item xs={8}>

                                                        <FormControl sx={{ m: 1, width: '37ch' }} size="small">
                                                                <InputLabel id="demo-simple-select-label">Mission</InputLabel>
                                                                <Select
                                                                        labelId="Mission"
                                                                        id="mision"
                                                                        value={misionActual}
                                                                        size="small"
                                                                        label="Service"
                                                                        onChange={e => setMisionActual(e.target.value)}
                                                                >
                                                                        {listMisionAPI.map((elemento) => (
                                                                                <MenuItem value={elemento.id}> {elemento.name} </MenuItem>
                                                                        ))}

                                                                </Select>

                                                                {/*<Autocomplete
                                                                        id="tags-outlined"
                                                                        options={contratoListAPI}
                                                                        onChange={(event, value) => setMisionActual(value)}
                                                                        getOptionLabel={(option) => option.name}
                                                                        filterSelectedOptions
                                                                        renderInput={(params) => (
                                                                                <TextField
                                                                                        {...params}
                                                                                        label="Service"
                                                                                        placeholder="Service"
                                                                                        size="small"
                                                                                        sx={{ m: 1, width: '37ch' }}
                                                                                        onChange={e => { setMisionActual(e.target.value); }}
                                                                                />
                                                                        )}
                                                                />*/}
                                                        </FormControl>

                                                </Grid>





                                        </Grid>



                                </DialogContent>
                                <DialogActions>


                                        <Button variant="outlined" onClick={() => guardarCambios ? setRecordatorioClose(true) : cambiarVisibilidadModalInsertar(false)}>{guardarCambios ? 'Close without saving' : 'Close'}</Button>
                                        <Button variant="outlined" disabled={botonControl} onClick={() => crearRiskManagement()}> {modoRiskManagement == 'editar' ? 'Edit' : 'Save and create R & O'} &nbsp; <ArrowCircleRightIcon /></Button>

                                </DialogActions>

                                <Dialog open={recordatorioClose} onClose={() => setRecordatorioClose(false)} fullWidth maxWidth="xs" >
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <List sx={{ pt: 0 }} style={{ margin: '20px' }}>
                                                Changes will not be saved, are you sure to close?

                                        </List>
                                        <DialogActions>
                                                <Button variant="outlined" onClick={() => { setRecordatorioClose(false); cambiarVisibilidadModalInsertar(false) }}>Yes</Button>
                                                <Button variant="outlined" onClick={() => setRecordatorioClose(false)}>No</Button>
                                        </DialogActions>
                                </Dialog>

                        </Dialog>
                </>
        )
}

