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

//Grid importaciones
import Grid from '@mui/material/Grid';

//Redux importaciones
import { useDispatch, useSelector } from 'react-redux'
import {
  cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIAction,
  mostrarAllRequerimentsByDireccionDepartamentalAPIAction,
  postDireccionDepartamentalAppAPIAction,
  deleteDireccionDepartamentalAppAPIAction
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
import NewRequeriment from '../../Componentes/NewRequeriment'
import ListRequerimentsMain from '../../Componentes/ListRequerimentsMain'

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

  const [valorTab, setValorTab] = useState('requeriments')
  const [verSimilitudRequerimientos, setVerSimilitudRequerimientos] = useState(false)
  const [direccionDepartamentalSelect, setDireccionDepartamentalSelect] = useState('')
  const [nombreContrato, setNombreContrato] = useState('')

  const [disabledAddRequerimentDepartament, setDisabledAddRequerimentDepartament] = useState(true)
  const [disabledDeleteRequerimentDepartament, setDisabledDeleteRequerimentDepartament] = useState(true)

  const visibilidadModalRequerimentsDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.visibilidadModalRequerimentsDireccionDepartamental)
  const filaSeleccionadaGridDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.filaSeleccionadaGridDireccionDepartamental)
  const listRequerimentsByDireccionDepartamental = useSelector(state => state.fuse.departamentoViewComponente.listRequerimentsByDireccionDepartamental)
  const listAllDireccionesDepartamentalesAPI = useSelector(state => state.fuse.departamentoViewComponente.listAllDireccionesDepartamentalesAPI)
  const personLoginPermisos = useSelector(state => state.fuse.userComponente.personPermisos)

  const cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPI = (valorNuevo) => dispatch(cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPIAction(valorNuevo))
  const mostrarAllRequerimentsByDireccionDepartamentalAPI = (idWP) => dispatch(mostrarAllRequerimentsByDireccionDepartamentalAPIAction(idWP))
  const mostrarAppAPI = () => dispatch(mostrarAppAPIAction())
  const mostrarALLUserAppAPI = () => dispatch(mostrarALLUserAppAPIAction())

  const cambiarEstado = (event, newValue) => {
    setValorTab(newValue)
  }

  useEffect(() => {

    if (personLoginPermisos.length > 0) {

      if (personLoginPermisos.find((item) => item['name'] == "Can add direccion departamental app") == undefined) {
        setDisabledAddRequerimentDepartament(false)
      }

      if (personLoginPermisos.find((item) => item['name'] == "Can delete direccion departamental app") == undefined) {
        setDisabledDeleteRequerimentDepartament(false)
      }


    }

  }, [personLoginPermisos])

  useEffect(() => {

    mostrarAppAPI()
    mostrarALLUserAppAPI()

  }, []);

  useEffect(() => {

    if (filaSeleccionadaGridDireccionDepartamental != '') {
      let wpSelectedAsigned = listAllDireccionesDepartamentalesAPI.filter(option => option.id == filaSeleccionadaGridDireccionDepartamental)[0]
      if (wpSelectedAsigned != undefined) {
        setDireccionDepartamentalSelect(wpSelectedAsigned)
        mostrarAllRequerimentsByDireccionDepartamentalAPI(filaSeleccionadaGridDireccionDepartamental)
        setNombreContrato(wpSelectedAsigned.name)
      }

    }

  }, [filaSeleccionadaGridDireccionDepartamental, listAllDireccionesDepartamentalesAPI]);


  return (
    <Dialog open={visibilidadModalRequerimentsDireccionDepartamental} onClose={() => cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPI(false)} fullWidth maxWidth='md'
    PaperProps={{
      sx: {
        minHeight: "75%"
      }
    }}>
      <DialogTitle classes={{ root: classes.customDialogTitle }} >
        Assign requirements to departmental directorate: {nombreContrato}
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
            item xs={disabledAddRequerimentDepartament == true ? 6 : 16}>

            <div style={{ width: '100%', textAlign: 'center', display: listRequerimentsByDireccionDepartamental.length != 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                REQUIREMENTS ASSIGNED:
                <IconButton size="small" onClick={() => setVerSimilitudRequerimientos(true)}><InfoOutlined /></IconButton>
                <Divider style={{ width: '100%' }} />
              </span>
            </div>

            <div style={{ width: '100%', textAlign: 'center', display: listRequerimentsByDireccionDepartamental.length == 0 ? 'block' : 'none' }}>
              <span className="font-semibold">
                There are no requirements assigned to this Departmental directorate
              </span>
            </div>

            <ListRequerimentsMain
              tipoLista={"listRequerimentsSimple"}
              grupo={'departmentalDirectorate'}
              listRequeriments={listRequerimentsByDireccionDepartamental}
              disabledDeleteRequeriment={disabledDeleteRequerimentDepartament}
            />

          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            style={disabledAddRequerimentDepartament == true ? { display: '' } : { display: 'none' }}
            item xs={10}>

            <div style={{ width: '100%', textAlign: 'center' }}>
              <span className="font-semibold">
                NEW DEPARTMENTAL DIRECTORATE REQUIREMENTS
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

            <div style={valorTab == 'gruposRequerimientos' ? { display: "block" } : { display: "none" }}>
              <GruposRequerimientos grupo={'direccionDepartamental'} direccionDepartamentalSelect={direccionDepartamentalSelect} />
            </div>

            <div style={valorTab == 'requeriments' ? { display: "block" } : { display: "none" }}>
              <NewRequeriment grupo={'direccionDepartamental'} direccionDepartamentalSelect={direccionDepartamentalSelect} />
            </div>


          </Grid>
        </Grid>


      </DialogContent>
      <DialogActions>
        <Button onClick={() => { cambiarVisibilidadModalRequerimentsDireccionDepartamentalAPI(false) }}>Close</Button>
      </DialogActions>

      <Dialog open={verSimilitudRequerimientos} fullWidth maxWidth='sm'>

        <DialogTitle classes={{ root: classes.customDialogTitle }} >
          Shared requirements between the group and the departmental directorate
        </DialogTitle>
        <DialogContent>
          <SimilitudRequerimientos grupo={'direccionDepartamental'} direccionDepartamentalSelect={direccionDepartamentalSelect} />
        </DialogContent>
        <DialogActions>

          <Button variant="outlined" onClick={() => setVerSimilitudRequerimientos(false)}>Close</Button>

        </DialogActions>

      </Dialog>

    </Dialog>
  )
}

