import { React, useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';

//DataGrid importaciones
import * as global from 'global.js';
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
import AppsIcon from '@mui/icons-material/Apps';
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

import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";

import {
  mostrarAllDepartamentosAPIAction,
  cambiarVisibilidadModalInsertarDepartamentoAPIAction,
  seleccionarDepartamentoTablaAPIAction,
  cambiarVisibilidadModalRequerimentsAPIAction,
  putDepartamentoAPIAction
} from './store/actions'

import {
  getPermisosSesionActualAPIAction
} from '../../Managment/Users/store/actions'

import {
  mostrarMisionPaquetesAPIAction
} from '../PaqueteTrabajo/store/actions'

import ModalInsertarDepartamento from './modals/insertarDepartamento'
import AssignedAppDepartamento from './modals/assignedAppDepartamento'
import TableModules from '../../tables/TableModules'

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

export default function Departamento() {

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
  const listAllDepartamentAPI = useSelector(state => state.fuse.departamentoViewComponente.listAllDepartamentAPI)
  const filaSeleccionadaGridDepartament = useSelector(state => state.fuse.departamentoViewComponente.filaSeleccionadaGridDepartament)


  const mostrarAllDepartamentosAPI = () => dispatch(mostrarAllDepartamentosAPIAction())
  const cambiarVisibilidadModalInsertarDepartamentoAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarDepartamentoAPIAction(valor, modo))
  const seleccionarDepartamentoTablaAPI = (valor) => dispatch(seleccionarDepartamentoTablaAPIAction(valor))
  const cambiarVisibilidadModalRequerimentsAPI = (visibilidadValor) => dispatch(cambiarVisibilidadModalRequerimentsAPIAction(visibilidadValor))
  const putDepartamentoAPI  = (id, data) => dispatch(putDepartamentoAPIAction(id, data))

  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view departamento") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add departamento") == undefined) {
        setDisabledNewDepartament(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change departamento") == undefined) {
        setDisabledEditDepartament(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view departamento app") == undefined) {
        setDisabledRequerimentsDepartament(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete departamento") == undefined) {
        setDisabledRemoveDepartament(false)
      }


    }

  }, [personLoginPermisos])

  const columnasDataTable = [
    { Header: "Name", accessor: "name", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' },
    { Header: "Departmental Directorate", accessor: "name_direccion_departamental", sortable: true, type: 'list' },
  ]


  useEffect(() => {

  }, [])

  useEffect(() => {
    if (valorTab == 'departamentos') {
      seleccionarDepartamentoTablaAPI('');
      mostrarAllDepartamentosAPI()
    }

  }, [valorTab])

  function deleteDepartamento(){
    let departamentoSelect = listAllDepartamentAPI.filter(elemento => elemento.id == filaSeleccionadaGridDepartament)[0]
    if(departamentoSelect != undefined){
      putDepartamentoAPI(filaSeleccionadaGridDepartament, {
        id_direccion_departamental: departamentoSelect.id_direccion_departamental,
        name: departamentoSelect.name,
        code: departamentoSelect.code,
        responsableDepartamento: departamentoSelect.responsableDepartamento,
        description: departamentoSelect.description,
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
                cambiarVisibilidadModalInsertarDepartamentoAPI(true, 'nuevo')
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditDepartament == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGridDepartament != '' ? false : true}
            onClick={() => {
              cambiarVisibilidadModalInsertarDepartamentoAPI(true, 'editar')
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Requirements" placement="top">
          <IconButton style={disabledRequerimentsDepartament == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGridDepartament != '' ? false : true}
            onClick={() => {

              cambiarVisibilidadModalRequerimentsAPI(true);

            }}
          >
            <AppsIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton disabled={filaSeleccionadaGridDepartament != '' ? false : true} style={disabledRemoveDepartament == false ? { display: "inline" } : { display: "none" }}
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
      <div style={valorTab == 'departamentos' ? { display: "block" } : { display: "none" }}>

        <div style={{ width: '100%' }}>
          {botonesSuperiores()}
          <TableModules rowsProp={listAllDepartamentAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={seleccionarDepartamentoTablaAPI} />
        </div>

        <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

          <DialogTitle classes={{ root: classes.customDialogTitle }} >
            Confirmation
          </DialogTitle>
          <DialogContent>
            Are you sure you want to remove the department?
          </DialogContent>
          <DialogActions>

            <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
            <Button variant="outlined" onClick={() => { deleteDepartamento(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

          </DialogActions>

        </Dialog>

        <ModalInsertarDepartamento />
        <AssignedAppDepartamento />
      </div>
    </>
  )

}