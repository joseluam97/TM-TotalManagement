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
import ModalInsertar from './modals/insertarGrupo.js'
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
import DeleteIcon from "@mui/icons-material/Delete";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
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
  mostrarAppAPIAction,
  cambiarVisibilidadModalInsertarGrupoAPIAction,
  cambiarValorSeleccionGridGrupoActionAPI,
  mostrarTypesAppAPIAction,
  mostrarGruposRequerimientosAPIAction,
  mostrarRequerimentsWithDetailsAPIAction,
  deleteGroupRequerimentAPIAction
} from './store/actions'

import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction
} from '../Users/store/actions'

import TableModules from '../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

export default function App() {

  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)
  const [numPagination, setNumPagination] = useState(10)
  const [disabledNewRequeriment, setDisabledNewRequeriment] = useState(true)
  const [disabledEditRequeriment, setDisabledEditRequeriment] = useState(true)
  const [disabledDeleteRequeriment, setDisabledDeleteRequeriment] = useState(true)

  //Obtener los states de Redux
  const loading = useSelector(state => state.fuse.gestionAplicationComponent.loading)
  const valorTab = useSelector(state => state.fuse.gestionAplicationComponent.valorTabRequeriments)
  const listGruposAPI = useSelector(state => state.fuse.gestionAplicationComponent.listGruposAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.gestionAplicationComponent.filaSeleccionadaGridGrupo)


  //Creamos funciones para hacer uso de Actions Redux
  const cambiarVisibilidadModalInsertarGrupoAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarGrupoAPIAction(valor, modo))
  const cambiarValorSeleccionGridGrupoAction = (fila) => dispatch(cambiarValorSeleccionGridGrupoActionAPI(fila))
  const mostrarGruposRequerimientosAPI = (fila) => dispatch(mostrarGruposRequerimientosAPIAction())
  const mostrarRequerimentsWithDetailsAPI = () => dispatch(mostrarRequerimentsWithDetailsAPIAction())
  const deleteGroupRequerimentAPI = (idGrupo) => dispatch(deleteGroupRequerimentAPIAction(idGrupo))

  const [resetStates, setResetStates] = useState(false);

  function deleteGroupRequeriment() {
    deleteGroupRequerimentAPI(filaSeleccionadaGrid)
  }

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add aplication") == undefined) {
        setDisabledNewRequeriment(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change aplication") == undefined) {
        setDisabledEditRequeriment(false)
      }
      if (personLoginPermisos.find((item) => item['name'] == "Can delete aplication") == undefined) {
        setDisabledDeleteRequeriment(false)
      }

    }

  }, [personLoginPermisos])

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Name", accessor: "name", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' }
  ]

  useEffect(() => {

    mostrarGruposRequerimientosAPI()
    mostrarRequerimentsWithDetailsAPI()

    //GET USER
    store.dispatch(getPermisosSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

  }, [])


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
          <IconButton style={disabledNewRequeriment == true ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarGrupoAPI(true, 'nuevo');
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditRequeriment == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}>
            <EditIcon variant="outlined" onClick={() => {
              cambiarVisibilidadModalInsertarGrupoAPI(true, 'editar');
            }
            }
            >
            </EditIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton style={disabledDeleteRequeriment == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {
              setVisibilidadDialogoConfirmacion(true)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Divider />
      </>
    );
  }

  return (
    <>
      <div style={valorTab == 'gruposRequerimientos' ? { display: "block" } : { display: "none" }} >

        <Box sx={{ width: '100%' }}>

          <div style={{ width: '100%' }}>
            {botonesSuperiores()}
            <TableModules rowsProp={listGruposAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccionGridGrupoAction} />
          </div>
        </Box>

        <ModalInsertar />
      </div>

      <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Confirmation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to remove the group?
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
          <Button variant="outlined" onClick={() => { deleteGroupRequeriment(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

        </DialogActions>

      </Dialog>
    </>
  )
}

