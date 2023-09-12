import { useEffect, useState, useRef } from 'react'
import * as React from 'react';

//DataGrid importaciones

import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
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
import Tooltip from '@mui/material/Tooltip';
import Step from '@mui/material/Step';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StepButton from '@mui/material/StepButton';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { getCookie } from 'app/js/generalFunctions'
import LocationOnIcon from '@mui/icons-material/LocationOn';
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

import { useDispatch, useSelector } from 'react-redux'

import {
    mostrarCustomerAPIAction,
    cambiarValorSeleccionAction,
    mostrarCustomerPermisosAPIAction,
    cambiarVisibilidadModalLocationsAPIAction,
    insertarNewCustomerAPIAction,
    putCustomerAPIAction,
    mostrarLocationCustomerAPIAction,
    cambiarVisibilidadModalGestionLocationsAPIAction,
    cambiarValorSeleccionLocationAPIAction
} from '../store/actions'

import TableModules from '../../../tables/TableModules'

const useStyles = makeStyles({

    customDialogTitle: {
        backgroundColor: 'rgb(0, 0, 0)',
        marginLeft: '3px',
        marginRight: '3px',
        color: 'rgb(255, 255, 255)',
        marginBottom: '1em'
    }

});

export default function ModalLocation() {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [numPagination, setNumPagination] = useState(10)
    const [disabledNewLocation, setDisabledNewLocation] = useState(true)
    const [disabledEditLocation, setDisabledEditLocation] = useState(true)

    const loading = useSelector(state => state.fuse.customerComponent.loading)
    const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
    const visibilidadLocationCustomer = useSelector(state => state.fuse.customerComponent.visibilidadLocationCustomer)
    const visibilidadGestionLocationCustomer = useSelector(state => state.fuse.customerComponent.visibilidadGestionLocationCustomer)
    const filaSeleccionadaGrid = useSelector(state => state.fuse.customerComponent.filaSeleccionadaGrid)
    const locationCustomerListAPI = useSelector(state => state.fuse.customerComponent.locationCustomerListAPI)

    const cambiarVisibilidadModalLocationsAPI = (valor) => dispatch(cambiarVisibilidadModalLocationsAPIAction(valor))
    const insertarNewCustomerAPI = (valor) => dispatch(insertarNewCustomerAPIAction(valor))
    const putCustomerAPI = (valor, datos) => dispatch(putCustomerAPIAction(valor, datos))
    const mostrarLocationCustomerAPI = (idCustomer) => dispatch(mostrarLocationCustomerAPIAction(idCustomer))
    const cambiarVisibilidadModalGestionLocationsAPI = (valor, datos) => dispatch(cambiarVisibilidadModalGestionLocationsAPIAction(valor, datos))
    const cambiarValorSeleccionLocationAPI = (filaSelected) => dispatch(cambiarValorSeleccionLocationAPIAction(filaSelected))

    useEffect(() => {

        if (personLoginPermisos.length > 0) {

            if (personLoginPermisos.find((item) => item['name'] == "Can add aplication") == undefined) {
                setDisabledNewLocation(false)
            }

            if (personLoginPermisos.find((item) => item['name'] == "Can change aplication") == undefined) {
                setDisabledEditLocation(false)
            }

        }

    }, [personLoginPermisos])

    const columnasDataTable = [
        { Header: "Customer", accessor: "id_customer_name", sortable: true, type: 'string' },
        { Header: "Name", accessor: "name", sortable: true, type: 'string' },
        { Header: "Code", accessor: "code", sortable: true, type: 'string' },
        { Header: "Direction", accessor: "direccion", sortable: true, type: 'string' },
        { Header: "Latitude", accessor: "latitud", sortable: true, type: 'string' },
        { Header: "Longitude", accessor: "longuitud", sortable: true, type: 'string' }
    ]

    useEffect(() => {
        mostrarLocationCustomerAPI(filaSeleccionadaGrid)
    }, [visibilidadLocationCustomer, visibilidadGestionLocationCustomer])

    function funcionCustomer() {

    }

    function CustomPagination() {
        const apiRef = useGridApiContext();
        const page = useGridSelector(apiRef, gridPageSelector);
        const pageCount = useGridSelector(apiRef, gridPageCountSelector);

        function handleChange() {

        }

        return (
            <>
                <div>
                    <div style={{ display: "inline" }}>
                        <FormControl variant="standard" >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={numPagination}
                                label="Size"
                                style={{ float: "right", position: "relative" }}
                                onChange={e => { setNumPagination(e.target.value); }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{ display: "inline", float: "right", position: "relative" }}>
                        <Pagination
                            color="primary"
                            count={pageCount}
                            page={page + 1}
                            onChange={(event, value) => apiRef.current.setPage(value - 1)}
                        />
                    </div>
                </div>

            </>
        );
    }

    function botonesSuperiores() {
        return (
            <>
                <Tooltip title="New" placement="top">
                    <IconButton style={disabledNewLocation == true ? { display: "inline" } : { display: "none" }}>
                        <AddCircleIcon variant="outlined" onClick={
                            () => {
                                cambiarVisibilidadModalLocationsAPI(false, '')
                                cambiarVisibilidadModalGestionLocationsAPI(true, 'nuevo');
                            }
                        }
                        >
                        </AddCircleIcon>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Edit" placement="top">
                    <IconButton style={disabledEditLocation == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}>
                        <EditIcon variant="outlined" onClick={() => {
                            cambiarVisibilidadModalLocationsAPI(false, '')
                            cambiarVisibilidadModalGestionLocationsAPI(true, 'editar');
                        }
                        }
                        >
                        </EditIcon>
                    </IconButton>
                </Tooltip>

                <Divider />
            </>
        );
    }

    return (
        <>
            <Dialog open={visibilidadLocationCustomer} fullWidth maxWidth='lg'>
                <DialogTitle classes={{ root: classes.customDialogTitle }}>
                    Locations Details
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ width: '100%' }}>

                        <div style={{ width: '100%' }}>
                            {botonesSuperiores()}
                            <TableModules rowsProp={locationCustomerListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccionLocationAPI} />
                        </div>
                    </Box>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { cambiarVisibilidadModalLocationsAPI(false, '') }}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

