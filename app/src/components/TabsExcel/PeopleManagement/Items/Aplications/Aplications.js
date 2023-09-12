//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
//import * as React from 'react';

//DataGrid importaciones
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import FusePageCarded from '@fuse/core/FusePageCarded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'

import {
  getPermisosSesionActualAPIAction,
  getSesionActualAPIAction,
  mostrarUserAPIAction
} from '../../../../Managment/Users/store/actions'

import {
  cambiarValorTabPeopleAction
} from '../../store/actions'

import {
  mostrarUserAppAPIAction,
  verModalAnadirAppPersonaAPIAction,
  getResultUserAppByTeamAPIAction,
  seleccionarItemTeamRequerimentAPIAction,
  verModalDetallesRequerimientosUserAPIAction,
  deleteUserAppAPIAction
} from './store/actions'


//Modales importaciones
import { getCookie } from 'app/js/generalFunctions'

import ModalAnadirAppPersona from '../modals/anadirAppPersona.js'
import TableModules from '../../../../tables/TableModules'
import TableModulesGroupBy from '../../../../tables/TableModulesGroupBy'
import ModalDetallesUserAppTeam from './modals/detallesUserAppTeam'

//**********************END_IMPORTACIONES ***********************/

const useStyles = makeStyles({

  customButtomPrograma: {

    margin: '1em'
  }

});

export default function Aplications() {

  const classes = useStyles();
  const navigate = useNavigate();

  const [numPagination, setNumPagination] = useState(10)

  const [disabledNewApp, setDisabledNewApp] = useState(true)
  const [disabledEditApp, setDisabledEditApp] = useState(true)
  const [disabledRemoveApp, setDisabledRemoveApp] = useState(true)
  const [visibilidadDialogoConfirmacion, setVisibilidadDialogoConfirmacion] = useState(false)

  const [idSeleccionado, setIdSeleccionado] = useState('')

  //obtener el state de Redux
  const loading = useSelector(state => state.fuse.aplicationComponent.loading)
  const listUserApp = useSelector(state => state.fuse.aplicationComponent.listUserApp)
  const listResultUserAppByTeam = useSelector(state => state.fuse.aplicationComponent.listResultUserAppByTeam)
  const verModalAnadirAppPersona = useSelector(state => state.fuse.aplicationComponent.verModalAnadirAppPersona)
  const valorTab = useSelector(state => state.fuse.peopleManagementComponente.valorTabPeople)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)
  const personLogin = useSelector(state => state.fuse.userComponente.person)
  const seleccionTableTeamRequeriment = useSelector(state => state.fuse.aplicationComponent.seleccionTableTeamRequeriment)

  //creamos una función para hacer uso de Actions
  const dispatch = useDispatch()
  const cambiarValorTab = (valorTab) => dispatch(cambiarValorTabPeopleAction(valorTab))
  const mostrarUserAppAPI = (idPerson) => dispatch(mostrarUserAppAPIAction(idPerson))
  const verModalAnadirAppPersonaAPI = (visible) => dispatch(verModalAnadirAppPersonaAPIAction(visible));
  const getResultUserAppByTeamAPI = (idUser) => dispatch(getResultUserAppByTeamAPIAction(idUser))
  const verModalDetallesRequerimientosUserAPI = (valor) => dispatch(verModalDetallesRequerimientosUserAPIAction(valor))
  const seleccionarItemTeamRequerimentAPI = (idSeleccionado) => dispatch(seleccionarItemTeamRequerimentAPIAction(idSeleccionado))
  const deleteUserAppAPI = (idItem, idUser) => dispatch(deleteUserAppAPIAction(idItem, idUser))

  const [usersPcs, setusersPcs] = useState('');

  const columnasDataUser = [
    { Header: "User", accessor: "user", sortable: true, type: 'list' },
    { Header: "Bloque", accessor: "bloque", sortable: true, type: 'list' },
    { Header: "Correspondencia", accessor: "correspondencia", sortable: true, type: 'list' },
    {
      Header: "Result",
      accessor: row => (row.data.length > 0 ? (row.data.filter(item => item.cumplimiento === true).length / row.data.length) * 100 : 'There aren´t requirements'),
      sortable: false,
      type: 'porcentaje'
    }

  ]

  const columnasDataTable = [
    { Header: "ID", accessor: "id", sortable: true, type: 'string' },
    { Header: "First Name", accessor: "user_id_first_name", sortable: true, type: 'string' },
    { Header: "Last Name", accessor: "user_id_last_name", sortable: true, type: 'string' },
    { Header: "Name", accessor: "aplication_user_id_name", sortable: true, type: 'string' },
    { Header: "Type", accessor: "aplication_user_type", sortable: true, type: 'string' },
    { Header: "Code", accessor: "aplication_user_id_code", sortable: true, type: 'string' },
    { 
      Header: "Extra value details", 
      accessor: row => {
        if(row.valor_asignado_fecha != null){
          return row.valor_asignado_fecha
        }
        if(row.valor_asignado != null){
          return row.valor_asignado
        }
        if(row.valor_comparacion != null){
          return row.valor_comparacion
        }
        return ''
      },
      sortable: true,
      type: 'string' }
  ]


  useEffect(() => {
    if (personLogin.id != undefined && personLogin.id != "") {
      getResultUserAppByTeamAPI(personLogin.id)
    }
  }, [personLogin])

  useEffect(() => {

    if (personLogin.id != undefined && personLogin.id != "" && valorTab == 'requirements') {
      mostrarUserAppAPI(personLogin.id)
    }

  }, [personLogin, valorTab])

  useEffect(() => {


    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add user app") == undefined) {
        setDisabledNewApp(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change user app") == undefined) {
        setDisabledEditApp(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete user app") == undefined) {
        setDisabledRemoveApp(false)
      }

    }

  }, [personLoginPermisos])

  function deleteUserApp(){
    deleteUserAppAPI(idSeleccionado, personLogin.id)
  }

  function botonesSuperioresRequerimientosEquipo() {
    return (
      <>
        <Tooltip title="Details" placement="top">
          <IconButton style={{ display: "inline" }} disabled={seleccionTableTeamRequeriment == '' ? true : false}>
            <InfoIcon variant="outlined" onClick={
              () => {
                verModalDetallesRequerimientosUserAPI(true)
              }
            }
            >
            </InfoIcon>
          </IconButton>
        </Tooltip>

        <Divider />
      </>
    );
  }

  function botonesSuperiores() {
    return (
      <>
        <Tooltip title="New" placement="top">
          <IconButton style={disabledNewApp == true ? { display: "inline" } : { display: "none" }}>
            <AddCircleIcon variant="outlined" onClick={
              () => {
                verModalAnadirAppPersonaAPI(true)
              }
            }
            >
            </AddCircleIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton disabled={idSeleccionado == "" ? true : false} style={disabledRemoveApp == true ? { display: "inline" } : { display: "none" }}
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
      <div style={valorTab == 'requirements' ? { display: "block", marginBottom: "100px" } : { display: "none" }} >

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Alert severity="info">
                <AlertTitle>The following list shows the degree of compliance with respect to the assigned block.</AlertTitle>
              </Alert>
            </div>

            {botonesSuperioresRequerimientosEquipo()}
            <TableModules rowsProp={listResultUserAppByTeam} columnsProp={columnasDataUser} loading={loading} funcionSetValue={seleccionarItemTeamRequerimentAPI} />
          </Grid>

          <Grid item xs={6}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Alert severity="info">
                <AlertTitle>The following list shows the requirements for our equipment.</AlertTitle>
              </Alert>
            </div>

            {botonesSuperiores()}
            <TableModules rowsProp={listUserApp} columnsProp={columnasDataTable} loading={loading} funcionSetValue={setIdSeleccionado}/>
          </Grid>
        </Grid>
      </div>
      <ModalAnadirAppPersona />
      <ModalDetallesUserAppTeam />

      <Dialog open={visibilidadDialogoConfirmacion} fullWidth maxWidth='xs'>

          <DialogTitle classes={{ root: classes.customDialogTitle }} >
            Confirmation
          </DialogTitle>
          <DialogContent>
            Are you sure you want to remove the assignment of the requirement to the person?
          </DialogContent>
          <DialogActions>

            <Button variant="outlined" onClick={() => setVisibilidadDialogoConfirmacion(false)}>Decline</Button>
            <Button variant="outlined" onClick={() => { deleteUserApp(), setVisibilidadDialogoConfirmacion(false) }}> Confirm</Button>

          </DialogActions>

        </Dialog>
    </>
  )
}

