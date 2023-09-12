import { useEffect, useState, useRef } from 'react'
import * as React from 'react';

//DataGrid importaciones


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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from 'react-beautiful-dnd';
import RootRef from "@material-ui/core/RootRef";
import { showMessage } from 'app/store/fuse/messageSlice'
import Column from "./column.js";
import Task from "./task.js";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux'

import {
    insertarNewAppAPIAction,
    putAppAPIAction,
    mostrarAppAPIAction,
    cambiarVisibilidadModalInsertarGrupoAPIAction,
    insertarNewGroupAppAPIAction,
    putGroupRequerimentsAPIAction,
    mostrarRequerimentsWithDetailsAPIAction,
    insertarRequerimentsWithDetailsAPIAction,
    cambiarEstadoValuesRequerimentsAPIAction
} from '../store/actions.js'

import {
    mostrarUserAPIAction
} from '../../Users/store/actions.js'

import {
    DragDropContext,
    Droppable
} from 'react-beautiful-dnd';

const useStyles = makeStyles({

    customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;


const Container1 = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

/*const initialData = {
    id: "column-1",
    taskIndices: ["task-1", "task-2", "task-3", "task-4"],
    tasks: {
        "task-1": { id: "task-1", content: "Task 1" },
        "task-2": { id: "task-2", content: "Task 2" },
        "task-3": { id: "task-3", content: "Task 3" },
        "task-4": { id: "task-4", content: "Task 4" }
    }
};*/

const initialData = {
    id: "column-1",
    taskIndices: [],
    tasks: {}
};

export default function ModalInsertar() {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [botonControlSave, setBotonControl] = useState(true);
    const [nombreActual, setNombreActual] = useState('');
    const [codeActual, setCodeActual] = useState('');
    const [requirementSelect, setRequirementSelect] = useState('')
    const [requerimentsAplicables, setRequerimentsAplicables] = useState([])

    const [tipoValorExtraRequerimiento, setTipoValorExtraRequerimiento] = useState('')
    const [valorListaRequerimiento, setValorListaRequerimiento] = useState('')
    const [vectorListaRequerimiento, setVectorListaRequerimiento] = useState([])

    const [modoCalculoRequerimiento, setModoCalculoRequerimiento] = useState(1);
    const [valorObjetivoRequerimiento, setValorObjetivoRequerimiento] = useState(1);
    const [diferenciaFechaRequerimiento, setDiferenciaFechaRequerimiento] = useState(0);

    const appListAPI = useSelector(state => state.fuse.gestionAplicationComponent.appListAPI)
    const visbilidadModalInsertar = useSelector(state => state.fuse.gestionAplicationComponent.visbilidadModalInsertarGrupo)
    const modoDialogAplication = useSelector(state => state.fuse.gestionAplicationComponent.modoDialogoGrupo)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.gestionAplicationComponent.filaSeleccionadaGridGrupo)
    const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
    const listGruposAPI = useSelector(state => state.fuse.gestionAplicationComponent.listGruposAPI)
    const listRequerimentsWithDetails = useSelector(state => state.fuse.gestionAplicationComponent.listRequerimentsWithDetails)
    const newRequerimentsWithDetails = useSelector(state => state.fuse.gestionAplicationComponent.newRequerimentsWithDetails)

    const insertarNewAplicationAPI = (valor) => dispatch(insertarNewAppAPIAction(valor))
    const putAplicationAPI = (valor, datos) => dispatch(putAppAPIAction(valor, datos))
    const cambiarVisibilidadModalInsertarGrupoAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarGrupoAPIAction(valor, modo))
    const mostrarUserAPI = (valor) => dispatch(mostrarUserAPIAction())
    const insertarNewGroupAppAPI = (data) => dispatch(insertarNewGroupAppAPIAction(data))
    const putGroupRequerimentsAPI = (idGroup, data) => dispatch(putGroupRequerimentsAPIAction(idGroup, data))
    const insertarRequerimentsWithDetailsAPI = (data) => dispatch(insertarRequerimentsWithDetailsAPIAction(data))
    const cambiarEstadoValuesRequerimentsAPI = (nombreEstado, valorNuevo) => dispatch(cambiarEstadoValuesRequerimentsAPIAction(nombreEstado, valorNuevo))

    useEffect(() => {
        mostrarUserAPI()
    }, [])

    useEffect(() => {
        if (requirementSelect != '' && requirementSelect != undefined && requirementSelect != null) {
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

    }, [requirementSelect])

    useEffect(() => {

        if (visbilidadModalInsertar == true) {
            if (modoDialogAplication == "nuevo") {
                setNombreActual('')
                setCodeActual('')
                setRequerimentsAplicables([])
            }

            if (modoDialogAplication == "editar") {
                let grupoSeleccionado = listGruposAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]

                if (grupoSeleccionado != undefined) {

                    setNombreActual(grupoSeleccionado.name)
                    setCodeActual(grupoSeleccionado.code)

                    let vectorSeleccionados = []
                    for (let itemRequeriment in grupoSeleccionado.aplicaciones) {
                        let appSelected = listRequerimentsWithDetails.filter(busq => busq.id == grupoSeleccionado.aplicaciones[itemRequeriment])[0]
                        if (appSelected != undefined) {
                            vectorSeleccionados.push(appSelected)
                        }
                    }

                    setRequerimentsAplicables(vectorSeleccionados)

                }
            }
        }


    }, [visbilidadModalInsertar, modoDialogAplication])

    useEffect(() => {
        if (nombreActual.trim() != '' && codeActual.trim() != '') {
            setBotonControl(false)
        } else {
            setBotonControl(true)
        }
    })

    function funcionAplication() {

        let vectorIDRequerimientos = []
        for (let elementoRequerimiento in requerimentsAplicables) {
            vectorIDRequerimientos.push(requerimentsAplicables[elementoRequerimiento].id)
        }

        if (modoDialogAplication == "nuevo") {
            insertarNewGroupAppAPI({
                name: nombreActual,
                code: codeActual,
                aplicaciones: vectorIDRequerimientos,
            })
        }

        if (modoDialogAplication == "editar") {
            putGroupRequerimentsAPI(filaSeleccionadaGrid, {
                name: nombreActual,
                code: codeActual,
                aplicaciones: vectorIDRequerimientos,
            })
        }
    }

    function resetValue() {
        setRequirementSelect('')
        setTipoValorExtraRequerimiento('')
        setValorListaRequerimiento('')
        setVectorListaRequerimiento([])
        setModoCalculoRequerimiento(1)
        setValorObjetivoRequerimiento(1)
    }

    useEffect(() => {
        //UNA VEZ QUE SE CREA EL REQUISITO, SE AÑADE AL VECTOR DEL GRUPO

        if (newRequerimentsWithDetails != "") {

            let vetorCopia = requerimentsAplicables

            vetorCopia.push(newRequerimentsWithDetails)

            setRequerimentsAplicables(vetorCopia)

            cambiarEstadoValuesRequerimentsAPI("newRequerimentsWithDetails", "")

            resetValue()
        }

    }, [newRequerimentsWithDetails])

    function nuevoRequerimiento() {

        //CREACION DEL NUEVO REQUERIMIENTO CON DETALLES
        insertarRequerimentsWithDetailsAPI({
            requeriment: requirementSelect.id,
            valor_asignado: requirementSelect.tipo_valor == "List" ? valorListaRequerimiento : '',
            valor_comparacion: requirementSelect.tipo_valor == "Number" ? valorObjetivoRequerimiento : undefined,
            operacion_logica: requirementSelect.tipo_valor == "Number" || requirementSelect.tipo_valor == "List" ? modoCalculoRequerimiento : undefined,
            diferencia_fecha: requirementSelect.tipo_valor == "Date" ? diferenciaFechaRequerimiento : undefined
        })

    }

    function deleteItemRequerimiento(itemDelete){
        const newRequerimentsAplicables = [...requerimentsAplicables];

        const currentIndex = newRequerimentsAplicables.indexOf(itemDelete);
        newRequerimentsAplicables.splice(currentIndex, 1)

        setRequerimentsAplicables(newRequerimentsAplicables)
    }

    function cadenaDetalles(itemRequerimiento) {
        if (itemRequerimiento['tipo_valor'] == "List") {
            switch (itemRequerimiento['operacion_logica']) {
                case 1:
                    return 'List: Result lower than the value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 2:
                    return 'List: Result less than or equal to the value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 3:
                    return 'List: Result same as value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 4:
                    return 'List: Result greater than or equal to the value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 5:
                    return 'List: Result greater than the value: ' + itemRequerimiento['valor_asignado']
                    break;
                case 6:
                    return 'List: Result different from the value: ' + itemRequerimiento['valor_asignado']
                    break;
            }
        }
        if (itemRequerimiento['tipo_valor'] == "Number") {
            switch (itemRequerimiento['operacion_logica']) {
                case 1:
                    return 'Number: Result lower than the value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 2:
                    return 'Number: Result less than or equal to the value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 3:
                    return 'Number: Result same as value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 4:
                    return 'Number: Result greater than or equal to the value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 5:
                    return 'Number: Result greater than the value: ' + itemRequerimiento['valor_comparacion']
                    break;
                case 6:
                    return 'Number: Result different from the value: ' + itemRequerimiento['valor_comparacion']
                    break;
            }
        }
        if (itemRequerimiento['tipo_valor'] == "Date") {
            return 'Date requirement(' + itemRequerimiento['diferencia_fecha'] + ")"
        }
        if (itemRequerimiento['tipo_valor'] == null) {
            return 'Simple requirement'
        }
    }

    return (
        <>
            <Dialog open={visbilidadModalInsertar} fullWidth maxWidth='lg'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    {modoDialogAplication == 'nuevo' ? "New Requirement groups" : "Edit Requirement groups"}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} columns={10}>
                        <Grid item xs={4}>
                            <Grid container spacing={2} columns={8}>
                                <Grid item xs={8}>
                                    <TextField
                                        label="Name"
                                        id="nombre"
                                        value={nombreActual}
                                        size="small"
                                        fullWidth
                                        onChange={e => setNombreActual(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={8}>
                                    <TextField
                                        id="code"
                                        label="Code"
                                        value={codeActual}
                                        size="small"
                                        fullWidth
                                        onChange={e => setCodeActual(e.target.value)}
                                    />


                                </Grid>

                                <Grid item xs={8}>
                                    <Autocomplete
                                        id="tags-outlined"
                                        groupBy={(option) => option.type}
                                        options={appListAPI}
                                        value={requirementSelect}
                                        getOptionLabel={(option) => option != '' ? option.type + " - " + option.name : ''}
                                        getOptionDisabled={(option) =>
                                            !!requerimentsAplicables.find(element => element.name === option.name)
                                        }
                                        onChange={(event, value) => setRequirementSelect(value)}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Requirements"
                                                placeholder="Requirements"
                                                size="small"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                {/*<Grid item xs={8}>
                                    <Autocomplete
                                        id="tags-outlined"
                                        groupBy={(option) => option.requeriment_type}
                                        options={listRequerimentsWithDetails}
                                        value={requirementSelect}
                                        getOptionLabel={(option) => option != '' ? option.requeriment_type + " - " + option.requeriment_name : ''}
                                        getOptionDisabled={(option) =>
                                            !!requerimentsAplicables.find(element => element.requeriment_name === option.requeriment_name)
                                        }
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
                                        </Grid>*/}


                                <Grid item xs={8} style={tipoValorExtraRequerimiento == "Number" ? { display: '' } : { display: 'none' }}>

                                    {/*SI SE ELIGE NUMERO */}

                                    <TextField
                                        type="number"
                                        shrink
                                        label="Value"
                                        id="objetive"
                                        placeholder="Examples: 4"
                                        value={valorObjetivoRequerimiento}
                                        size="small"
                                        fullWidth
                                        onChange={e => setValorObjetivoRequerimiento(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={8} style={tipoValorExtraRequerimiento == "Date" ? { display: '' } : { display: 'none' }}>

                                    {/*SI SE ELIGE NUMERO */}

                                    <TextField
                                        type="number"
                                        shrink
                                        label="Date difference"
                                        id="objetive"
                                        placeholder="Examples: -5, 30"
                                        value={diferenciaFechaRequerimiento}
                                        size="small"
                                        sx={{ m: 1, width: '50ch' }}
                                        onChange={e => setDiferenciaFechaRequerimiento(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={8} style={tipoValorExtraRequerimiento == "Number" || tipoValorExtraRequerimiento == "List" ? { display: '' } : { display: 'none' }}>

                                    <FormControl variant="outlined" size="small" fullWidth>
                                        <InputLabel id="label-select-risk-management">Calculation mode</InputLabel>
                                        <Select
                                            labelId="label-select-detection"
                                            id="calculationMode"
                                            label="Calculation mode"
                                            onChange={e => { setModoCalculoRequerimiento(e.target.value); }}
                                            value={modoCalculoRequerimiento}

                                        >
                                            <MenuItem value={1}>Result lower than target the value.</MenuItem>
                                            <MenuItem value={2}>Result less than or equal to the value.</MenuItem>
                                            <MenuItem value={3}>Result same as value.</MenuItem>
                                            <MenuItem value={4}>Result greater than or equal to the value.</MenuItem>
                                            <MenuItem value={5}>Result greater than the value.</MenuItem>
                                            <MenuItem value={6}>Result different from the value.</MenuItem>

                                        </Select>
                                    </FormControl>


                                </Grid>

                                <Grid item xs={8}>
                                    <Button variant="outlined" size="small" fullWidth disabled={requirementSelect == '' ? true : false} onClick={() => { nuevoRequerimiento() }}>Assign</Button>
                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid item xs={5}>
                            <div style={{ width: '100%', textAlign: 'center', marginBottom: '2%' }}>
                                <span className="font-semibold">
                                    Requirements in the group
                                    <Divider style={{ width: '100%' }} />
                                </span>
                            </div>
                            {requerimentsAplicables.map((nomModulo) => {
                                return (
                                    <ListItem
                                        className='shadow-lg' // : 'shadow', 'px-40 py-12 group')}
                                        sx={{ bgcolor: 'background.paper' }}
                                        button
                                    >
                                        <ListItemText classes={{ root: 'm-0', primary: 'truncate' }}
                                            primary={nomModulo['requeriment_code'] + " - " + nomModulo['requeriment_name']}

                                            secondary={
                                                <div>
                                                    <div style={{ display: 'inline' }}>
                                                        {nomModulo['requeriment_code'] != undefined ? nomModulo['requeriment_name'] + ' — ' : ''}
                                                    </div>
                                                    <div style={{ display: 'inline' }}>
                                                        {cadenaDetalles(nomModulo)}
                                                    </div>
                                                </div>
                                            }

                                        />
                                        <ListItemIcon className="min-w-40 -ml-10 mr-8">
                                            <IconButton onClick={(ev) => {
                                                deleteItemRequerimiento(nomModulo)
                                            }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemIcon>


                                    </ListItem>
                                );
                            })}
                        </Grid>
                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarGrupoAPI(false, '') }}>Close</Button>
                    <Button variant="outlined" disabled={botonControlSave} onClick={() => { funcionAplication(), cambiarVisibilidadModalInsertarGrupoAPI(false, '') }}> Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

