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


    return (
        <>
            <Dialog open={false} fullWidth maxWidth='md'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    titulo
                </DialogTitle>

                <DialogContent>

                </DialogContent>

                <DialogActions>
                    {/*<Button variant="outlined" onClick={() => { cambiarVisibilidadModalInsertarCategory(false, '') }}>Close</Button>
                    <Button variant="outlined" disabled={botonControlSave} onClick={() => { funcionCategory(), cambiarVisibilidadModalInsertarCategory(false, '') }}> Save</Button>
    */}
                    </DialogActions>
            </Dialog>
        </>
    );

}

