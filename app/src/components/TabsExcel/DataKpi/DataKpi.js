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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';

//Componentes genéricos importaciones
import Tabla from './items/Table.js'
import Graficos from './items/Graficos.js'
import Summary from './items/Summary.js'
import TimeLine from './items/TimeLine.js'

import {
    getPermisosSesionActualAPIAction
} from '../../Managment/Users/store/actions'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
    cambiarValorTabAction,
    cambiarValorKpiSeleccionadoAPIAction,
    cambiarValorMisionSeleccionadoAPIAction,
    cambiarValorAnoSeleccionadoAPIAction
} from './store/actions'

import {
    cambiarValorSeleccionAction,
    mostrarDataKpiAction,
    cambiarVisibilidadModalInsertarAction,
    updateDataKpiAction,
    insertarDataKpiModalInsertarAction,
} from './items/store/actions'

import {
    mostrarKpiByPersonAPIAction,
    mostrarKpiAPIAction
} from '../../Managment/Kpi/store/actions'

import {
    mostrarMisionIncluyendoMisionesHeredadasAPIAction
} from '../../Gestion/Mision/store/actions'

import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'

//**********************END_IMPORTACIONES ***********************/


export default function DataKpi() {

    const [tamanoMision, setTamanoMision] = useState('')
    const [tamanoKPI, setTamanoKPI] = useState('')
    const [tamanoAno, setTamanoAno] = useState('')

    const [misionSelect, setMisionSelect] = useState('')
    const [kpiSelect, setKpiSelect] = useState('')
    const [listKpiValidos, setListKpiValidos] = useState([])
    const [listDataKpiFilter, setListDataKpiFilter] = useState([])

    const [yearActual, setYearActual] = useState('')
    const [vectorAnoPosible, setVectorAnoPosible] = useState([])

    const [completeKpi, setCompleteKpi] = useState(false)
    const [visibleTablaData, setVisibleTablaData] = useState(false)

    const navigate = useNavigate();

    //obtener el state de Redux
    const valorTab = useSelector(state => state.fuse.gestionDataKpiComponent.valorTab)
    const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
    const kpiListAPI = useSelector(state => state.fuse.kpiComponent.kpiListAPI)
    const dataKpiListAPI = useSelector(state => state.fuse.dataKpiComponent.dataKpiListAPI)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.dataKpiComponent.filaSeleccionadaGrid)
    const visibilidadModalInsertar = useSelector(state => state.fuse.dataKpiComponent.visibilidadModalInsertar)
    const insertadoDataKpi = useSelector(state => state.fuse.dataKpiComponent.insertadoDataKpi)

    const personLogin = useSelector(state => state.fuse.userComponente.person)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

    //creamos una función para hacer uso de Actions
    const dispatch = useDispatch()
    const cambiarValorTab = (valorTab) => dispatch(cambiarValorTabAction(valorTab))
    const cambiarValorKpiSeleccionadoAPI = (kpiSelect) => dispatch(cambiarValorKpiSeleccionadoAPIAction(kpiSelect))
    const cambiarValorMisionSeleccionadoAPI = (kpiSelect) => dispatch(cambiarValorMisionSeleccionadoAPIAction(kpiSelect))
    const cambiarValorAnoSeleccionadoAPI = (anoSelect) => dispatch(cambiarValorAnoSeleccionadoAPIAction(anoSelect))

    const mostrarDataKpi = (anoSelect) => dispatch(mostrarDataKpiAction(anoSelect))
    const mostrarKpiAPI = () => dispatch(mostrarKpiAPIAction())
    const mostrarMisionIncluyendoMisionesHeredadasAPI = (idPerson) => dispatch(mostrarMisionIncluyendoMisionesHeredadasAPIAction(idPerson))

    const cambiarEstado = (event, newValue) => {
        cambiarValorTab(newValue)
        //navigate('/404')
    }

    useEffect(() => {
        mostrarKpiAPI()
        //GET USER
        store.dispatch(getPermisosSesionActualAPIAction({
            token: getCookie('token')
        }))
        //FIN GET USER

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
        mostrarDataKpi(anoActualBucle)

    }, [])

    useEffect(() => {

        if (personLogin.id != undefined) {
            mostrarMisionIncluyendoMisionesHeredadasAPI(personLogin.id)
        }

    }, [personLogin, personLoginPermisos, visibilidadModalInsertar])

    useEffect(() => {
        /*if(personLoginPermisos.find((item) => item['name'] == "Can view service") != undefined){
            setViewContrato(false)
        }
        if(personLoginPermisos.find((item) => item['name'] == "Can view work package") != undefined){
            setViewPaquete(false)
        }

        if(personLoginPermisos.find((item) => item['name'] == "Can view program") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view set") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view sub set") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view service") == undefined && 
        personLoginPermisos.find((item) => item['name'] == "Can view work package") == undefined){
            navigate('/')
        }*/

    }, [personLoginPermisos])

    //SE SELECCIONA LA MISION
    useEffect(() => {

        if (misionSelect != '' && misionSelect != null && misionSelect != undefined) {
            //desbloqueo el campo kpi
            setCompleteKpi(true)
            //muestro la tabla de data
            setVisibleTablaData(true)
            //filtro los kpi de esta mision
            let kpiValidos = []
            for (let kpi in kpiListAPI) {
                if (kpiListAPI[kpi].mision == misionSelect.id) {
                    kpiValidos.push(kpiListAPI[kpi])
                }
            }
            setListKpiValidos(kpiValidos)

            cambiarValorMisionSeleccionadoAPI(misionSelect)
        }
        else {
            //bloqueo y vacio el campo kpi
            setCompleteKpi(false)
            setKpiSelect('')
            //oculto la tabla de data
            setVisibleTablaData(false)
            cambiarValorMisionSeleccionadoAPI('')
        }

    }, [misionSelect, insertadoDataKpi])


    useEffect(() => {
        if (yearActual != '') {
            cambiarValorAnoSeleccionadoAPI(yearActual)
        }
    }, [yearActual])


    //SE SELECCIONA EL KPI
    useEffect(() => {

        if (kpiSelect != '' && kpiSelect != null && kpiSelect != undefined) {

            //guarda el kpi seleccionado
            cambiarValorKpiSeleccionadoAPI(kpiSelect)

            //muestro la tabla de data
            setVisibleTablaData(true)
        }
        else {
            //reset el kpi seleccionado
            cambiarValorKpiSeleccionadoAPI('')
        }

    }, [kpiSelect, insertadoDataKpi, dataKpiListAPI])


    useEffect(() => {
        if (valorTab == "table") {
            setTamanoMision("33%")
            setTamanoKPI("33%")
            setTamanoAno("33%")
        }
        if (valorTab == "graficos") {
            setTamanoMision("33%")
            setTamanoKPI("33%")
            setTamanoAno("33%")
        }
        if (valorTab == "resumen") {
            setTamanoMision("50%")
            setTamanoKPI("0%")
            setTamanoAno("50%")
        }
        if (valorTab == "timeline") {
            setTamanoMision("50%")
            setTamanoKPI("0%")
            setTamanoAno("50%")
        }

    }, [valorTab])

    const[indexOfKpiSelected, setindexOfKpiSelected] = useState(null);

    return (
        <>

            <FusePageCarded

                content={
                    <Box sx={{ width: '100%' }}>
                        <Grid container spacing={0} columns={15}>

                            <Grid item xs={7}>
                                <Tabs
                                    value={valorTab}
                                    onChange={cambiarEstado}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                >
                                    <Tab value="table" label="Table" />
                                    <Tab value="graficos" label="Graphics" />
                                    <Tab value="resumen" label="Summary" />
                                    <Tab value="timeline" label="Timeline" />
                                </Tabs>
                            </Grid>

                            <Grid item xs={8} style={valorTab == '' ? { display: "none" } : { display: "inline" }}>
                                <div style={{ display: "inline", float: "right", position: "relative", width: '100%', margin: '2%' }} >

                                    <FormControl variant="standard" style={{ width: tamanoMision, display: tamanoMision == "0%" ? "none" : "" }}>
                                        <Autocomplete
                                            id="tags-outlined-mision"
                                            options={listMisionAPI}
                                            onChange={(event, value) => setMisionSelect(value)}
                                            //inputValue={misionSelect != '' && misionSelect != null && misionSelect != undefined ? misionSelect.code + " - " + misionSelect.name : ''}
                                            getOptionLabel={(option) => option.code + " - " + option.name}
                                            filterSelectedOptions
                                            fullWidth
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
                                        {/* {console.log("🚀 ~ file: DataKpi.js:323 ~ DataKpi ~ listKpiValidos:", listKpiValidos)} */}

                                    <FormControl variant="standard" style={{ width: tamanoKPI, display: tamanoKPI == "0%" ? "none" : "" }}>
                                        <Autocomplete
                                            id="tags-outlined-kpi"
                                            options={listKpiValidos}
                                            onChange={(event, value) =>{ setKpiSelect(value);setindexOfKpiSelected(listKpiValidos.indexOf(value))}}
                                            //inputValue={kpiSelect != '' && kpiSelect != null && kpiSelect != undefined ? kpiSelect.codigo + " - " + kpiSelect.titulo : ''}
                                            getOptionLabel={(option) => option.codigo + " - " + option.titulo}
                                            filterSelectedOptions
                                            disabled={!completeKpi}
                                            fullWidth
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

                                    <FormControl variant="outlined" size="small" style={{ width: tamanoAno, display: tamanoAno == "0%" ? "none" : "" }}>
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

                                </div>

                            </Grid>

                        </Grid>

                        <div style={visibleTablaData == true ? { display: "block" } : { display: "none" }}>
                            <Tabla />
                        </div>

                        <div style={visibleTablaData == false && (valorTab == 'table' || valorTab == 'graficos') ? { display: "block" } : { display: "none" }}>
                            <Alert severity="info">
                                <AlertTitle>To display the data, you must select at least one Mission.</AlertTitle>
                            </Alert>
                        </div>

                        <Graficos indexOfKpiSelected={indexOfKpiSelected} />
                        <Summary />
                        <TimeLine />
                    </Box>
                }

            />

        </>
    );
}
