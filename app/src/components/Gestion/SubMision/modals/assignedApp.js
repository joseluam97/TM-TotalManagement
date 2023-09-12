//**********************IMPORTACIONES****************************

import * as React from 'react';
import { useEffect, useState, useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { showMessage } from 'app/store/fuse/messageSlice'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@material-ui/core/Typography';
import { matchRoutes, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarVisibilidadModalAssignedAppAPIAction,
  obtenerContractAppAPIAction,
  deleteContractUserAPIAction,
  postContractAppAPIAction,
  deleteContractAppAPIAction,
  getAllJobAPIAction
} from '../store/actions'

import {
  mostrarContratoServicioAPIAction
} from '../../ContratoServicio/store/actions'

import {
  mostrarUserAPIAction
} from '../../../Managment/Users/store/actions'

import {
  mostrarAppAPIAction
} from '../../../Managment/App/store/actions'

import {
  mostrarALLUserAppAPIAction
} from '../../../TabsExcel/PeopleManagement/Items/Aplications/store/actions'

import {
  mostrarGruposRequerimientosAPIAction
} from '../../../Managment/App/store/actions'

import GruposRequerimientos from '../../Componentes/GruposRequerimientos'
import SimilitudRequerimientos from '../../Componentes/SimilitudRequerimientos'
import ListRequerimentsMain from '../../Componentes/ListRequerimentsMain'
import NewRequeriment from '../../Componentes/NewRequeriment'

//**********************END_IMPORTACIONES ***********************/


const useStyles = makeStyles({

  customDialogTitle: {
    backgroundColor: 'rgb(0, 0, 0)',
     
    color: 'rgb(255, 255, 255)',
    marginBottom: '1em'
  }

});


const modulos = [
  'Risk',
  'Users',
];


export default function assignedApp() {

  const location = useLocation();
  const { pathname } = location;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [verSimilitudRequerimientos, setVerSimilitudRequerimientos] = useState(false)
  const [valorTab, setValorTab] = useState('requeriments')
  const [subMisionSelect, setSubMisionSelect] = useState('')
  const [nombreContrato, setNombreContrato] = useState('')
  const [estamosDepartamento, setEstamosDepartamento] = useState(false);

  const [disabledAddRequeriment, setDisabledAddRequeriment] = useState(true)
  const [disabledDeleteRequeriment, setDisabledDeleteRequeriment] = useState(true)

  const [estadoFiltros, setEstadoFiltros] = useState('all')
  const [vectorTrabajosUnicos, setVectorTrabajosUnicos] = useState([])

  const [vectContractAppFilter, setVectContractAppFilter] = useState([])

  const visibilidadModalAssignedApp = useSelector(state => state.fuse.subMisionComponent.visibilidadModalAssignedApp)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.subMisionComponent.filaSeleccionadaGrid)
  const listContractApp = useSelector(state => state.fuse.subMisionComponent.listContractApp)
  const listSubMisionAPI = useSelector(state => state.fuse.subMisionComponent.listSubMisiones)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  const cambiarVisibilidadModalAssignedAppAPI = (valorNuevo) => dispatch(cambiarVisibilidadModalAssignedAppAPIAction(valorNuevo))
  const mostrarContratoServicioAPI = () => dispatch(mostrarContratoServicioAPIAction())
  const obtenerContractAppAPI = (datos) => dispatch(obtenerContractAppAPIAction(datos))
  const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
  const mostrarALLUserAppAPI = () => dispatch(mostrarALLUserAppAPIAction())
  const getAllJobAPI = (idSubMision) => dispatch(getAllJobAPIAction(idSubMision))
  const mostrarGruposRequerimientosAPI = (fila) => dispatch(mostrarGruposRequerimientosAPIAction())

  const cambiarEstado = (event, newValue) => {
    setValorTab(newValue)
  }

  useEffect(() => {
    if (estadoFiltros == "all") {
      setVectContractAppFilter(listContractApp)
    }
    else {
      setVectContractAppFilter(listContractApp.filter(elemento => elemento.job_code == estadoFiltros))
    }

  }, [estadoFiltros])

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add contract app") == undefined) {
        setDisabledAddRequeriment(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete contract app") == undefined) {
        setDisabledDeleteRequeriment(false)
      }

    }

  }, [personLoginPermisos])

  useEffect(() => {
    mostrarGruposRequerimientosAPI()
  }, []);

  useEffect(() => {

    if (visibilidadModalAssignedApp == true) {
      mostrarContratoServicioAPI()
      mostrarAppAPI()
      mostrarALLUserAppAPI()

      //COMPROBAR SI ESTAMOS EN DEPARTAMENTO
      if (pathname == "/pages/gestiones/department") {
        setEstamosDepartamento(true)
      }
    }


  }, [visibilidadModalAssignedApp]);

  useEffect(() => {

    if (filaSeleccionadaGrid != '') {
      let subMisionSelectedAsigned = listSubMisionAPI.filter(option => option.id == filaSeleccionadaGrid)[0]
      setSubMisionSelect(subMisionSelectedAsigned)
      obtenerContractAppAPI(filaSeleccionadaGrid)
      setNombreContrato(subMisionSelectedAsigned.name)
      getAllJobAPI(filaSeleccionadaGrid)
    }

  }, [filaSeleccionadaGrid, listSubMisionAPI]);

  useEffect(() => {

    setVectContractAppFilter(listContractApp)

    const listJobUniques = [...new Set(listContractApp.map((contract) => contract.job_code))];
    setVectorTrabajosUnicos(listJobUniques)

  }, [listContractApp]);

  return (
    <Dialog open={visibilidadModalAssignedApp} onClose={() => cambiarVisibilidadModalAssignedAppAPI(false)} fullWidth maxWidth='lg'
      PaperProps={{
        sx: {
          minHeight: "75%"
        }
      }}>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        Assign requirements to {estamosDepartamento == true ? 'technician' : 'sub mision'}: {nombreContrato}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2} columns={16}>
          <Grid container
            item xs={disabledAddRequeriment == true ? 6 : 15}>
            <div style={{ width: '100%', textAlign: 'center', marginBottom: '2%', display: listContractApp.length != 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                REQUIREMENTS ASSIGNED:
                <IconButton size="small" onClick={() => setVerSimilitudRequerimientos(true)}><InfoOutlined /></IconButton>

                <ButtonGroup variant="outlined" aria-label="outlined button group">
                  <Button style={estadoFiltros == "all" ? { backgroundColor: 'blue', color: 'white' } : { backgroundColor: 'white', color: 'black' }} onClick={() => { setEstadoFiltros("all") }}>All</Button>
                  {vectorTrabajosUnicos.map((nomModulo) => {
                    return (
                      <Button style={estadoFiltros == nomModulo ? { backgroundColor: 'blue', color: 'white' } : { backgroundColor: 'white', color: 'black' }} onClick={() => { setEstadoFiltros(nomModulo) }}>{nomModulo}</Button>
                    );
                  })}

                </ButtonGroup>
                <Divider style={{ width: '100%' }} />
              </span>
            </div>

            <div style={{ width: '100%', textAlign: 'center', display: listContractApp.length == 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                There are no requirements assigned to this {estamosDepartamento == true ? 'technician' : 'sub mision'}
              </span>
            </div>

            <ListRequerimentsMain
              tipoLista={"listRequerimentsContractApp"}
              grupo={'subMision'}
              listRequeriments={vectContractAppFilter}
              disabledDeleteRequeriment={disabledDeleteRequeriment}
            />

          </Grid>

          <Divider style={disabledAddRequeriment == true ? { display: "block" } : { display: "none" }} orientation="vertical" flexItem />

          <Grid container
            direction="row"
            justifyContent="center"
            style={disabledAddRequeriment == true ? { display: "" } : { display: "none" }}
            alignItems="flex-start" item xs={9}>

            <div style={{ width: '100%', textAlign: 'center', marginBottom: '2%' }}>
              <span className="font-semibold">
                NEW {estamosDepartamento == true ? 'TECHNICIAN' : 'SUB MISION'} REQUIREMENTS
                <Divider style={{ width: '100%' }} />
              </span>
            </div>

            <Tabs
              value={valorTab}
              onChange={cambiarEstado}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="requeriments" label="Requeriments" />
              <Tab value="gruposRequerimientos" label="Requirement groups" />

            </Tabs>

            <div style={valorTab == 'gruposRequerimientos' ? {} : { display: "none" }}>
              <GruposRequerimientos grupo={'subMision'} subMisionSelect={subMisionSelect} />
            </div>

            <div style={valorTab == 'requeriments' ? {} : { display: "none" }}>
              <NewRequeriment grupo={'subMision'} subMisionSelect={subMisionSelect} />
            </div>


          </Grid>
        </Grid>


      </DialogContent>
      <DialogActions>
        <Button onClick={() => { cambiarVisibilidadModalAssignedAppAPI(false) }}>Close</Button>
      </DialogActions>

      <Dialog open={verSimilitudRequerimientos} fullWidth maxWidth='sm'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Shared requirements between the group and the sub-mission
        </DialogTitle>
        <DialogContent>
          <SimilitudRequerimientos grupo={'subMision'} subMisionSelect={subMisionSelect} />
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVerSimilitudRequerimientos(false)}>Close</Button>

        </DialogActions>

      </Dialog>

    </Dialog>
  )
}

