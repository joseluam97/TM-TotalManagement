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
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TableModules from '../../../tables/TableModules'
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
import { showMessage } from 'app/store/fuse/messageSlice'
//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
    cambiarValorSeleccionAction,
    mostrarDataKpiAction,
    cambiarVisibilidadModalInsertarAction,
    updateDataKpiAction,
    insertarDataKpiModalInsertarAction,
    deleteDataKpiAction,
    saveKpiSelectAPIAction,
    solicitudExportKPIAPIAction,
    cambiarValorEstadoExportacionAPIAction
} from './store/actions'

import {
    cambiarValorKpiSeleccionadoAPIAction,
    cambiarValorMisionSeleccionadoAPIAction,
    cambiarValorAnoSeleccionadoAPIAction
} from '../store/actions'

import {
    getNotificationAPIAction
} from '../../../Managment/Notifications/store/actions'

//Modales importaciones
import { getCookie } from 'app/js/generalFunctions'
import ModalInsertar from '../modals/insertar.js'

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

const groupByColumns = [
    { key: 'mes_tratado', name: 'mes_tratado' },
];

export default function Table() {


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const classes = useStyles();

    const [existenMeses, setExistenMeses] = useState(true)
    const [existenSemanas, setExistenSemanas] = useState(true)

    const [listDataKpiFilter, setListDataKpiFilter] = useState([])

    const [completeKpi, setCompleteKpi] = useState(false)
    const [visibleTablaData, setVisibleTablaData] = useState(false)

    const [numPagination, setNumPagination] = useState(10)
    const [disabledNewDataKpi, setDisabledNewDataKpi] = useState(true)
    const [disabledEditDataKpi, setDisabledEditDataKpi] = useState(true)
    const [disabledRemoveDataKpi, setDisabledRemoveDataKpi] = useState(true)

    const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)

    //Obtener los states de Redux
    const valorTab = useSelector(state => state.fuse.gestionDataKpiComponent.valorTab)
    const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
    const loading = useSelector(state => state.fuse.kpiComponent.loading)
    const kpiListAPI = useSelector(state => state.fuse.kpiComponent.kpiListAPI)
    const dataKpiListAPI = useSelector(state => state.fuse.dataKpiComponent.dataKpiListAPI)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.dataKpiComponent.filaSeleccionadaGrid)
    const visibilidadModalInsertar = useSelector(state => state.fuse.dataKpiComponent.visibilidadModalInsertar)
    const insertadoDataKpi = useSelector(state => state.fuse.dataKpiComponent.insertadoDataKpi)

    const exportacionFinalizada = useSelector(state => state.fuse.dataKpiComponent.exportacionFinalizada)

    const kpiSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.kpiSeleccionado)
    const misionSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.misionSeleccionado)
    const anoSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.anoSeleccionado)

    const personLogin = useSelector(state => state.fuse.userComponente.person)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

    //Creamos funciones para hacer uso de Actions Redux
    const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
    const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAction(valor, modo))
    const deleteDataKpi = (valor, idPerson) => dispatch(deleteDataKpiAction(valor, idPerson))
    const saveKpiSelectAPI = (idPerson) => dispatch(saveKpiSelectAPIAction(idPerson))
    const mostrarDataKpi = (anoSelect) => dispatch(mostrarDataKpiAction(anoSelect))

    const cambiarValorKpiSeleccionadoAPI = (kpiSelect) => dispatch(cambiarValorKpiSeleccionadoAPIAction(kpiSelect))
    const cambiarValorMisionSeleccionadoAPI = (kpiSelect) => dispatch(cambiarValorMisionSeleccionadoAPIAction(kpiSelect))
    const cambiarValorAnoSeleccionadoAPI = (anoSelect) => dispatch(cambiarValorAnoSeleccionadoAPIAction(anoSelect))
    const solicitudExportKPIAPI = (mision, kpi, ano, userSolicita) => dispatch(solicitudExportKPIAPIAction(mision, kpi, ano, userSolicita))
    const getNotificationAPI = (idPerson) => dispatch(getNotificationAPIAction(idPerson));
    const cambiarValorEstadoExportacionAPI = (valorNuevo) => dispatch(cambiarValorEstadoExportacionAPIAction(valorNuevo))

    const columnasDataTable = [
        { Header: "ID", accessor: "id", sortable: true, type: 'string' },
        { Header: "OGD", accessor: "ordenGlobalDato", sortable: true, type: 'string' },
        { Header: "Code", accessor: "kpi_codigo", sortable: true, type: 'string' },
        { Header: "KPI", accessor: "kpi_titulo", sortable: true, type: 'string' },
        { Header: "Month", accessor: "mes_tratado", sortable: true, type: 'string' },
        { Header: "Week", accessor: "week", sortable: true, type: 'string' },
        { Header: "Goal", accessor: "objetivoData", sortable: true, type: 'string' },
        { Header: "Result", accessor: "resultado", sortable: true, type: 'string' },
        {
            Header: "Goal accomplished",
            accessor: row => {

                if (row.textoNOQD == "") {
                    return (
                        <Tooltip title="Yes" placement="top"><CheckCircleIcon color="primary" /></Tooltip>
                    );
                }
                else {
                    return (
                        <Tooltip title={row.textoNOQD} placement="top"><CancelIcon color="success" /></Tooltip>
                    );
                }
            },
            sortable: true,
            type: 'html', 
            hayTooltipo: false
        },
        { Header: "Delivery date", accessor: "fechaRegistro", sortable: true, type: 'string' },
        {
            Header: "Delivered on date",
            accessor: row => {
                if (row.textoNOTD == "") {
                    return (
                        <Tooltip title="Yes" placement="top"><CheckCircleIcon color="primary" /></Tooltip>
                    );
                }
                else {
                    return (
                        <Tooltip title={row.textoNOTD} placement="top"><CancelIcon color="success" /></Tooltip>
                    );
                }
            },
            sortable: true,
            type: 'html', 
            hayTooltipo: false
        }
    ]

    const columnasDataTableSemanal = [
        { Header: "ID", accessor: "id", sortable: true, type: 'string' },
        { Header: "OGD", accessor: "ordenGlobalDato", sortable: true, type: 'string' },
        { Header: "KPI", accessor: "kpi_titulo", sortable: true, type: 'string' },
        { Header: "Week", accessor: "week", sortable: true, type: 'string' },
        { Header: "Goal", accessor: "objetivoData", sortable: true, type: 'string' },
        { Header: "Result", accessor: "resultado", sortable: true, type: 'string' },
        {
            Header: "Goal accomplished",
            accessor: row => {

                if (row.textoNOQD == "") {
                    return (
                        <Tooltip title="Yes" placement="top"><CheckCircleIcon color="primary" /></Tooltip>
                    );
                }
                else {
                    return (
                        <Tooltip title={row.textoNOQD} placement="top"><CancelIcon color="success" /></Tooltip>
                    );
                }
            },
            sortable: true,
            type: 'html', 
            hayTooltipo: false
        },
        { Header: "Delivery date", accessor: "fechaRegistro", sortable: true, type: 'string' },
        {
            Header: "Delivered on date",
            accessor: row => {
                if (row.textoNOTD == "") {
                    return (
                        <Tooltip title="Yes" placement="top"><CheckCircleIcon color="primary" /></Tooltip>
                    );
                }
                else {
                    return (
                        <Tooltip title={row.textoNOTD} placement="top"><CancelIcon color="success" /></Tooltip>
                    );
                }
            },
            sortable: true,
            type: 'html', 
            hayTooltipo: false
        }
    ]

    const columnasDataTableMensual = [
        { Header: "ID", accessor: "id", sortable: true, type: 'string' },
        { Header: "OGD", accessor: "ordenGlobalDato", sortable: true, type: 'string' },
        { Header: "KPI", accessor: "kpi_titulo", sortable: true, type: 'string' },
        { Header: "Month", accessor: "mes_tratado", sortable: true, type: 'string' },
        { Header: "Delivery number of the month", accessor: "ordenMensual", sortable: true, type: 'string' },
        { Header: "Goal", accessor: "objetivoData", sortable: true, type: 'string' },
        { Header: "Result", accessor: "resultado", sortable: true, type: 'string' },
        {
            Header: "Goal accomplished",
            accessor: row => {

                if (row.textoNOQD == "") {
                    return (
                        <Tooltip title="Yes" placement="top"><CheckCircleIcon color="primary" /></Tooltip>
                    );
                }
                else {
                    return (
                        <Tooltip title={row.textoNOQD} placement="top"><CancelIcon color="success" /></Tooltip>
                    );
                }
            },
            sortable: true,
            type: 'html', 
            hayTooltipo: false
        },
        { Header: "Delivery date", accessor: "fechaRegistro", sortable: true, type: 'string' },
        {
            Header: "Delivered on date",
            accessor: row => {
                if (row.textoNOTD == "") {
                    return (
                        <Tooltip title="Yes" placement="top"><CheckCircleIcon color="primary" /></Tooltip>
                    );
                }
                else {
                    return (
                        <Tooltip title={row.textoNOTD} placement="top"><CancelIcon color="success" /></Tooltip>
                    );
                }
            },
            sortable: true,
            type: 'html', 
            hayTooltipo: false
        }
    ]

    useEffect(() => {
        if (anoSeleccionado != '') {
            mostrarDataKpi(anoSeleccionado)
        }
    }, [anoSeleccionado])

    useEffect(() => {
        //CUANDO LA EXPORTACION ACABA SE RECIBE DE VUELTA LA SEÑAL PARA RECARGAR LAS NOTIFICACIONES
        if (exportacionFinalizada == true) {
            cambiarValorEstadoExportacionAPI(false)
            getNotificationAPI(personLogin.id)
        }
    }, [exportacionFinalizada])

    useEffect(() => {
        if (filaSeleccionadaGrid != '') {
            let dataSelect = dataKpiListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]
            if (dataSelect != undefined) {
                let kpiSelect = kpiListAPI.filter(elemento => elemento.id == dataSelect.id_kpi)[0]
                if (kpiSelect != undefined) {
                    saveKpiSelectAPI(kpiSelect)
                }
            }
        }
    }, [filaSeleccionadaGrid])

    useEffect(() => {

        if (kpiSeleccionado != '') {
            let dataKpiValidos = []
            for (let dataKpi in dataKpiListAPI) {
                if (dataKpiListAPI[dataKpi].id_kpi == kpiSeleccionado.id) {
                    dataKpiValidos.push(dataKpiListAPI[dataKpi])
                }
            }

            //guarda la lista de kpi seleccionado
            setListDataKpiFilter(dataKpiValidos)
        }
        else {
            let datasKpiByMision = []
            for (let itemKpi in kpiListAPI) {
                if (kpiListAPI[itemKpi].mision == misionSeleccionado.id) {
                    let elementosDataSelect = dataKpiListAPI.filter(elemento => elemento.id_kpi == kpiListAPI[itemKpi].id)
                    datasKpiByMision = datasKpiByMision.concat(elementosDataSelect);
                    /*for (let dataKpi in elementosDataSelect) {
                        datasKpiByMision.push(elementosDataSelect[dataKpi])
                    }*/
                }
            }
            setListDataKpiFilter(datasKpiByMision)
        }


    }, [kpiSeleccionado, misionSeleccionado, dataKpiListAPI])

    //COMPROBACION PARA VER SI EN LOS DATOS HAY WEEK Y MONTH
    useEffect(() => {

        if (kpiSeleccionado != '' && kpiSeleccionado != undefined && kpiSeleccionado != null) {
            if (kpiSeleccionado.tipoFrecuencia == "weekly") {
                setExistenSemanas(true)
                setExistenMeses(false)
            }
            else {
                setExistenMeses(true)
                setExistenSemanas(false)
            }
        }
        else {
            //WEEK
            let resultWeek = dataKpiListAPI.filter(elemento => elemento.week != null)
            if (resultWeek.length != 0) {
                setExistenSemanas(true)
            }
            else {
                setExistenSemanas(false)
            }

            //MONTH
            let resultWeekMonth = dataKpiListAPI.filter(elemento => elemento.week == null)
            if (resultWeekMonth.length != 0) {
                setExistenMeses(true)
            }
            else {
                setExistenMeses(false)
            }
        }

    }, [misionSeleccionado, dataKpiListAPI, kpiSeleccionado])

    useEffect(() => {

        if (valorTab == '') {
            //if (valorTab == 'table' || valorTab == 'graficos') {
            if (kpiSeleccionado != "" && kpiSeleccionado != undefined && kpiSeleccionado != null) {
                cambiarValorKpiSeleccionadoAPI(kpiSeleccionado)
            }
            if (misionSeleccionado != "" && misionSeleccionado != undefined && misionSeleccionado != null) {
                cambiarValorMisionSeleccionadoAPI(misionSeleccionado)
            }
            if (anoSeleccionado != "" && anoSeleccionado != undefined && anoSeleccionado != null) {
                cambiarValorAnoSeleccionadoAPI(anoSeleccionado)
            }
        }


    }, [valorTab])

    useEffect(() => {


        if (personLoginPermisos.length > 0) {

            if (personLoginPermisos.find((item) => item['name'] == "Can view data kpi") == undefined) {
                navigate('/')
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can add data kpi") == undefined) {
                setDisabledNewDataKpi(false)
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can change data kpi") == undefined) {
                setDisabledEditDataKpi(false)
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can delete data kpi") == undefined) {
                setDisabledRemoveDataKpi(false)
            }

        }

    }, [personLoginPermisos])

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8'
    const fileExtension = ".xlsx"

    const exportToExcel = async () => {
        if (kpiSeleccionado != "" && kpiSeleccionado != null && kpiSeleccionado != undefined) {
            solicitudExportKPIAPI(misionSeleccionado.id, kpiSeleccionado.id, anoSeleccionado, personLogin.id)
        }
        else {
            solicitudExportKPIAPI(misionSeleccionado.id, "", anoSeleccionado, personLogin.id)
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

    function editarDataKPI() {
        let dataKPISeleccionado = dataKpiListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]

        if (dataKPISeleccionado != undefined) {
            let fechaHoy = new Date()
            var day_as_milliseconds = 86400000;

            let fechaTeoricaRegistro = new Date(dataKPISeleccionado.fechaTeoricaRegistro)
            let fechaRegistro = new Date(dataKPISeleccionado.fechaRegistro)

            var diff_in_millisenconds
            //SE ENTREGO A TIEMPO Y SE USA LA FECHA TEORICA DE REGISTRO
            if (dataKPISeleccionado.objetivoTiempoCumplido == true) {
                diff_in_millisenconds = fechaTeoricaRegistro - fechaHoy;
            }
            else {
                fechaRegistro.setDate(fechaRegistro.getDate() + 3)
                diff_in_millisenconds = fechaRegistro - fechaHoy;
            }

            var diff_in_days = diff_in_millisenconds / day_as_milliseconds;

            if (diff_in_days >= 0) {
                cambiarVisibilidadModalInsertar(true, 'editar');
            }
            else {
                dispatch(
                    showMessage({
                        message: "The deadline for modifying the record of the KPI you are trying to modify has expired.",
                        variant: "error"
                    })
                )
            }
        }

    }

    function botonesSuperiores() {
        return (
            <>
                <Tooltip title="New" placement="top">
                    <IconButton style={disabledNewDataKpi == true ? { display: "inline" } : { display: "none" }}>
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
                    <IconButton style={disabledEditDataKpi == true ? { display: "inline" } : { display: "none" }}
                        onClick={() => {
                            editarDataKPI()
                        }}
                        disabled={filaSeleccionadaGrid != '' && filaSeleccionadaGrid != undefined ? false : true}>

                        <EditIcon />
                    </IconButton>
                </Tooltip>


                <Tooltip title="Delete" placement="top">
                    <IconButton style={disabledRemoveDataKpi == true ? { display: "inline" } : { display: "none" }}
                        onClick={() => {
                            setVisibilidadDialogoConfirmacion(true)
                        }}
                        disabled={filaSeleccionadaGrid != '' && filaSeleccionadaGrid != undefined ? false : true}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

                <div style={{ display: "inline", float: "right", position: "relative", marginTop: "5px" }}>

                    <Tooltip title="Export" placement="bottom" >
                        <IconButton style={{ color: "#000000", display: "inline", marginLeft: "-15px", marginRight: "10px" }} size="small" onClick={() => { exportToExcel() }}>
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <Divider />
            </>
        );
    }


    return (
        <>

            <Box sx={{ width: '100%' }} style={valorTab == 'table' ? { display: "block" } : { display: "none" }}>
                <div style={{ width: '100%' }}>
                    {botonesSuperiores()}
                    <TableModules
                        rowsProp={listDataKpiFilter}
                        columnsProp={existenMeses == true && existenSemanas == true ? columnasDataTable : existenSemanas == true ? columnasDataTableSemanal : columnasDataTableMensual}
                        loading={loading}
                        funcionSetValue={cambiarValorSeleccion}
                    />
                </div>
                <ModalInsertar />

                <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

                    <DialogTitle classes={{ root: classes.customDialogTitle }} >
                        Confirmation
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to remove the dataKpi?
                    </DialogContent>
                    <DialogActions>

                        <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
                        <Button variant="outlined" onClick={() => { deleteDataKpi(filaSeleccionadaGrid, personLogin.id), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

                    </DialogActions>

                </Dialog>

            </Box>
        </>
    )
}

