//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
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
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import DeleteIcon from "@mui/icons-material/Delete";
import { showMessage } from 'app/store/fuse/messageSlice'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'

import {
    verModalDetallesRequerimientosUserAPIAction
} from '../store/actions'

import {
    getSesionActualAPIAction,
    mostrarUserAPIAction
} from '../../../../../Managment/Users/store/actions'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles({

    customDialogTitle: {
        backgroundColor: 'rgb(0, 0, 0)',
marginLeft: '3px',
marginRight: '3px',
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

export default function ModalDetallesUserAppTeam() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [itemSeleccionado, setItemSeleccionado] = useState('')

    const verModalDetallesRequisitosUsuario = useSelector(state => state.fuse.aplicationComponent.verModalDetallesRequisitosUsuario)
    const seleccionTableTeamRequeriment = useSelector(state => state.fuse.aplicationComponent.seleccionTableTeamRequeriment)

    const verModalDetallesRequerimientosUserAPI = (valor) => dispatch(verModalDetallesRequerimientosUserAPIAction(valor))

    useEffect(() => {
        if (seleccionTableTeamRequeriment != "") {
            setItemSeleccionado(seleccionTableTeamRequeriment)
        }
    }, [seleccionTableTeamRequeriment])

    /*
    InfoIcon
    CheckCircleIcon
    CancelIcon
    */

    function funcionRequerimentList(details, modo) {
        let limite_caracteres = 25
        let tituloBloque = details['aplication_code'] + " - " + details['aplication_name']
        return (
            <>
                <Tooltip title={tituloBloque} placement="top">
                    <ListItem
                        className='shadow-lg' // : 'shadow', 'px-40 py-12 group')}
                        sx={{ bgcolor: 'background.paper' }}
                        button
                    >
                        <ListItemText classes={{ root: 'm-0', primary: 'truncate' }}
                            primary={tituloBloque.length > limite_caracteres ? tituloBloque.substring(0, limite_caracteres) + "..." : tituloBloque}

                            secondary={
                                <div>
                                    <div style={{ display: 'inline' }}>
                                        {details['aplication_type']}{details['aplication_tiene_valor'] == true ? " - " + details['aplication_tipo_valor'] : ''}
                                    </div>
                                </div>
                            }
                        />
                        <ListItemIcon className="min-w-40 -ml-10 mr-8">
                            {modo == "check" ? <CheckCircleIcon /> : ''}
                            {modo == "incidents" ? <InfoIcon /> : ''}
                            {modo == "missing" ? <CancelIcon /> : ''}
                        </ListItemIcon>
                    </ListItem>
                </Tooltip>
            </>
        );
    }

    return (
        <>

            <Dialog open={verModalDetallesRequisitosUsuario} fullWidth maxWidth='md' onClose={() => { verModalDetallesRequerimientosUserAPI(false) }}>

                <DialogTitle classes={{ root: classes.customDialogTitle }} >
                    Details
                </DialogTitle>
                <DialogContent>
                    <div style={{ width: "100%" }}>
                        <Typography className="text-sm font-medium">User: {itemSeleccionado['user']}</Typography>
                    </div>
                    <div style={{ width: "100%" }}>
                        <Typography className="text-sm font-medium">{itemSeleccionado['correspondencia']}: {itemSeleccionado['bloque']}</Typography>
                    </div>
                    <div style={{ width: "100%" }}>
                        <div className="flex-auto grid grid-cols-4 gap-16 mt-0">

                            <div className="flex-auto grid grid-cols-5 gap-16 mt-12">
                                <div className="col-span-5 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
                                    <Typography className="text-3xl sm:text-2xl font-semibold leading-none tracking-tight">
                                        {itemSeleccionado['data']?.length > 0 ? ((itemSeleccionado['data']?.filter(item => item.cumplimiento === true).length / itemSeleccionado['data']?.length) * 100).toFixed(1) + "%" : 'N/A'}
                                    </Typography>
                                    <Typography className="mt-4 text-sm font-medium">Compliance</Typography>
                                </div>
                            </div>
                            <div className="flex-auto grid grid-cols-5 gap-16 mt-12">
                                <div className="col-span-5 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
                                    <Typography className="text-3xl sm:text-2xl font-semibold leading-none tracking-tight">
                                        {itemSeleccionado['data']?.filter(item => item.cumplimiento === true).length}
                                    </Typography>
                                    <Typography className="mt-4 text-sm font-medium">Requirements fulfilled</Typography>
                                </div>
                            </div>
                            <div className="flex-auto grid grid-cols-5 gap-16 mt-12">
                                <div className="col-span-5 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
                                    <Typography className="text-3xl sm:text-2xl font-semibold leading-none tracking-tight">
                                        {itemSeleccionado['data']?.filter(item => item.cumplimientoSinValorExtra === true).length}
                                    </Typography>
                                    <Typography className="mt-4 text-sm font-medium">Requirements with incidents</Typography>
                                </div>
                            </div>
                            <div className="flex-auto grid grid-cols-5 gap-16 mt-12">
                                <div className="col-span-5 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
                                    <Typography className="text-3xl sm:text-2xl font-semibold leading-none tracking-tight">
                                        {itemSeleccionado['data']?.filter(item => item.cumplimiento === false && item.cumplimientoSinValorExtra === false).length}
                                    </Typography>
                                    <Typography className="mt-4 text-sm font-medium">Missing requirements</Typography>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: "100%" }}>
                        <Grid container spacing={2}>
                            {/* COMPLETADOS */}
                            <Grid item xs={4}>
                                <Typography className="text-center items-center justify-center text-sm font-medium mt-5 mb-2">Requirements fulfilled</Typography>
                                {itemSeleccionado['data']?.filter(item => item.cumplimiento === true).length != 0 ?
                                    itemSeleccionado['data']?.filter(item => item.cumplimiento === true).map((nomModulo) => (
                                        funcionRequerimentList(nomModulo, "check")
                                    )) :
                                    <Typography className="text-center text-xs font-small m-2">There aren´t requeriments</Typography>
                                }
                            </Grid>
                            {/* INCIDENCIAS */}
                            <Grid item xs={4}>
                                <Typography className="text-center items-center justify-center text-sm font-medium mt-5 mb-2">Requirements with incidents</Typography>
                                {itemSeleccionado['data']?.filter(item => item.cumplimientoSinValorExtra === true).length != 0 ?
                                    itemSeleccionado['data']?.filter(item => item.cumplimientoSinValorExtra === true).map((nomModulo) => (
                                        funcionRequerimentList(nomModulo, "incidents")
                                    )) :
                                    <Typography className="text-center text-xs font-small m-2">There aren´t requeriments</Typography>
                                }
                            </Grid>
                            {/* FALTAN */}
                            <Grid item xs={4}>
                                <Typography className="text-center items-center justify-center text-sm font-medium mt-5 mb-2">Missing requirements</Typography>
                                {itemSeleccionado['data']?.filter(item => item.cumplimiento === false && item.cumplimientoSinValorExtra === false).length != 0 ?
                                    itemSeleccionado['data']?.filter(item => item.cumplimiento === false && item.cumplimientoSinValorExtra === false).map((nomModulo) => (
                                        funcionRequerimentList(nomModulo, "missing")
                                    )) :
                                    <Typography className="text-center text-xs font-small m-2">There aren´t requeriments</Typography>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => verModalDetallesRequerimientosUserAPI(false)}>Close</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

