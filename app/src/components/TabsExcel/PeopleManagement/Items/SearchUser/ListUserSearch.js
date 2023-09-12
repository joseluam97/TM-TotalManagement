//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
//import * as React from 'react';

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import InfoIcon from '@mui/icons-material/Info';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridToolbarContainer
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
    mostrarAppAPIAction,
    mostrarGruposRequerimientosAPIAction
} from '../../../../Managment/App/store/actions'

import {
    verModalSolicitudPersonalAPIAction
} from '../../store/actions'

//Modales importaciones
import { getCookie } from 'app/js/generalFunctions'

import ModalAnadirAppPersona from '../modals/anadirAppPersona.js'
import ListRequerimentsMain from '../../../../Gestion/Componentes/ListRequerimentsMain'

import {
    setValueUserSeleccionadoAPIAction,
    cambiarVisibilidadModalDetallesUserAPI
} from '../../../../Managment/Users/modals/DetailsUser/store/actions'

import {
    cambiarValorSeleccionUserSelectedAPIAction
} from './store/actions'

import DetailsUser from '../../../../Managment/Users/modals/DetailsUser/DetailsUser.js'
import TableModules from '../../../../tables/TableModules'
import ModalSolicitarPersonal from '../modals/solicitudPersonal'

//**********************END_IMPORTACIONES ***********************/

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function ListUserSearch() {

    const navigate = useNavigate();

    const [numPagination, setNumPagination] = useState(10)

    //obtener el state de Redux
    const loading = useSelector(state => state.fuse.staffUserComponente.loading)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
    const personLogin = useSelector(state => state.fuse.userComponente.person)
    const listUserSearch = useSelector(state => state.fuse.staffUserComponente.listUserSearch)
    const userSelected = useSelector(state => state.fuse.staffUserComponente.userSelected)

    //DIALOGO DETALLES USER
    const setValueUserSeleccionadoAPI = (user) => dispatch(setValueUserSeleccionadoAPIAction(user))
    const cambiarVisibilidadModalDetallesUser = (value) => dispatch(cambiarVisibilidadModalDetallesUserAPI(value))
    const verModalSolicitudPersonalAPI = (arg) => dispatch(verModalSolicitudPersonalAPIAction(arg))
    const cambiarValorSeleccionUserSelectedAPI = (userNew) => dispatch(cambiarValorSeleccionUserSelectedAPIAction(userNew))


    //creamos una función para hacer uso de Actions
    const dispatch = useDispatch()

    const columnasDataTable = [
        { Header: "Nº Agresso", accessor: "IDidentification", sortable: true, type: 'string' },
        { Header: "Name", accessor: "name", sortable: true, type: 'string' },
        { Header: "Matches", accessor: "coincidencias", sortable: true, type: 'string' },
        { Header: "Percentage", accessor: "porcentaje", sortable: true, type: 'porcentaje' }
    ]

    /*const columnasDataTable = [
        {
            field: 'porcentaje', headerName: 'Percentage', width: 200,
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={params.value} />
                </Box>
            )
        },
    ]*/


    useEffect(() => {

    }, [])


    function botonesSuperiores() {
        return (
            <>

                <Tooltip title="Information" placement="top">
                    <IconButton style={{ display: "inline" }} disabled={userSelected != '' ? false : true}
                        onClick={() => {
                            setValueUserSeleccionadoAPI(userSelected)
                            cambiarVisibilidadModalDetallesUser(true)
                        }}
                    >
                        <InfoIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Request person" placement="top">
                    <IconButton style={{ display: "inline" }} disabled={userSelected != '' ? false : true}
                        onClick={() => {
                            verModalSolicitudPersonalAPI(true)
                        }}
                    >
                        <PersonAddIcon />
                    </IconButton>
                </Tooltip>

                <Divider />
            </>
        );
    }


    return (
        <>

            <Box sx={{ width: '100%' }}>

                <div style={{ width: '100%' }}>

                    {botonesSuperiores()}
                    <TableModules rowsProp={listUserSearch} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccionUserSelectedAPI} />

                </div>
            </Box>

            <DetailsUser />
            <ModalSolicitarPersonal />

        </>
    )
}

