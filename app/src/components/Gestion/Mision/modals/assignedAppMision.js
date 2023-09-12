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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarVisibilidadModalRequerimentsAPIAction,
  mostrarAllRequerimentsByMisionAPIAction,
  postMisionAppAPIAction,
  deleteMisionAppAPIAction
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


export default function assignedAppMision() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [valorTab, setValorTab] = useState('requeriments')
  const [misionSelect, setMisionSelect] = useState('')
  const [nombreContrato, setNombreContrato] = useState('')

  const [disabledAddRequeriment, setDisabledAddRequeriment] = useState(true)
  const [disabledRemoveRequeriment, setDisabledRemoveRequeriment] = useState(true)

  const [verSimilitudRequerimientos, setVerSimilitudRequerimientos] = useState(false)

  const visibilidadModalRequeriments = useSelector(state => state.fuse.misionComponent.visibilidadModalRequeriments)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.misionComponent.filaSeleccionadaGrid)
  const listRequerimentsByMision = useSelector(state => state.fuse.misionComponent.listRequerimentsByMision)
  const listMisionAPI = useSelector(state => state.fuse.misionComponent.listMisionAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  const cambiarVisibilidadModalRequerimentsAPI = (valorNuevo) => dispatch(cambiarVisibilidadModalRequerimentsAPIAction(valorNuevo))
  const mostrarAllRequerimentsByMisionAPI = (idMision) => dispatch(mostrarAllRequerimentsByMisionAPIAction(idMision))
  const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
  const mostrarALLUserAppAPI = () => dispatch(mostrarALLUserAppAPIAction())

  const cambiarEstado = (event, newValue) => {
    setValorTab(newValue)
  }

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can view mision app") == undefined) {
        navigate('/')
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can change mision app") == undefined) {
        setDisabledAddRequeriment(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete mision app") == undefined) {
        setDisabledRemoveRequeriment(false)
      }

    }

  }, [personLoginPermisos])

  useEffect(() => {

    if (visibilidadModalRequeriments == true) {
      mostrarAppAPI()
      mostrarALLUserAppAPI()
    }

  }, [visibilidadModalRequeriments]);

  useEffect(() => {

    if (filaSeleccionadaGrid != '') {
      let misionSelectedAsigned = listMisionAPI.filter(option => option.id == filaSeleccionadaGrid)[0]
      setMisionSelect(misionSelectedAsigned)
      mostrarAllRequerimentsByMisionAPI(filaSeleccionadaGrid)
      setNombreContrato(misionSelectedAsigned.name)
    }

  }, [filaSeleccionadaGrid, listMisionAPI]);

  return (
    <Dialog open={visibilidadModalRequeriments} onClose={() => cambiarVisibilidadModalRequerimentsAPI(false)} fullWidth maxWidth='lg'
      PaperProps={{
        sx: {
          minHeight: "75%"
        }
      }}>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        Assign requirements to mision: {nombreContrato}
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

            <div style={{ width: '100%', textAlign: 'center', display: listRequerimentsByMision.length != 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                REQUIREMENTS ASSIGNED: 
                <IconButton size="small" onClick={() => setVerSimilitudRequerimientos(true)}><InfoOutlined /></IconButton>
                <Divider style={{ width: '100%' }} />
              </span>
            </div>

            <div style={{ width: '100%', textAlign: 'center', display: listRequerimentsByMision.length == 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                There are no requirements assigned to this sub mision
              </span>
            </div>

            <ListRequerimentsMain
              tipoLista={"listRequerimentsMision"}
              grupo={'mision'}
              listRequeriments={listRequerimentsByMision}
              disabledDeleteRequeriment={disabledRemoveRequeriment}
            />

          </Grid>

          <Grid container
            direction="row"
            justifyContent="center"
            style={disabledAddRequeriment == true ? { display: '' } : { display: 'none' }}
            alignItems="flex-start" item xs={9}>

            <div style={{ width: '100%', textAlign: 'center' }}>
              <span className="font-semibold">
                NEW MISION REQUIREMENTS
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
              <GruposRequerimientos grupo={'mision'} misionSelect={misionSelect} />
            </div>

            <div style={valorTab == 'requeriments' ? {} : { display: "none" }}>
              <NewRequeriment grupo={'mision'} misionSelect={misionSelect} />
            </div>


          </Grid>
        </Grid>


      </DialogContent>
      <DialogActions>
        <Button onClick={() => {cambiarVisibilidadModalRequerimentsAPI(false) }}>Close</Button>
      </DialogActions>

      <Dialog open={verSimilitudRequerimientos} fullWidth maxWidth='sm'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Shared requirements between the group and the mission
        </DialogTitle>
        <DialogContent>
          <SimilitudRequerimientos grupo={'mision'} misionSelect={misionSelect} />
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVerSimilitudRequerimientos(false)}>Close</Button>

        </DialogActions>

      </Dialog>


    </Dialog>
  )
}

