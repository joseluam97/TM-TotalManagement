//**********************IMPORTACIONES****************************

import { React, useEffect, useCallback, useMemo, useState, useRef } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { GridToolbarExport, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, } from '@mui/x-data-grid';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { darken, lighten } from '@mui/material/styles';
import TableModules from '../../tables/TableModules'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  mostrarRiskManagementAPIAction,
  cambiarVisibilidadModalInsertarAction,
  cambiarValorSeleccionAction,
  cambiarEstadoRiskManagementAction,
  mostrarRiskManagementByContractAPIAction

} from './store/actions'

import {

  cambiarVisibilidadModalPrincipalAction,
  mostrarRmRegistroAPIAction,
  cambiarEstadoRmRegistroAction,
  mostrarRmRegistroLastVersionAPIAction

} from './modals/RmRegistro/store/actions'

import {
  getSesionActualAPIAction,
  getPermisosSesionActualAPIAction

} from '../../Managment/Users/store/actions'

import {
  mostrarUserAPIAction
} from '../../Managment/Users/store/actions'

import {
  getAllLocationCustomerAPIAction
} from '../../Managment/Customers/store/actions'

import {
  verModalDetallesLogRiskAPIAction,
  mostrarLogRiskAmfeAPIAction,
  mostrarLogRiskAPIAction
} from '../../Managment/LogRisk/store/actions'

import {
  insertarNewNotificationAPIAction,
} from '../../Managment/Notifications/store/actions'

import {
  cambiarVisibilidadModalInsertarRmRiskOpportunityAction
} from './modals/RmRegistro/store/actions'

//Modales importaciones
import ModalInsertar from './modals/insertar.js'
import ModalRmRegistroPrincipal from './modals/RmRegistro/RmRegistro.js'
import ModalEliminar from './modals/confirmacionEliminar.js'
import DetallesLogRisk from '../../Managment/LogRisk/modals/detallesLogRisk.js'
import { getCookie } from 'app/js/generalFunctions'

//**********************END_IMPORTACIONES ***********************/

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);





export default function RiskManagement() {


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)
  const [disabledNewRm, setDisabledNewRm] = useState(true)
  const [disabledEditRm, setDisabledEditRm] = useState(true)
  const [disabledRemoveRm, setDisabledRemoveRm] = useState(true)
  const [disabledViewRO, setDisabledViewRO] = useState(true)
  const [variableIndicaPermisoEdicionExtra, setVariableIndicaPermisoEdicionExtra] = useState(false)

  //Obtener los states de Redux
  const riskManagementListAPI = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI)
  const loading = useSelector(state => state.fuse.riskManagementComponente.loading)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.riskManagementComponente.filaSeleccionadaGrid)
  const filaSeleccionadaGridRiskManagement = useSelector(state => state.fuse.riskManagementComponente.filaSeleccionadaGrid)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const modoRiskManagement = useSelector(state => state.fuse.riskManagementComponente.modo)
  const visibilidadDialogormAccion = useSelector(state => state.fuse.rmAccionComponente.visibilidadModalInsertar)
  const visibilidadDialogormRegistro = useSelector(state => state.fuse.rmRegistroComponente.visibilidadModalInsertar)
  const visibilidadModalPrincipal = useSelector(state => state.fuse.rmRegistroComponente.visibilidadModalPrincipal)

  const visibilidadModalTasks = useSelector(state => state.fuse.tasksAccionesComponente.visibilidad)
  const usersListAPI = useSelector(state => state.fuse.userComponente.usersListAPI)


  //Creamos funciones para hacer uso de Actions Redux
  const cambiarVisibilidadModalInsertar = (valor) => dispatch(cambiarVisibilidadModalInsertarAction(valor))
  const mostrarRiskManagementAPI = () => dispatch(mostrarRiskManagementAPIAction())
  const mostrarRiskManagementByContractAPI = (idPersona) => dispatch(mostrarRiskManagementByContractAPIAction(idPersona))
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const cambiarVisibilidadModalPrincipal = (valor) => dispatch(cambiarVisibilidadModalPrincipalAction(valor))
  const mostrarRmRegistroAPI = (id_risk_management) => dispatch(mostrarRmRegistroAPIAction(id_risk_management))
  const mostrarRmRegistroLastVersionAPI = (id_risk_management) => dispatch(mostrarRmRegistroLastVersionAPIAction(id_risk_management))
  const mostrarUserAPI = () => dispatch(mostrarUserAPIAction())
  const getAllLocationCustomerAPI = (idPersona) => dispatch(getAllLocationCustomerAPIAction())
  const verModalDetallesLogRiskAPI = (valor, modo) => dispatch(verModalDetallesLogRiskAPIAction(valor, modo))
  const mostrarLogRiskAmfeAPI = (idAmfe) => dispatch(mostrarLogRiskAmfeAPIAction(idAmfe))
  const mostrarLogRiskAPI = () => dispatch(mostrarLogRiskAPIAction())
  const insertarNewNotificationAPI = (notificacion) => dispatch(insertarNewNotificationAPIAction(notificacion))

  const cambiarVisibilidadModalInsertarRmRiskOpportunity = (valor) => dispatch(cambiarVisibilidadModalInsertarRmRiskOpportunityAction(valor))

  const [resetStates, setResetStates] = useState(false);

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Title", accessor: "title", sortable: true, type: 'string' },
    { Header: "Code", accessor: "code", sortable: true, type: 'string' },
    { Header: "Manager", accessor: "fullNameManager", sortable: true, type: 'list' },
    { Header: "Mission", accessor: "mision_name", sortable: true, type: 'list' },
    { Header: "R&O identified", accessor: "nRisk", sortable: true, type: 'string' }
  ]

  useEffect(() => {

    if (filaSeleccionadaGridRiskManagement != '') {
      let riskSelect = riskManagementListAPI.filter(elemento => elemento.id == filaSeleccionadaGridRiskManagement)[0]
      if (riskSelect != undefined) {
        if (riskSelect.manager == personLogin.id) {
          setVariableIndicaPermisoEdicionExtra(true)
        }
        else {
          setVariableIndicaPermisoEdicionExtra(false)
        }
      }
    }

  }, [filaSeleccionadaGridRiskManagement])

  //Se ejecuta cuando se cierra el dialogo visibilidadDialogormAccion para recargar los datos modificados o añadidos
  useEffect(() => {
    if (visibilidadDialogormAccion != '' && visibilidadDialogormAccion == false) {
      if (personLoginPermisos.find((item) => item['name'] == "Can See All Risk") != undefined) {
        mostrarRiskManagementAPI()
      }
      else {
        mostrarRiskManagementByContractAPI(personLogin.id)
      }
    }

  }, [visibilidadDialogormAccion])

  //Se ejecuta cuando se cierra el dialogo visibilidadModalPrincipal para recargar los datos modificados o añadidos, que es el dialogo que muestra los R&O
  useEffect(() => {

    if (visibilidadModalPrincipal != '' && visibilidadModalPrincipal == false) {

      if (personLoginPermisos.find((item) => item['name'] == "Can See All Risk") != undefined) {
        mostrarRiskManagementAPI()
      }
      else {
        mostrarRiskManagementByContractAPI(personLogin.id)
      }
    }

  }, [visibilidadModalPrincipal])

  //Se ejecuta cuando se cierra el dialogo visibilidadDialogormRegistro para recargar los datos modificados o añadidos
  useEffect(() => {
    if (visibilidadDialogormRegistro != '' && visibilidadDialogormRegistro == false) {
      if (personLoginPermisos.find((item) => item['name'] == "Can See All Risk") != undefined) {
        mostrarRiskManagementAPI()
      }
      else {
        mostrarRiskManagementByContractAPI(personLogin.id)
      }
    }

  }, [visibilidadDialogormRegistro])

  //Se ejecuta cuando se establecen los permisos del usuario para distinguir si se quieren visualizar todos o no
  useEffect(() => {

    if (personLogin.id != undefined && personLoginPermisos.length > 0) {
      if (personLoginPermisos.find((item) => item['name'] == "Can See All Risk") != undefined) {
        mostrarRiskManagementAPI()
      }
      else {
        mostrarRiskManagementByContractAPI(personLogin.id)
      }
    }

  }, [personLogin, personLoginPermisos])


  useEffect(() => {

    mostrarUserAPI()
    getAllLocationCustomerAPI()

    //GET USER
    if (personLogin.id == undefined) {
      dispatch(getSesionActualAPIAction({
        token: getCookie('token')
      }))
    }
    //FIN GET USER

    //GET USER
    dispatch(getPermisosSesionActualAPIAction({
      token: getCookie('token')
    }))
    //FIN GET USER

  }, [])


  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view risk management") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add risk management") == undefined) {
        setDisabledNewRm(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change risk management") == undefined) {
        setDisabledEditRm(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete risk management") == undefined) {
        setDisabledRemoveRm(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view rm risk opportunity") == undefined) {
        setDisabledViewRO(false)
      }


    }

  }, [personLoginPermisos])


  useEffect(() => {

    if (filaSeleccionadaGrid != '' && filaSeleccionadaGrid != undefined) {
      mostrarRmRegistroAPI(filaSeleccionadaGrid);
      mostrarRmRegistroLastVersionAPI(filaSeleccionadaGrid)
    }

  }, [filaSeleccionadaGrid, visibilidadModalTasks, visibilidadDialogormRegistro])

  function botonesSuperiores() {
    return (
      <>
        <Box sx={{ width: '100%' }}>
          <Tooltip title="New" placement="top">
            <IconButton style={disabledNewRm == true ? { display: "inline" } : { display: "none" }}>
              <AddCircleIcon variant="outlined" onClick={
                () => {
                  cambiarVisibilidadModalInsertar(true);
                  dispatch(cambiarEstadoRmRegistroAction('rev', ''))
                  dispatch(cambiarEstadoRmRegistroAction('filaSeleccionadaGrid', ''))
                  dispatch(cambiarEstadoRmRegistroAction('ultimoIdCreado', ''))
                  dispatch(cambiarEstadoRiskManagementAction('resetStatesLocal', true))
                  dispatch(cambiarEstadoRiskManagementAction('modo', 'crear'))
                  dispatch(cambiarEstadoRiskManagementAction('resetStatesLocal', true))
                  dispatch(cambiarEstadoRmRegistroAction('rellenarCamposReevaluar', ''))
                  dispatch(cambiarEstadoRmRegistroAction('ultimoIdCreado', ''))
                  dispatch(cambiarEstadoRmRegistroAction('modo', 'crear'))

                }
              }
              >
              </AddCircleIcon>
            </IconButton>
          </Tooltip>

          <Tooltip title="See risks and opportunities" placement="top">
            <IconButton style={disabledViewRO == true ? { display: "inline" } : { display: "none" }} disabled={filaSeleccionadaGridRiskManagement != '' ? false : true}
              onClick={() => {
                cambiarVisibilidadModalInsertarRmRiskOpportunity(false)
                cambiarVisibilidadModalPrincipal(true)
                mostrarRmRegistroAPI(filaSeleccionadaGridRiskManagement)
                mostrarRmRegistroLastVersionAPI(filaSeleccionadaGridRiskManagement)
                dispatch(cambiarEstadoRmRegistroAction('filaSeleccionadaGrid', ''))
                dispatch(cambiarEstadoRmRegistroAction('ultimoIdCreado', ''))
              }}
            >
              <FormatListBulletedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit" placement="top">
            <IconButton style={disabledEditRm == true || variableIndicaPermisoEdicionExtra == true ? { display: "inline" } : { display: "none" }} onClick={() => {

              dispatch(cambiarEstadoRiskManagementAction('modo', 'editar'))
              cambiarVisibilidadModalInsertar(true);
              dispatch(cambiarEstadoRmRegistroAction('ultimoIdCreado', ''))

            }} disabled={filaSeleccionadaGridRiskManagement != '' ? false : true}>

              <EditIcon />
            </IconButton>
          </Tooltip>


          <Tooltip title="Delete" placement="top">
            <IconButton style={disabledRemoveRm == true ? { display: "inline" } : { display: "none" }}
              onClick={() => {

                dispatch(cambiarEstadoRiskManagementAction('visibilidadModalEliminar', 'true'))
                dispatch(cambiarEstadoRiskManagementAction('origenEliminar', 'riskManagement'))
              }}
              disabled={filaSeleccionadaGridRiskManagement != '' ? false : true}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Version history" placement="top">
            <IconButton
              onClick={() => {
                verModalDetallesLogRiskAPI(true, 'AMFE')
                mostrarLogRiskAmfeAPI(filaSeleccionadaGridRiskManagement)
              }}
              disabled={filaSeleccionadaGridRiskManagement != '' ? false : true}>
              <ManageSearchIcon />
            </IconButton>
          </Tooltip>

          <div style={{ display: "inline", float: "right", position: "relative", marginTop: "5px" }}>

            {/*<GridToolbarContainer>
              <Tooltip title="Columns" placement="bottom">
                <GridToolbarColumnsButton size="large" style={{ marginLeft: "-20px" }} />
              </Tooltip>

              <GridToolbarFilterButton size="large" style={{ marginLeft: "-20px" }} />

              <Tooltip title="Density" placement="bottom">
                <GridToolbarDensitySelector size="large" style={{ marginLeft: "-20px" }} />
              </Tooltip>

              <Tooltip title="Export" placement="bottom">
                <GridToolbarExport size="large" style={{ marginLeft: "-20px" }} />
              </Tooltip>

            </GridToolbarContainer>*/}
          </div>

          <Divider />
        </Box>
      </>
    );
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

  return (
    <>

      <FusePageCarded

        content={
          <Box sx={{
            height: 400,
            width: '100%',
          }}
          >
            <div style={{ width: '100%' }}>
              {botonesSuperiores()}
              <TableModules rowsProp={riskManagementListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion}/>
            </div>

            <ModalInsertar resetValues={resetStates} />
            <ModalRmRegistroPrincipal />
            <ModalEliminar />
            <DetallesLogRisk />
          </Box>
        }
      />
    </>
  )
}

