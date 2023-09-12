//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import * as moment from 'moment';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import IconButton from "@mui/material/IconButton";
import ReactSpeedometer from "react-d3-speedometer"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import ListSubheader from '@mui/material/ListSubheader';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import Help from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';

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

//Grid importaciones

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarVisibilidadModalPrincipalAction,
  cambiarVisibilidadModalInsertarRmRiskOpportunityAction,
  mostrarRmRegistroAPIAction,
  cambiarVisibilidadModalHistoricoRmRiskOpportunityAction,
  consultaRiskOpportunityOrganigramaAPIAction,
  cambiarEstadoRmRegistroAction
} from '../store/actions'
import store from "app/store/index"

import {
  cambiarEstadoRmTasksAction,
  mostrarRmAccionAPIAction
} from '../../tasks/store/actions'

import {
  cambiarValorSeleccionRmRiskOpportunityAction
} from '../store/actions'

import Chart from 'react-apexcharts';
import './estilos.css';

import TableModules from '../../../../../tables/TableModules'

//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});


export default function ModalHistoricoRisk() {

  const classes = useStyles();
  const dispatch = useDispatch()

  //estados locales del formulario

  const [numPagination, setNumPagination] = useState(10)
  const [filaHistoricoSelect, setFilaHistoricoSelect] = useState('')
  const [roSelect, setRoSelect] = useState('')

  // Obtener los states de Redux
  const loading = useSelector(state => state.fuse.rmRegistroComponente.loading)
  const visibilidadModalHistorico = useSelector(state => state.fuse.rmRegistroComponente.visibilidadModalHistorico)
  const roFilaSeleccionada = useSelector(state => state.fuse.rmRegistroComponente.filaSeleccionadaGrid)
  const listOrganigramaRiskOportunitys = useSelector(state => state.fuse.rmRegistroComponente.listOrganigramaRiskOportunitys)
  const rmRegistrosListAPI = useSelector(state => state.fuse.rmRegistroComponente.rmRegistrosListAPI)

  //Creamos funciones para hacer uso de Actions Redux
  const consultaRiskOpportunityOrganigramaAPI = (idRisk) => dispatch(consultaRiskOpportunityOrganigramaAPIAction(idRisk))
  const cambiarVisibilidadModalHistoricoRmRiskOpportunity = (valor) => dispatch(cambiarVisibilidadModalHistoricoRmRiskOpportunityAction(valor))
  const cambiarVisibilidadModalPrincipal = (valor) => dispatch(cambiarVisibilidadModalPrincipalAction(valor))
  const cambiarValorSeleccion = (valor) => dispatch(cambiarValorSeleccionRmRiskOpportunityAction(valor))

  useEffect(() => {
    if (roFilaSeleccionada != '' && filaHistoricoSelect == '') {
      consultaRiskOpportunityOrganigramaAPI(roFilaSeleccionada)

      let riskOportunitySelect = rmRegistrosListAPI.filter(elemento => elemento.id == roFilaSeleccionada)[0]
      if (riskOportunitySelect != undefined) {
        setRoSelect(riskOportunitySelect)
      }

    }

  }, [roFilaSeleccionada])

  useEffect(() => {
    if (visibilidadModalHistorico == true) {
      cambiarValorSeleccion('');
    }
  }, [visibilidadModalHistorico])

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
        <div style={{ margin: "5px" }}>
          <Tooltip title="Actions" placement="top">
            <IconButton onClick={
              () => {
                dispatch(mostrarRmAccionAPIAction(roFilaSeleccionada));
                dispatch(cambiarEstadoRmTasksAction('visibilidad', true));
                dispatch(cambiarEstadoRmTasksAction('visibilidadNuevaAccion', true));
                dispatch(cambiarEstadoRmRegistroAction('modo', ''))
              }
            } disabled={roFilaSeleccionada != '' ? false : true}>
              <AddTaskIcon />

            </IconButton>
          </Tooltip>
        </div>

        <Divider />
      </>
    );
  }

  function setValoresRowSelect(row) {
    setFilaHistoricoSelect(row);
    cambiarValorSeleccion(row);
  }

  return (

    <Dialog open={visibilidadModalHistorico} disableScrollLock={false} onClose={() => { cambiarVisibilidadModalHistoricoRmRiskOpportunity(false), cambiarValorSeleccion('') }} fullWidth maxWidth='xl'>

      <DialogTitle classes={{ root: classes.customDialogTitle }} >

        Risk opportunity historian: {roSelect.risk}

      </DialogTitle>
      <DialogContent>
        <div style={{ width: '100%' }}>
          {botonesSuperiores()}
          <TableModules rowsProp={listOrganigramaRiskOportunitys} columnsProp={columnasDataTable} loading={loading} funcionSetValue={setValoresRowSelect} />
        </div>

      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => { cambiarVisibilidadModalHistoricoRmRiskOpportunity(false), cambiarValorSeleccion('') }}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

