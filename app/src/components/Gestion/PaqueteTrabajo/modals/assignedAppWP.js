//**********************IMPORTACIONES****************************

import { React, useEffect, useState, useRef } from 'react'
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';

import GruposRequerimientos from '../../Componentes/GruposRequerimientos'
import SimilitudRequerimientos from '../../Componentes/SimilitudRequerimientos'
import ListRequerimentsMain from '../../Componentes/ListRequerimentsMain'
import NewRequeriment from '../../Componentes/NewRequeriment'


//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarVisibilidadModalRequerimentsAPIAction,
  mostrarAllRequerimentsByWorkPackageAPIAction,
  postWorkPackageAppAPIAction,
  deleteWorkPackageAppAPIAction
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


export default function assignedAppWP() {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [verSimilitudRequerimientos, setVerSimilitudRequerimientos] = useState(false)
  const [valorTab, setValorTab] = useState('requeriments')
  const [wpSelect, setWPSelect] = useState('')
  const [nombreContrato, setNombreContrato] = useState('')

  const [disabledAddRequeriment, setDisabledAddRequeriment] = useState(true)
  const [disabledRemoveRequeriment, setDisabledRemoveRequeriment] = useState(true)

  const visibilidadModalRequeriments = useSelector(state => state.fuse.misionPaqueteComponente.visibilidadModalRequeriments)
  const filaSeleccionadaGrid = useSelector(state => state.fuse.misionPaqueteComponente.filaSeleccionadaGrid)
  const listRequerimentsByWP = useSelector(state => state.fuse.misionPaqueteComponente.listRequerimentsByWP)
  const listMisionPaquetesAPI = useSelector(state => state.fuse.misionPaqueteComponente.listMisionPaquetesAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  const cambiarVisibilidadModalRequerimentsAPI = (valorNuevo) => dispatch(cambiarVisibilidadModalRequerimentsAPIAction(valorNuevo))
  const mostrarAllRequerimentsByWPAPI = (idWP) => dispatch(mostrarAllRequerimentsByWorkPackageAPIAction(idWP))
  const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
  const mostrarALLUserAppAPI = () => dispatch(mostrarALLUserAppAPIAction())

  const cambiarEstado = (event, newValue) => {
    setValorTab(newValue)
  }

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can change wp app") == undefined) {
        setDisabledAddRequeriment(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete wp app") == undefined) {
        setDisabledRemoveRequeriment(false)
      }

    }

  }, [personLoginPermisos])

  useEffect(() => {

  }, []);

  useEffect(() => {

    if (visibilidadModalRequeriments == true) {
      mostrarAppAPI()
      mostrarALLUserAppAPI()
    }

  }, [visibilidadModalRequeriments]);

  useEffect(() => {

    if (filaSeleccionadaGrid != '') {
      let misionesCopia = [...listMisionPaquetesAPI]
      let wpSelectedAsigned = misionesCopia.filter(option => option.id == filaSeleccionadaGrid)[0]
      if (wpSelectedAsigned != undefined) {
        setWPSelect(wpSelectedAsigned)
        mostrarAllRequerimentsByWPAPI(filaSeleccionadaGrid)
        setNombreContrato(wpSelectedAsigned.name)
      }

    }

  }, [filaSeleccionadaGrid, listMisionPaquetesAPI]);

  return (
    <Dialog open={visibilidadModalRequeriments} onClose={() => cambiarVisibilidadModalRequerimentsAPI(false)} fullWidth maxWidth='lg'
      PaperProps={{
        sx: {
          minHeight: "75%"
        }
      }}>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        Assign requirements to wp: {nombreContrato}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          spacing={2} columns={16}>
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            item xs={disabledAddRequeriment == true ? 6 : 16}>

            <div style={{ width: '100%', textAlign: 'center', display: listRequerimentsByWP.length != 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                REQUIREMENTS ASSIGNED:
                <IconButton size="small" onClick={() => setVerSimilitudRequerimientos(true)}><InfoOutlined /></IconButton>
                <Divider style={{ width: '100%' }} />
              </span>
            </div>

            <div style={{ width: '100%', textAlign: 'center', display: listRequerimentsByWP.length == 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                There are no requirements assigned to this Work Package
              </span>
            </div>

            <ListRequerimentsMain
              tipoLista={"listRequerimentsSimple"}
              grupo={'wp'}
              listRequeriments={listRequerimentsByWP}
              disabledDeleteRequeriment={disabledRemoveRequeriment}
            />

          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            style={disabledAddRequeriment == true ? { display: '' } : { display: 'none' }}
            item xs={10}>

            <div style={{ width: '100%', textAlign: 'center' }}>
              <span className="font-semibold">
                NEW WORK PACKAGE REQUIREMENTS
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
              <GruposRequerimientos grupo={'wp'} wpSelect={wpSelect} />
            </div>

            <div style={valorTab == 'requeriments' ? {} : { display: "none" }}>
              <NewRequeriment grupo={'wp'} wpSelect={wpSelect} />
            </div>



          </Grid>
        </Grid>


      </DialogContent>
      <DialogActions>
        <Button onClick={() => { cambiarVisibilidadModalRequerimentsAPI(false) }}>Close</Button>
      </DialogActions>

      <Dialog open={verSimilitudRequerimientos} fullWidth maxWidth='sm'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Shared requirements between the group and the work package
        </DialogTitle>
        <DialogContent>
          <SimilitudRequerimientos grupo={'wp'} wpSelect={wpSelect} />
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVerSimilitudRequerimientos(false)}>Close</Button>

        </DialogActions>

      </Dialog>

    </Dialog>
  )
}

