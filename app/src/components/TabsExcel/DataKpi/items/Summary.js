//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { amber } from '@mui/material/colors';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ErrorIcon from '@mui/icons-material/Error';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
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
import { lighten, useTheme } from '@mui/material/styles';
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
import Paper from '@mui/material/Paper';
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
    cambiarValorSeleccionAction,
    cambiarVisibilidadModalInsertarAction,
    updateDataKpiAction,
    insertarDataKpiModalInsertarAction,
    deleteDataKpiAction,
    saveKpiSelectAPIAction,
    obtenerSummaryActualAPIAction,
    obtenerSummarySemanalActualAPIAction,
    obtenerSummaryEspecialActualAPIAction
} from './store/actions'

import {
    getSesionActualAPIAction,
    getPermisosSesionActualAPIAction

} from '../../../Managment/Users/store/actions'

import {
    mostrarKpiByPersonAPIAction,
    mostrarKpiAPIAction
} from '../../../Managment/Kpi/store/actions'

import {
    mostrarMisionIncluyendoMisionesHeredadasAPIAction
} from '../../../Gestion/Mision/store/actions'

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

import { Chart } from "react-google-charts";

export default function Graficos() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const classes = useStyles();
    const theme = useTheme();

    const [numPagination, setNumPagination] = useState(10)

    const [vectorAnoPosible, setVectorAnoPosible] = useState([])
    const [yearActual, setYearActual] = useState('')
    const [resumenDataKPIGroup, setResumenDataKPIGroup] = useState([])

    //Obtener los states de Redux
    const valorTab = useSelector(state => state.fuse.gestionDataKpiComponent.valorTab)
    const misionSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.misionSeleccionado)
    const anoSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.anoSeleccionado)
    const dataSummaryAPI = useSelector(state => state.fuse.dataKpiComponent.dataSummaryAPI)
    const personLogin = useSelector(state => state.fuse.userComponente.person)
    const dataKpiListAPI = useSelector(state => state.fuse.dataKpiComponent.dataKpiListAPI)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

    //Creamos funciones para hacer uso de Actions Redux
    const obtenerSummaryActualAPI = (idPersona, ano) => dispatch(obtenerSummaryActualAPIAction(idPersona, ano))

    useEffect(() => {
        let vectorAnoPosibleFun = []
        let anoInicio = 2022
        let fechaHoy = new Date()
        let anoActualBucle = fechaHoy.getFullYear()
        while (anoInicio <= anoActualBucle) {
            vectorAnoPosibleFun.push(anoInicio)
            anoInicio = anoInicio + 1
        }
        setVectorAnoPosible(vectorAnoPosibleFun)
        setYearActual(anoActualBucle)

        obtenerSummaryActualAPI(personLogin.id, { "anoSelect": anoActualBucle, "misionSelect": '' })
    }, [])

    useEffect(() => {
        //CUANDO CAMBIA LA MISION SUPERIOR HAY QUE OBTENER LOS DATOS DE LOS KPIS
        if (misionSeleccionado != '') {
            obtenerSummaryActualAPI(personLogin.id, { "anoSelect": anoSeleccionado, "misionSelect": misionSeleccionado.id })
        }
        else {
            obtenerSummaryActualAPI(personLogin.id, { "anoSelect": anoSeleccionado, "misionSelect": '' })
        }

    }, [misionSeleccionado, anoSeleccionado, dataKpiListAPI])

    useEffect(() => {
        //AGRUPACION DE ELEMENTOS POR GRUPOS

        if (dataSummaryAPI != '' && dataSummaryAPI.length != 0 && dataSummaryAPI != undefined) {
            let elementosAgrupados = dataSummaryAPI.reduce((acc, fruta) => {
                acc[fruta.mision] = [...(acc[fruta.mision] || []), fruta];
                return acc;
            }, {});

            let gruposFrutas = Object.values(elementosAgrupados);

            setResumenDataKPIGroup(gruposFrutas)
        }


    }, [dataSummaryAPI])

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
                {/*<div style={{ display: "inline" }}>

                    <FormControl variant="outlined" size="small" style={{ width: "20%", margin: "5px" }}>
                        <InputLabel id="label-select-risk-management">Frequency type</InputLabel>
                        <Select
                            labelId="label-select-detection"
                            id="frequency"
                            label="Frequency type"
                            onChange={e => { setTipoFrecuencia(e.target.value); }}
                            value={tipoFrecuencia}
                        >
                            <MenuItem value={"Monthly"}>Monthly</MenuItem>
                            <MenuItem value={"Weekly"}>Weekly</MenuItem>
                        </Select>
                    </FormControl>
                </div>*/}

                <FormControl variant="outlined" size="small" style={{ width: "20%", margin: "5px" }}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="rol"
                        label="Year"
                        onChange={e => { setYearActual(e.target.value); }}
                        value={yearActual}
                    >
                        {vectorAnoPosible.map((elemento) => (
                            <MenuItem value={elemento}> {elemento} </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div style={{ display: "inline", float: "right", position: "relative", marginTop: "5px" }}>
                    <GridToolbarContainer>
                        <Tooltip title="Columns" placement="bottom">
                            <GridToolbarColumnsButton size="large" style={{ marginLeft: "-20px" }} />
                        </Tooltip>

                        <GridToolbarFilterButton size="large" style={{ marginLeft: "-20px" }} />

                        <Tooltip title="Density" placement="bottom">
                            <GridToolbarDensitySelector size="large" style={{ marginLeft: "-20px" }} />
                        </Tooltip>

                        <Tooltip title="Export" placement="bottom">
                            <GridToolbarExport size="large" style={{ marginLeft: "-20px" }} />
                        </Tooltip>

                    </GridToolbarContainer>
                </div>


            </>
        );
    }


    return (
        <>
            <Box sx={{ width: '100%' }} style={valorTab == 'resumen' ? { display: "block" } : { display: "none" }}>


                {resumenDataKPIGroup.map((grupoMision) => {
                    return (
                        <>
                            <div style={{ width: '100%', textAlign: 'center', marginTop: '15px', display: 'block' }}>
                                <span className="font-semibold">
                                    {grupoMision[0]['mision']}
                                    <Divider style={{ width: '100%' }} />
                                </span>
                            </div>
                            <Grid container spacing={2} columns={32}>
                                {grupoMision.map((elemento) => {
                                    return (
                                        <Grid item xs={8}>
                                            <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                                                <div className="flex flex-col sm:flex-row items-start justify-between">
                                                    <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                                                    {elemento['code']} - {elemento['titulo']}
                                                    </Typography>
                                                </div>
                                                <div className="flex flex-col">
                                                    <Typography className="font-medium" color="text.secondary">
                                                        {elemento['tipo']}
                                                    </Typography>

                                                    <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
                                                        <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
                                                            <Typography className="text-5xl sm:text-4xl font-semibold leading-none tracking-tight">
                                                                {elemento['entregasTotales']}
                                                            </Typography>
                                                            <Typography className="mt-4 text-sm sm:text-sm font-medium">Total deliveries</Typography>
                                                        </div>
                                                        <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
                                                            <Typography className="text-5xl sm:text-4xl font-semibold leading-none tracking-tight">
                                                                {elemento['entregasRealizadas']}
                                                            </Typography>
                                                            <Typography className="mt-4 text-sm sm:text-sm font-medium">Deliveries made</Typography>
                                                        </div>
                                                        <Box
                                                            sx={{
                                                                backgroundColor: (_theme) =>
                                                                    _theme.palette.mode === 'light'
                                                                        ? lighten(theme.palette.background.default, 0.4)
                                                                        : lighten(theme.palette.background.default, 0.02),
                                                            }}
                                                            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                                                        >
                                                            <Typography className="text-4xl font-semibold leading-none tracking-tight">
                                                                {elemento['onTimeYobjetivo']}
                                                            </Typography>
                                                            <Typography className="mt-4 text-xs font-small text-center">On-time and on-target deliveries</Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                backgroundColor: (_theme) =>
                                                                    _theme.palette.mode === 'light'
                                                                        ? lighten(theme.palette.background.default, 0.4)
                                                                        : lighten(theme.palette.background.default, 0.02),
                                                            }}
                                                            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                                                        >
                                                            <Typography className="text-4xl font-semibold leading-none tracking-tight">
                                                                {elemento['onTimeYNoobjetivo']}
                                                            </Typography>
                                                            <Typography className="mt-4 text-xs font-small text-center">Deliver on time and not on target</Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                backgroundColor: (_theme) =>
                                                                    _theme.palette.mode === 'light'
                                                                        ? lighten(theme.palette.background.default, 0.4)
                                                                        : lighten(theme.palette.background.default, 0.02),
                                                            }}
                                                            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                                                        >
                                                            <Typography className="text-4xl font-semibold leading-none tracking-tight">
                                                                {elemento['nonTimeYobjetivo']}
                                                            </Typography>
                                                            <Typography className="mt-4 text-xs font-small text-center">Non-timely and on-target deliveries</Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                backgroundColor: (_theme) =>
                                                                    _theme.palette.mode === 'light'
                                                                        ? lighten(theme.palette.background.default, 0.4)
                                                                        : lighten(theme.palette.background.default, 0.02),
                                                            }}
                                                            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
                                                        >
                                                            <Typography className="text-4xl font-semibold leading-none tracking-tight">
                                                                {elemento['nonTimeYNoobjetivo']}
                                                            </Typography>
                                                            <Typography className="mt-4 text-xs font-small text-center">Deliveries not on time and not on target</Typography>
                                                        </Box>
                                                    </div>
                                                </div>
                                                {/*</div>*/}
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </>
                    );
                })}


            </Box>

        </>
    );
}

