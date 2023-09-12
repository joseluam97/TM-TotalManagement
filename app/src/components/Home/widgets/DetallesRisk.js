import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { React } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from 'app/store/fuse/messageSlice'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ButtonGroup from '@mui/material/ButtonGroup';




//IMPORT PARA ABRIR EL R&O SELECCIONADO
import {
  cambiarVisibilidadModalPrincipalAction,
  mostrarRmRegistroAPIAction,
  cambiarEstadoRmRegistroAction,
  mostrarRmRegistroLastVersionAPIAction

} from '../../TabsExcel/RiskManagement/modals/RmRegistro/store/actions'

import {
  cambiarValorSeleccionAction
} from '../../TabsExcel/RiskManagement/store/actions'
//FIN IMPORT PARA ABRIR EL R&O SELECCIONADO


//IMPORT PARA ABRIR LAS ACCIONES DEL RISK SELECCIONADO
import {
  cambiarEstadoRmTasksAction,
  mostrarRmAccionAPIAction
} from '../../TabsExcel/RiskManagement/modals/tasks/store/actions'


import { IconButton } from '@mui/material';

import { ThemeProvider } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';


//FIN IMPORT PARA ABRIR LAS ACCIONES DEL RISK SELECCIONADO

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

function DetallesRisk() {

  const [tableForRender, setTableForRender] = useState(null);
  const [tableComponent, setTableComponent] = useState(null);
  const tableType = {
    FMEA : "fmeaTable",
    riskOportunity: "riskOportunity",
    actions: "actions",
    myActions: "myActions"
  }
  const [numPagination, setNumPagination] = useState(10);
  const [numCaracteres, setNumCaracteres] = useState(40);

  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();




  const riskManagementListAPI = useSelector(state => state.fuse.riskManagementComponente.riskManagementListAPI);
  const rmRegistrosListAPI = useSelector(state => state.fuse.rmAccionComponente.rmRegistrosListAPI);
  const rmAccionesListAPIHome = useSelector(state => state.fuse.rmAccionComponente.rmAccionesListAPIHome);
  const rmMisAccionesListAPI = useSelector(state => state.fuse.rmAccionComponente.rmMisAccionesListAPI);
  const [averageScore, setAverageScore] = useState(0);
  const [ROrevaluated, setROrevaluated] = useState(0);
  const [modalRisk, setModalRisk] = useState(false);
  const [modalRYO, setModalRYO] = useState(false);
  const [modalAcciones, setModalAcciones] = useState(false);
  const [modalMisAcciones, setModalMisAcciones] = useState(false);
  const [estadoFiltros, setEstadoFiltros] = useState('all');
  const [vectAcciones, setVectAcciones] = useState([]);


  //CONSULTAS PARA ABRIR EL R&O SELECCIONADO
  const cambiarVisibilidadModalPrincipal = (valor) => dispatch(cambiarVisibilidadModalPrincipalAction(valor))
  const mostrarRmRegistroAPI = (id_risk_management) => dispatch(mostrarRmRegistroAPIAction(id_risk_management))
  const mostrarRmRegistroLastVersionAPI = (id_risk_management) => dispatch(mostrarRmRegistroLastVersionAPIAction(id_risk_management))
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionAction(valor))
  //FIN CONSULTAS PARA ABRIR EL R&O SELECCIONADO

  useEffect(() => {
    let contadorScore = 0

    for (let itemRO in rmRegistrosListAPI) {
      contadorScore = contadorScore + parseInt(rmRegistrosListAPI[itemRO].npr)
    }

    if (contadorScore != 0) {
      let dataAS = contadorScore / rmRegistrosListAPI.length
      setAverageScore(dataAS.toFixed(1))
    }
    else {
      setAverageScore(0)
    }

    let reEvaluados = rmRegistrosListAPI.filter(elemento => elemento.rev != 1)
    setROrevaluated(reEvaluados.length)

  }, [rmRegistrosListAPI])

  useEffect(() => {
    if (rmAccionesListAPIHome != undefined && rmAccionesListAPIHome != null && rmAccionesListAPIHome.length > 0) {
      setVectAcciones(rmAccionesListAPIHome)
    }

  }, [rmAccionesListAPIHome])

  useEffect(() => {
    if (estadoFiltros == "all") {
      setVectAcciones(rmAccionesListAPIHome)
    }
    else {
      if (estadoFiltros == "completed") {
        setVectAcciones(rmAccionesListAPIHome.filter(elemento => elemento.completed == true))
      }
      else if (estadoFiltros == "noCompleted") {
        setVectAcciones(rmAccionesListAPIHome.filter(elemento => elemento.completed == false))
      }
    }

  }, [estadoFiltros]);

  return (
    <>
      <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start justify-between">
          <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
            Risk Module Details
          </Typography>
        </div>
        <div className="flex flex-col">
          <Typography className="font-medium" color="text.secondary">
            Details
          </Typography>

          <div className="flex-auto grid grid-cols-10 gap-16 mt-24">
            <div className="col-span-5 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-indigo-50 text-indigo-800" style={{ cursor: 'pointer' }}
              onClick={() => {
                if (riskManagementListAPI.length != 0) {
                  setModalRisk(true);
                  setTableForRender(tableType.FMEA);
                }
              }}>
              <Typography className="text-5xl sm:text-6xl font-semibold leading-none tracking-tight">
                {riskManagementListAPI.length}
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">FMEA</Typography>
            </div>
            <div className="col-span-5 flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-green-50 text-green-800" style={{ cursor: 'pointer' }}
              onClick={() => {
                if (rmRegistrosListAPI.length != 0) {
                  setModalRYO(true);
                  setTableForRender(tableType.riskOportunity);
                }
              }}>
              <Typography className="text-5xl sm:text-6xl font-semibold leading-none tracking-tight">
                {rmRegistrosListAPI.length}

              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">Risk & Opportunities</Typography>
            </div>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl" style={{ cursor: 'pointer' }}
              onClick={() => {
                if (rmAccionesListAPIHome.length != 0) {
                  setModalAcciones(true);
                  setTableForRender(tableType.actions);
                }
              }}>
              <Typography className="text-4xl font-semibold leading-none tracking-tight">
                {rmAccionesListAPIHome.length}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Total actions</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-4xl font-semibold leading-none tracking-tight">
                {rmAccionesListAPIHome.filter(elemento => elemento.completed == false).length}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">Open actions</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl" style={{ cursor: 'pointer' }}
              onClick={() => {
                if (rmMisAccionesListAPI.length != 0) {
                  setModalMisAcciones(true);
                  setTableForRender(tableType.myActions);
                }
              }}>
              <Typography className="text-4xl font-semibold leading-none tracking-tight">
                {rmMisAccionesListAPI.length}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">My actions</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-4xl font-semibold leading-none tracking-tight">
                {ROrevaluated}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">R&O re-evaluated</Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: (_theme) =>
                  _theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="col-span-2 sm:col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-4xl font-semibold leading-none tracking-tight">
                {averageScore}
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">NPR Score</Typography>
            </Box>
          </div>
        </div>

      </Paper>

      <Dialog open={modalRisk} fullWidth maxWidth='lg'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          FMEA
        </DialogTitle>
        <DialogContent>

          {tableComponent && tableComponent}

        </DialogContent>

        <DialogActions>

          <Button variant="outlined" onClick={() => setModalRisk(false)}>Close</Button>

        </DialogActions>

      </Dialog>

      <Dialog open={modalRYO} fullWidth maxWidth='xl'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Risk & Opportunities
        </DialogTitle>
        <DialogContent>

          {tableComponent && tableComponent}

        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setModalRYO(false)}>Close</Button>

        </DialogActions>

      </Dialog>

      <Dialog open={modalAcciones} fullWidth maxWidth='xl'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Actions
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button style={estadoFiltros == "noCompleted" ? { backgroundColor: 'blue', color: 'white' } : { backgroundColor: 'white', color: 'black' }} onClick={() => { setEstadoFiltros("noCompleted") }}>Actions to be completed</Button>
              <Button style={estadoFiltros == "completed" ? { backgroundColor: 'blue', color: 'white' } : { backgroundColor: 'white', color: 'black' }} onClick={() => { setEstadoFiltros("completed") }}>Actions completed</Button>
              <Button style={estadoFiltros == "all" ? { backgroundColor: 'blue', color: 'white' } : { backgroundColor: 'white', color: 'black' }} onClick={() => { setEstadoFiltros("all") }}>All</Button>
            </ButtonGroup>
          </Box>

          {tableComponent && tableComponent}

        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setModalAcciones(false)}>Close</Button>

        </DialogActions>

      </Dialog>

      <Dialog open={modalMisAcciones} fullWidth maxWidth='xl'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          My actions
        </DialogTitle>
        <DialogContent>

          <div className="radialbar">
            <Alert severity="error">
              <AlertTitle>In this section you cannot directly access the action because you may not be assigned to the mission and do not have access to this data.</AlertTitle>
            </Alert>
          </div>

          {tableComponent && tableComponent}


        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setModalMisAcciones(false)}>Close</Button>

        </DialogActions>

      </Dialog>
    </>
  );
}

export default memo(DetallesRisk);

