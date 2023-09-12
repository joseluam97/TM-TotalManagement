import { useEffect, useState, useRef } from 'react'
import * as React from 'react';

//DataGrid importaciones


import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { useDispatch, useSelector } from 'react-redux'

import {
    insertarNewGroupAPIAction,
    putGroupAPIAction,
    mostrarGroupAPIAction,
    cambiarVisibilidadModalInsertarAPIAction
} from '../store/actions'

import {
    mostrarUserAPIAction
} from '../../Users/store/actions'


const useStyles = makeStyles({

    customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function intersectionPermisos(a,b){
    let vectorBReducer = [...new Set(b.map((item) => item.name))];

    let matchedCategories = a.filter(i => vectorBReducer.indexOf(i.name) < 0);

    return matchedCategories
    
}

export default function ModalInsertar() {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [botonControlSave, setBotonControl] = useState(true);
    const [nombreActual, setNombreActual] = useState('');
    const [busquedaIzquierda, setBusquedaIzquierda] = useState('');
    const [busquedaDerecha, setBusquedaDerecha] = useState('');

    const groupListAPI = useSelector(state => state.fuse.permisosComponente.groupListAPI)
    const visbilidadModalInsertar = useSelector(state => state.fuse.permisosComponente.visbilidadModalInsertar)
    const modoDialogAplication = useSelector(state => state.fuse.permisosComponente.modoDialogo)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.permisosComponente.filaSeleccionadaGrid)
    
    const permisosListAPI = useSelector(state => state.fuse.permisosComponente.permisosListAPI)
    const allPermisosListAPI = useSelector(state => state.fuse.permisosComponente.allPermisosListAPI)

    const insertarNewGroupAPI = (valor) => dispatch(insertarNewGroupAPIAction(valor))
    const putGroupAPI = (valor, datos) => dispatch(putGroupAPIAction(valor, datos))
    const cambiarVisibilidadModalInsertarAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valor, modo))
    const mostrarUserAPI = (valor) => dispatch(mostrarUserAPIAction())

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    useEffect(() => {

    }, [])

    useEffect(() => {

        if (modoDialogAplication == "nuevo") {
            setNombreActual('')
            setLeft(allPermisosListAPI)
            setRight([])
        }

        if (modoDialogAplication == "editar") {
            let grupoSelected = groupListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]
            if (grupoSelected != undefined) {
                setNombreActual(grupoSelected.name)
            }

        }

    }, [modoDialogAplication])

    useEffect(() => {
        if (nombreActual.trim() != '') {
            setBotonControl(false)
        } else {
            setBotonControl(true)
        }
    })

    function funcionAplication() {

        if (modoDialogAplication == "nuevo") {
            insertarNewGroupAPI({
                name: nombreActual,
                permissions: right
            })
        }

        if (modoDialogAplication == "editar") {
            putGroupAPI(filaSeleccionadaGrid, {
                name: nombreActual,
                permissions: right
            })
        }
    }

    useEffect(() => {
        if(busquedaIzquierda != ""){
            let intersectionResult = intersectionPermisos(allPermisosListAPI, permisosListAPI)
            let resultadoBusqueda = intersectionResult.filter(elemento => elemento.name.includes(busquedaIzquierda))
            setLeft(resultadoBusqueda)
        }
        else{
            let intersectionResult = intersectionPermisos(allPermisosListAPI, permisosListAPI)
            setLeft(intersectionResult)
        }
    }, [busquedaIzquierda])

    useEffect(() => {
        if(busquedaDerecha != ""){
            let resultadoBusqueda = permisosListAPI.filter(elemento => elemento.name.includes(busquedaDerecha))
            setRight(resultadoBusqueda)
        }
        else{
            setRight(permisosListAPI)
        }
    }, [busquedaDerecha])

    useEffect(() => {
        setRight(permisosListAPI)
    }, [permisosListAPI])

    useEffect(() => {
        if(allPermisosListAPI.length != 0 && permisosListAPI.length != 0){
            let intersectionResult = intersectionPermisos(allPermisosListAPI, permisosListAPI)
            setLeft(intersectionResult)
        }
        
    }, [allPermisosListAPI, permisosListAPI])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (items) => (
        <Paper fullWidth sx={{ height: 250, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.id}-label`;

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name}/> 
                            {/*primary={`List item ${value + 1}`} />*/}
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <>
            <Dialog open={visbilidadModalInsertar} fullWidth maxWidth='lg'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    {modoDialogAplication == 'nuevo' ? "New Group" : "Edit Group"}
                </DialogTitle>

                <DialogContent>
                    <Grid style={{ marginTop: '1px' }} container spacing={2} columns={15} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>

                            <TextField
                                label="Name"
                                id="nombre"
                                value={nombreActual}
                                size="small"
                                fullWidth
                                onChange={e => setNombreActual(e.target.value)}
                            />

                        </Grid>

                    </Grid>


                    {/*SELECTOR DE PERMISOS */}
                    <Grid style={{ marginTop: '1px' }} container spacing={2} columns={15} justifyContent="center" alignItems="center">
                        <Grid item xs={5}>
                            <TextField
                                label="Search"
                                id="nombre"
                                value={busquedaIzquierda}
                                size="small"
                                fullWidth
                                onChange={e => setBusquedaIzquierda(e.target.value)}
                            />
                            {customList(left)}
                            <p><b>Total:</b> {left.length} permits</p>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container direction="column" alignItems="center">
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    sx={{ my: 0.5 }}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Search"
                                id="nombre"
                                value={busquedaDerecha}
                                size="small"
                                fullWidth
                                onChange={e => setBusquedaDerecha(e.target.value)}
                            />
                            {customList(right)}
                            <p><b>Total:</b> {right.length} permits</p>
                        </Grid>
                    </Grid>
                    {/*FIN SELECTOR DE PERMISOS */}

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarAPI(false, '') }}>Close</Button>
                    <Button variant="outlined" disabled={botonControlSave} onClick={() => { funcionAplication(), cambiarVisibilidadModalInsertarAPI(false, '') }}> Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

