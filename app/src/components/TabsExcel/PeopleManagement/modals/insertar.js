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


//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import {getCookie} from 'app/js/generalFunctions'

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

export default function ModalInsertar(props) {

        const classes = useStyles();
        const dispatch = useDispatch()

        return (
                <>

                        <Dialog open="false" fullWidth maxWidth='md'>

                                <DialogTitle classes={{ root: classes.customDialogTitle }} >
                                        INSERTAR PERSON
                                </DialogTitle>
                                <DialogContent>
                                        <h1>Contenido</h1>
                                </DialogContent>
                                <DialogActions>

                                </DialogActions>

                        </Dialog>
                </>
        )
}

