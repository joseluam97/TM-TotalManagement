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
    insertarNewLocationCustomerAPIAction,
    putCustomerLocationAPIAction,
    putCustomerAPIAction,
    cambiarVisibilidadModalGestionLocationsAPIAction,
    mostrarLocationCustomerAPIAction,
    cambiarVisibilidadModalLocationsAPIAction
} from '../store/actions'

const useStyles = makeStyles({

    customDialogTitle: {
        backgroundColor: 'rgb(0, 0, 0)',
marginLeft: '3px',
marginRight: '3px',
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

export default function ModalGestionLocation() {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [botonControlSave, setBotonControl] = useState(true);
    
    const [nombreActual, setNombreActual] = useState('');
    const [codeActual, setCodeActual] = useState('');
    const [customerSelect, setCustomerSelect] = useState('');
    const [direccionActual , setDireccionActual ] = useState('');
    const [latitudActual, setLatitudActual] = useState('');
    const [longuitudActual, setLongitudActual] = useState('');

    const visibilidadGestionLocationCustomer = useSelector(state => state.fuse.customerComponent.visibilidadGestionLocationCustomer)
    const modoDialogGestionLocations = useSelector(state => state.fuse.customerComponent.modoDialogGestionLocations)
    const filaSeleccionadaGridLocation = useSelector(state => state.fuse.customerComponent.filaSeleccionadaGridLocation)
    const customerListAPI = useSelector(state => state.fuse.customerComponent.customerListAPI)
    const locationCustomerListAPI = useSelector(state => state.fuse.customerComponent.locationCustomerListAPI)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.customerComponent.filaSeleccionadaGrid)

    const insertarNewLocationCustomerAPI = (valor) => dispatch(insertarNewLocationCustomerAPIAction(valor))
    const putCustomerLocationAPI = (valor, datos) => dispatch(putCustomerLocationAPIAction(valor, datos))
    const cambiarVisibilidadModalGestionLocationsAPI = (valor, datos) => dispatch(cambiarVisibilidadModalGestionLocationsAPIAction(valor, datos))
    const mostrarLocationCustomerAPI = (idCustomer) => dispatch(mostrarLocationCustomerAPIAction(idCustomer))
    const cambiarVisibilidadModalLocationsAPI = (valor) => dispatch(cambiarVisibilidadModalLocationsAPIAction(valor))

    useEffect(() => {
        if (customerSelect != '' && customerSelect != undefined && nombreActual.trim() != '' && codeActual.trim() != '' &&
        direccionActual.trim() != '' && latitudActual.trim() != '' && longuitudActual.trim() != '') {
            setBotonControl(false)
        } else {
            setBotonControl(true)
        }
    })

    useEffect(() => {
        mostrarLocationCustomerAPI(filaSeleccionadaGrid)
    }, [visibilidadGestionLocationCustomer])

    useEffect(() => {

        if (modoDialogGestionLocations == "nuevo") {
            let customerSelect = customerListAPI.filter(elemento => elemento.id == filaSeleccionadaGrid)[0]
            setNombreActual('')
            setCodeActual('')
            setCustomerSelect(customerSelect)
            setDireccionActual('')
            setLatitudActual('')
            setLongitudActual('')
        }

        if (modoDialogGestionLocations == "editar") {

            let locationCustomerSelected = locationCustomerListAPI.filter(busq => busq.id == filaSeleccionadaGridLocation)[0]

            let customerSelected = customerListAPI.filter(busq => busq.id == locationCustomerSelected.id_customer)[0]

            if (locationCustomerSelected != undefined) {
                setNombreActual(locationCustomerSelected.name)
                setCodeActual(locationCustomerSelected.code)
                setCustomerSelect(customerSelected)
                setDireccionActual(locationCustomerSelected.direccion)
                setLatitudActual(locationCustomerSelected.latitud)
                setLongitudActual(locationCustomerSelected.longuitud)
            }
        }

    }, [modoDialogGestionLocations])

    function funcionCustomer() {
        if (modoDialogGestionLocations == "nuevo") {
            insertarNewLocationCustomerAPI({
                id_customer: customerSelect.id,
                name: nombreActual,
                code: codeActual,
                direccion: direccionActual,
                latitud: latitudActual,
                longuitud: longuitudActual,
                active: true
            })
        }

        if (modoDialogGestionLocations == "editar") {
            putCustomerLocationAPI(filaSeleccionadaGridLocation, {
                id_customer: customerSelect.id,
                name: nombreActual,
                code: codeActual,
                direccion: direccionActual,
                latitud: latitudActual,
                longuitud: longuitudActual,
                active: true
            })
        }

        cambiarVisibilidadModalLocationsAPI(true);
    }


    return (
        <>
            <Dialog open={visibilidadGestionLocationCustomer} fullWidth maxWidth='lg'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    {modoDialogGestionLocations == 'nuevo' ? "New Location Customer" : "Edit Location Customer"}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            <Autocomplete
                                id="tags-outlined"
                                options={customerListAPI}
                                disabled={true}
                                value={customerSelect != '' ? customerSelect : ''}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => setCustomerSelect(value)}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Customer"
                                        placeholder="Customer"
                                        size="small"
                                        sx={{ m: 1, width: '37ch' }}
                                        onChange={e => { setCustomerSelect(e); }}
                                    />
                                )}
                            />
                        </Grid>
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
                                id="direccion"
                                label="Direction"
                                value={direccionActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setDireccionActual(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={8}>

                            <TextField
                                id="latitud"
                                label="Latitude"
                                value={latitudActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setLatitudActual(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={8}>

                            <TextField
                                id="longitude"
                                label="Longitude"
                                value={longuitudActual}
                                size="small"
                                sx={{ m: 1, width: '37ch' }}
                                onChange={e => setLongitudActual(e.target.value)}
                            />

                        </Grid>

                    </Grid>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { cambiarVisibilidadModalGestionLocationsAPI(false, ''), cambiarVisibilidadModalLocationsAPI(true) }}>Close</Button>
                    <Button variant="outlined" disabled={botonControlSave} onClick={() => { funcionCustomer(), cambiarVisibilidadModalGestionLocationsAPI(false, '') }}> Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

