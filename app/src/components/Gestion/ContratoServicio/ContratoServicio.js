import { React, useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import store from "app/store/index"
import { getCookie } from 'app/js/generalFunctions'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';

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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";

import {
  mostrarContratoServicioAPIAction,
  cambiarValorSeleccionAction,
  cambiarVisibilidadModalInsertarAPIAction,
  updateContratoServicioActionAPIAction
} from './store/actions'


//Modales importaciones
import {ModalInsertar} from './modals/insertar.js'
import TableModules from '../../tables/TableModules'

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

export default function ContratoServicio() {

  const [addContrato, setAddContrato] = useState(true)
  const [changeContrato, setChangeContrato] = useState(true)
  const [deleteContrato, setDeleteContrato] = useState(true)
  const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)

  const loading = useSelector(state => state.fuse.contratoComponente.loading)
  const visibilidad = useSelector(state => state.fuse.programasView.valorTab)
  const contratoListAPI = useSelector(state => state.fuse.contratoComponente.listContratoAPI)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.contratoComponente.filaSeleccionadaGrid)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  const mostrarContratosAPI = () => dispatch(mostrarContratoServicioAPIAction())
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const cambiarVisibilidadModalInsertarAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valor, modo))
  const updateContratoActionAPI = (id, conjunto) => dispatch(updateContratoServicioActionAPIAction(id, conjunto))


  const classes = useStyles();
  const dispatch = useDispatch()

  const columnasDataTable = [
    { Header: "Name", accessor: "name", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' },
    { Header: "Description", accessor: "description", sortable: true, type: 'string' },
  ]

  function deleteService() {
    let contratoSelected = contratoListAPI.filter(registro => registro.id == filaSeleccionadaGrid)[0]

    updateContratoActionAPI(filaSeleccionadaGrid, {
      name: contratoSelected.name,
      code: contratoSelected.code,
      description: contratoSelected.description,
      active: false
    })

  }

  useEffect(() => {
    mostrarContratosAPI()
  }, [])

  useEffect(() => {

    if (personLoginPermisos.find((item) => item['name'] == "Can add service") != undefined) {
      setAddContrato(false)
    }

    if (personLoginPermisos.find((item) => item['name'] == "Can change service") != undefined) {
      setChangeContrato(false)
    }

    if (personLoginPermisos.find((item) => item['name'] == "Can delete service") != undefined) {
      setDeleteContrato(false)
    }

  }, [personLoginPermisos])

  function botonesSuperiores() {
    return (
      <>

        <Tooltip title="New" placement="top">
          <IconButton variant="outlined" style={addContrato == false ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarAPI(true, 'nuevo')
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true} style={changeContrato == false ? { display: "inline" } : { display: "none" }}
            onClick={() => {
              cambiarVisibilidadModalInsertarAPI(true, 'editar')
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Details" placement="top">
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true} style={changeContrato == false ? { display: "inline" } : { display: "none" }}
            onClick={() => {
              cambiarVisibilidadModalInsertarAPI(true, 'consultar')
            }}
          >
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton disabled={filaSeleccionadaGrid != '' ? false : true} style={deleteContrato == false ? { display: "inline" } : { display: "none" }}
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
      <div style={visibilidad == 'contrato' ? { display: "block", width: '100%' } : { display: "none" }}>

        <div style={{ width: '100%' }}>
          {botonesSuperiores()}
          <TableModules rowsProp={contratoListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
        </div>

        <ModalInsertar />
      </div>

      <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Confirmation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to remove the contract?
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
          <Button variant="outlined" onClick={() => { deleteService(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

        </DialogActions>

      </Dialog>

    </>
  )
}