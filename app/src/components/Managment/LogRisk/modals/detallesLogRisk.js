//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Tooltip from '@mui/material/Tooltip';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { showMessage } from 'app/store/fuse/messageSlice'
import IconButton from "@mui/material/IconButton";
//Grid importaciones
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getCookie } from 'app/js/generalFunctions'

import {
  mostrarLogRiskAPIAction,
  mostrarLogRiskAmfeAPIAction,
  mostrarLogRiskRoAPIAction,
  mostrarLogRiskAccionesByRoAPIAction,
  mostrarLogRiskAccionAPIAction,
  insertarLogRiskAPIAction,
  verModalDetallesLogRiskAPIAction
} from '../store/actions'

import {
  getSesionActualAPIAction,
  mostrarUserAPIAction
} from '../../Users/store/actions'

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

import TableModules from '../../../tables/TableModules'

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});

export default function DetallesLogRisk() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [numPagination, setNumPagination] = useState(10)

  const loading = useSelector(state => state.fuse.logRiskComponente.loading)
  const verModalInsertarObservaciones = useSelector(state => state.fuse.logRiskComponente.visibilidadDiaologoDetallesLogRisk)
  const modoModalInsertarObservaciones = useSelector(state => state.fuse.logRiskComponente.modoDialogoDetallesLogRisk)
  const logRiskListAPI = useSelector(state => state.fuse.logRiskComponente.logRiskListAPI)

  const personLogin = useSelector(state => state.fuse.userComponente.person)

  const verModalDetallesLogRiskAPI = (modo, valor) => dispatch(verModalDetallesLogRiskAPIAction(modo, valor))
  const mostrarLogRiskAPI = () => dispatch(mostrarLogRiskAPIAction());

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Action", accessor: "accion", sortable: true, type: 'string' },
    { Header: "Person", accessor: "emailPersona", sortable: true, type: 'list' },
    { Header: "Date", accessor: "fecha_accion", sortable: true, type: 'date' },
    { Header: "Time", accessor: "hora_accion", sortable: true, type: 'string' },
    { Header: "Description", accessor: "description", sortable: true, type: 'string' }
  ]

  const columnasDataTableAction = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "Name Action", accessor: "accion_name", sortable: true, type: 'string' },
    { Header: "Action", accessor: "accion", sortable: true, type: 'string' },
    { Header: "Person", accessor: "emailPersona", sortable: true, type: 'list' },
    { Header: "Date", accessor: "fecha_accion", sortable: true, type: 'date' },
    { Header: "Time", accessor: "hora_accion", sortable: true, type: 'string' },
    { Header: "Description", accessor: "description", sortable: true, type: 'string' }
  ]

  function botonesSuperiores() {
    return (
      <>

        <div style={{ margin: "5px" }}>
          <IconButton sx={{ color: '#FFFFFF' }}
            onClick={() => { }}>
            <ManageSearchIcon />
          </IconButton>
        </div>

        <Divider />
      </>
    );
  }

  return (
    <>

      <Dialog open={verModalInsertarObservaciones} fullWidth maxWidth='lg' onClose={() => { verModalDetallesLogRiskAPI(false, '') }}>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Version history of {modoModalInsertarObservaciones}
        </DialogTitle>
        <DialogContent>
          <div style={{ width: '100%' }}>
            {botonesSuperiores()}
            <TableModules rowsProp={logRiskListAPI} columnsProp={modoModalInsertarObservaciones == "R&O actions" ? columnasDataTableAction : columnasDataTable} loading={loading} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => verModalDetallesLogRiskAPI(false, '')}>Close</Button>
        </DialogActions>

      </Dialog>
    </>
  );
}

