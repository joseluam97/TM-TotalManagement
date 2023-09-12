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
import TableModules from '../../tables/TableModules'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
    mostrarDeliverablesByContractAPIAction,
    cambiarValorSeleccionAction,
    mostrarDeliverablesAction,
    cambiarVisibilidadModalInsertarAction,
    updateDeliverablesAction,
    insertarDeliverablesModalInsertarAction,
    deleteDeliverableAction
} from './store/actions'

import {
    getSesionActualAPIAction,
    getPermisosSesionActualAPIAction

} from '../../Managment/Users/store/actions'


//Modales importaciones
import { getCookie } from 'app/js/generalFunctions'
import ModalInsertar from './modals/insertar.js'

const useStyles = makeStyles({

    customDialogTitle: {
        backgroundColor: 'rgb(0, 0, 0)',
                marginLeft: '3px',
                marginRight: '3px',
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

//**********************END_IMPORTACIONES ***********************/



export default function Deliverables() {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const classes = useStyles();

    const [numPagination, setNumPagination] = useState(10)
    const [disabledNewDeliverable, setDisabledNewDeliverable] = useState(true)
    const [disabledEditDeliverable, setDisabledEditDeliverable] = useState(true)
    const [disabledRemoveDeliverable, setDisabledRemoveDeliverable] = useState(true)

    const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)


    //Obtener los states de Redux
    const loading = useSelector(state => state.fuse.deliverableComponent.loading)
    const deliverableListAPI = useSelector(state => state.fuse.deliverableComponent.deliverableListAPI)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.deliverableComponent.filaSeleccionadaGrid)
    const visibilidadModalInsertar = useSelector(state => state.fuse.deliverableComponent.visibilidadModalInsertar)

    const personLogin = useSelector(state => state.fuse.userComponente.person)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)


    //Creamos funciones para hacer uso de Actions Redux
    const mostrarDeliverablesByContractAPI = (valor) => dispatch(mostrarDeliverablesByContractAPIAction(valor))
    const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
    const mostrarDeliverables = () => dispatch(mostrarDeliverablesAction())
    const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAction(valor, modo))
    const updateDeliverables = (id, json, idPerson) => dispatch(updateDeliverablesAction(id, json, idPerson))
    const insertarDeliverablesModalInsertar = (id, json) => dispatch(insertarDeliverablesModalInsertarAction(id, json))
    const deleteDeliverable = (valor, idPerson) => dispatch(deleteDeliverableAction(valor, idPerson))

    const [resetStates, setResetStates] = useState(false);

    const columnasDataTable = [
        { Header: "ID", accessor: "id", sortable: true, type: 'string' },
        { Header: "Mission Name", accessor: "mision_name", sortable: true, type: 'list' },
        { Header: "Description of the deliverables", accessor: "descripcion", sortable: true, type: 'string' },
        { Header: "Estimated quantitative criteria", accessor: "criterios_estimados", sortable: true, type: 'string' },
        { Header: "Delivery dates", accessor: "fecha_entrega", sortable: true, type: 'string' },
        { Header: "Types of progress indicators", accessor: "tipos_indicadores", sortable: true, type: 'string' },
        { Header: "Acceptance criteria", accessor: "criterios_aceptacion", sortable: false, type: 'string' }
    ]

    useEffect(() => {

        if (personLogin.id != undefined) {
            mostrarDeliverablesByContractAPI(personLogin.id)
        }

    }, [personLogin, personLoginPermisos, visibilidadModalInsertar])


    useEffect(() => {


        if (personLoginPermisos.length > 0) {

            if (personLoginPermisos.find((item) => item['name'] == "Can view deliverable") == undefined) {
                navigate('/')
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can add deliverable") == undefined) {
                setDisabledNewDeliverable(false)
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can change deliverable") == undefined) {
                setDisabledEditDeliverable(false)
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can delete deliverable") == undefined) {
                setDisabledRemoveDeliverable(false)
            }

        }

    }, [personLoginPermisos])


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
                    <IconButton style={disabledNewDeliverable == true ? { display: "inline" } : { display: "none" }}>
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
                    <IconButton
                        onClick={() => {
                            cambiarVisibilidadModalInsertar(true, 'consultar');
                        }}
                        disabled={filaSeleccionadaGrid != '' && filaSeleccionadaGrid != undefined ? false : true}
                    >
                        <FormatListBulletedIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Edit" placement="top">
                    <IconButton style={disabledEditDeliverable == true ? { display: "inline" } : { display: "none" }}
                        onClick={() => {

                            cambiarVisibilidadModalInsertar(true, 'editar');

                        }}
                        disabled={filaSeleccionadaGrid != '' && filaSeleccionadaGrid != undefined ? false : true}>

                        <EditIcon />
                    </IconButton>
                </Tooltip>


                <Tooltip title="Delete" placement="top">
                    <IconButton style={disabledRemoveDeliverable == true ? { display: "inline" } : { display: "none" }}
                        onClick={() => {
                            setVisibilidadDialogoConfirmacion(true)
                        }}
                        disabled={filaSeleccionadaGrid != '' && filaSeleccionadaGrid != undefined ? false : true}>
                        <DeleteIcon />
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
                            <TableModules rowsProp={deliverableListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
                        </div>
                        <ModalInsertar />

                        <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

                            <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                Confirmation
                            </DialogTitle>
                            <DialogContent>
                                Are you sure you want to remove the deliverable?
                            </DialogContent>
                            <DialogActions>

                                <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
                                <Button variant="outlined" onClick={() => { deleteDeliverable(filaSeleccionadaGrid, personLogin.id), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

                            </DialogActions>

                        </Dialog>

                    </Box>

                }

            />
        </>
    )
}

