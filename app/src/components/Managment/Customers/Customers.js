//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import store from "app/store/index"
import ModalInsertar from './modals/insertar.js'
import ModalLocation from './modals/locations.js'
import ModalGestionLocation from './modals/gestionLocation.js'
import { getCookie } from 'app/js/generalFunctions'
import LocationOnIcon from '@mui/icons-material/LocationOn';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
import Divider from '@mui/material/Divider';

import _ from '@lodash';
import { useNavigate } from "react-router-dom";

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  mostrarCustomerAPIAction,
  cambiarValorSeleccionAction,
  mostrarCustomerPermisosAPIAction,
  cambiarVisibilidadModalInsertarCustomerAPI,
  cambiarVisibilidadModalLocationsAPIAction
} from './store/actions'

import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction
} from '../Users/store/actions'

import TableModules from '../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/


export default function Customers() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)
  const [disabledNewCustomer, setDisabledNewCustomer] = useState(true)
  const [disabledEditCustomer, setDisabledEditCustomer] = useState(true)
  const [disabledViewLocationCustomer, setDisabledViewLocationCustomer] = useState(true)

  //Obtener los states de Redux
  const loading = useSelector(state => state.fuse.customerComponent.loading)
  const customerListAPI = useSelector(state => state.fuse.customerComponent.customerListAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.customerComponent.filaSeleccionadaGrid)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const cambiarVisibilidadModalInsertarUser = (valor, modoDialogUser) => dispatch(cambiarVisibilidadModalInsertarCustomerAPI(valor, modoDialogUser))
  const cambiarVisibilidadModalLocationsAPI = (valor) => dispatch(cambiarVisibilidadModalLocationsAPIAction(valor))
  const mostrarCustomerAPI = () => dispatch(mostrarCustomerAPIAction())

  const [resetStates, setResetStates] = useState(false);

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Name", accessor: "name", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' },
    { Header: "Web Site", accessor: "sitio_web", sortable: true, type: 'string' }
  ]

  useEffect(() => {

    //GET USER
    store.dispatch(getPermisosSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

    mostrarCustomerAPI()

  }, [])

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view customer") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add customer") == undefined) {
        setDisabledNewCustomer(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change customer") == undefined) {
        setDisabledEditCustomer(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view location customer") == undefined) {
        setDisabledViewLocationCustomer(false)
      }


    }

  }, [personLoginPermisos])


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
          <IconButton style={disabledNewCustomer == true ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarUser(true, 'nuevo');
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Locations" placement="top">
          <IconButton style={disabledViewLocationCustomer == true ? { display: "inline" } : { display: "none" }}
            disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {
              cambiarVisibilidadModalLocationsAPI(true);
            }}

          >
            <LocationOnIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditCustomer == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}>
            <EditIcon variant="outlined" onClick={() => {
              cambiarVisibilidadModalInsertarUser(true, 'editar');
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
      <FusePageCarded

        content={
          <Box sx={{ width: '100%' }}>

            <div style={{ width: '100%' }}>
              {botonesSuperiores()}
              <TableModules rowsProp={customerListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
            </div>

            <ModalInsertar />
            <ModalLocation />
            <ModalGestionLocation />
          </Box>
        }
      />
    </>
  )
}

