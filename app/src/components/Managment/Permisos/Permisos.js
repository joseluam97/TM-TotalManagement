//**********************IMPORTACIONES****************************

import { React, useEffect, useState } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import store from "app/store/index"
import ModalInsertar from './modals/insertar.js'
import { getCookie } from 'app/js/generalFunctions'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

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
  mostrarGroupAPIAction,
  cambiarVisibilidadModalInsertarAPIAction,
  cambiarValorSeleccionAction,
  mostrarPermisosByGroupAPIAction,
  mostrarAllPermisosAPIAction
} from './store/actions.js'

import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction
} from '../Users/store/actions.js'

import TableModules from '../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/


export default function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)
  const [disabledNewGroup, setDisabledNewGroup] = useState(true)
  const [disabledEditGroup, setDisabledEditGroup] = useState(true)

  //Obtener los states de Redux
  const loading = useSelector(state => state.fuse.permisosComponente.loading)
  const groupListAPI = useSelector(state => state.fuse.permisosComponente.groupListAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.permisosComponente.filaSeleccionadaGrid)

  //Creamos funciones para hacer uso de Actions Redux
  const mostrarGroupAPI = () => dispatch(mostrarGroupAPIAction())
  const cambiarVisibilidadModalInsertarAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valor, modo))
  const cambiarValorSeleccion = (fila) => dispatch(cambiarValorSeleccionAction(fila))
  const mostrarPermisosByGroupAPI = (idGroup) => dispatch(mostrarPermisosByGroupAPIAction(idGroup))
  const mostrarAllPermisosAPI = (fila) => dispatch(mostrarAllPermisosAPIAction())

  const [resetStates, setResetStates] = useState(false);

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add group") == undefined) {
        setDisabledNewGroup(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change group") == undefined) {
        setDisabledEditGroup(false)
      }

    }

  }, [personLoginPermisos])

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Name", accessor: "name", sortable: true, type: 'string' }
  ]

  useEffect(() => {

    mostrarGroupAPI()
    mostrarAllPermisosAPI()

    //GET USER
    store.dispatch(getPermisosSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

  }, [])

  useEffect(() => {

    if (filaSeleccionadaGrid != "") {
      mostrarPermisosByGroupAPI(filaSeleccionadaGrid)
    }

  }, [filaSeleccionadaGrid])


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
          <IconButton style={disabledNewGroup == true ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarAPI(true, 'nuevo');
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditGroup == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}>
            <EditIcon variant="outlined" onClick={() => {
              cambiarVisibilidadModalInsertarAPI(true, 'editar');
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
              <TableModules rowsProp={groupListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
            </div>

            <ModalInsertar />
          </Box>
        }
      />
    </>
  )
}

