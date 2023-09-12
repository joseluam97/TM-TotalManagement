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
import Task from "./task";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useDispatch, useSelector } from 'react-redux'

import {
    insertarNewAppAPIAction,
    putAppAPIAction,
    mostrarAppAPIAction,
    cambiarVisibilidadModalInsertarAPIAction,
    cambiarEstadoValuesRequerimentsAPIAction,
    comprobarItemListRequerimentBorrableAPIAction
} from '../store/actions'

import {
    mostrarUserAPIAction
} from '../../Users/store/actions'

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
    const [userSelect, setUserSelect] = useState('')
    const [tipoSelect, setTipoSelect] = useState('')
    const [newType, setNewType] = useState(false);
    const [tieneValorAdicional, setTieneValorAdicional] = useState(false);
    const [tipoValorActual, setTipoValorActual] = useState('');
    const [nuevoElementoLista, setNuevoElementoLista] = useState('');
    const [elementosLista, setElementosLista] = useState({});
    const [idItemDelete, setIdItemDelete] = useState('');

    const appListAPI = useSelector(state => state.fuse.gestionAplicationComponent.appListAPI)
    const visbilidadModalInsertar = useSelector(state => state.fuse.gestionAplicationComponent.visbilidadModalInsertar)
    const modoDialogAplication = useSelector(state => state.fuse.gestionAplicationComponent.modoDialogo)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.gestionAplicationComponent.filaSeleccionadaGrid)
    const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)
    const listTypesAppAPI = useSelector(state => state.fuse.gestionAplicationComponent.listTypesAppAPI)
    const esPosibleEliminarItemListRequeriment = useSelector(state => state.fuse.gestionAplicationComponent.esPosibleEliminarItemListRequeriment)

    const insertarNewAplicationAPI = (valor) => dispatch(insertarNewAppAPIAction(valor))
    const putAplicationAPI = (valor, datos) => dispatch(putAppAPIAction(valor, datos))
    const cambiarVisibilidadModalInsertarAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valor, modo))
    const mostrarUserAPI = (valor) => dispatch(mostrarUserAPIAction())
    const cambiarEstadoValuesRequerimentsAPI = (nombreEstado, valorNuevo) => dispatch(cambiarEstadoValuesRequerimentsAPIAction(nombreEstado, valorNuevo))
    const comprobarItemListRequerimentBorrableAPI = (idRequeriment, nameItem) => dispatch(comprobarItemListRequerimentBorrableAPIAction(idRequeriment, nameItem))

    useEffect(() => {
        mostrarUserAPI()
    }, [])

    useEffect(() => {
        if(tieneValorAdicional == false){
            setTipoValorActual('')
            let dataInicial = JSON.parse(JSON.stringify(initialData));
            setElementosLista(dataInicial)
        }
    }, [tieneValorAdicional])


    useEffect(() => {

        if (modoDialogAplication == "nuevo") {
            setNombreActual('')
            setCodeActual('')
            setUserSelect('')

            setTieneValorAdicional(false)
            setTipoValorActual('')
            let dataInicial = JSON.parse(JSON.stringify(initialData));
            setElementosLista(dataInicial)
        }

        if (modoDialogAplication == "editar") {

            let appSelected = appListAPI.filter(busq => busq.id == filaSeleccionadaGrid)[0]
            let userSelect = usersListAPI.filter(busq => busq.id == appSelected.responsable_aplication)[0]

            if (appSelected != undefined) {
                setNombreActual(appSelected.name)
                setCodeActual(appSelected.code)
                setUserSelect(userSelect)
                setTipoSelect(appSelected.type)

                setTieneValorAdicional(appSelected.tiene_valor)
                setTipoValorActual(appSelected.tipo_valor)

                if (appSelected.listado_opciones != "" && appSelected.listado_opciones != undefined && appSelected.listado_opciones != null) {

                    let dataInicial = JSON.parse(JSON.stringify(initialData));
                    let vectorElementos = appSelected.listado_opciones.split(',')

                    vectorElementos.map(elemento => {
                        let idElemento = elemento.replace(" ", "_")

                        dataInicial.taskIndices.push(idElemento)

                        dataInicial.tasks[idElemento] = { id: idElemento, content: elemento }
                    })

                    setElementosLista(dataInicial)
                }
                else{
                    let dataInicial = JSON.parse(JSON.stringify(initialData));
                    setElementosLista(dataInicial)
                }

            }
        }

    }, [modoDialogAplication])

    useEffect(() => {
        if (nombreActual.trim() != '' && codeActual.trim() != '' && userSelect != '' && userSelect != null && userSelect != undefined && tipoSelect != '' && tipoSelect != null && tipoSelect != undefined) {
            if(tieneValorAdicional == true){
                if(tipoValorActual != "" && (tipoValorActual != "List" || (tipoValorActual == "List" && elementosLista['taskIndices'].length != 0))){
                    setBotonControl(false)
                }
                else{
                    setBotonControl(true)
                }
            }
            else{
                setBotonControl(false)
            }
        } else {
            setBotonControl(true)
        }
    })

    function funcionAplication() {

        let elementosListaString = ""
        if (elementosLista.taskIndices.length != 0) {
            elementosLista.taskIndices.map(taskId => elementosLista.tasks[taskId]).map((task, index) => (
                elementosListaString = elementosListaString + task.content + ","
            ))
        }

        if (elementosListaString.length != 0) {
            elementosListaString = elementosListaString.substring(0, elementosListaString.length - 1)
        }

        if (modoDialogAplication == "nuevo") {
            insertarNewAplicationAPI({
                name: nombreActual,
                code: codeActual,
                responsable_aplication: userSelect.id,
                type: tipoSelect,

                tiene_valor: tieneValorAdicional,
                tipo_valor: tipoValorActual,
                listado_opciones: elementosListaString
            })
        }

        if (modoDialogAplication == "editar") {
            putAplicationAPI(filaSeleccionadaGrid, {
                name: nombreActual,
                code: codeActual,
                responsable_aplication: userSelect.id,
                type: tipoSelect,

                tiene_valor: tieneValorAdicional,
                tipo_valor: tipoValorActual,
                listado_opciones: elementosListaString
            })
        }
    }

    const nuevoItemLista = function () {
        //COMPROBAR QUE NO EXISTE UNO QUE SE LLAMA IGUAL
        let resultadoBusqueda = elementosLista.taskIndices.filter(elemento => elemento == nuevoElementoLista.replace(" ", "_"))[0]

        if (resultadoBusqueda != undefined) {
            dispatch(
                showMessage({
                    message: "There is already an option with the same name",
                    variant: "error"
                })
            )
        }
        else {
            //ASIGNACION
            let elementosCopia = elementosLista
            let idElemento = nuevoElementoLista.replace(" ", "_")

            elementosCopia.taskIndices.push(idElemento)

            elementosCopia.tasks[idElemento] = { id: idElemento, content: nuevoElementoLista }

            setElementosLista(elementosCopia)

        }

        setNuevoElementoLista('')

    }


    useEffect(() => {

        if(esPosibleEliminarItemListRequeriment != ""){
            if(esPosibleEliminarItemListRequeriment == "true"){

                let elementosCopia = JSON.parse(JSON.stringify(elementosLista));
                let idElemento = elementosCopia.taskIndices[idItemDelete]
                
                elementosCopia.taskIndices.splice(idItemDelete, 1)
                delete elementosCopia.tasks[idElemento];

                setElementosLista(elementosCopia)
                setNuevoElementoLista('')

                dispatch(
                    showMessage({
                        message: "Item successfully deleted",
                        variant: "success"
                    })
                )

            }
            if(esPosibleEliminarItemListRequeriment == "false"){
                dispatch(
                    showMessage({
                        message: "The element cannot be deleted as it is assigned to a user or a block.",
                        variant: "error"
                    })
                )
            }
            if(esPosibleEliminarItemListRequeriment == "error"){
                dispatch(
                    showMessage({
                        message: "An unexpected error has occurred",
                        variant: "error"
                    })
                )
            }

            //RESET VALUE esPosibleEliminarItemListRequeriment
            cambiarEstadoValuesRequerimentsAPI('esPosibleEliminarItemListRequeriment', '')
        }

    }, [esPosibleEliminarItemListRequeriment])


    const eliminarItemLista = function (indice) {

        //COMPROBACION DE QUE SE PUEDE ELIMINAR
        //ES DECIR QUE EN NINGUN CONTRACT USER O CONTRACT MODULO ESTA CONTEMPLADO
        let elementosCopia = JSON.parse(JSON.stringify(elementosLista));
        let idElemento = elementosCopia.taskIndices[indice]

        if(modoDialogAplication == "editar"){
            setIdItemDelete(indice)
            let nameItemList = elementosCopia.tasks[idElemento]['content']
            comprobarItemListRequerimentBorrableAPI(filaSeleccionadaGrid, nameItemList)
        }
        else{
            //CUANDO ES NUEVO NO SE NECESITA COMPROBAR SI YA ESTA ASIGNADO
            elementosCopia.taskIndices.splice(indice, 1)
            delete elementosCopia.tasks[idElemento];

            setElementosLista(elementosCopia)
            setNuevoElementoLista('')

            dispatch(
                showMessage({
                    message: "Item successfully deleted",
                    variant: "success"
                })
            )
        }
        

    }

    const onDragEnd = function (result) {

        const items = elementosLista;
        const [reorderedItem] = items.taskIndices.splice(result.source.index, 1);
        items.taskIndices.splice(result.destination.index, 0, reorderedItem);

        setElementosLista(items);
    }

    return (
        <>
            <Dialog open={visbilidadModalInsertar} fullWidth maxWidth='md'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    {modoDialogAplication == 'nuevo' ? "New Requeriments" : "Edit Requeriments"}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>

                            <TextField
                                label="Name"
                                id="nombre"
                                value={nombreActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setNombreActual(e.target.value)}
                            />

                        </Grid>
                        <Grid item xs={8}>

                            <TextField
                                id="code"
                                label="Code"
                                value={codeActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setCodeActual(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={8}>

                            <Autocomplete
                                id="tags-outlined"
                                value={userSelect != '' ? userSelect : ''}
                                options={usersListAPI}
                                getOptionLabel={(option) =>
                                    option != '' ? option.IDidentification + " - " + option.first_name + " " + option.last_name : ''
                                }
                                onChange={(event, value) => setUserSelect(value)}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Person in charge"
                                        placeholder="Person in charge"
                                        size="small"
                                        sx={{ m: 1, width: '37ch' }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={8}>

                            <Autocomplete
                                id="tags-outlined"
                                value={tipoSelect != '' ? tipoSelect : ''}
                                options={listTypesAppAPI}
                                getOptionLabel={(option) =>
                                    option != '' ? option : ''
                                }
                                onChange={(event, value) => setTipoSelect(value)}
                                filterSelectedOptions
                                disabled={newType == true ? true : false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Type"
                                        placeholder="Type"
                                        size="small"
                                        sx={{ m: 1, width: '37ch' }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={8} style={{ display: newType == true ? 'block' : 'none' }}>

                            <TextField
                                id="newType"
                                label="New Type"
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setTipoSelect(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={8}>

                            <Button variant="outlined" onClick={() => {
                                if (newType == true) {
                                    setNewType(false)
                                }
                                else {
                                    setNewType(true)
                                    setTipoSelect('')
                                }
                            }}>{newType == false ? 'Create new type' : 'Cancel creation'}</Button>

                        </Grid>

                        <div style={{ width: '100%', textAlign: 'center', marginTop: '15px', display: 'block' }}>
                            <span className="font-semibold">
                                Additional settings
                                <Divider style={{ width: '100%' }} />
                            </span>
                        </div>

                        <Grid item xs={8}>
                            <FormGroup variant="standard" sx={{ m: 1, width: '37ch' }} size="small">
                                <FormControlLabel control={
                                    <Checkbox
                                        checked={tieneValorAdicional}
                                        onChange={(event, value) => setTieneValorAdicional(value)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                } label="It has additional values" />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={8} style={{ display: tieneValorAdicional == true ? 'block' : 'none' }}>

                            <FormControl variant="outlined" size="small" fullWidth>
                                <InputLabel id="label-select-risk-management">Type of value</InputLabel>
                                <Select
                                    labelId="label-select-detection"
                                    id="frequency"
                                    label="Type of value"
                                    onChange={e => { setTipoValorActual(e.target.value); }}
                                    value={tipoValorActual}
                                >

                                    <MenuItem value={"List"}>List</MenuItem>
                                    <MenuItem value={"Date"}>Date</MenuItem>
                                    <MenuItem value={"Number"}>Number</MenuItem>

                                </Select>
                            </FormControl>

                        </Grid>

                        {/*SI SE ELIGE LISTA */}

                        <Grid item xs={8} style={{ display: tieneValorAdicional == true && tipoValorActual == "List" ? 'block' : 'none' }}>

                            <TextField
                                id="newType"
                                label="New list item"
                                size="small"
                                value={nuevoElementoLista}
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setNuevoElementoLista(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={8} style={{ display: tieneValorAdicional == true && tipoValorActual == "List" ? 'block' : 'none' }}>

                            <Button variant="outlined" disabled={nuevoElementoLista == "" ? true : false} onClick={() => {
                                nuevoItemLista()
                            }}>Create new item</Button>

                        </Grid>

                        <div style={{ width: '100%', textAlign: 'center', display: tieneValorAdicional == true && tipoValorActual == "List" ? 'block' : 'none' }}>

                            <Alert severity="info">
                                <AlertTitle>It should be noted that the current order is the order of importance, so that the first item in this list is the most relevant and the last item is the one with the least weight.</AlertTitle>
                            </Alert>

                            <DragDropContext onDragEnd={onDragEnd}>

                                <Droppable droppableId={elementosLista.id}>
                                    {provided => (
                                        <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                                            {elementosLista.taskIndices.map(taskId => elementosLista.tasks[taskId]).map((task, index) => (
                                                <>
                                                    <Grid container spacing={1} columns={10} justifyContent="center" alignItems="center">

                                                        <Grid item xs={9}>
                                                            <Task key={task.id} task={task} index={index} />
                                                        </Grid>

                                                        <Grid item xs={1}>
                                                            <IconButton onClick={() => {
                                                                eliminarItemLista(index)
                                                            }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>

                                                    </Grid>
                                                </>
                                            ))}
                                            {provided.placeholder}
                                        </TaskList>
                                    )}
                                </Droppable>

                            </DragDropContext>

                        </div>

                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarAPI(false, ''), setNewType(false) }}>Close</Button>
                    <Button variant="outlined" disabled={botonControlSave} onClick={() => { funcionAplication(), cambiarVisibilidadModalInsertarAPI(false, '') }}> Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

