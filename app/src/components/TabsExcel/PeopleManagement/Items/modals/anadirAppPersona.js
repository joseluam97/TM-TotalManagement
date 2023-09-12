//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
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
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as moment from 'moment';
import { showMessage } from 'app/store/fuse/messageSlice'
import { matchRoutes, useLocation } from 'react-router-dom';

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'

import {
        getSesionActualAPIAction,
        mostrarUserAPIAction
} from '../../../../Managment/Users/store/actions'

import {
        verModalAnadirAppPersonaAPIAction,
        mostrarAppAPIAction,
        insertarNewAppAPIAction
} from '../Aplications/store/actions'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles({

        customDialogTitle: {
                backgroundColor: 'rgb(0, 0, 0)',
marginLeft: '3px',
marginRight: '3px',
                color: 'rgb(255, 255, 255)',
                marginBottom: '0.5em'
        }

});

export default function ModalAnadirAppPersona(props) {

        const classes = useStyles();
        const dispatch = useDispatch();

        const location = useLocation();
        const { pathname } = location;

        const [vectorUsuariosDisponibles, setVectorUsuariosDisponibles] = useState([])

        const personLogin = useSelector(state => state.fuse.userComponente.person)

        const [userSelect, setUserSelect] = useState('')
        const [requirementSelect, setRequirementSelect] = useState('');
        const [botonSolicitar, setBotonSolicitar] = useState(true);
        const [fechaSeleccionada, setFechaSeleccionada] = useState('')

        const [valorObjetivoRequerimiento, setValorObjetivoRequerimiento] = useState(1);
        const [tipoValorExtraRequerimiento, setTipoValorExtraRequerimiento] = useState('')
        const [valorListaRequerimiento, setValorListaRequerimiento] = useState('')
        const [vectorListaRequerimiento, setVectorListaRequerimiento] = useState([])

        const verModalAnadirAppPersona = useSelector(state => state.fuse.aplicationComponent.verModalAnadirAppPersona)
        const listApp = useSelector(state => state.fuse.aplicationComponent.listApp)
        const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
        const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)

        const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
        const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
        const verModalAnadirAppPersonaAPI = (visible) => dispatch(verModalAnadirAppPersonaAPIAction(visible));
        const insertarNewAppAPI = (idLogin, visible) => dispatch(insertarNewAppAPIAction(idLogin, visible));

        useEffect(() => {

                mostrarUserAPI()
                mostrarAppAPI()

        }, [])

        useEffect(() => {

                setVectorUsuariosDisponibles(usersListAPI)
                

        }, [usersListAPI])

        useEffect(() => {
                if (userSelect != '' && userSelect != undefined && userSelect != null && requirementSelect != '' && requirementSelect != undefined && requirementSelect != null) {

                        //COMPROBAR SI EL USUARIO YA TIENE ESTA APP
                        let busquedaUser = listUserApp.filter(id => id['user_id'] == userSelect.id)
                        let busquedaApp = busquedaUser.filter(id => id['aplication_user_id'] == requirementSelect.id)

                        if (busquedaApp.length != 0) {
                                setBotonSolicitar(true)
                                setTipoValorExtraRequerimiento('')
                                setVectorListaRequerimiento([])
                                dispatch(
                                        showMessage({
                                                message: "The user has already been assigned this requirement.",
                                                variant: "error"
                                        })
                                )
                        }
                        else {
                                //COMPROBACION DE CASUISTICA ESPECIAL
                                if (tipoValorExtraRequerimiento == "Number" || tipoValorExtraRequerimiento == "List" || tipoValorExtraRequerimiento == "Date") {
                                        if ((tipoValorExtraRequerimiento == "Date" && moment(fechaSeleccionada, 'YYYY-MM-DD').isValid()) || (tipoValorExtraRequerimiento == "Number" && valorObjetivoRequerimiento != "") || (tipoValorExtraRequerimiento == "List" && valorListaRequerimiento != "")) {
                                                setBotonSolicitar(false)
                                        }
                                        else {
                                                setBotonSolicitar(true)
                                        }
                                }
                                else {
                                        setBotonSolicitar(false)
                                }

                                //MUESTRA LA GESTION SI ES NECESARIO
                                if (requirementSelect.tiene_valor == true) {
                                        setTipoValorExtraRequerimiento(requirementSelect.tipo_valor)
                                        if (requirementSelect.tipo_valor == "List") {
                                                let vectorListado = requirementSelect.listado_opciones.split(',')
                                                setVectorListaRequerimiento(vectorListado)
                                        }
                                }
                                else {
                                        setTipoValorExtraRequerimiento('')
                                        setVectorListaRequerimiento([])
                                }
                        }

                }
                else {
                        setBotonSolicitar(true)

                }
        })

        function anadirAppPersona() {

                insertarNewAppAPI(personLogin.id, {
                        user_id: userSelect.id,
                        aplication_user_id: requirementSelect.id,
                        valor_asignado_fecha: requirementSelect.tipo_valor == "Date" ? new Date(fechaSeleccionada).toISOString().split("T")[0] : undefined,
                        valor_asignado: requirementSelect.tipo_valor == "List" ? valorListaRequerimiento : '',
                        valor_comparacion: requirementSelect.tipo_valor == "Number" ? valorObjetivoRequerimiento : undefined
                })

                resetValues()

        }

        function resetValues() {
                setUserSelect('')
                setRequirementSelect('')

                setValorObjetivoRequerimiento(1)
                setTipoValorExtraRequerimiento('')
                setValorListaRequerimiento('')
                setVectorListaRequerimiento([])
        }

        return (
                <>

                        <Dialog open={verModalAnadirAppPersona} fullWidth maxWidth='md' onClose={() => { verModalAnadirAppPersonaAPI(false) }}>

                                <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                        Add requirement to person
                                </DialogTitle>
                                <DialogContent>
                                        <Grid container spacing={2} columns={16} style={{ marginTop: '10px' }}>
                                                <Grid item xs={8}>
                                                        <Autocomplete
                                                                id="tags-outlined"
                                                                value={userSelect}
                                                                options={vectorUsuariosDisponibles}
                                                                getOptionLabel={(option) => option != '' ? option.first_name + " " + option.last_name : ''}
                                                                onChange={(event, value) => setUserSelect(value)}
                                                                filterSelectedOptions
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="User"
                                                                                placeholder="User"
                                                                                size="small"
                                                                                sx={{ m: 1, width: '37ch' }}
                                                                                onChange={e => { setUserSelect(e.target.value); }}
                                                                        />
                                                                )}
                                                        />
                                                </Grid>
                                                <Grid item xs={8}>
                                                        <Autocomplete
                                                                id="tags-outlined"
                                                                groupBy={(option) => option.type}
                                                                options={listApp}
                                                                value={requirementSelect}
                                                                getOptionLabel={(option) => option != '' ? option.type + " - " + option.name : ''}
                                                                onChange={(event, value) => setRequirementSelect(value)}
                                                                filterSelectedOptions
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="Requirements"
                                                                                placeholder="Requirements"
                                                                                size="small"
                                                                                sx={{ m: 1, width: '37ch' }}
                                                                        />
                                                                )}
                                                        />
                                                </Grid>

                                                <Grid item xs={16} style={tipoValorExtraRequerimiento == "Date" ? { display: '' } : { display: 'none' }}>

                                                        {/*SI SE ELIGE FECHA */}

                                                        <FormControl>
                                                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                                        <DatePicker
                                                                                label="Date"
                                                                                id="fechaPlanificada"
                                                                                inputFormat="yyyy-MM-dd"
                                                                                format="yyyy-MM-dd"
                                                                                value={fechaSeleccionada}
                                                                                onChange={(newValue) => {
                                                                                        if (newValue == "Invalid Date" || newValue == null) {
                                                                                                setFechaSeleccionada(newValue)
                                                                                        } else {
                                                                                                let fechaseleccionada = newValue.toISOString()
                                                                                                let arrayFecha = fechaseleccionada.split("T")
                                                                                                setFechaSeleccionada(arrayFecha[0]);
                                                                                        }
                                                                                }}
                                                                                renderInput={(params) => <TextField
                                                                                        {...params}
                                                                                        size="small"
                                                                                        sx={{ m: 1, width: '37ch' }}
                                                                                />}


                                                                        />
                                                                </LocalizationProvider>
                                                        </FormControl>

                                                </Grid>

                                                <Grid item xs={16} style={tipoValorExtraRequerimiento == "Number" ? { display: '' } : { display: 'none' }}>

                                                        {/*SI SE ELIGE NUMERO */}

                                                        <TextField
                                                                type="number"
                                                                shrink
                                                                label="Value"
                                                                id="objetive"
                                                                placeholder="Examples: 4"
                                                                value={valorObjetivoRequerimiento}
                                                                size="small"
                                                                sx={{ m: 1, width: '37ch' }}
                                                                onChange={e => setValorObjetivoRequerimiento(e.target.value)}
                                                        />
                                                </Grid>
                                        </Grid>
                                </DialogContent>
                                <DialogActions>
                                        <Button variant="outlined" onClick={() => { resetValues(), verModalAnadirAppPersonaAPI(false) }}>Close</Button>
                                        <Button variant="outlined" disabled={botonSolicitar} onClick={() => { anadirAppPersona(), verModalAnadirAppPersonaAPI(false) }}>Add Requirement</Button>
                                </DialogActions>

                        </Dialog>
                </>
        );
}

