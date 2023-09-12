//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Autocomplete from '@mui/material/Autocomplete';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'

import {
        cambiarVisibilidadModalInsertarAction,
        insertarDeliverablesModalInsertarAction,
        updateDeliverablesAction
} from '../store/actions'

import {
        mostrarMisionAPIAction,
        mostrarMisionIncluyendoMisionesHeredadasAPIAction
} from '../../../Gestion/Mision/store/actions'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

        customDialogTitle: {
                backgroundColor: 'rgb(0, 0, 0)',
                marginLeft: '3px',
                marginRight: '3px',
                color: 'rgb(255, 255, 255)',
                marginBottom: '0.5em'
        }

});

export default function ModalInsertar(props) {

        const classes = useStyles();
        const dispatch = useDispatch();

        const [misionList, setMisionList] = useState('')
        const [descripcionActual, setDescripcionActual] = useState('')
        const [criteriosActual, setCriteriosActual] = useState('')
        const [fechaActual, setFechaActual] = useState('')
        const [indicadorActual, setIndicadorActual] = useState('')
        const [criterioActual, setCriterioActual] = useState('')

        const modo = useSelector(state => state.fuse.deliverableComponent.modo)
        const filaSeleccionadaGrid = useSelector(state => state.fuse.deliverableComponent.filaSeleccionadaGrid)
        const visibilidadModalInsertar = useSelector(state => state.fuse.deliverableComponent.visibilidadModalInsertar)
        const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
        const personLogin = useSelector(state => state.fuse.userComponente.person)
        const deliverableListAPI = useSelector(state => state.fuse.deliverableComponent.deliverableListAPI)
        const contractUserList = useSelector(state => state.fuse.userComponente.contractUserListAPI)

        const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAction(valor, modo))
        const insertarDeliverablesModalInsertar = (valor, idPerson) => dispatch(insertarDeliverablesModalInsertarAction(valor, idPerson))
        const mostrarMisionIncluyendoMisionesHeredadasAPI = (idPersona) => dispatch(mostrarMisionIncluyendoMisionesHeredadasAPIAction(idPersona))
        const updateDeliverables = (id, json, idPerson) => dispatch(updateDeliverablesAction(id, json, idPerson))

        function nuevoDeliverable() {
                if(modo == "nuevo"){
                    insertarDeliverablesModalInsertar({
                        mision: misionList.id,
                        descripcion: descripcionActual,
                        criterios_estimados: criteriosActual,
                        fecha_entrega: fechaActual,
                        tipos_indicadores: indicadorActual,
                        criterios_aceptacion: criterioActual
                        }, personLogin.id)    
                }
                if(modo == "editar"){
                        updateDeliverables(filaSeleccionadaGrid, {
                                mision: misionList.id,
                                descripcion: descripcionActual,
                                criterios_estimados: criteriosActual,
                                fecha_entrega: fechaActual,
                                tipos_indicadores: indicadorActual,
                                criterios_aceptacion: criterioActual
                                }, personLogin.id)   
                }
                
        }


        useEffect(() => {
                mostrarMisionIncluyendoMisionesHeredadasAPI(personLogin.id)
        }, [personLogin])


        useEffect(() => {
                if(modo != "" && filaSeleccionadaGrid != ""){
                        if(modo == "nuevo"){
                                setMisionList('')
                                setDescripcionActual('')
                                setCriteriosActual('')
                                setFechaActual('')
                                setIndicadorActual('')
                                setCriterioActual('')
                        }
                        if(modo == "editar" || modo == "consultar"){

                                let deliverableSelect = deliverableListAPI.filter(item => item.id == filaSeleccionadaGrid)[0]

                                let misionSelect = listMisionAPI.filter(item => item.id == deliverableSelect.mision)[0]

                                if(deliverableSelect != undefined){
                                        setMisionList(misionSelect)
                                        setDescripcionActual(deliverableSelect.descripcion)
                                        setCriteriosActual(deliverableSelect.criterios_estimados)
                                        setFechaActual(deliverableSelect.fecha_entrega)
                                        setIndicadorActual(deliverableSelect.tipos_indicadores)
                                        setCriterioActual(deliverableSelect.criterios_aceptacion)  
                                }
                                
                        }
                }
                
        }, [modo, filaSeleccionadaGrid])

        return (
                <>

                        <Dialog open={visibilidadModalInsertar} onClose={() => cambiarVisibilidadModalInsertar(false, '')} fullWidth maxWidth='md'>

                                <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                        New Deliverable
                                </DialogTitle>
                                <DialogContent>

                                        <Grid container spacing={2} columns={16}>

                                                <Grid item xs={8}>
                                                        <FormControl variant="standard">
                                                                <Autocomplete
                                                                        id="tags-outlined"
                                                                        options={listMisionAPI}
                                                                        value={misionList != undefined ? misionList : ''}
                                                                        inputValue={misionList != null ? misionList.name : ''}
                                                                        onChange={(event, value) => setMisionList(value)}
                                                                        getOptionLabel={(option) =>
                                                                                option.name != null ? option.name : ''
                                                                        }
                                                                        disabled = {modo == "consultar" ? true : false}
                                                                        filterSelectedOptions
                                                                        renderInput={(params) => (
                                                                                <TextField
                                                                                        {...params}
                                                                                        label="Mission"
                                                                                        placeholder="Mission"
                                                                                        size="small"
                                                                                        sx={{ m: 1, width: '37ch' }}
                                                                                />
                                                                        )}
                                                                />
                                                        </FormControl>


                                                </Grid>

                                                <Grid item xs={8}>
                                                        <TextField
                                                                label="Description of the deliverables"
                                                                id="descripcion"
                                                                value={descripcionActual}
                                                                size="small"
                                                                multiline
                                                                rows={2}
                                                                sx={{ m: 1, width: '37ch' }}
                                                                disabled = {modo == "consultar" ? true : false}
                                                                onChange={e => setDescripcionActual(e.target.value)}
                                                        />
                                                </Grid>

                                                <Grid item xs={8}>
                                                        <TextField
                                                                label="Estimated quantitative criteria"
                                                                id="criterios"
                                                                value={criteriosActual}
                                                                size="small"
                                                                multiline
                                                                rows={2}
                                                                sx={{ m: 1, width: '37ch' }}
                                                                disabled = {modo == "consultar" ? true : false}
                                                                onChange={e => setCriteriosActual(e.target.value)}
                                                        />
                                                </Grid>

                                                <Grid item xs={8}>
                                                        <TextField
                                                                label="Delivery dates"
                                                                id="fecha"
                                                                value={fechaActual}
                                                                size="small"
                                                                multiline
                                                                rows={2}
                                                                sx={{ m: 1, width: '37ch' }}
                                                                disabled = {modo == "consultar" ? true : false}
                                                                onChange={e => setFechaActual(e.target.value)}
                                                        />
                                                </Grid>

                                                <Grid item xs={8}>
                                                        <TextField
                                                                label="Types of progress indicators"
                                                                id="indicador"
                                                                value={indicadorActual}
                                                                size="small"
                                                                multiline
                                                                rows={2}
                                                                sx={{ m: 1, width: '37ch' }}
                                                                disabled = {modo == "consultar" ? true : false}
                                                                onChange={e => setIndicadorActual(e.target.value)}
                                                        />
                                                </Grid>

                                                <Grid item xs={8}>
                                                        <TextField
                                                                label="Acceptance criteria"
                                                                id="criterio"
                                                                value={criterioActual}
                                                                size="small"
                                                                multiline
                                                                rows={2}
                                                                sx={{ m: 1, width: '37ch' }}
                                                                disabled = {modo == "consultar" ? true : false}
                                                                onChange={e => setCriterioActual(e.target.value)}
                                                        />
                                                </Grid>


                                        </Grid>
                                </DialogContent>
                                <DialogActions>

                                        <Button variant="outlined" onClick={() => cambiarVisibilidadModalInsertar(false, '')}>Close</Button>
                                        <Button variant="outlined" style={{display: modo == 'consultar' ? 'none' : 'inline'}} onClick={() => { nuevoDeliverable(), cambiarVisibilidadModalInsertar(false, '') }}> Save</Button>

                                </DialogActions>

                        </Dialog>
                </>
        )
}

