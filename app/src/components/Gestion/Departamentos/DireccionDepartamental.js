import { React, useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';

//DataGrid importaciones
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
import AppsIcon from '@mui/icons-material/Apps';

import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";

import {
  mostrarAllDireccionDepartamentalAPIAction,
  cambiarVisibilidadModalInsertarDireccionDepartamentalAPIAction,
  seleccionarDireccionDepartamentalTablaAPIAction,
  cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIAction,
  putDireccionDepartamentalAPIAction
} from './store/actions'

import {
  getPermisosSesionActualAPIAction
} from '../../Managment/Users/store/actions'

import {
  mostrarMisionPaquetesAPIAction
} from '../PaqueteTrabajo/store/actions'

import ModalInsertarDireccionDepartamental from './modals/insertarDireccionDepartamental.js'
import AssignedAppDireccionDepartamental from './modals/assignedAppDireccionDepartamental'
import TableModules from '../../tables/TableModules'

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

export default function DireccionDepartamental() {

  const [numPagination, setNumPagination] = useState(10)

  const [disabledNewDepartament, setDisabledNewDepartament] = useState(true)
  const [disabledEditDepartament, setDisabledEditDepartament] = useState(true)
  const [disabledRequerimentsDepartament, setDisabledRequerimentsDepartament] = useState(true)
  const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)
  const [disabledRemoveDepartament, setDisabledRemoveDepartament] = useState(false)

  const loading = useSelector(state => state.fuse.departamentoViewComponente.loading)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const valorTab = useSelector(state => state.fuse.departamentoViewComponente.valorTabDepartamento)
  const listAllDireccionesDepartamentalesAPI = useSelector(state => state.fuse.departamentoViewComponente.listAllDireccionesDepartamentalesAPI)
  const filaSeleccionadaGridDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.filaSeleccionadaGridDireccionDepartamental)

  const mostrarAllDireccionDepartamentalAPI = () => dispatch(mostrarAllDireccionDepartamentalAPIAction())
  const cambiarVisibilidadModalInsertarDireccionDepartamentalAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarDireccionDepartamentalAPIAction(valor, modo))
  const seleccionarDireccionDepartamentalTablaAPI = (valor) => dispatch(seleccionarDireccionDepartamentalTablaAPIAction(valor))
  const cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPI = (visibilidadValor) => dispatch(cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIAction(visibilidadValor))
  const putDireccionDepartamentalAPI = (id, data) => dispatch(putDireccionDepartamentalAPIAction(id, data))

  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view direccion departamental") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add direccion departamental") == undefined) {
        setDisabledNewDepartament(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change direccion departamental") == undefined) {
        setDisabledEditDepartament(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view departamento app") == undefined) {
        setDisabledRequerimentsDepartament(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete direccion departamental") == undefined) {
        setDisabledRemoveDepartament(false)
      }

    }

  }, [personLoginPermisos])

  const columnasDataTable = [
    { Header: "Name", accessor: "name", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' },
  ]

  useEffect(() => {
    seleccionarDireccionDepartamentalTablaAPI('');
    mostrarAllDireccionDepartamentalAPI()

    //GET USER
    store.dispatch(getPermisosSesionActualAPIAction({

      token: getCookie('token')

    }))
    //FIN GET USER

  }, [])

  function deleteDireccionDepartamental(){
    let direccionDepartamentalSelect = listAllDireccionesDepartamentalesAPI.filter(elemento => elemento.id == filaSeleccionadaGridDireccionDepartamental)[0]
    if(direccionDepartamentalSelect != undefined){
      putDepartamentoAPI(filaSeleccionadaGridDireccionDepartamental, {
        name: direccionDepartamentalSelect.name,
        code: direccionDepartamentalSelect.code,
        responsablesDD: direccionDepartamentalSelect.responsablesDD,
        description: direccionDepartamentalSelect.description,
        active: false
      })
    }
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
          <IconButton variant="outlined" style={disabledNewDepartament == true ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarDireccionDepartamentalAPI(true, 'nuevo')
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditDepartament == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGridDireccionDepartamental != '' ? false : true}
            onClick={() => {
              cambiarVisibilidadModalInsertarDireccionDepartamentalAPI(true, 'editar')
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Requirements" placement="top">
          <IconButton style={disabledRequerimentsDepartament == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGridDireccionDepartamental != '' ? false : true}
            onClick={() => {

              cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPI(true);

            }}
          >
            <AppsIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton disabled={filaSeleccionadaGridDireccionDepartamental != '' ? false : true} style={disabledRemoveDepartament == false ? { display: "inline" } : { display: "none" }}
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
      <div style={valorTab == 'direccionDepartamental' ? { display: "block" } : { display: "none" }}>

        <div style={{ width: '100%' }}>
          {botonesSuperiores()}
          <TableModules rowsProp={listAllDireccionesDepartamentalesAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={seleccionarDireccionDepartamentalTablaAPI} />
        </div>

        <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

          <DialogTitle classes={{ root: classes.customDialogTitle }} >
            Confirmation
          </DialogTitle>
          <DialogContent>
            Are you sure you want to remove the departmental directorate?
          </DialogContent>
          <DialogActions>

            <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
            <Button variant="outlined" onClick={() => { deleteDireccionDepartamental(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

          </DialogActions>

        </Dialog>


        <ModalInsertarDireccionDepartamental />
        <AssignedAppDireccionDepartamental />
      </div>
    </>
  )

}