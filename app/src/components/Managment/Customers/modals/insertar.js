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

import { useDispatch, useSelector } from 'react-redux'

import {
    mostrarCustomerAPIAction,
    cambiarValorSeleccionAction,
    mostrarCustomerPermisosAPIAction,
    cambiarVisibilidadModalInsertarCustomerAPI,
    insertarNewCustomerAPIAction,
    putCustomerAPIAction
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
    const [nombreActual, setNombreActual] = useState('');
    const [codeActual, setCodeActual] = useState('');
    const [webActual, setWebActual] = useState('');

    const visibilidadNewCustomer = useSelector(state => state.fuse.customerComponent.visibilidadNewCustomer)
    const modoDialogCustomer = useSelector(state => state.fuse.customerComponent.modoDialogCustomer)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.customerComponent.filaSeleccionadaGrid)
    const customerListAPI = useSelector(state => state.fuse.customerComponent.customerListAPI)

    const cambiarVisibilidadModalInsertarUser = (valor, modoDialogUser) => dispatch(cambiarVisibilidadModalInsertarCustomerAPI(valor, modoDialogUser))
    const insertarNewCustomerAPI = (valor) => dispatch(insertarNewCustomerAPIAction(valor))
    const putCustomerAPI = (valor, datos) => dispatch(putCustomerAPIAction(valor, datos))

    useEffect(() => {

        if (modoDialogCustomer == "nuevo") {
            setNombreActual('')
            setCodeActual('')
            setWebActual('')
        }

        if (modoDialogCustomer == "editar") {

            let customerSelected = customerListAPI.filter(busq => busq.id == filaSeleccionadaGrid)[0]

            if(customerSelected != undefined){
                setNombreActual(customerSelected.name)
                setCodeActual(customerSelected.code)
                setWebActual(customerSelected.sitio_web)
            }
        }
    
    }, [modoDialogCustomer])

    useEffect(() => {
        if (nombreActual.trim() != '' && codeActual.trim() != '') {
            setBotonControl(false)
        } else {
            setBotonControl(true)
        }
    })

    function funcionCustomer() {
        if (modoDialogCustomer == "nuevo") {
            insertarNewCustomerAPI({
                name: nombreActual,
                code: codeActual,
                sitio_web: webActual,
                active: true
            })
        }

        if (modoDialogCustomer == "editar") {
            putCustomerAPI(filaSeleccionadaGrid, {
                name: nombreActual,
                code: codeActual,
                sitio_web: webActual,
            })
        }
    }

    return (
        <>
            <Dialog open={visibilidadNewCustomer} fullWidth maxWidth='md'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    {modoDialogCustomer == 'nuevo' ? "New Customer" : "Edit Customer"}
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

                            <TextField
                                id="webSite"
                                label="Web Site"
                                value={webActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setWebActual(e.target.value)}
                            />

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarUser(false, '') }}>Close</Button>
                    <Button variant="outlined" disabled={botonControlSave} onClick={() => { funcionCustomer(), cambiarVisibilidadModalInsertarUser(false, '') }}> Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

