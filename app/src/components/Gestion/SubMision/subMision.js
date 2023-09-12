import { React, useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import store from "app/store/index"
import AppsIcon from '@mui/icons-material/Apps';
import { getCookie } from 'app/js/generalFunctions'
import WorkIcon from '@mui/icons-material/Work';
import Tooltip from '@mui/material/Tooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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

import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";

import {
  getSubMisionAPIAction,
  cambiarVisibilidadModalAssignedPeopleAPIAction,
  seleccionarSubMisionTablaAPIAction,
  cambiarVisibilidadModalInsertarAPIAction,
  cambiarVisibilidadModalAssignedAppAPIAction,
  cambiarVisibilidadModalTrabajoAPIAction,
  postJobSubMisionAPIAction
} from './store/actions'

import {
  getPermisosSesionActualAPIAction
} from '../../Managment/Users/store/actions'

import {
  mostrarMisionAPIAction
} from '../Mision/store/actions'

import AssignarPersonas from './modals/assignedPeople.js'
import AssignarApp from './modals/assignedApp.js'
import AssignarJob from './modals/assignedJob.js'
import Insert from './modals/insertar.js'
import TableModules from '../../tables/TableModules'

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

export default function SubMision() {

  const [numPagination, setNumPagination] = useState(10)

  const [disabledAddSubMision, setDisabledAddSubMision] = useState(true)
  const [disabledPeopleSubMision, setDisabledPeopleSubMision] = useState(true)
  const [disabledRequerimentSubMision, setDisabledRequerimentSubMision] = useState(true)
  const [disabledJobSubMision, setDisabledJobSubMision] = useState(true)
  const [disabledEditSubMision, setDisabledEditSubMision] = useState(true)

  const loading = useSelector(state => state.fuse.subMisionComponent.loading)
  const visibilidad = useSelector(state => state.fuse.programasView.valorTab)
  const listSubMisionAPI = useSelector(state => state.fuse.subMisionComponent.listSubMisiones)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.subMisionComponent.filaSeleccionadaGrid)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const newSubMisionCreated = useSelector(state => state.fuse.subMisionComponent.newSubMisionCreated)

  const getSubMisionAPI = () => dispatch(getSubMisionAPIAction())
  const cambiarVisibilidadModalAssignedPeopleAPI = (valorNuevo, modoApertura) => dispatch(cambiarVisibilidadModalAssignedPeopleAPIAction(valorNuevo, modoApertura))
  const cambiarVisibilidadModalInsertarAPI = (valorNuevo, modoApertura) => dispatch(cambiarVisibilidadModalInsertarAPIAction(valorNuevo, modoApertura))
  const cambiarVisibilidadModalAssignedAppAPI = (valorNuevo) => dispatch(cambiarVisibilidadModalAssignedAppAPIAction(valorNuevo))
  const seleccionarSubMisionTabla = (id) => dispatch(seleccionarSubMisionTablaAPIAction(id))
  const cambiarVisibilidadModalTrabajoAPI = (valorNuevo, modoApertura) => dispatch(cambiarVisibilidadModalTrabajoAPIAction(valorNuevo, modoApertura))
  const mostrarAllMisionAPI = () => dispatch(mostrarMisionAPIAction())
  const postJobSubMisionAPI = (idSubMision) => dispatch(postJobSubMisionAPIAction(idSubMision))
  const mostrarMisionAPI = () => dispatch(mostrarMisionAPIAction())

  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add sub mision") == undefined) {
        setDisabledAddSubMision(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view contractuser") == undefined) {
        setDisabledPeopleSubMision(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view contract app") == undefined) {
        setDisabledRequerimentSubMision(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view job in sub mision") == undefined) {
        setDisabledJobSubMision(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change sub mision") == undefined) {
        setDisabledEditSubMision(false)
      }

    }

  }, [personLoginPermisos])

  const columnasDataTable = [
    { Header: "Name", accessor: "name", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' },
    { Header: "Mission", accessor: "id_mision_name", sortable: true, type: 'list' },
    { Header: "Description", accessor: "description", sortable: true, type: 'string' }
  ]

  useEffect(() => {

  }, [])

  useEffect(() => {
    //CREAR EL ROL Manager CUANDO SE CREE UNA NUEVA SUB MISION
    if (newSubMisionCreated != '') {
      postJobSubMisionAPI({
        name: "Manager",
        code: "MA",
        sub_mision: newSubMisionCreated,
        active: true
      })
    }

  }, [newSubMisionCreated])


  useEffect(() => {
    if (visibilidad == 'subMision') {
      mostrarMisionAPI()
      getSubMisionAPI()
    }

  }, [visibilidad])

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
          <IconButton variant="outlined" style={disabledAddSubMision == true ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertarAPI(true, 'nuevo')
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Users" placement="top">
          <IconButton style={disabledPeopleSubMision == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {

              cambiarVisibilidadModalAssignedPeopleAPI(true, 'newSubMision');

            }}
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Requirements" placement="top">
          <IconButton style={disabledRequerimentSubMision == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {

              cambiarVisibilidadModalAssignedAppAPI(true);

            }}
          >
            <AppsIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Positions" placement="top">
          <IconButton style={disabledJobSubMision == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {

              cambiarVisibilidadModalTrabajoAPI(true);

            }}
          >
            <WorkIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditSubMision == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGrid != '' ? false : true}
            onClick={() => {
              cambiarVisibilidadModalInsertarAPI(true, 'editar')
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Divider />
      </>
    );
  }

  return (
    <>
      <div style={visibilidad == 'subMision' ? { display: "block" } : { display: "none" }}>

        <div style={{ width: '100%' }}>
          {botonesSuperiores()}
          <TableModules rowsProp={listSubMisionAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={seleccionarSubMisionTabla} />
        </div>

        <AssignarPersonas />
        <AssignarApp />
        <AssignarJob />
        <Insert />
      </div>
    </>
  )
}