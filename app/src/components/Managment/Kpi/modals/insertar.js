import { useEffect, useState, useRef } from 'react'
import * as React from 'react';

//DataGrid importaciones

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useDispatch, useSelector } from 'react-redux'

import {
    cambiarVisibilidadModalInsertarKpiAPI,
    insertarNewKpiAPIAction,
    putKpiAPIAction
} from '../store/actions'

const useStyles = makeStyles({

    customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const meses = [
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

export default function ModalInsertar() {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [botonControlSave, setBotonControl] = useState(true);
    const [tituloActual, setTituloActual] = useState('');
    const [codigoActual, setCodigoActual] = useState('');
    const [frecuenciaMensualActual, setFrecuenciaMensualActual] = React.useState('');
    const [tipoActual, setTipoActual] = useState('');
    const [misionSelect, setMisionSelect] = useState('');
    const [descripcionActual, setDescripcionActual] = useState('');
    const [datosUsadosActual, setDatosUsadosActual] = useState('');
    //const [frecuenciaActual, setFrecuenciaActual] = useState('');
    const [objetivoActual, setObjetivoActual] = useState(0);
    const [warningActual, setWarningActual] = useState(0);
    const [unidadActual, setUnidadActual] = useState('');
    const [userResponsable, setUserResponsable] = useState('');
    const [metodoCalculoActual, setMetodoCalculoActual] = useState('');
    const [modoCalculoActual, setModoCalculoActual] = useState('');
    const [mesSelect, setMesSelect] = React.useState([]);
    const [tipoFrecuenciaActual, setTipoFrecuenciaActual] = React.useState('');

    const [kpiCustom, setKpiCustom] = useState(false);
    const [todoChecked, setTodoChecked] = useState(false);

    const [valorCorrectoWarning, setValorCorrectoWarning] = useState(true);
    const [razonWarningNoValido, setRazonWarningNoValido] = useState('');

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        if (value.includes("All") == false) {
            setMesSelect(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
            if (value.length != 12) {
                setTodoChecked(false)
            }
            else {
                setTodoChecked(true)
            }
        }
        else {
            if (todoChecked == true) {
                setTodoChecked(false)
                setMesSelect([]);
            }
            else {
                setTodoChecked(true)
                setMesSelect(meses);
            }

        }

    };

    const visibilidadNewKpi = useSelector(state => state.fuse.kpiComponent.visibilidadNewKpi)
    const modoDialogKpi = useSelector(state => state.fuse.kpiComponent.modoDialogKpi)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.kpiComponent.filaSeleccionadaGrid)
    const kpiListAPI = useSelector(state => state.fuse.kpiComponent.kpiListAPI)
    const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
    const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
    const allKpiListAPI = useSelector(state => state.fuse.kpiComponent.allKpiListAPI)

    const cambiarVisibilidadModalInsertarUser = (valor, modoDialogUser) => dispatch(cambiarVisibilidadModalInsertarKpiAPI(valor, modoDialogUser))
    const insertarNewKpiAPI = (valor) => dispatch(insertarNewKpiAPIAction(valor))
    const putKpiAPI = (valor, datos) => dispatch(putKpiAPIAction(valor, datos))

    useEffect(() => {

        if (modoDialogKpi == "nuevo") {
            if (misionSelect != '' && misionSelect != undefined && misionSelect != null && tipoActual != '' && tipoActual != undefined && tipoActual != null) {

                let filterOTD_OQDByMision = allKpiListAPI.filter(elemento =>
                    elemento.codigo.includes(tipoActual) && elemento.mision == misionSelect.id
                )

                let cadenaIndice = ""
                if (filterOTD_OQDByMision.length != 0) {

                    //NUMERO DE ITERACION
                    const indicesCodigos = filterOTD_OQDByMision.map(elemento =>
                        elemento['codigo'].split('.').length == 4 ?
                            parseInt(elemento['codigo'].split('.')[3])
                            : ''
                    );

                    let proximoIndice = Math.max(...indicesCodigos) + 1

                    cadenaIndice = proximoIndice.toLocaleString('en-US', { minimumIntegerDigits: 3 })
                }
                else {
                    cadenaIndice = "001"
                }

                setCodigoActual('KPI.' + tipoActual + '.' + misionSelect.id.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + '.' + cadenaIndice)

            }
            else {
                setCodigoActual('')
            }
        }

    }, [tipoActual, misionSelect])

    useEffect(() => {

        if (modoDialogKpi == "nuevo") {
            setTituloActual('')
            setCodigoActual('')
            setTipoActual('')
            setMisionSelect('')
            setDescripcionActual('')
            setDatosUsadosActual('')
            //setFrecuenciaActual('')
            setObjetivoActual('')
            setWarningActual('')
            setUnidadActual('')
            setUserResponsable('')
            setMetodoCalculoActual('')
            setModoCalculoActual('')
            setFrecuenciaMensualActual('')
            setMesSelect([])
            setTipoFrecuenciaActual('')
        }

        if (modoDialogKpi == "editar" || modoDialogKpi == "consultar") {

            let kpiSelected = kpiListAPI.filter(busq => busq.id == filaSeleccionadaGrid)[0]

            if (kpiSelected != undefined) {

                setTituloActual(kpiSelected.titulo)
                setCodigoActual(kpiSelected.codigo)
                setTipoActual(kpiSelected.tipo)
                setDescripcionActual(kpiSelected.descripcion)
                setDatosUsadosActual(kpiSelected.datos_usados)
                //setFrecuenciaActual(kpiSelected.frecuencia)
                setObjetivoActual(kpiSelected.objetivo)
                setWarningActual(kpiSelected.valor_aviso)
                setUnidadActual(kpiSelected.unidad)
                setMetodoCalculoActual(kpiSelected.metodo_calculo)
                setModoCalculoActual(kpiSelected.modoCalculo)
                setFrecuenciaMensualActual(kpiSelected.frecuenciaMensual)
                setTipoFrecuenciaActual(kpiSelected.tipoFrecuencia)

                let misionSelect = listMisionAPI.filter(busq => busq.id == kpiSelected.mision)[0]
                setMisionSelect(misionSelect)

                let vectResponsables = [];
                for (let responsable in kpiSelected.responsable) {
                    let responsableSelect = usersListAPI.filter(busq => busq.id == kpiSelected.responsable[responsable])[0]
                    if (responsableSelect != undefined) {
                        vectResponsables.push(responsableSelect)
                    }
                }
                setUserResponsable(vectResponsables)

                let vectorMeses = kpiSelected.meses_afectados.split(",")

                setMesSelect(vectorMeses)

            }
        }

    }, [modoDialogKpi])

    useEffect(() => {
        if (valorCorrectoWarning == true && tituloActual != '' && codigoActual != '' && tipoActual != '' &&
            misionSelect != '' && descripcionActual != '' && datosUsadosActual != '' &&
            frecuenciaMensualActual != '' && objetivoActual != '' && warningActual != undefined && warningActual != null && warningActual != '' && unidadActual != '' && userResponsable != '' &&
            metodoCalculoActual != '' && modoCalculoActual != '' && mesSelect.length != 0) {
            setBotonControl(false)
        } else {
            setBotonControl(true)
        }
    })

    function funcionKpi() {

        let vectIDResponsable = [];
        for (let responsable in userResponsable) {
            vectIDResponsable.push(userResponsable[responsable].id)
        }

        let stringMesesAfectados = '';
        for (let itemMes in meses) {
            if (mesSelect.includes(meses[itemMes])) {
                stringMesesAfectados = stringMesesAfectados + meses[itemMes] + ",";
            }
        }

        stringMesesAfectados = stringMesesAfectados.substring(0, stringMesesAfectados.length - 1)

        let numeroEntregalesAno = mesSelect.length * frecuenciaMensualActual

        if (modoDialogKpi == "nuevo") {
            insertarNewKpiAPI({
                titulo: tituloActual,
                codigo: codigoActual,
                tipo: tipoActual,
                descripcion: descripcionActual,
                datos_usados: datosUsadosActual,
                frecuencia: numeroEntregalesAno,
                frecuenciaMensual: frecuenciaMensualActual,
                meses_afectados: stringMesesAfectados,
                responsable: vectIDResponsable,
                objetivo: objetivoActual,
                valor_aviso: warningActual,
                mision: misionSelect.id,
                unidad: unidadActual,
                metodo_calculo: metodoCalculoActual,
                modoCalculo: modoCalculoActual,
                active: true,
                tipoFrecuencia: tipoFrecuenciaActual
            })
        }

        if (modoDialogKpi == "editar") {
            putKpiAPI(filaSeleccionadaGrid, {
                titulo: tituloActual,
                codigo: codigoActual,
                tipoFrecuencia: tipoFrecuenciaActual,
                tipo: tipoActual,
                descripcion: descripcionActual,
                datos_usados: datosUsadosActual,
                frecuencia: numeroEntregalesAno,
                frecuenciaMensual: frecuenciaMensualActual,
                meses_afectados: stringMesesAfectados,
                responsable: vectIDResponsable,
                objetivo: objetivoActual,
                valor_aviso: warningActual,
                mision: misionSelect.id,
                unidad: unidadActual,
                metodo_calculo: metodoCalculoActual,
                modoCalculo: modoCalculoActual,
                active: true
            })
        }
    }

    useEffect(() => {
        if (tipoFrecuenciaActual != '') {
            //MENSUAL
            let vectorMensual = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let vectorCada2Meses = ["January", "March", "May", "July", "September", "November"]
            let vectorSemestral = ["January", "July"]
            let vectorTrimestral = ["January", "April", "July", "October"]
            if (tipoFrecuenciaActual == "monthly") {
                setFrecuenciaMensualActual(1)
                setMesSelect(vectorMensual)
                setKpiCustom(false)
            }
            //CADA 2 SEMANAS
            if (tipoFrecuenciaActual == "bi-weekly") {
                setFrecuenciaMensualActual(2)
                setMesSelect(vectorMensual)
                setKpiCustom(false)
            }
            //SEMANAL
            if (tipoFrecuenciaActual == "weekly") {
                setFrecuenciaMensualActual(4)
                setMesSelect(vectorMensual)
                setKpiCustom(false)
            }
            //SEMESTRAL
            if (tipoFrecuenciaActual == "half-yearly") {
                setFrecuenciaMensualActual(1)
                setMesSelect(vectorSemestral)
                setKpiCustom(false)
            }
            //TRIMESTRAL
            if (tipoFrecuenciaActual == "quarterly") {
                setFrecuenciaMensualActual(1)
                setMesSelect(vectorTrimestral)
                setKpiCustom(false)
            }
            //CADA 2 MESES
            if (tipoFrecuenciaActual == "every-two-months") {
                setFrecuenciaMensualActual(1)
                setMesSelect(vectorCada2Meses)
                setKpiCustom(false)
            }
            //PERSONALIZADO
            if (tipoFrecuenciaActual == "custom") {
                if (frecuenciaMensualActual != 1 && frecuenciaMensualActual != 2) {
                    setFrecuenciaMensualActual('')
                }
                //setMesSelect([])
                setKpiCustom(true)
            }
        }

    }, [tipoFrecuenciaActual])

    useEffect(() => {
        if (warningActual != '' && warningActual != undefined && warningActual != null && modoCalculoActual != '' && objetivoActual != '') {
            let valorCorrecto = false
            switch (modoCalculoActual) {
                case 1:
                    if (objetivoActual >= warningActual) { valorCorrecto = true }
                    else { setRazonWarningNoValido('The target must be greater than the warning value.') }
                    break
                case 2:
                    if (objetivoActual >= warningActual) { valorCorrecto = true }
                    else { setRazonWarningNoValido('The target must be greater than the warning value.') }
                    break
                case 3:
                    if (objetivoActual == warningActual) { valorCorrecto = true }
                    else { setRazonWarningNoValido('The target must be equal to the warning value') }
                    break
                case 4:
                    if (objetivoActual <= warningActual) { valorCorrecto = true }
                    else { setRazonWarningNoValido('Target must be less than the warning value') }
                    break
                case 5:
                    if (objetivoActual <= warningActual) { valorCorrecto = true }
                    else { setRazonWarningNoValido('Target must be less than the warning value') }
                    break
            }

            if (valorCorrecto == true) {
                setRazonWarningNoValido('')
            }

            setValorCorrectoWarning(valorCorrecto)
        }

    }, [warningActual, modoCalculoActual, objetivoActual])


    return (
        <>
            <Dialog open={visibilidadNewKpi} fullWidth maxWidth='lg'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    {modoDialogKpi == 'nuevo' ? "New KPI" : modoDialogKpi == 'editar' ? "Edit KPI" : "Details KPI"}
                </DialogTitle>

                <DialogContent>

                    <div className="radialbar" style={valorCorrectoWarning == false ? { display: "block" } : { display: "none" }}>
                        <Alert severity="warning">
                            <AlertTitle>{razonWarningNoValido}</AlertTitle>
                        </Alert>
                    </div>

                    <Grid container spacing={2} columns={24} style={{ marginTop: "1px" }}>

                        <div style={{ width: '100%', textAlign: 'center', marginTop: '5px', display: 'block' }}>
                            <span className="font-semibold">
                                Definition
                                <Divider style={{ width: '100%' }} />
                            </span>
                        </div>

                        <Grid item xs={24}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="stretch"
                                spacing={2}
                                columns={15}
                            >

                                <Grid item xs={5}>
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="space-around"
                                        alignItems="stretch"
                                        spacing={2}
                                    >

                                        <Grid item>
                                            <TextField
                                                label="Title"
                                                id="title"
                                                value={tituloActual}
                                                size="small"
                                                fullWidth
                                                onChange={e => setTituloActual(e.target.value)}
                                                disabled={modoDialogKpi == "consultar" ? true : false}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Autocomplete
                                                id="tags-outlined"
                                                options={listMisionAPI}
                                                getOptionLabel={(option) => option.name}
                                                onChange={(event, value) => setMisionSelect(value)}
                                                filterSelectedOptions
                                                value={misionSelect != '' ? misionSelect : undefined}
                                                size="small"
                                                fullWidth
                                                disabled={modoDialogKpi == "consultar" ? true : false}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Mission"
                                                        placeholder="Mission"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>


                                </Grid>

                                <Grid item xs={5}>
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="space-around"
                                        alignItems="stretch"
                                        spacing={2}
                                    >
                                        <Grid item>

                                            <TextField
                                                label="Code"
                                                id="code"
                                                value={codigoActual}
                                                size="small"
                                                fullWidth
                                                onChange={e => setCodigoActual(e.target.value)}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                multiple
                                                limitTags={2}
                                                id="tags-outlined"
                                                options={usersListAPI}
                                                getOptionLabel={(option) => option.IDidentification + " - " + option.first_name + " " + option.last_name}
                                                onChange={(event, value) => setUserResponsable(value)}
                                                filterSelectedOptions
                                                value={userResponsable != '' ? userResponsable : undefined}
                                                size="small"
                                                fullWidth
                                                disabled={modoDialogKpi == "consultar" ? true : false}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Manager"
                                                        placeholder="Manager"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid item xs={5}>
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="space-around"
                                        alignItems="stretch"
                                        spacing={0}
                                    >
                                        <Grid item>
                                            <TextField
                                                id="descripcion"
                                                label="Description"
                                                multiline
                                                rows={4}
                                                value={descripcionActual}
                                                size="small"
                                                fullWidth
                                                onChange={e => setDescripcionActual(e.target.value)}
                                                disabled={modoDialogKpi == "consultar" ? true : false}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>

                        <div style={{ width: '100%', textAlign: 'center', marginTop: '15px', display: 'block' }}>
                            <span className="font-semibold">
                                Configuration
                                <Divider style={{ width: '100%' }} />
                            </span>
                        </div>

                        <Grid item xs={8}>

                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel id="label-select-risk-management">Type</InputLabel>
                                <Select
                                    labelId="label-select-detection"
                                    id="type"
                                    label="Type"
                                    onChange={e => { setTipoActual(e.target.value); }}
                                    value={tipoActual}
                                    disabled={modoDialogKpi == "consultar" ? true : false}

                                >

                                    <MenuItem value={"OTD"}>OTD</MenuItem>
                                    <MenuItem value={"OQD"}>OQD</MenuItem>

                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={8}>

                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel id="label-select-risk-management">Type of delivery</InputLabel>
                                <Select
                                    labelId="label-select-detection"
                                    id="frequency"
                                    label="Type of delivery"
                                    onChange={e => { setTipoFrecuenciaActual(e.target.value); }}
                                    value={tipoFrecuenciaActual}
                                    disabled={modoDialogKpi == "consultar" ? true : false}

                                >

                                    <MenuItem value={"monthly"}>monthly</MenuItem>
                                    <MenuItem value={"bi-weekly"}>bi-weekly</MenuItem>
                                    <MenuItem value={"weekly"}>weekly</MenuItem>
                                    <MenuItem value={"half-yearly"}>half-yearly</MenuItem>
                                    <MenuItem value={"quarterly"}>quarterly</MenuItem>
                                    <MenuItem value={"every-two-months"}>every-two-months</MenuItem>
                                    <MenuItem value={"custom"}>custom</MenuItem>

                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={8} style={kpiCustom != true ? { display: "block" } : { display: "none" }}>
                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel id="demo-multiple-checkbox-label">Months of delivery</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={mesSelect}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Months of delivery" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem key={"All"} value={"All"}>
                                        <Checkbox checked={todoChecked} />
                                        <ListItemText primary={"All"} />
                                    </MenuItem>

                                    {meses.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={mesSelect.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8} style={kpiCustom == true ? { display: "block" } : { display: "none" }}>

                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel id="label-select-risk-management">Frequency per month</InputLabel>
                                <Select
                                    labelId="label-select-detection"
                                    id="frequency"
                                    label="Frequency per month"
                                    onChange={e => { setFrecuenciaMensualActual(e.target.value); }}
                                    value={frecuenciaMensualActual}
                                    disabled={modoDialogKpi == "consultar" ? true : false}

                                >

                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={4} style={kpiCustom == true ? { display: "none" } : { display: "block" }}>4</MenuItem>

                                </Select>
                            </FormControl>

                        </Grid>

                        <div style={{ width: '100%', textAlign: 'center', marginTop: '15px', display: 'block' }}>
                            <span className="font-semibold">
                                Calculation
                                <Divider style={{ width: '100%' }} />
                            </span>
                        </div>


                        <Grid item xs={8}>

                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel id="label-select-risk-management">Calculation mode</InputLabel>
                                <Select
                                    labelId="label-select-detection"
                                    id="calculationMode"
                                    label="Calculation mode"
                                    onChange={e => { setModoCalculoActual(e.target.value); }}
                                    value={modoCalculoActual}
                                    disabled={modoDialogKpi == "consultar" ? true : false}

                                >
                                    <MenuItem value={1}>Result lower than target.</MenuItem>
                                    <MenuItem value={2}>Result less than or equal to the target.</MenuItem>
                                    <MenuItem value={3}>Result same as target.</MenuItem>
                                    <MenuItem value={4}>Result greater than or equal to the target.</MenuItem>
                                    <MenuItem value={5}>Result greater than the target.</MenuItem>

                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={8}>

                            <TextField
                                type="number"
                                shrink
                                label="Objetive"
                                id="objetive"
                                placeholder="Examples: 95.5"
                                value={objetivoActual}
                                size="small"
                                fullWidth
                                onChange={e => setObjetivoActual(e.target.value)}
                                disabled={modoDialogKpi == "consultar" ? true : false}
                            />

                        </Grid>

                        <Grid item xs={8}>

                            <TextField
                                type="number"
                                shrink
                                label="Warning"
                                id="warning"
                                placeholder="Examples: 95.5"
                                value={warningActual}
                                size="small"
                                fullWidth
                                onChange={e => setWarningActual(e.target.value)}
                                disabled={modoDialogKpi == "consultar" ? true : false}
                            />

                        </Grid>

                        <Grid item xs={8}>

                            <TextField
                                label="Unit"
                                id="unit"
                                placeholder="Examples: %, hours, hours per month"
                                value={unidadActual}
                                size="small"
                                fullWidth
                                onChange={e => setUnidadActual(e.target.value)}
                                disabled={modoDialogKpi == "consultar" ? true : false}
                            />

                        </Grid>

                        <Grid item xs={8}>
                            <TextField
                                id="calculationMethod"
                                label="Calculation method"
                                multiline
                                rows={2}
                                value={metodoCalculoActual}
                                size="small"
                                fullWidth
                                onChange={e => setMetodoCalculoActual(e.target.value)}
                                disabled={modoDialogKpi == "consultar" ? true : false}
                            />

                        </Grid>

                        <Grid item xs={8}>
                            <TextField
                                id="data"
                                label="Data used"
                                multiline
                                rows={2}
                                value={datosUsadosActual}
                                size="small"
                                fullWidth
                                onChange={e => setDatosUsadosActual(e.target.value)}
                                disabled={modoDialogKpi == "consultar" ? true : false}
                            />

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarUser(false, '') }}>Close</Button>
                    <Button variant="outlined" style={modoDialogKpi == "consultar" ? { display: "none" } : { display: "inline" }} disabled={botonControlSave} onClick={() => { funcionKpi(), cambiarVisibilidadModalInsertarUser(false, '') }}> Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

