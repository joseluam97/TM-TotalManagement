//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
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
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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
  cambiarVisibilidadModalActionsAPI,
  mostrarActionsImprovementProposalsAction,
  cambiarVisibilidadModalInsertarAPI,
  cambiarValorSeleccionAction
} from './store/actions'

import {
  mostrarImprovementProposalsAction,
  mostrarImprovementProposalsByContractAPIAction
} from '../store/actions'

//Modales importaciones
import ModalInsertar from './modals/insertar.js'
import TableModules from '../../../tables/TableModules'

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



export default function ImprovementActions() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)
  const [improvementProposal, setImprovementProposal] = useState('')

  const [disabledNewImprovementAction, setDisabledNewImprovementAction] = useState(true)
  const [disabledEditImprovementAction, setDisabledEditImprovementAction] = useState(true)
  const [disabledRemoveImprovementAction, setDisabledRemoveImprovementAction] = useState(true)

  const [ayudaMejora, setAyudaMejora] = useState(false)

  //actionImprovementProposalsComponent
  //Obtener los states de Redux
  const loading = useSelector(state => state.fuse.improvementProposalsComponent.loading)
  const filaSeleccionadaGridImprovement = useSelector(state => state.fuse.improvementProposalsComponent.filaSeleccionadaGrid)
  const improvementProposalsList = useSelector(state => state.fuse.improvementProposalsComponent.improvementProposalsListAPI)
  const actionImprovementProposalsListAPI = useSelector(state => state.fuse.actionImprovementProposalsComponent.actionImprovementProposalsListAPI)
  const filaSeleccionadaGridActionsImprovement = useSelector(state => state.fuse.actionImprovementProposalsComponent.filaSeleccionadaGridActionsImprovement)
  const visibilidadModalAction = useSelector(state => state.fuse.actionImprovementProposalsComponent.visibilidadModalAction)
  const modo = useSelector(state => state.fuse.actionImprovementProposalsComponent.modo)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const visibilidadModalInsertar = useSelector(state => state.fuse.actionImprovementProposalsComponent.visibilidadModalInsertar)
  const accionAlterada = useSelector(state => state.fuse.actionImprovementProposalsComponent.accionAlterada)

  //Creamos funciones para hacer uso de Actions Redux
  const cambiarVisibilidadModalPrincipal = (valor) => dispatch(cambiarVisibilidadModalActionsAPI(valor))
  const cambiarVisibilidadModalInsertar = (valor, modo) => dispatch(cambiarVisibilidadModalInsertarAPI(valor, modo))
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  const mostrarImprovementProposals = () => dispatch(mostrarImprovementProposalsAction())
  const mostrarImprovementProposalsByContractAPI = (idPersona) => dispatch(mostrarImprovementProposalsByContractAPIAction(idPersona))

  const classes = useStyles();

  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view acciones improvement") == undefined) {
        //navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can add acciones improvement") == undefined) {
        setDisabledNewImprovementAction(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change acciones improvement") == undefined) {
        setDisabledEditImprovementAction(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete acciones improvement") == undefined) {
        setDisabledRemoveImprovementAction(false)
      }


    }

  }, [personLoginPermisos])

  useEffect(() => {

    if (filaSeleccionadaGridImprovement != '') {
      let improvementProposal = improvementProposalsList.filter(elemento => elemento.id == filaSeleccionadaGridImprovement)[0]
      if (improvementProposal != undefined) {
        setImprovementProposal(improvementProposal)
      }

    }


  }, [filaSeleccionadaGridImprovement])

  //Se ejecuta cuando se cierra el dialogo de editar añadir acciones para recargar los datos modificados o añadidos
  useEffect(() => {

    if (accionAlterada != 'inicio') {
      if (personLoginPermisos.find((item) => item['name'] == "Can See All Improvement") != undefined) {
        mostrarImprovementProposals()
      }
      else {
        mostrarImprovementProposalsByContractAPI(personLogin.id)
      }
    }

  }, [accionAlterada])

  const columnasDataTable = [
    { Header: "Id", accessor: "id", sortable: true, type: 'string' },
    { Header: "Title", accessor: "titulo", sortable: true, type: 'string' },
    { Header: "Expected date", accessor: "fecha_prevista", sortable: true, type: 'date' },
    { Header: "Execution Date", accessor: "fecha_ejecucion", sortable: true, type: 'date' },
    { Header: "Manager", accessor: "manager_name", sortable: true, type: 'list' },
    { Header: "Helpers", accessor: "helpers_name", sortable: true, type: 'string' },
    { Header: "Observations", accessor: "observations", sortable: true, type: 'string' },
    { Header: "Completed", accessor: "completed", sortable: true, type: 'check', textTrue: 'Closed action', textFalse: 'Open action'  }
  ]


  function botonesSuperiores() {
    return (
      <>
        <Tooltip title="New" placement="top">
          <IconButton style={disabledNewImprovementAction == false ? { display: "inline" } : {}}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                cambiarVisibilidadModalInsertar(true, 'nuevo')
                //cambiarVisibilidadModalInsertar(true);
                //dispatch(cambiarEstadoRmRegistroAction('rev', ''))
                //dispatch(cambiarEstadoRmRegistroAction('rellenarCamposReevaluar', ''))
              }
            }>

            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" placement="top">
          <IconButton style={disabledEditImprovementAction == false ? { display: "none" } : {}} onClick={
            () => {
              cambiarVisibilidadModalInsertar(true, 'editar')

            }
          } disabled={filaSeleccionadaGridActionsImprovement != '' ? false : true}>

            <EditIcon />

          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton style={disabledRemoveImprovementAction == false ? { display: "none" } : {}}
            onClick={() => {

              //dispatch(cambiarEstadoRiskManagementAction('visibilidadModalEliminar', 'true'))
              //dispatch(cambiarEstadoRiskManagementAction('origenEliminar', 'ImprovementAction'))

            }}
            //disabled={filaSeleccionadaGridActionsImprovement != '' ? false : true}>
            disabled={true}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>


        <Divider />
      </>
    );
  }


  return (
    <>
      <Dialog open={visibilidadModalAction} onClose={() => cambiarVisibilidadModalPrincipal(false)} fullWidth maxWidth='xl'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >

          Associated Actions of Improvement Proporsals: {improvementProposal != '' && improvementProposal != undefined && improvementProposal != null && improvementProposal.titulo != undefined ? improvementProposal.titulo : ''}
          <IconButton onClick={() => setAyudaMejora(true)}><Help sx={{ color: 'background.paper' }} /></IconButton>

        </DialogTitle>
        <DialogContent>


          {/*   Dialog datos AMFE*/}

          <Dialog open={ayudaMejora} onClose={() => setAyudaMejora(false)} fullWidth maxWidth="md" >
            <DialogTitle>Associated Improvement</DialogTitle>
            <List sx={{ pt: 0 }} style={{ margin: '20px' }}>


              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                  <TableBody>
                    <>
                      <TableRow
                        key={improvementProposal.titulo}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><b>Title:</b></TableCell>
                        <TableCell align="left">{improvementProposal.titulo}</TableCell>

                      </TableRow>

                      <TableRow
                        key={improvementProposal.subMision_name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><b>Sub Mission:</b></TableCell>
                        <TableCell align="left">{improvementProposal.subMision_name}</TableCell>

                      </TableRow>

                      <TableRow
                        key={improvementProposal.user_id_principal_name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row"><b>Manager:</b></TableCell>
                        <TableCell align="left">{improvementProposal.user_id_principal_name}</TableCell>

                      </TableRow>

                    </>

                  </TableBody>
                </Table>
              </TableContainer>

            </List>

            <ModalInsertar />

            <DialogActions>

              <Button onClick={() => setAyudaMejora(false)}>Close</Button>

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
              <TableModules rowsProp={actionImprovementProposalsListAPI} columnsProp={columnasDataTable} loading={loading} funcionSetValue={cambiarValorSeleccion}/>
            
            </div>

          </Box>

        </DialogContent>
        <DialogActions>


          <Button onClick={() => cambiarVisibilidadModalPrincipal(false)}>Close</Button>

        </DialogActions>
      </Dialog>
    </>

  )
}

