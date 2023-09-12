//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ComputerIcon from '@mui/icons-material/Computer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TextField from '@mui/material/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PersonIcon from '@mui/icons-material/Person';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridToolbarContainer
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
    mostrarImprovementProposalsAction,
    cambiarVisibilidadModalInsertarAction,
    cambiarValorSeleccionAction,
    cambiarEstadoImprovementProposalsAction,
    mostrarImprovementProposalsByContractAPIAction,
    updateImprovementProposalsAction
} from './store/actions'

import {
    getSesionActualAPIAction,
    getPermisosSesionActualAPIAction,
    mostrarUserAPIAction

} from '../../Managment/Users/store/actions'


import {
    cambiarVisibilidadModalActionsAPI,
    mostrarActionsImprovementProposalsAction
} from './ImprovementActions/store/actions'

import {
    mostrarMisionAPIAction
} from '../../Gestion/Mision/store/actions'

import { getSubMisionAPIAction } from '../../Gestion/SubMision/store/actions'
import { mostrarAllDepartamentosAPIAction } from '../../Gestion/Departamentos/store/actions'

//Modales importaciones
import ModalInsertar from './modals/insertar.js'
import ModalInsertarAction from './ImprovementActions/modals/insertar.js'
import ImprovementActions from './ImprovementActions/ImprovementActions.js'
import TableModules from '../../tables/TableModules'
import { getCookie } from 'app/js/generalFunctions'

const useStyles = makeStyles({

    customDialogTitle: {
        backgroundColor: 'rgb(0, 0, 0)',
                marginLeft: '3px',
                marginRight: '3px',
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    },
    root: {
        width: 300,
    }

});

//**********************END_IMPORTACIONES ***********************/



export default function ImprovementProposals() {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const classes = useStyles();

    const [numPagination, setNumPagination] = useState(10)

    const [disabledNewImprovement, setDisabledNewImprovement] = useState(true)
    const [disabledEditImprovement, setDisabledEditImprovement] = useState(true)
    const [disabledRemoveImprovement, setDisabledRemoveImprovement] = useState(true)
    const [disabledViewActions, setDisabledViewActions] = useState(true)

    const [permiteEditarEstadoPeticion, setPermiteEditarEstadoPeticion] = useState(false)
    const [permitirCompletarAccion, setPermitirCompletarAccion] = useState(false)
    const [permiteAnadirAccionesPeticion, setPermiteAnadirAccionesPeticion] = useState(false)
    const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)
    const [funcionDialogoConfirmacion, setFuncionDialogoConfirmacion] = useState('')
    const [rechazoMejora, setRechazoMejora] = useState(false)
    const [razonRechazo, setRazonRechazo] = useState('')
    const [verPersonalImplicado, setVerPersonalImplicado] = useState(false)


    const [applicantImprovement, setApplicantImprovement] = useState('')
    const [membersImprovement, setMembersImprovement] = useState('')
    const [responsablesEmpleadoMision, setResponsablesEmpleadoMision] = useState('')
    const [responsableMision, setResponsableMision] = useState('')
    const [nombreDepartamento, setNombreDepartamento] = useState('')
    const [responsableDepartamento, setResponsableDepartamento] = useState('')
    const [responsableProceso, setResponsableProceso] = useState('')
    const [estandarizadorProceso, setEstandarizadorProceso] = useState('')
    const [equipoMFT, setEquipoMFT] = useState('')

    //Obtener los states de Redux
    const loading = useSelector(state => state.fuse.improvementProposalsComponent.loading)
    const improvementProposalsList = useSelector(state => state.fuse.improvementProposalsComponent.improvementProposalsListAPI)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.improvementProposalsComponent.filaSeleccionadaGrid)
    const modo = useSelector(state => state.fuse.improvementProposalsComponent.modo)
    const visibilidadModalInsertar = useSelector(state => state.fuse.improvementProposalsComponent.visibilidadModalInsertar)
    const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
    const personLogin = useSelector(state => state.fuse.userComponente.person)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
    const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
    const listSubMisionAPI = useSelector(state => state.fuse.subMisionComponent.listSubMisiones)
    const visibilidadModalAction = useSelector(state => state.fuse.actionImprovementProposalsComponent.visibilidadModalAction)
    const listAllDepartamentAPI = useSelector(state => state.fuse.departamentoViewComponente.listAllDepartamentAPI)

    //Creamos funciones para hacer uso de Actions Redux
    const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAction(valor, modo))
    const mostrarImprovementProposals = () => dispatch(mostrarImprovementProposalsAction())
    const mostrarImprovementProposalsByContractAPI = (idPersona) => dispatch(mostrarImprovementProposalsByContractAPIAction(idPersona))
    const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
    const updateImprovementProposals = (id, json, idPerson) => dispatch(updateImprovementProposalsAction(id, json, idPerson))
    const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
    const cambiarVisibilidadModalActions = (valor) => dispatch(cambiarVisibilidadModalActionsAPI(valor))
    const mostrarActionsImprovementProposals = (valor) => dispatch(mostrarActionsImprovementProposalsAction(valor))
    const mostrarMisionAPI = () => dispatch(mostrarMisionAPIAction())
    const getSubMisionAPI = () => dispatch(getSubMisionAPIAction())

    const mostrarAllDepartamentosAPI = () => dispatch(mostrarAllDepartamentosAPIAction())

    const [resetStates, setResetStates] = useState(false);

    const columnasDataTable = [
        { Header: "ID", accessor: "id", sortable: true, type: 'string' },
        { Header: "Title", accessor: "titulo", sortable: true, type: 'string' },
        { Header: "Sub Mission", accessor: "subMision_name", sortable: true, type: 'list' },
        { Header: "User", accessor: "user_id_principal_name", sortable: true, type: 'list' },
        { Header: "Date", accessor: "fecha_solicitud", sortable: true, type: 'date' },
        { Header: "State", accessor: "estado", sortable: true, type: 'list' },
        { Header: "Actions", accessor: "mix_actions", sortable: false, type: 'string' }
    ]

    //Se ejecuta cuando se cierra el dialogo de insertar/añadir para recargar los datos modificados o añadidos
    useEffect(() => {

        if (visibilidadModalInsertar != '' && visibilidadModalInsertar == false) {
            if (personLoginPermisos.find((item) => item['name'] == "Can See All Improvement") != undefined) {
                mostrarImprovementProposals()
            }
            else {
                mostrarImprovementProposalsByContractAPI(personLogin.id)
            }
        }

    }, [visibilidadModalInsertar])

    //Se ejecuta cuando se establecen los permisos del usuario para distinguir si se quieren visualizar todos o no
    useEffect(() => {

        if (personLogin.id != undefined) {
            if (personLoginPermisos.length > 0) {
                if (personLoginPermisos.find((item) => item['name'] == "Can See All Improvement") != undefined) {
                    mostrarImprovementProposals()
                }
                else {
                    mostrarImprovementProposalsByContractAPI(personLogin.id)
                }
            }
            else {
                mostrarImprovementProposalsByContractAPI(personLogin.id)
            }
        }

    }, [personLogin, personLoginPermisos])


    useEffect(() => {

        getSubMisionAPI()
        mostrarUserAPI()
        mostrarMisionAPI()
        //mostrarProcessAPI()
        mostrarAllDepartamentosAPI()

        //GET USER
        if (personLogin.id == undefined) {
            dispatch(getSesionActualAPIAction({
                token: getCookie('token')
            }))
        }
        //FIN GET USER

        //GET USER
        dispatch(getPermisosSesionActualAPIAction({
            token: getCookie('token')
        }))
        //FIN GET USER

    }, [])

    useEffect(() => {
        if (personLogin.id != undefined) {
            
        }
    }, [personLogin])

    useEffect(() => {


        if (personLoginPermisos.length > 0) {

            if (personLoginPermisos.find((item) => item['name'] == "Can view improvement") == undefined) {
                navigate('/')
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can add improvement") == undefined) {
                setDisabledNewImprovement(false)
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can change improvement") == undefined) {
                setDisabledEditImprovement(false)
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can delete improvement") == undefined) {
                setDisabledRemoveImprovement(false)
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can view acciones improvement") == undefined) {
                setDisabledViewActions(false)
            }

        }

    }, [personLoginPermisos])


    useEffect(() => {

        if (filaSeleccionadaGrid != '') {
            mostrarActionsImprovementProposals(filaSeleccionadaGrid)
            let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]
            if (mejoraSelected != undefined) {

                switch (mejoraSelected.estado) {
                    case "ACCEPTED":
                        setPermiteAnadirAccionesPeticion(true)
                        setPermiteEditarEstadoPeticion(false)
                        setPermitirCompletarAccion(false)
                        break;

                    case "REQUESTED":
                        setPermiteAnadirAccionesPeticion(false)
                        setPermiteEditarEstadoPeticion(false)
                        setPermitirCompletarAccion(true)
                        break;

                    case "IN STUDY":
                        setPermiteAnadirAccionesPeticion(false)
                        setPermiteEditarEstadoPeticion(true)
                        setPermitirCompletarAccion(false)
                        break;

                    case "PENDING":
                        setPermiteAnadirAccionesPeticion(false)
                        setPermiteEditarEstadoPeticion(true)
                        setPermitirCompletarAccion(false)
                        break;

                    case "REJECTED":
                        setPermiteAnadirAccionesPeticion(false)
                        setPermiteEditarEstadoPeticion(false)
                        setPermitirCompletarAccion(false)
                        break;
                }

                //DIALOGO DE DETALLES
                setDetailsMejora(mejoraSelected)
            }

        }

    }, [filaSeleccionadaGrid])

    function setDetailsMejora(mejoraSelected) {

        //SOLICITANTE
        let aplicantSelect = usersListAPI.filter(elemento => elemento.id == mejoraSelected.user_id_principal)[0]
        if (aplicantSelect != undefined) {
            setApplicantImprovement(aplicantSelect.first_name + " " + aplicantSelect.last_name)
        }

        //MIEMBROS
        let cadenaMiembros = ""
        for (let member in mejoraSelected.user_id_secundario) {
            let miembroSelect = usersListAPI.filter(elemento => elemento.id == mejoraSelected.user_id_secundario[member])[0]
            if (miembroSelect != undefined) {
                cadenaMiembros = cadenaMiembros + miembroSelect.first_name + " " + miembroSelect.last_name + ", "
            }
        }
        setMembersImprovement(cadenaMiembros)

        //RESPONSABLES DE MISION

        //REPONSABLE MISION SELECT
        let subMisionSelect = listSubMisionAPI.filter(elemento => elemento.id == mejoraSelected.subMision)[0]
        let misionSelect = listMisionAPI.filter(elemento => elemento.id == subMisionSelect.id_mision)[0]
        let cadenaResponsablesMisionSelect = ""
        if (misionSelect != undefined) {
            for (let member in misionSelect.responsables) {
                let responsableMisionSelect = usersListAPI.filter(elemento => elemento.id == misionSelect.responsables[member])[0]
                if (responsableMisionSelect != undefined) {
                    cadenaResponsablesMisionSelect = cadenaResponsablesMisionSelect + responsableMisionSelect.first_name + " " + responsableMisionSelect.last_name + ", "
                }
            }
        }
        setResponsableMision(cadenaResponsablesMisionSelect)


        //RESPONSABLE DEPARTAMENTO SELECTED
        if (mejoraSelected.estado != "REQUESTED") {
            let nombreDepartamentos = ""
            let integrantesDepartamentos = ""
            for (let itemDepartamento in mejoraSelected.departamentoImprovement) {
                let departamentoSelect = listAllDepartamentAPI.filter(elemento => elemento.id == itemDepartamento)[0]
                if (departamentoSelect != undefined) {
                    nombreDepartamentos = nombreDepartamentos + departamentoSelect.name + ", "
                    for (let member in departamentoSelect.responsables) {
                        let responsableDepartamentoSelect = usersListAPI.filter(elemento => elemento.id == departamentoSelect.responsables[member])[0]
                        if (responsableDepartamentoSelect != undefined) {
                            integrantesDepartamentos = integrantesDepartamentos + responsableDepartamentoSelect.first_name + " " + responsableDepartamentoSelect.last_name + ", "
                        }
                    }
                }
            }

            setResponsableDepartamento(integrantesDepartamentos)
            setNombreDepartamento(nombreDepartamentos)
        }

        //EQUIPO MFT
        let cadenaEquipoMFT = ""
        for (let member in mejoraSelected.equipoMFT) {
            let equipoMFTSelect = usersListAPI.filter(elemento => elemento.id == mejoraSelected.equipoMFT[member])[0]
            if (equipoMFTSelect != undefined) {
                cadenaEquipoMFT = cadenaEquipoMFT + equipoMFTSelect.first_name + " " + equipoMFTSelect.last_name + ", "
            }
        }
        setEquipoMFT(cadenaEquipoMFT)

    }

    function funcionActualizaSolicitud(nuevoState) {

        if (nuevoState == 'REJECTED') {
            setRechazoMejora(true)
        }

        if (nuevoState == 'ACCEPTED') {
            cambiarVisibilidadModalInsertar(true, 'aceptarMejora');
        }

        if (nuevoState == "PENDING") {
            cambiarVisibilidadModalInsertar(true, 'completarMejora');
        }

        if (nuevoState == 'IN STUDY') {
            let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]
            if (mejoraSelected != undefined) {
                updateImprovementProposals(filaSeleccionadaGrid, {
                    titulo: mejoraSelected.titulo,
                    subMision: mejoraSelected.subMision,
                    user_id_principal: mejoraSelected.user_id_principal,
                    estado: nuevoState
                }, personLogin.id)
            }

            cambiarValorSeleccion('');
        }


    }

    function rechazarPropuestaMejora() {

        let mejoraSelected = improvementProposalsList.filter(registro => registro.id == filaSeleccionadaGrid)[0]
        if (mejoraSelected != undefined) {

            updateImprovementProposals(filaSeleccionadaGrid, {
                titulo: mejoraSelected.titulo,
                subMision: mejoraSelected.subMision,
                user_id_principal: mejoraSelected.user_id_principal,
                estado: "REJECTED"
            }, personLogin.id)

            let userEnviosSolicitud = ""
            let userSolicitud = usersListAPI.filter(registro => registro.id == mejoraSelected.user_id_principal)[0]

            if (userSolicitud != undefined) {
                userEnviosSolicitud = userEnviosSolicitud + userSolicitud.email + ";"
            }

            for (let elemento in mejoraSelected.user_id_secundario) {
                let userSegundo = usersListAPI.filter(registro => registro.id == mejoraSelected.user_id_secundario[elemento])[0]
                if (userSegundo != undefined) {
                    userEnviosSolicitud = userEnviosSolicitud + userSegundo.email + ";"
                }
            }

            cambiarValorSeleccion('');


        }

    }

    function CustomPagination() {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);

        function handleChange() {

        }

        return (
            <>
                <div>
                    <div style={{ display: "inline" }}>
                        <FormControl variant="standard" >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={numPagination}
                                label="Size"
                                style={{ float: "right", position: "relative" }}
                                onChange={e => { setNumPagination(e.target.value); }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{ display: "inline", float: "right", position: "relative" }}>
                        <Pagination
                            color="primary"
                            count={pageCount}
                            page={page + 1}
                            onChange={(event, value) => apiRef.current.setPage(value - 1)}
                        />
                    </div>
                </div>

            </>
        );
    }

    function botonesSuperiores() {
        return (
            <>
                <Tooltip title="New" placement="top">
                    <IconButton style={disabledNewImprovement == true ? { display: "inline" } : { display: "none" }}>
                        <AddCircleIcon variant="outlined" onClick={
                            () => {
                                cambiarVisibilidadModalInsertar(true, 'nuevo')
                            }
                        }
                        >
                        </AddCircleIcon>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Details" placement="top">
                    <IconButton style={disabledEditImprovement == true ? { display: "inline" } : { display: "none" }}
                        onClick={() => {
                            cambiarVisibilidadModalInsertar(true, 'consultar');
                        }}
                        disabled={filaSeleccionadaGrid != '' ? false : true}
                    >
                        <FormatListBulletedIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Actions" placement="top">
                    <IconButton style={disabledViewActions == true ? { display: "inline" } : { display: "none" }}
                        onClick={
                            () => {
                                cambiarVisibilidadModalActions(true)
                            }
                        } disabled={filaSeleccionadaGrid != '' && permiteAnadirAccionesPeticion == true ? false : true}>
                        <AddTaskIcon />

                    </IconButton>
                </Tooltip>

                <Tooltip title="People" placement="top">
                    <IconButton
                        onClick={
                            () => {
                                setVerPersonalImplicado(true)
                            }
                        } disabled={filaSeleccionadaGrid != '' ? false : true}>
                        <PersonIcon />

                    </IconButton>
                </Tooltip>

                <Tooltip title="Edit" placement="top">
                    <IconButton style={disabledEditImprovement == true ? { display: "inline" } : { display: "none" }}
                        onClick={() => {

                            cambiarVisibilidadModalInsertar(true, 'editar');

                        }}
                        disabled={filaSeleccionadaGrid != '' && permitirCompletarAccion == true ? false : true}>

                        <EditIcon />
                    </IconButton>
                </Tooltip>


                <Tooltip title="Delete" placement="top">
                    <IconButton style={disabledRemoveImprovement == true ? { display: "inline" } : { display: "none" }}
                        onClick={() => {

                        }}
                        disabled={filaSeleccionadaGrid != '' ? true : true}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Decline" placement="top">
                    <IconButton style={disabledRemoveImprovement == true ? { display: "inline", float: "right", position: "relative", marginRight: "20px" } : { display: "none" }}
                        onClick={() => {
                            //funcionActualizaSolicitud("REJECTED")
                            setVisibilidadDialogoConfirmacion(true);
                            setFuncionDialogoConfirmacion('REJECTED')
                        }}
                        disabled={filaSeleccionadaGrid != '' && permiteEditarEstadoPeticion == true ? false : true}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Accept" placement="top">
                    <IconButton style={disabledRemoveImprovement == true ? { display: "inline", float: "right", position: "relative" } : { display: "none" }}
                        onClick={() => {
                            setVisibilidadDialogoConfirmacion(true);
                            setFuncionDialogoConfirmacion('ACCEPTED')
                            //funcionActualizaSolicitud("ACCEPTED")

                        }}
                        disabled={filaSeleccionadaGrid != '' && permiteEditarEstadoPeticion == true ? false : true}>
                        <DoneIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="In study" placement="top">
                    <IconButton style={disabledRemoveImprovement == true ? { display: "inline", float: "right", position: "relative" } : { display: "none" }}
                        onClick={() => {
                            //funcionActualizaSolicitud("IN STUDY")
                            setVisibilidadDialogoConfirmacion(true);
                            setFuncionDialogoConfirmacion('IN STUDY')
                        }}
                        disabled={filaSeleccionadaGrid != '' && permiteEditarEstadoPeticion == true ? false : true}>
                        <ComputerIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Complete" placement="top">
                    <IconButton style={disabledRemoveImprovement == true ? { display: "inline", float: "right", position: "relative" } : { display: "none" }}
                        onClick={() => {
                            setVisibilidadDialogoConfirmacion(true);
                            setFuncionDialogoConfirmacion('PENDING')
                        }}
                        disabled={filaSeleccionadaGrid != '' && permitirCompletarAccion == true ? false : true}>
                        <FactCheckIcon />
                    </IconButton>
                </Tooltip>

                <Divider />
            </>
        );
    }

    return (
        <>

            <FusePageCarded

                content={
                    <Box sx={{ width: '100%' }}>

                        <div style={{ width: '100%' }}>
                            {botonesSuperiores()}
                            <TableModules rowsProp={improvementProposalsList} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />

                        </div>

                        <ModalInsertar />
                        <ModalInsertarAction />
                        <ImprovementActions />
                        <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

                            <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                Confirmation
                            </DialogTitle>
                            <DialogContent>
                                {funcionDialogoConfirmacion == 'ACCEPTED' ? "Are you sure you want to accept this request?" : ""}
                                {funcionDialogoConfirmacion == 'REJECTED' ? "Are you sure you want to reject this request?" : ""}
                                {funcionDialogoConfirmacion == 'IN STUDY' ? "Are you sure you want to set this request IN STUDY" : ""}
                                {funcionDialogoConfirmacion == 'PENDING' ? "Are you sure you want to complete this request?" : ""}
                            </DialogContent>
                            <DialogActions>

                                <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
                                <Button variant="outlined" onClick={() => { funcionActualizaSolicitud(funcionDialogoConfirmacion), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

                            </DialogActions>

                        </Dialog>

                        <Dialog open={rechazoMejora} fullWidth maxWidth="xs" >
                            <DialogTitle>Rejection reason</DialogTitle>
                            <DialogContent>

                                <TextField
                                    style={{ width: '100%', textAlign: 'center', marginTop: '15px' }}
                                    label="Rejection reason"
                                    id="RejectionReason"
                                    size="xl"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    onChange={e => setRazonRechazo(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="outlined" onClick={() => { rechazarPropuestaMejora(); setRechazoMejora(false) }}>Send</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={verPersonalImplicado} fullWidth maxWidth="lg" >
                            <DialogTitle>Rejection reason</DialogTitle>
                            <DialogContent>

                                <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">

                                            <TableBody>
                                                <>
                                                    <TableRow
                                                        key={applicantImprovement}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row"><b>Applicant:</b></TableCell>
                                                        <TableCell align="left">{applicantImprovement}</TableCell>

                                                    </TableRow>

                                                    <TableRow
                                                        key={membersImprovement}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row"><b>Members:</b></TableCell>
                                                        <TableCell align="left">{membersImprovement}</TableCell>

                                                    </TableRow>

                                                    <TableRow
                                                        key={responsablesEmpleadoMision}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row"><b>Responsible for the employee:</b></TableCell>
                                                        <TableCell align="left">{responsablesEmpleadoMision}</TableCell>

                                                    </TableRow>

                                                    <TableRow
                                                        key={responsableMision}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row"><b>Mission manager:</b></TableCell>
                                                        <TableCell align="left">{responsableMision}</TableCell>

                                                    </TableRow>

                                                    <TableRow
                                                        key={responsableDepartamento}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row"><b>Department manager({nombreDepartamento}):</b></TableCell>
                                                        <TableCell align="left">{responsableDepartamento}</TableCell>

                                                    </TableRow>
                                                    {/*<TableRow
                                                        key={responsableProceso}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row"><b>Process manager:</b></TableCell>
                                                        <TableCell align="left">{responsableProceso}</TableCell>

                                                    </TableRow>

                                                    <TableRow
                                                        key={estandarizadorProceso}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row"><b>Process standardizer:</b></TableCell>
                                                        <TableCell align="left">{estandarizadorProceso}</TableCell>

                                                    </TableRow>*/}

                                                    <TableRow
                                                        key={equipoMFT}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row"><b>MFT team:</b></TableCell>
                                                        <TableCell align="left">{equipoMFT}</TableCell>

                                                    </TableRow>

                                                </>

                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </List>

                            </DialogContent>
                            <DialogActions>
                                <Button variant="outlined" onClick={() => { setVerPersonalImplicado(false) }}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                }
            />
        </>
    )
}

