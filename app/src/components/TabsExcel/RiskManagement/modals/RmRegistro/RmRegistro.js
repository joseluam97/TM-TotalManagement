//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import { styled, alpha } from '@mui/material/styles';

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { darken, lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Help from '@mui/icons-material/Help';
import List from '@mui/material/List';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HistoryIcon from '@mui/icons-material/History';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

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

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarEstadoRmRegistroAction,
  mostrarRmRegistroAPIAction,
  cambiarVisibilidadModalInsertarRmRiskOpportunityAction,
  cambiarVisibilidadModalPrincipalAction,
  cambiarValorSeleccionRmRiskOpportunityAction,
  eliminarRmRegistroAction,
  consultaRiskManagementAction,
  cambiarVisibilidadModalHistoricoRmRiskOpportunityAction

} from './store/actions'

import {
  cambiarEstadoRmTasksAction,
  mostrarRmAccionAPIAction
} from '../tasks/store/actions'

import {
  cambiarEstadoRiskManagementAction
} from '../../store/actions'

import {
  verModalDetallesLogRiskAPIAction,
  mostrarLogRiskRoAPIAction,
  mostrarLogRiskAccionesByRoAPIAction
} from '../../../../Managment/LogRisk/store/actions'

//Modales importaciones
import ModalInsertar from './modals/insertar.js'
import ModalRmAcciones from '../tasks/TasksApp.js'
import ModalHistoricoRisk from './modals/historialRiskOportunity.js'
import DetallesLogRisk from '../../../../Managment/LogRisk/modals/detallesLogRisk.js'
import TableModules from '../../../../tables/TableModules'
//**********************END_IMPORTACIONES ***********************/

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);



const useStyles = makeStyles({


  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});



export default function ModalRmRegistroPrincipal() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)
  const [riskSelect, setRiskSelect] = useState('')
  const [disabledNewRO, setDisabledNewRO] = useState(true)
  const [disabledEditRO, setDisabledEditRO] = useState(true)
  const [disabledRemoveRO, setDisabledRemoveRO] = useState(true)
  const [disabledViewAccion, setDisabledViewAccion] = useState(true)
  const [ayudaAMFE, setAyudaAMFE] = useState(false)
  const [variableIndicaPermisoEdicionExtra, setVariableIndicaPermisoEdicionExtra] = useState(false)

  //Obtener los states de Redux
  const loading = useSelector(state => state.fuse.rmRegistroComponente.loading)
  const rmRegistrosListAPI = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListAPI)
  const rmRegistrosListLastVersionAPI = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListLastVersionAPI)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.rmRegistroComponente.filaSeleccionadaGrid)
  const filaSeleccionadaGridAMFE = useSelector(state => state.fuse.riskManagementComponente.filaSeleccionadaGrid)
  const visibilidadModalInsertar = useSelector(state => state.fuse.rmRegistroComponente.filaSeleccionadaGrid)
  const visibilidadModalPrincipal = useSelector(state => state.fuse.rmRegistroComponente.visibilidadModalPrincipal)
  const filaSeleccionadaGridRiskManagement = useSelector(state => state.fuse.riskManagementComponente.filaSeleccionadaGrid)
  const filaSeleccionadaGridRmRiesgoOportunidad = useSelector(state => state.fuse.rmRegistroComponente.filaSeleccionadaGrid)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const riskManagementListAPI = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI)
  const visibilidadModalInsertarCreateRO = useSelector(state => state.fuse.rmRegistroComponente.visibilidadModalInsertar)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const visibilidadModalTasks = useSelector(state => state.fuse.tasksAccionesComponente.visibilidad)
  const ultimoIdCreadoAMFE = useSelector(state => state.fuse.riskManagementComponente.ultimoIdCreado)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarVisibilidadModalInsertar = (valor) => dispatch(cambiarVisibilidadModalInsertarRmRiskOpportunityAction(valor))
  const cambiarVisibilidadModalPrincipal = (valor) => dispatch(cambiarVisibilidadModalPrincipalAction(valor))
  const mostrarRmRegistroAPI = (idAMFE) => dispatch(mostrarRmRegistroAPIAction(idAMFE))
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionRmRiskOpportunityAction(valor))
  const eliminarRmRegistro = (id) => dispatch(eliminarRmRegistroAction(id))
  const consultaRiskManagement = () => dispatch(consultaRiskManagementAction())
  const cambiarVisibilidadModalHistoricoRmRiskOpportunity = (valor) => dispatch(cambiarVisibilidadModalHistoricoRmRiskOpportunityAction(valor))
  const verModalDetallesLogRiskAPI = (valor, modo) => dispatch(verModalDetallesLogRiskAPIAction(valor, modo))
  const mostrarLogRiskRoAPI = (idAmfe) => dispatch(mostrarLogRiskRoAPIAction(idAmfe))
  const mostrarLogRiskAccionesByRoAPI = (idAmfe) => dispatch(mostrarLogRiskAccionesByRoAPIAction(idAmfe))

  const classes = useStyles();

  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view rm risk opportunity") == undefined) {
        //navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add rm risk opportunity") == undefined) {
        setDisabledNewRO(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change rm risk opportunity") == undefined) {
        setDisabledEditRO(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete rm risk opportunity") == undefined) {
        setDisabledRemoveRO(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can view rm action") == undefined) {
        setDisabledViewAccion(false)
      }


    }

  }, [personLoginPermisos])

  useEffect(() => {

    if (filaSeleccionadaGridAMFE != '') {
      let riskSelect = riskManagementListAPI.filter(elemento => elemento.id == filaSeleccionadaGridAMFE)[0]

      if (riskSelect != undefined) {
        setRiskSelect(riskSelect)

        if (riskSelect.manager == personLogin.id) {
          setVariableIndicaPermisoEdicionExtra(true)
        }
        else {
          setVariableIndicaPermisoEdicionExtra(false)
        }

      }
    }

  }, [filaSeleccionadaGridAMFE])

  const columnasDataTable = [
    { Header: "Id", accessor: "id", sortable: true, type: 'string' },
    { Header: "Detection date", accessor: "d_detection", sortable: true, type: 'string' },
    { Header: "Effect", accessor: "glitch_effect", sortable: true, type: 'string' },
    { Header: "Cause", accessor: "cause_failure", sortable: true, type: 'string' },
    { Header: "Current controls", accessor: "current_controls", sortable: true, type: 'string' },
    { Header: "Severity", accessor: "gravity", sortable: true, type: 'string' },
    { Header: "Frequency", accessor: "idea", sortable: true, type: 'string' },
    { Header: "Detection", accessor: "detection", sortable: true, type: 'string' },
    { Header: "NPR", accessor: "npr", sortable: true, type: 'string' },
    { Header: "Priorization", accessor: "priorization", sortable: true, type: 'list' },
    { Header: "Actions identified", accessor: "nActions", sortable: true, type: 'string' },
    { Header: "Revision", accessor: "rev", sortable: true, type: 'string' },
    { Header: "Remarks", accessor: "observations", sortable: true, type: 'string' },
    { Header: "Category", accessor: "categorizacion_name", sortable: true, type: 'list' }
  ]

  function botonesSuperiores() {
    return (
      <>
        <Tooltip title="New" placement="top">
          <IconButton style={disabledNewRO == false ? { display: "none" } : {}}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertar(true);
                dispatch(cambiarEstadoRmRegistroAction('rev', ''))
                dispatch(cambiarEstadoRmRegistroAction('rellenarCamposReevaluar', ''))
              }
            }>

            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Actions" placement="top">
          <IconButton style={disabledViewAccion == false ? { display: "none" } : {}} onClick={
            () => {
              dispatch(mostrarRmAccionAPIAction(filaSeleccionadaGrid));
              dispatch(cambiarEstadoRmTasksAction('visibilidad', true));
              dispatch(cambiarEstadoRmTasksAction('visibilidadNuevaAccion', true));
              dispatch(cambiarEstadoRmRegistroAction('modo', ''));
            }
          } disabled={filaSeleccionadaGrid != '' ? false : true}>
            <AddTaskIcon />


          </IconButton>
        </Tooltip>


        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditRO == true || variableIndicaPermisoEdicionExtra == true ? { display: "inline" } : { display: "none" }} onClick={
            () => {
              cambiarVisibilidadModalInsertar(true);
              dispatch(cambiarEstadoRmRegistroAction('modo', 'editar'));

            }
          } disabled={filaSeleccionadaGrid != '' ? false : true}>

            <EditIcon />

          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton style={disabledRemoveRO == false ? { display: "none" } : {}}
            onClick={() => {

              dispatch(cambiarEstadoRiskManagementAction('visibilidadModalEliminar', 'true'))
              dispatch(cambiarEstadoRiskManagementAction('origenEliminar', 'RO'))

            }}
            disabled={filaSeleccionadaGrid != '' ? false : true}>

            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Historical R&O" placement="top">
          <IconButton
            onClick={() => {
              cambiarVisibilidadModalHistoricoRmRiskOpportunity(true)
            }}
            disabled={filaSeleccionadaGrid != '' ? false : true}>

            <HistoryIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="R&O version history" placement="top">
          <IconButton
            onClick={() => {
              verModalDetallesLogRiskAPI(true, 'R&O')
              mostrarLogRiskRoAPI(filaSeleccionadaGrid)
            }}
            disabled={filaSeleccionadaGrid != '' ? false : true}>
            <ManageSearchIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="R&O action release history" placement="top">
          <IconButton
            onClick={() => {
              verModalDetallesLogRiskAPI(true, 'R&O actions')
              mostrarLogRiskAccionesByRoAPI(filaSeleccionadaGrid)
            }}
            disabled={filaSeleccionadaGrid != '' ? false : true}>
            <ManageSearchIcon />
          </IconButton>
        </Tooltip>

        <Divider />
      </>
    );
  }


  return (
    <>
      <Dialog open={visibilidadModalPrincipal} onClose={() => cambiarVisibilidadModalPrincipal(false)} fullWidth maxWidth={visibilidadModalInsertarCreateRO == true ? 'md' : false}>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >

          Associated R&O of AMFE: {riskSelect != '' && riskSelect != undefined && riskSelect != null && riskSelect.title != undefined ? riskSelect.title : ''}
          <IconButton onClick={() => setAyudaAMFE(true)}><Help sx={{ color: 'background.paper' }} /></IconButton>

        </DialogTitle>
        <DialogContent>

          {/*   Dialog datos AMFE*/}

          <Dialog open={ayudaAMFE} onClose={() => setAyudaAMFE(false)} fullWidth maxWidth="md" >
            <DialogTitle>Associated FMEA</DialogTitle>
            <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                  <TableBody>
                    <>
                      <TableRow
                        key={riskSelect != undefined ? riskSelect.title : ""}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><b>Title:</b></TableCell>
                        <TableCell align="left">{riskSelect != undefined ? riskSelect.title : ""}</TableCell>

                      </TableRow>

                      <TableRow
                        key={riskSelect != undefined ? riskSelect.code : ""}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><b>Code:</b></TableCell>
                        <TableCell align="left">{riskSelect != undefined ? riskSelect.code : ""}</TableCell>

                      </TableRow>

                      <TableRow
                        key={riskSelect != undefined ? riskSelect.fullNameManager : ""}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><b>Manager:</b></TableCell>
                        <TableCell align="left">{riskSelect != undefined ? riskSelect.fullNameManager : ""}</TableCell>

                      </TableRow>
                      <TableRow
                        key={riskSelect != undefined ? riskSelect.fullNameMiembros : ""}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><b>Members:</b></TableCell>
                        <TableCell align="left">{riskSelect != undefined ? riskSelect.fullNameMiembros : ""}</TableCell>

                      </TableRow>

                      <TableRow
                        key={riskSelect != undefined ? riskSelect.mision_name : ""}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><b>Mission:</b></TableCell>
                        <TableCell align="left">{riskSelect != undefined ? riskSelect.mision_name : ""}</TableCell>

                      </TableRow>

                    </>

                  </TableBody>
                </Table>
              </TableContainer>

            </List>
            <DialogActions>

              <Button onClick={() => setAyudaAMFE(false)}>Close</Button>

            </DialogActions>
          </Dialog>

          <Box sx={{
            height: 400,
            width: '100%',
            '& .mayor100': {
              backgroundColor: '#FF7B7B',
              color: '#000000',
            },
            '& .mayor80': {
              backgroundColor: '#E1FF7C',
              color: '#000000',
            },
            '& .menor80': {
              backgroundColor: '#FFFFFF',
              color: '#000000',
            },
          }}
          >

            <div style={{ width: '100%' }}>

              {botonesSuperiores()}
              <TableModules rowsProp={rmRegistrosListLastVersionAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion} />
              {/*<DataGrid
                autoHeight
                getRowClassName={(params) => {
                  return params.row.npr > 100 ? 'mayor100' : params.row.npr > 80 ? 'mayor80' : 'menor80';
                }}
                rows={rmRegistrosListLastVersionAPI}
                columns={columnasDataTable}
                pageSize={numPagination}
                localeText={{
                  toolbarExport: "",
                  toolbarColumns: "",
                  toolbarFilters: "",
                  toolbarDensity: "",
                }}
                components={{
                  Toolbar: botonesSuperiores,
                  //Footer: botonesSuperiores
                  //Pagination: CustomPagination
                }}
                disableMultipleSelection={true}
                onSelectionModelChange={(id) => {
                  cambiarValorSeleccion(id[0]);

                }}

                initialState={{
                  sorting: {
                    sortModel: [
                      {
                        field: 'id', sort: 'desc'
                      },
                      {
                        field: 'rev', sort: 'asc'
                      }

                    ],
                  },
                }}
              />*/}
            </div>

            <ModalInsertar />
            <ModalRmAcciones />
            <ModalHistoricoRisk />
            <DetallesLogRisk />

          </Box>

        </DialogContent>
        <DialogActions>


          <Button onClick={() => cambiarVisibilidadModalPrincipal(false)}>Close</Button>

        </DialogActions>
      </Dialog>
    </>

  )
}

