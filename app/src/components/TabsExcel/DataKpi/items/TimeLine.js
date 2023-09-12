//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from "@material-ui/core";
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
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
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
    cambiarValorAnoSeleccionadoAPIAction
} from '../store/actions'

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
     
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
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

//**********************END_IMPORTACIONES ***********************/

import { Chart } from "react-google-charts";

export default function Graficos() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const [colorIncidencia, setColorIncidencia] = useState("#E8FF00")
    const [colorSinEntrega, setColorSinEntrega] = useState("#FF0000")
    const [colorEntrega, setColorEntrega] = useState("#001FFF")


    const [numPagination, setNumPagination] = useState(10)
    const [tipoFrecuencia, setTipoFrecuencia] = useState('Monthly')

    const [disabledNewDataKpi, setDisabledNewDataKpi] = useState(true)
    const [disabledEditDataKpi, setDisabledEditDataKpi] = useState(true)
    const [disabledRemoveDataKpi, setDisabledRemoveDataKpi] = useState(true)
    const [dataSummary, setDataSummary] = useState([])
    const [dataSummarySemanal, setDataSummarySemanal] = useState([])

    const [vectorAnoPosible, setVectorAnoPosible] = useState([])
    const [anchoDiagramaSemanal, setAnchoDiagramaSemanal] = useState('100%')
    const misionSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.misionSeleccionado)
    const anoSeleccionado = useSelector(state => state.fuse.gestionDataKpiComponent.anoSeleccionado)

    //Obtener los states de Redux
    const valorTab = useSelector(state => state.fuse.gestionDataKpiComponent.valorTab)
    const dataSummaryAPI = useSelector(state => state.fuse.dataKpiComponent.dataSummaryAPI)
    const dataSummaryEspecialAPI = useSelector(state => state.fuse.dataKpiComponent.dataSummaryEspecialAPI)
    const dataSummarySemanalAPI = useSelector(state => state.fuse.dataKpiComponent.dataSummarySemanalAPI)

    const personLogin = useSelector(state => state.fuse.userComponente.person)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

    //Creamos funciones para hacer uso de Actions Redux
    const obtenerSummaryActualAPI = (idPersona, ano) => dispatch(obtenerSummaryActualAPIAction(idPersona, ano))
    const obtenerSummaryEspecialActualAPI = (idPersona, ano) => dispatch(obtenerSummaryEspecialActualAPIAction(idPersona, ano))
    const obtenerSummarySemanalActualAPI = (idPersona, ano) => dispatch(obtenerSummarySemanalActualAPIAction(idPersona, ano))
    const cambiarValorAnoSeleccionadoAPI = (anoSelect) => dispatch(cambiarValorAnoSeleccionadoAPIAction(anoSelect))

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

        cambiarValorAnoSeleccionadoAPI(anoActualBucle)
    }, [])

    useEffect(() => {

        if (dataSummaryEspecialAPI != undefined && dataSummarySemanalAPI != undefined) {

            let vectorData = []
            vectorData.push([
                { type: "string", id: "Position" },
                { type: "string", id: "Name" },
                { type: "string", role: "style" },
                { type: "string", role: "tooltip" },
                { type: "date", id: "Start" },
                { type: "date", id: "End" },
            ])
            for (let item in dataSummaryEspecialAPI) {
                let vectorInterno = []
                let fechaInicio = new Date(dataSummaryEspecialAPI[item][2])
                let fechaFin = new Date(dataSummaryEspecialAPI[item][3])
                let cadenaFechaInicio = fechaInicio.getDate() + "/" + (parseInt(fechaInicio.getMonth()) + 1) + "/" + fechaInicio.getFullYear()
                let cadenaFechaFin = fechaFin.getDate() + "/" + (parseInt(fechaFin.getMonth()) + 1) + "/" + fechaFin.getFullYear()
                vectorInterno.push(dataSummaryEspecialAPI[item][0])
                vectorInterno.push(dataSummaryEspecialAPI[item][1])
                let cadenaResultado = ""
                if (dataSummaryEspecialAPI[item][4] == "DATA") {
                    if (dataSummaryEspecialAPI[item][5]['objetivoCumplido'] == true && dataSummaryEspecialAPI[item][5]['objetivoTiempoCumplido'] == true) {
                        vectorInterno.push(colorEntrega)
                        cadenaResultado = "Delivered on time and target met"
                    }
                    if (dataSummaryEspecialAPI[item][5]['objetivoCumplido'] == true && dataSummaryEspecialAPI[item][5]['objetivoTiempoCumplido'] == false) {
                        vectorInterno.push(colorIncidencia)
                        cadenaResultado = "Delivered late and objective achieved"
                    }
                    if (dataSummaryEspecialAPI[item][5]['objetivoCumplido'] == false && dataSummaryEspecialAPI[item][5]['objetivoTiempoCumplido'] == false) {
                        vectorInterno.push(colorIncidencia)
                        cadenaResultado = "Delivered late and target not met"
                    }
                    if (dataSummaryEspecialAPI[item][5]['objetivoCumplido'] == false && dataSummaryEspecialAPI[item][5]['objetivoTiempoCumplido'] == true) {
                        vectorInterno.push(colorIncidencia)
                        cadenaResultado = "Delivered on time and target not met"
                    }
                }
                else {
                    vectorInterno.push(colorSinEntrega)
                    cadenaResultado = "No data"
                }
                let html = "<b>Month:</b> " + dataSummaryEspecialAPI[item][1] + "<br> <b>Period:</b> " + cadenaFechaInicio + "- " + cadenaFechaFin + "<br> <b>Remarks:</b> " + cadenaResultado
                vectorInterno.push(html)
                vectorInterno.push(fechaInicio)
                vectorInterno.push(fechaFin)
                vectorData.push(vectorInterno)
            }

            for (let item in dataSummarySemanalAPI) {
                let vectorInterno = []
                let fechaInicio = new Date(dataSummarySemanalAPI[item][2])
                let fechaFin = new Date(dataSummarySemanalAPI[item][3])
                let cadenaFechaInicio = fechaInicio.getDate() + "/" + fechaInicio.getMonth() + 1 + "/" + fechaInicio.getFullYear()
                let cadenaFechaFin = fechaFin.getDate() + "/" + fechaFin.getMonth() + 1 + "/" + fechaFin.getFullYear()
                vectorInterno.push(dataSummarySemanalAPI[item][0])
                vectorInterno.push(dataSummarySemanalAPI[item][1])
                let cadenaResultado = ""
                if (dataSummarySemanalAPI[item][4] == "DATA") {
                    if (dataSummarySemanalAPI[item][5]['objetivoCumplido'] == true && dataSummarySemanalAPI[item][5]['objetivoTiempoCumplido'] == true) {
                        vectorInterno.push(colorEntrega)
                        cadenaResultado = "Delivered on time and target met"
                    }
                    if (dataSummarySemanalAPI[item][5]['objetivoCumplido'] == true && dataSummarySemanalAPI[item][5]['objetivoTiempoCumplido'] == false) {
                        vectorInterno.push(colorIncidencia)
                        cadenaResultado = "Delivered late and objective achieved"
                    }
                    if (dataSummarySemanalAPI[item][5]['objetivoCumplido'] == false && dataSummarySemanalAPI[item][5]['objetivoTiempoCumplido'] == false) {
                        vectorInterno.push(colorIncidencia)
                        cadenaResultado = "Delivered late and target not met"
                    }
                    if (dataSummarySemanalAPI[item][5]['objetivoCumplido'] == false && dataSummarySemanalAPI[item][5]['objetivoTiempoCumplido'] == true) {
                        vectorInterno.push(colorIncidencia)
                        cadenaResultado = "Delivered on time and target not met"
                    }
                }
                else {
                    vectorInterno.push(colorSinEntrega)
                    cadenaResultado = "No data"
                }
                let html = "<b>Week:</b> " + dataSummarySemanalAPI[item][1] + "<br> <b>Period:</b> " + cadenaFechaInicio + "- " + cadenaFechaFin + "<br> <b>Remarks:</b> " + cadenaResultado
                vectorInterno.push(html)
                vectorInterno.push(fechaInicio)
                vectorInterno.push(fechaFin)
                vectorData.push(vectorInterno)
            }

            if (vectorData.length > 30) {
                setAnchoDiagramaSemanal('150%')
            }
            else {
                setAnchoDiagramaSemanal('100%')
            }

            setDataSummary(vectorData)

            setLoading(false)

        }

    }, [dataSummaryEspecialAPI, dataSummarySemanalAPI])

    useEffect(() => {
        if (personLogin != '') {
            let fechaHoy = new Date()
            let anoActualBucle = fechaHoy.getFullYear()
            //obtenerSummaryActualAPI(personLogin.id, { "anoSelect": anoActualBucle, "misionSelect": "" })
            setLoading(true)
            
            if (misionSeleccionado != '') {
                obtenerSummaryEspecialActualAPI(personLogin.id, { "anoSelect": anoActualBucle, "misionSelect": misionSeleccionado.id })
                obtenerSummarySemanalActualAPI(personLogin.id, { "anoSelect": anoActualBucle, "misionSelect": misionSeleccionado.id })
            }
            else {
                obtenerSummaryEspecialActualAPI(personLogin.id, { "anoSelect": anoActualBucle, "misionSelect": "" })
                obtenerSummarySemanalActualAPI(personLogin.id, { "anoSelect": anoActualBucle, "misionSelect": "" })
            }
        }

    }, [personLogin, valorTab])

    useEffect(() => {
        if (anoSeleccionado != '') {
            setLoading(true)
            if (misionSeleccionado != '') {
                obtenerSummaryEspecialActualAPI(personLogin.id, { "anoSelect": anoSeleccionado, "misionSelect": misionSeleccionado.id })
                obtenerSummarySemanalActualAPI(personLogin.id, { "anoSelect": anoSeleccionado, "misionSelect": misionSeleccionado.id })
            }
            else {
                obtenerSummaryEspecialActualAPI(personLogin.id, { "anoSelect": anoSeleccionado, "misionSelect": "" })
                obtenerSummarySemanalActualAPI(personLogin.id, { "anoSelect": anoSeleccionado, "misionSelect": "" })
            }
        }

    }, [anoSeleccionado, misionSeleccionado])

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

    const optionsLinea = {
        allowHtml: true,
    };

    // const [labels, setLabels] = useState(null);
    // const [values, setValues] = useState(null);

    // useEffect(()=>{
    //     const labels = dataSummary.map(item => item.fecha);
    //     const values = dataSummary.map(item => item.total);
    //     if(dataSummary){
    //         setLabels()
    //         console.log("🚀 ~ file: TimeLine.js:424 ~ Graficos ~ dataSummary:", dataSummary)
    //     }
    // },[dataSummary])

    return (
        <>
            <Box sx={{ width: anchoDiagramaSemanal == '150%' ? '150%' : '101%' }} style={valorTab == 'timeline' ? { display: "block" } : { display: "none" }}>

                {/*ITEM DE CARGA DE ELEMENTO */}
                <Box 
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="60vh" 
                    sx={{ height: 40 }}
                    style={loading == true ? {} : { display: "none" }}>
                    <Fade
                        in={loading}
                        style={{
                            transitionDelay: loading ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </Box>

                {/*FIN ITEM DE CARGA DE ELEMENTO */}

                <Box
                    display="flex"
                    justifyContent="left"
                    alignItems="left"
                    sx={{ height: 40 }}
                    style={loading == false ? {} : { display: "none" }}>

                    <IconButton disabled aria-label="upload picture" component="label">
                        <AddBoxSharpIcon style={{ backgroundColor: colorEntrega, color: colorEntrega }} />
                        <h5 style={{ color: "black", marginLeft: "5px"}}>Correct delivery</h5>
                    </IconButton>
                    <IconButton disabled aria-label="upload picture" component="label">
                        <AddBoxSharpIcon style={{ backgroundColor: colorIncidencia, color: colorIncidencia }} />
                        <h5 style={{ color: "black", marginLeft: "5px"}}>Delivery with incident</h5>
                    </IconButton>
                    <IconButton disabled aria-label="upload picture" component="label">
                        <AddBoxSharpIcon style={{ backgroundColor: colorSinEntrega, color: colorSinEntrega }} />
                        <h5 style={{ color: "black", marginLeft: "5px"}}>No delivery recorded</h5>
                    </IconButton>
                </Box>

                <div style={loading == false ? { display: "block", width: anchoDiagramaSemanal } : { display: "none", width: anchoDiagramaSemanal }}>
                    <Chart chartType="Timeline" options={optionsLinea} data={dataSummary} height='500px' />
                </div>

            </Box>

        </>
    );
}

