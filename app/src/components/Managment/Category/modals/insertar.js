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
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from 'react-redux'

import {
    cambiarVisibilidadModalInsertarCategoryAPI,
    insertarNewCategoryAPIAction,
    putCategoryAPIAction,
    mostrarCategoryAPIAction,
    cambiarValorSeleccionAction,
    mostrarTiposUnicosAPIAction
} from '../store/actions'

const useStyles = makeStyles({

    customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

export default function ModalInsertar() {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [botonControlSave, setBotonControl] = useState(true);
    const [newType, setNewType] = useState(false);
    const [codigoActual, setCodigoActual] = useState('');
    const [tituloActual, setTituloActual] = useState('');
    const [definicionActual, setDefinicionActual] = useState('');
    const [tipoActual, setTipoActual] = useState('');

    const visibilidadNewCategory = useSelector(state => state.fuse.categoriaComponent.visibilidadNewCategory)
    const modoDialogCategoria = useSelector(state => state.fuse.categoriaComponent.modoDialogCategoria)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.categoriaComponent.filaSeleccionadaGrid)
    const tipoCategoriasAPI = useSelector(state => state.fuse.categoriaComponent.tipoCategoriasAPI)
    const categoriaListAPI = useSelector(state => state.fuse.categoriaComponent.categoriaListAPI)

    const cambiarVisibilidadModalInsertarCategory = (valor, modoDialogCategoria) => dispatch(cambiarVisibilidadModalInsertarCategoryAPI(valor, modoDialogCategoria))
    const insertarNewCategoryAPI = (valor) => dispatch(insertarNewCategoryAPIAction(valor))
    const putCategoryAPI = (valor, datos) => dispatch(putCategoryAPIAction(valor, datos))
    const mostrarTiposUnicosAPI = () => dispatch(mostrarTiposUnicosAPIAction())

    useEffect(() => {

        mostrarTiposUnicosAPI()

        if (modoDialogCategoria == "nuevo") {
            setCodigoActual('')
            setTituloActual('')
            setDefinicionActual('')
            setTipoActual('')
        }

        if (modoDialogCategoria == "editar") {

            let categoriaSelected = categoriaListAPI.filter(busq => busq.id == filaSeleccionadaGrid)[0]

            if (categoriaSelected != undefined) {
                setCodigoActual(categoriaSelected.codigo)
                setTituloActual(categoriaSelected.titulo)
                setDefinicionActual(categoriaSelected.definicion)
                setTipoActual(categoriaSelected.tipo)
            }
        }

    }, [modoDialogCategoria])

    useEffect(() => {
        if (codigoActual.trim() != '' && tituloActual.trim() != '' && tipoActual.trim() != '') {
            setBotonControl(false)
        } else {
            setBotonControl(true)
        }
    })

    function funcionCategory() {
        if (modoDialogCategoria == "nuevo") {
            insertarNewCategoryAPI({
                codigo: codigoActual,
                titulo: tituloActual,
                definicion: definicionActual,
                tipo: tipoActual,
                active: true
            })
        }

        if (modoDialogCategoria == "editar") {
            putCategoryAPI(filaSeleccionadaGrid, {
                codigo: codigoActual,
                titulo: tituloActual,
                definicion: definicionActual,
                tipo: tipoActual,
            })
        }
    }

    return (
        <>
            <Dialog open={visibilidadNewCategory} fullWidth maxWidth='md'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    {modoDialogCategoria == 'nuevo' ? "New Category" : "Edit Category"}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>

                            <TextField
                                label="Code"
                                id="code"
                                value={codigoActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setCodigoActual(e.target.value)}
                            />

                        </Grid>
                        <Grid item xs={8}>

                            <TextField
                                id="title"
                                label="Title"
                                value={tituloActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setTituloActual(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={8}>

                            <TextField
                                id="definition"
                                label="Definition"
                                value={definicionActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setDefinicionActual(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={8}>
                            <FormControl variant="standard" fullWidth>
                                <Autocomplete
                                    id="tipoCategoria"
                                    value={tipoActual}
                                    options={tipoCategoriasAPI}
                                    getOptionLabel={(option) => option}
                                    onChange={(event, value1) => setTipoActual(value1)}
                                    fullWidth
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
                            </FormControl>
                        </Grid>

                        <Grid item xs={8} style={{ display: newType == true ? 'block' : 'none' }}>

                            <TextField
                                id="newType"
                                label="New Type"
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setTipoActual(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={8}>

                            <Button variant="outlined" onClick={() =>{
                                if(newType == true){
                                    setNewType(false)
                                }
                                else{
                                    setNewType(true)
                                    setTipoActual('')
                                }
                            }}>{newType == false ? 'Create new type' : 'Cancel creation'}</Button>

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarCategory(false, '') }}>Close</Button>
                    <Button variant="outlined" disabled={botonControlSave} onClick={() => { funcionCategory(), cambiarVisibilidadModalInsertarCategory(false, '') }}> Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

