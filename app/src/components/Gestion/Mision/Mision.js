import { React, useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';

//DataGrid importaciones
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
  cambiarVisibilidadModalInsertarAPIAction,
  seleccionarMisionTablaAPIAction,
  cambiarVisibilidadModalRequerimentsAPIAction,
  mostrarMisionAPIAction
} from './store/actions'

import {
  mostrarMisionPaquetesAPIAction
} from '../PaqueteTrabajo/store/actions'

import {
  mostrarUserAPIAction
} from '../../Managment/Users/store/actions'

import ModalInsertar from './modals/insertar.js'
import ModalRequeriments from './modals/assignedAppMision.js'
import TableModules from '../../tables/TableModules'

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

export default function Mision() {

  const [numPagination, setNumPagination] = useState(5)

  const [disabledNewMision, setDisabledNewMision] = useState(true)
  const [disabledEditMision, setDisabledEditMision] = useState(true)
  const [disabledRequerimentsMision, setDisabledRequerimentsMision] = useState(true)

  const loading = useSelector(state => state.fuse.misionComponent.loading)
  const visibilidad = useSelector(state => state.fuse.programasView.valorTab)
  const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.misionComponent.filaSeleccionadaGrid)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const personLogin = useSelector(state => state.fuse.userComponente.person)

  const mostrarMisionAPI = () => dispatch(mostrarMisionAPIAction())
  const cambiarVisibilidadModalInsertarAPI = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valor, modo))
  const seleccionarMisionTablaAPI = (valor) => dispatch(seleccionarMisionTablaAPIAction(valor))
  const cambiarVisibilidadModalRequerimentsAPI = (valorNuevo) => dispatch(cambiarVisibilidadModalRequerimentsAPIAction(valorNuevo))
  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
  const mostrarMisionPaquetesAPI = () => dispatch(mostrarMisionPaquetesAPIAction())

  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view mision") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add mision") == undefined) {
        setDisabledNewMision(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change mision") == undefined) {
        setDisabledEditMision(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view mision app") == undefined) {
        setDisabledRequerimentsMision(false)
      }


    }

  }, [personLoginPermisos])

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Name", accessor: "name", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' },
    { Header: "Work Package", accessor: "id_workPackage_name", sortable: true, type: 'list' },
    { Header: "Manager", accessor: "manager_name", sortable: true, type: 'list' }
  ]

  useEffect(() => {

  }, [])

  useEffect(() => {
    if(visibilidad == 'mision'){
      seleccionarMisionTablaAPI('');
      mostrarMisionAPI()
      mostrarUserAPI()
      mostrarMisionPaquetesAPI()
    }
    
  }, [visibilidad])


  function botonesSuperiores() {
    return (
      <>

        <Tooltip title="New" placement="top">
          <IconButton variant="outlined" style={disabledNewMision == true ? { display: "inline" } : { display: "none" }}>
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
          <IconButton style={disabledEditMision == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {
              cambiarVisibilidadModalInsertarAPI(true, 'editar')
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Requirements" placement="top">
          <IconButton style={disabledRequerimentsMision == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
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
      <div style={visibilidad == 'mision' ? { display: "block" } : { display: "none" }}>


        <div style={{ width: '100%' }}>
          {botonesSuperiores()}
          <TableModules rowsProp={listMisionAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={seleccionarMisionTablaAPI} />
        </div>

        <ModalInsertar />
        <ModalRequeriments />
      </div>
    </>
  )

}