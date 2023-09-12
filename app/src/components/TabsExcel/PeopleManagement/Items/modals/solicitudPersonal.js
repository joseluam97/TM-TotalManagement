//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import * as global from 'global.js';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'

import {
        verModalSolicitudPersonalAPIAction,
} from '../../store/actions'

import {
        insertarNewNotificationAPIAction,
} from '../../../../Managment/Notifications/store/actions'

import {
        getSesionActualAPIAction
} from '../../../../Managment/Users/store/actions'

/*
import {
        postRequestUserAPIAction
} from '../Request/store/actions'
*/

import {
        getMyManagersAPIAction
} from '../../store/actions'

import {
        getBloquesHeredadosYNoAPIAction
} from '../../../../Managment/Users/store/actions'

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

export default function ModalSolicitarPersonal(props) {

        const classes = useStyles();
        const dispatch = useDispatch();

        const [dateEntradaUser, setDateEntradaUser] = useState('')
        const [dateSalidaUser, setDateSalidaUser] = useState('')
        const [userSelect, setUserSelect] = useState('')
        const [descripcionActual, setDescripcionActual] = useState('');
        const [checked, setChecked] = useState(true);
        const [botonSolicitar, setBotonSolicitar] = useState(true);
        const [rolUser, setRolUser] = useState('');
        const [bloqueParaSeleccionar, setBloqueParaSeleccionar] = useState('');

        const [bloqueSelect, setBloqueSelect] = useState('')

        const verModalSolicitudPersonal = useSelector(state => state.fuse.peopleManagementComponente.verModalSolicitudPersonal)
        const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
        const contractUserList = useSelector(state => state.fuse.userComponente.contractUserListAPI)
        const userSelected = useSelector(state => state.fuse.staffUserComponente.userSelected)
        const listMyManager = useSelector(state => state.fuse.peopleManagementComponente.listMyManager)
        const personLogin = useSelector(state => state.fuse.userComponente.person)
        const listBloquesHeredadosUser = useSelector(state => state.fuse.userComponente.listBloquesHeredadosUser)

        const verModalSolicitudPersonalAPI = (arg) => dispatch(verModalSolicitudPersonalAPIAction(arg))
        //const postRequestUserAPI = (dataSolicitud) => dispatch(postRequestUserAPIAction(dataSolicitud));
        const getMyManagersAPI = (idMember) => dispatch(getMyManagersAPIAction(idMember))

        const getBloquesHeredadosYNoAPI = (idPerson) => dispatch(getBloquesHeredadosYNoAPIAction(idPerson))

        useEffect(() => {
                if (userSelect != '' && dateEntradaUser != '' && dateSalidaUser != '' && rolUser != '' && bloqueSelect != '' && descripcionActual != '') {
                        setBotonSolicitar(false)
                } else {
                        setBotonSolicitar(true)
                }
        })

        useEffect(() => {
                //GET BLOQUES DIRECTOS
                if (personLogin.id != undefined) {
                        getBloquesHeredadosYNoAPI(personLogin.id)
                }
        }, [])

        useEffect(() => {
                //GET BLOQUES DIRECTOS
                if (personLogin.id != undefined) {
                        getBloquesHeredadosYNoAPI(personLogin.id)
                }
        }, [personLogin])

        useEffect(() => {
                if (userSelected != '') {
                        getMyManagersAPI(userSelected)

                        let userSeleccionado = usersListAPI.filter(elemento => elemento.id == userSelected)[0]
                        if (userSeleccionado != undefined) {
                                setUserSelect(userSeleccionado)
                        }
                }

        }, [userSelected])

        useEffect(() => {
                if (rolUser != '') {

                        if (rolUser == global.rolN8 || rolUser == global.rolN7) {
                                setBloqueParaSeleccionar("Sub Mision")
                        }
                        if (rolUser == global.rolN6 || rolUser == global.rolN5) {
                                setBloqueParaSeleccionar("Mision")
                        }
                        if (rolUser == global.rolN4) {
                                setBloqueParaSeleccionar("WP")
                        }
                        if (rolUser == global.rolN3) {
                                setBloqueParaSeleccionar("Departamento")
                        }
                        if (rolUser == global.rolN2) {
                                setBloqueParaSeleccionar("Direccion Departamental")
                        }

                }

        }, [rolUser])


        function bloqueParaSeleccionarBloque() {
                if (bloqueParaSeleccionar != "" && listBloquesHeredadosUser[bloqueParaSeleccionar] != undefined) {
                        return (
                                <Autocomplete
                                        id="tags-outlined"
                                        options={listBloquesHeredadosUser[bloqueParaSeleccionar]}
                                        getOptionLabel={(option) => option != "" ? option.code + " " + option.name : ''}
                                        onChange={(event, value) => setBloqueSelect(value)}
                                        filterSelectedOptions
                                        value={bloqueSelect != "" ? bloqueSelect : ''}
                                        renderInput={(params) => (
                                                <TextField
                                                        {...params}
                                                        label={bloqueParaSeleccionar}
                                                        placeholder={bloqueParaSeleccionar}
                                                        size="small"
                                                        fullWidth
                                                        onChange={e => { setBloqueSelect(e.target.value); }}
                                                />
                                        )}
                                />
                        );
                }



        }

        const handleChange = (event) => {
                setChecked(event.target.checked);
        };

        function solicitarPersona() {
                //ENVIO DE EMAIL INFORMATIVO
                /*if (checked == true) {
                        postCorreoSolicitudPersonalAPI({
                                emailEnvio: userSelect.email,
                                subject: "NUEVA SOLICITUD DE PERSONAL",
                                body: "El usuario " + personLogin.first_name + " " + personLogin.last_name + " acaba de realizar una solicitud de personal. Con los siguientes detalles: \n Sub Mission: " + subMisionSelect.name + "\n Numero Personas: " + numPersonas + "\n Descripcion: " + descripcionActual + " "
                        })
                }*/

                //GET ID DE USER MANAGERS
                let vectIDManager = []
                for(let item in listMyManager){
                        vectIDManager.push(listMyManager[item].id)
                }

                //CREACION DE NOTIFICACION AL USUARIO
                let fechaActual = new Date()
                let fechaseleccionada = fechaActual.toISOString()
                let arrayFecha = fechaseleccionada.split("T")
                {/*
                postRequestUserAPI({
                        user_solicitado: userSelect.id,
                        user_origen_solicitud: personLogin.id,
                        user_destino_solicitud: vectIDManager,
                        fecha_solicitud: arrayFecha[0],
                        fecha_entrada: dateEntradaUser,
                        fecha_salida: dateSalidaUser,

                        bloque_Asignado: bloqueParaSeleccionar,
                        id_bloque_asignado: bloqueSelect.id,

                        observations: descripcionActual,
                        state: "Requested"
                })
        */}
        }



        return (
                <>

                        <Dialog open={verModalSolicitudPersonal} fullWidth maxWidth='md' onClose={() => { verModalSolicitudPersonalAPI(false) }}>

                                <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                        Request Staff
                                </DialogTitle>
                                <DialogContent>

                                        <div style={{ width: '100%', textAlign: 'center' }}>
                                                <Alert severity="info" style={listMyManager.length == 0 ? {} : { display: "none" }}>
                                                        <AlertTitle>No responsible persons are registered for this user, therefore there is no destination for this request.</AlertTitle>
                                                </Alert>
                                        </div>

                                        <div style={listMyManager.length != 0 ? {} : { display: "none" }}>
                                                <Typography className="username text-18 whitespace-nowrap font-semibold mb-2" color="inherit">
                                                        Managers
                                                </Typography>
                                                <Stack spacing={1} alignItems="left">
                                                        <Stack direction="row" spacing={1}>
                                                                {listMyManager.map((user) => {
                                                                        return (
                                                                                <Chip label={user['IDRes'] + " - " + user['first_name'] + " " + user['last_name']} color="primary" size="small" />
                                                                        );
                                                                })}
                                                        </Stack>
                                                </Stack>
                                        </div>

                                        <Grid container spacing={2} columns={16} className="mt-2">
                                                <Grid item xs={16}>
                                                        <Autocomplete
                                                                id="tags-outlined"
                                                                options={usersListAPI}
                                                                getOptionLabel={(option) => option.first_name + " " + option.last_name}
                                                                onChange={(event, value) => setUserSelect(value)}
                                                                filterSelectedOptions
                                                                value={userSelect}
                                                                disabled={true}
                                                                renderInput={(params) => (
                                                                        <TextField
                                                                                {...params}
                                                                                label="User"
                                                                                placeholder="User"
                                                                                size="small"
                                                                                fullWidth
                                                                                onChange={e => { setUserSelect(e.target.value); }}
                                                                        />
                                                                )}
                                                        />
                                                </Grid>
                                                <Grid item xs={8}>
                                                        <FormControl size="small" fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Role to be assigned</InputLabel>
                                                                <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="rol"
                                                                        label="Role to be assigned"
                                                                        size="small"
                                                                        fullWidth
                                                                        onChange={e => { setRolUser(e.target.value); }}
                                                                        value={rolUser}>

                                                                        <MenuItem value={global.rolN2}>N6 - {global.rolN2}</MenuItem>
                                                                        <MenuItem value={global.rolN3}>N5 - {global.rolN3}</MenuItem>
                                                                        <MenuItem value={global.rolN4}>N4 - {global.rolN4}</MenuItem>
                                                                        <MenuItem value={global.rolN5}>N3 - {global.rolN5}</MenuItem>
                                                                        <MenuItem value={global.rolN6}>N2 - {global.rolN6}</MenuItem>
                                                                        <MenuItem value={global.rolN7}>N1 - {global.rolN7}</MenuItem>
                                                                        <MenuItem value={global.rolN8}>N0 - {global.rolN8}</MenuItem>

                                                                </Select>
                                                        </FormControl>
                                                </Grid>
                                                <Grid item xs={8}>
                                                        {bloqueParaSeleccionarBloque()}
                                                </Grid>
                                                <Grid item xs={8}>
                                                        <FormControl size="small" fullWidth>
                                                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                                        <DatePicker
                                                                                label="Entry date"
                                                                                id="implementationdate"
                                                                                inputFormat="dd-MM-yyyy"
                                                                                format="dd-MM-yyyy"
                                                                                size="small"
                                                                                fullWidth
                                                                                value={dateEntradaUser}
                                                                                onChange={(newValue) => {
                                                                                        if (newValue == "Invalid Date" || newValue == null) {
                                                                                                setDateEntradaUser(newValue)
                                                                                        } else {
                                                                                                let fechaseleccionada = newValue.toISOString()
                                                                                                let arrayFecha = fechaseleccionada.split("T")
                                                                                                setDateEntradaUser(arrayFecha[0]);
                                                                                        }
                                                                                }}
                                                                                renderInput={(params) =>
                                                                                        <TextField
                                                                                                {...params}
                                                                                                size="small"
                                                                                                fullWidth
                                                                                        />
                                                                                }

                                                                        />
                                                                </LocalizationProvider>
                                                        </FormControl>
                                                </Grid>
                                                <Grid item xs={8}>
                                                        <FormControl size="small" fullWidth>
                                                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                                        <DatePicker
                                                                                label="Exit date"
                                                                                id="implementationdate"
                                                                                inputFormat="dd-MM-yyyy"
                                                                                format="dd-MM-yyyy"
                                                                                size="small"
                                                                                fullWidth
                                                                                value={dateSalidaUser}
                                                                                onChange={(newValue) => {
                                                                                        if (newValue == "Invalid Date" || newValue == null) {
                                                                                                setDateSalidaUser(newValue)
                                                                                        } else {
                                                                                                let fechaseleccionada = newValue.toISOString()
                                                                                                let arrayFecha = fechaseleccionada.split("T")
                                                                                                setDateSalidaUser(arrayFecha[0]);
                                                                                        }
                                                                                }}
                                                                                renderInput={(params) =>
                                                                                        <TextField
                                                                                                {...params}
                                                                                                size="small"
                                                                                                fullWidth
                                                                                        />
                                                                                }

                                                                        />
                                                                </LocalizationProvider>
                                                        </FormControl>
                                                </Grid>
                                                <Grid item xs={8}>
                                                        <TextField
                                                                id="descripcion"
                                                                label="Description"
                                                                multiline
                                                                rows={5}
                                                                size="small"
                                                                fullWidth
                                                                onChange={e => setDescripcionActual(e.target.value)}
                                                        />
                                                </Grid>
                                                <Grid item xs={8}>
                                                        <FormControl component="fieldset">
                                                                <FormControlLabel
                                                                        value="end"
                                                                        control={<Checkbox />}
                                                                        checked={checked}
                                                                        onChange={handleChange}
                                                                        label="Send notice by email"
                                                                        labelPlacement="end"
                                                                />
                                                        </FormControl>
                                                </Grid>
                                        </Grid>
                                </DialogContent>
                                <DialogActions>
                                        <Button variant="outlined" onClick={() => verModalSolicitudPersonalAPI(false)}>Close</Button>
                                        <Button variant="outlined" disabled={botonSolicitar} onClick={() => { solicitarPersona(), verModalSolicitudPersonalAPI(false) }}>Request</Button>
                                </DialogActions>

                        </Dialog>
                </>
        );
}

