import { React, useEffect, useState } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AppsIcon from '@mui/icons-material/Apps';
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

import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";

import {
  mostrarMisionPaquetesAPIAction,
  cambiarValorSeleccionAction,
  cambiarVisibilidadModalInsertarMisionPaqueteAction,
  updateMisionPaqueteActionAPIAction,
  cambiarVisibilidadModalRequerimentsAPIAction
} from './store/actions'

import {
  getPermisosSesionActualAPIAction
} from '../../Managment/Users/store/actions'

//Modales importaciones
import ModalInsertar from './modals/insertar.js'
import AssignedAppWP from './modals/assignedAppWP.js'
import TableModules from '../../tables/TableModules'

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});


export default function MisionPaqueteTrabajo() {

  const [numPagination, setNumPagination] = useState(10)
  const [addPaqueteTrabajo, setAddPaqueteTrabajo] = useState(true)
  const [changePaqueteTrabajo, setChangePaqueteTrabajo] = useState(true)
  const [deletePaqueteTrabajo, setDeletePaqueteTrabajo] = useState(true)
  const [requerimentsPaqueteTrabajo, setRequerimentsPaqueteTrabajo] = useState(true)
  const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)

  const loading = useSelector(state => state.fuse.misionPaqueteComponente.loading)
  const visibilidad = useSelector(state => state.fuse.programasView.valorTab)
  const misionPaqueteListAPI = useSelector(state => state.fuse.misionPaqueteComponente.listMisionPaquetesAPI)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.misionPaqueteComponente.filaSeleccionadaGrid)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const personLogin = useSelector(state => state.fuse.userComponente.person)

  const mostrarMisionPaquetesAPI = () => dispatch(mostrarMisionPaquetesAPIAction())
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const cambiarVisibilidadModalInsertarMisionPaquete = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarMisionPaqueteAction(valor, modo))
  const updateMisionPaqueteActionAPI = (id, conjunto) => dispatch(updateMisionPaqueteActionAPIAction(id, conjunto))
  const cambiarVisibilidadModalRequerimentsAPI = (valorNuevo) => dispatch(cambiarVisibilidadModalRequerimentsAPIAction(valorNuevo))

  const classes = useStyles();
  const dispatch = useDispatch()

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Name", accessor: "name", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' },
    { Header: "Service", accessor: "id_service_name", sortable: true, type: 'list' },
    { Header: "Description", accessor: "description", sortable: true, type: 'string' }
  ]

  function deleteMision() {
    let misionSelected = misionPaqueteListAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]

    updateMisionPaqueteActionAPI(filaSeleccionadaGrid, {
      id_service: misionSelected.id_service,
      name: misionSelected.name,
      description: misionSelected.description,
      code: misionSelected.code,
      active: false
    })

  }

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    if (visibilidad == 'workPackage') {
      //GET WORK PACKAGE
      mostrarMisionPaquetesAPI()
    }

  }, [visibilidad])

  useEffect(() => {

    if (personLoginPermisos.find((item) => item['name'] == "Can add work package") != undefined) {
      setAddPaqueteTrabajo(false)
    }

    if (personLoginPermisos.find((item) => item['name'] == "Can change work package") != undefined) {
      setChangePaqueteTrabajo(false)
    }

    if (personLoginPermisos.find((item) => item['name'] == "Can delete work package") != undefined) {
      setDeletePaqueteTrabajo(false)
    }

    if (personLoginPermisos.find((item) => item['name'] == "Can view wp app") != undefined) {
      setRequerimentsPaqueteTrabajo(false)
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
          <IconButton variant="outlined" style={addPaqueteTrabajo == false ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarMisionPaquete(true, 'nuevo')
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true} style={changePaqueteTrabajo == false ? { display: "inline" } : { display: "none" }}
            onClick={() => {
              cambiarVisibilidadModalInsertarMisionPaquete(true, 'editar');
            }
            }

          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top">
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true} style={deletePaqueteTrabajo == false ? { display: "inline" } : { display: "none" }}
            onClick={() => {

              setVisibilidadDialogoConfirmacion(true)

            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Requirements" placement="top">
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true} style={requerimentsPaqueteTrabajo == false ? { display: "inline" } : { display: "none" }}
            onClick={() => {

              cambiarVisibilidadModalRequerimentsAPI(true);

            }}
          >
            <AppsIcon />
          </IconButton>
        </Tooltip>

        <Divider />
      </>
    );
  }

  return (
    <>
      <div style={visibilidad == 'workPackage' ? { display: "block" } : { display: "none" }}>

        <div style={{ width: '100%' }}>
          {botonesSuperiores()}
          <TableModules rowsProp={misionPaqueteListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
        </div>
      </div>

      <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Confirmation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to remove the work package?
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
          <Button variant="outlined" onClick={() => { deleteMision(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

        </DialogActions>

      </Dialog>

      <ModalInsertar />
      <AssignedAppWP />

    </>
  )

}