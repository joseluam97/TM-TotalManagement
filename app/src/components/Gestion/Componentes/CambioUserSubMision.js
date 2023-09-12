//**********************IMPORTACIONES****************************

import * as React from 'react';
import { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { showMessage } from 'app/store/fuse/messageSlice'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@material-ui/core/Typography';
import { matchRoutes, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//Grid importaciones
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux'

import {
    getAllJobAPIAction,
    deleteContractUserAPIAction,
    putPersonalAsignadoContratoAPIAction,
    postPersonalAsignadoContratoAPIAction
} from '../SubMision/store/actions'

import {
    putUserAPI
} from '../../Managment/Users/store/actions'

const useStyles = makeStyles({

    customDialogTitle: {
        backgroundColor: 'rgb(0, 0, 0)',
        marginLeft: '3px',
        marginRight: '3px',
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

export default function CambioUserSubMision(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [personaAnadida, setPersonaAnadida] = useState(false)
    const [nameJob, setNameJob] = useState('')
    const [controlBotonSave, setControlBotonSave] = useState(true)
    const [subMisionNuevaPermanente, setSubMisionNuevaPermanente] = useState('')
    const [jobSelect, setJobSelect] = useState('')
    const [mantenerUserSubMisionActual, setMantenerUserSubMisionActual] = useState(true)

    const contractUserListAPI = useSelector(state => state.fuse.userComponente.contractUserListAPI)
    const contractUserListAPIRespaldo = useSelector(state => state.fuse.userComponente.contractUserListAPIRespaldo)
    const listJobSubMision = useSelector(state => state.fuse.subMisionComponent.listJobSubMision)

    const getAllJobAPI = (idSubMision) => dispatch(getAllJobAPIAction(idSubMision))

    const postPersonalAsignadoContratoAPI = (datos, mensajeSINO, subMisionBusqueda) => dispatch(postPersonalAsignadoContratoAPIAction(datos, mensajeSINO, subMisionBusqueda))
    const putPersonalAsignadoContratoAPI = (idPersona, data) => dispatch(putPersonalAsignadoContratoAPIAction(idPersona, data))
    const deleteContractUserAPI = (datos) => dispatch(deleteContractUserAPIAction(datos))
    const putUser = (id, user) => dispatch(putUserAPI(id, user))

    useEffect(() => {
        setSubMisionNuevaPermanente(props.subMisionSelect)
        //getAllJobAPI(props.subMisionSelect.id)

    }, [])

    function resetValues() {
        setPersonaAnadida(false)
        setNameJob('')
        setSubMisionNuevaPermanente('')
        setJobSelect('')
        setMantenerUserSubMisionActual(true)
    }

    //CUANDO CAMBIA LA SUB MISION SE ELIMINA EL TRABAJO
    useEffect(() => {

        //RESETEA JOB
        setJobSelect('')

        //COMPRUEBA SI EXISTE YA LA ITERACION
        if (subMisionNuevaPermanente.id == props.subMisionSelect.id) {
            let busquedaContrato = contractUserListAPIRespaldo.filter(elemento => elemento.id == subMisionNuevaPermanente.id)[0]
            if (busquedaContrato != undefined) {
                setPersonaAnadida(true)
                setNameJob(busquedaContrato.job_name)
            }
            else {
                setPersonaAnadida(false)
                setNameJob('')
            }
        }

    }, [subMisionNuevaPermanente])

    useEffect(() => {

        if (subMisionNuevaPermanente != '' && subMisionNuevaPermanente != undefined && subMisionNuevaPermanente != null) {
            getAllJobAPI(subMisionNuevaPermanente.id)

            //COMPROBAR QUE HAY CAMBIO EN LA SUB MISION SELECCIONADA
            if (subMisionNuevaPermanente.id == props.subMisionSelect.id) {
                setControlBotonSave(true)
            }
            else {
                if (jobSelect != '' && jobSelect != undefined && jobSelect != null) {
                    setControlBotonSave(false)
                }
                else {
                    setControlBotonSave(true)
                }
            }
        }
        else {
            setControlBotonSave(true)
        }

    }, [subMisionNuevaPermanente, jobSelect])

    function guardarNuevaConfiguracion() {

        let busquedaContrato = contractUserListAPIRespaldo.filter(elemento => elemento.id == subMisionNuevaPermanente.id)[0]

        if (busquedaContrato != undefined) {
            //YA ESTA AÑADIDO A ESTA SUB MISION COMO TEMPORAL, SE MODIFICA LA INSTANCIA PARA PONERLO COMO PERMANETE
            putPersonalAsignadoContratoAPI(busquedaContrato.contract_user_id, {
                user_id: props.usuarioEditar.id,
                subMision_id: busquedaContrato.id,
                rol_employee: "permanent",
                job: jobSelect.id
            })
        }
        else {
            //NO EXISTE LA ASIGNACION DE LA PERSONA A ESTA SUB MISION, SE CREA UNA NUEVA INSTANCIA
            //GUARDAR NUEVA SUBMISION COMO PERMANENTE
            postPersonalAsignadoContratoAPI({
                user_id: props.usuarioEditar.id,
                subMision_id: subMisionNuevaPermanente.id,
                rol_employee: "permanent",
                job: jobSelect.id
            }, false, props.subMisionSelect.id)
        }



        //ELIMINAR O ACTUALIZAR LA SUBMISION ACTUAL

        if (mantenerUserSubMisionActual == true) {
            putPersonalAsignadoContratoAPI(props.usuarioEditar.contractUserId, {
                user_id: props.usuarioEditar.id,
                subMision_id: props.subMisionSelect.id,
                rol_employee: "temporary",
                job: props.usuarioEditar.job_employee_id
            })
        }
        else {
            deleteContractUserAPI({
                user_id: props.usuarioEditar['id'],
                subMision_id: props.subMisionSelect.id
            })
        }

        //ACTUALIZAR USUARIO PARA REFLEJAR SU INFORMACION EN BLOQUEPREDEF
        let userSelect = props.usuarioEditar
        putUser(userSelect.id, {
            IDidentification: userSelect.IDidentification,
            first_name: userSelect.first_name,
            last_name: userSelect.last_name,
            organization: userSelect.organization,
            phone: userSelect.phone,
            email: userSelect.email,
            rolUser: userSelect.rolUser
        })

        //VOLVER A VISTA INICIAL
        props.setCambioUsuarioSubMision(false)

        //RESET VALUES FORM
        resetValues()
    }

    return (
        <>

            <div style={{ width: '100%', textAlign: 'center' }}>
                <span className="font-semibold">
                    CHANGE OF THE USER'S PERMANENT SUBMISSION
                    <Divider style={{ width: '100%' }} />
                </span>
            </div>

            <div style={{ width: '100%', textAlign: 'center' }}>
                <Alert severity="warning" style={personaAnadida == true ? { display: "inline-flex" } : { display: "none" }}>
                    <AlertTitle>This user is already added in this sub mission, with role {nameJob}</AlertTitle>
                </Alert>
            </div>

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2} columns={16}>


                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    item >



                    <Autocomplete
                        id="tags-outlined"
                        value={subMisionNuevaPermanente != undefined ? subMisionNuevaPermanente : ''}
                        inputValue={subMisionNuevaPermanente != null ? subMisionNuevaPermanente.name : ''}
                        options={contractUserListAPI}
                        getOptionLabel={(option) =>
                            option.name != null ? option.name : ''
                        }
                        onChange={(event, value) => setSubMisionNuevaPermanente(value)}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='New Sub Mission'
                                placeholder='New Sub Mission'
                                size="small"
                                sx={{ m: 1, width: '50ch' }}
                            />
                        )}
                    />


                    <Autocomplete
                        id="tags-outlined"
                        value={jobSelect != undefined ? jobSelect : ''}
                        inputValue={jobSelect != null ? jobSelect.name : ''}
                        options={listJobSubMision}
                        getOptionLabel={(option) =>
                            option.name != null ? option.name : ''
                        }
                        onChange={(event, value) => setJobSelect(value)}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Position"
                                placeholder="Position"
                                size="small"
                                sx={{ m: 1, width: '50ch' }}
                            />
                        )}
                    />

                    <FormGroup variant="standard" sx={{ m: 1, width: '50ch' }} size="small">
                        <FormControlLabel control={
                            <Checkbox
                                checked={mantenerUserSubMisionActual}
                                onChange={(event, value) => setMantenerUserSubMisionActual(value)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        } label="Keep the user in the current sub mission as temporary" />
                    </FormGroup>

                    <Button
                        className="ml-8"
                        variant="contained"
                        color="error"
                        sx={{ m: 1, width: '25ch' }}
                        onClick={() => {
                            props.setCambioUsuarioSubMision(false)
                        }}
                    >
                        CANCEL

                    </Button>

                    <Button
                        className="ml-8"
                        variant="contained"
                        color="secondary"
                        disabled={controlBotonSave}
                        sx={{ m: 1, width: '25ch' }}
                        onClick={() => {
                            guardarNuevaConfiguracion()
                        }}
                    >
                        SAVE

                    </Button>

                </Grid>
            </Grid>

        </>
    )
}